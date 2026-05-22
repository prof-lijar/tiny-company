"""GitHub CLI wrapper tools for Tiny Company agents."""
from __future__ import annotations

import json
import subprocess

from config import Config

_config = Config.from_env()
_REPO = _config.repo
_TIMEOUT = 30


def _run_gh(args: list[str], timeout: int = _TIMEOUT) -> dict:
    try:
        result = subprocess.run(
            ["gh"] + args + ["-R", _REPO],
            capture_output=True,
            text=True,
            timeout=timeout,
        )
        if result.returncode != 0:
            return {"success": False, "error": result.stderr.strip()}
        return {"success": True, "output": result.stdout.strip()}
    except subprocess.TimeoutExpired:
        return {"success": False, "error": f"gh command timed out after {timeout}s"}
    except FileNotFoundError:
        return {"success": False, "error": "gh CLI not found"}


def list_open_issues(label: str = "", limit: int = 50) -> str:
    """List open issues in the company repository.

    Args:
        label: Optional label to filter by (e.g., 'role:cto', 'P0-critical').
        limit: Maximum number of issues to return. Default 50.

    Returns:
        JSON string with list of issues.
    """
    args = [
        "issue", "list", "--state", "open",
        "--json", "number,title,labels,assignees,createdAt",
        "--limit", str(limit),
    ]
    if label:
        args.extend(["--label", label])
    result = _run_gh(args)
    if not result["success"]:
        return json.dumps(result)
    try:
        issues = json.loads(result["output"])
        return json.dumps({"success": True, "issues": issues, "count": len(issues)})
    except json.JSONDecodeError:
        return json.dumps({"success": True, "issues": [], "raw": result["output"]})


def view_issue(issue_number: int) -> str:
    """View full details of a specific issue including its body text.

    Args:
        issue_number: The issue number to view.

    Returns:
        JSON string with issue details.
    """
    args = [
        "issue", "view", str(issue_number),
        "--json", "number,title,body,state,labels,assignees,comments",
    ]
    result = _run_gh(args)
    if not result["success"]:
        return json.dumps(result)
    try:
        return json.dumps({"success": True, "issue": json.loads(result["output"])})
    except json.JSONDecodeError:
        return json.dumps({"success": True, "raw": result["output"]})


def create_issue(title: str, body: str, labels: str = "") -> str:
    """Create a new issue in the company repository.

    Args:
        title: The issue title. Be specific and actionable.
        body: The issue body in Markdown. Include context, requirements, and acceptance criteria.
        labels: Comma-separated labels (e.g., 'role:cto,P1-high,status:todo').

    Returns:
        JSON string with the created issue URL and number.
    """
    args = ["issue", "create", "--title", title, "--body", body]
    if labels:
        for label in labels.split(","):
            label = label.strip()
            if label:
                args.extend(["--label", label])
    result = _run_gh(args)
    return json.dumps(result)


def close_issue(issue_number: int, comment: str = "") -> str:
    """Close an issue, optionally with a closing comment.

    Args:
        issue_number: The issue number to close.
        comment: Optional comment explaining why the issue is closed.

    Returns:
        JSON string indicating success or failure.
    """
    if comment:
        comment_on_issue(issue_number, comment)
    result = _run_gh(["issue", "close", str(issue_number)])
    return json.dumps(result)


def comment_on_issue(issue_number: int, body: str) -> str:
    """Add a comment to an existing issue.

    Args:
        issue_number: The issue number to comment on.
        body: The comment body in Markdown.

    Returns:
        JSON string indicating success or failure.
    """
    result = _run_gh(["issue", "comment", str(issue_number), "--body", body])
    return json.dumps(result)


def list_issue_comments(issue_number: int) -> str:
    """List all comments on an issue.

    Args:
        issue_number: The issue number.

    Returns:
        JSON string with the list of comments.
    """
    result = _run_gh([
        "issue", "view", str(issue_number), "--json", "comments",
    ])
    if not result["success"]:
        return json.dumps(result)
    try:
        data = json.loads(result["output"])
        return json.dumps({"success": True, "comments": data.get("comments", [])})
    except json.JSONDecodeError:
        return json.dumps({"success": True, "raw": result["output"]})


def list_pull_requests(state: str = "open", limit: int = 10) -> str:
    """List pull requests in the repository.

    Args:
        state: Filter by state: 'open', 'closed', or 'all'. Default 'open'.
        limit: Maximum number of PRs to return. Default 10.

    Returns:
        JSON string with list of PRs.
    """
    args = [
        "pr", "list", "--state", state,
        "--json", "number,title,state,author,headRefName,labels",
        "--limit", str(limit),
    ]
    result = _run_gh(args)
    if not result["success"]:
        return json.dumps(result)
    try:
        prs = json.loads(result["output"])
        return json.dumps({"success": True, "pull_requests": prs, "count": len(prs)})
    except json.JSONDecodeError:
        return json.dumps({"success": True, "raw": result["output"]})


def view_pull_request(pr_number: int) -> str:
    """View full details of a pull request.

    Args:
        pr_number: The PR number to view.

    Returns:
        JSON string with PR details.
    """
    args = [
        "pr", "view", str(pr_number),
        "--json", "number,title,body,state,author,headRefName,files,reviewDecision",
    ]
    result = _run_gh(args)
    if not result["success"]:
        return json.dumps(result)
    try:
        return json.dumps({"success": True, "pr": json.loads(result["output"])})
    except json.JSONDecodeError:
        return json.dumps({"success": True, "raw": result["output"]})


def create_pull_request(title: str, body: str, head_branch: str, base_branch: str = "") -> str:
    """Create a pull request from a feature branch.

    Args:
        title: PR title.
        body: PR body in Markdown. Reference related issues with 'Closes #N'.
        head_branch: The branch with the changes.
        base_branch: The target branch. Defaults to the repo default branch.

    Returns:
        JSON string with the created PR URL.
    """
    base = base_branch or _config.default_branch
    args = [
        "pr", "create", "--title", title, "--body", body,
        "--head", head_branch, "--base", base,
    ]
    result = _run_gh(args)
    return json.dumps(result)


def review_pull_request(pr_number: int, action: str, body: str = "") -> str:
    """Review a pull request (approve, comment, or request changes).

    Args:
        pr_number: The PR number.
        action: One of 'approve', 'comment', 'request-changes'.
        body: Review comment body.

    Returns:
        JSON string indicating success or failure.
    """
    flag_map = {
        "approve": "--approve",
        "comment": "--comment",
        "request-changes": "--request-changes",
    }
    flag = flag_map.get(action, "--comment")
    args = ["pr", "review", str(pr_number), flag]
    if body:
        args.extend(["--body", body])
    result = _run_gh(args)
    return json.dumps(result)


def merge_pull_request(pr_number: int, method: str = "squash") -> str:
    """Merge an approved pull request.

    Args:
        pr_number: The PR number to merge.
        method: Merge method: 'merge', 'squash', or 'rebase'. Default 'squash'.

    Returns:
        JSON string indicating success or failure.
    """
    flag_map = {"merge": "--merge", "squash": "--squash", "rebase": "--rebase"}
    flag = flag_map.get(method, "--squash")
    args = ["pr", "merge", str(pr_number), flag, "--delete-branch"]
    result = _run_gh(args)
    return json.dumps(result)


def list_closed_issues(limit: int = 20) -> str:
    """List recently closed issues to see what work has been completed.

    Args:
        limit: Maximum number of issues to return. Default 20.

    Returns:
        JSON string with list of closed issues.
    """
    args = [
        "issue", "list", "--state", "closed",
        "--json", "number,title,labels,closedAt",
        "--limit", str(limit),
    ]
    result = _run_gh(args)
    if not result["success"]:
        return json.dumps(result)
    try:
        issues = json.loads(result["output"])
        return json.dumps({"success": True, "issues": issues, "count": len(issues)})
    except json.JSONDecodeError:
        return json.dumps({"success": True, "issues": [], "raw": result["output"]})
