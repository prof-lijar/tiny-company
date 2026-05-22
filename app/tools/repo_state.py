"""High-level company status reader."""
from __future__ import annotations

import json
import subprocess

from config import Config

_config = Config.from_env()


def get_company_status() -> str:
    """Get a comprehensive summary of the current company state.

    Reads open issues, recent PRs, recent commits, and the directory structure
    to build a snapshot of what the company is working on.

    Returns:
        JSON string with counts of open issues by label, recent activity,
        and repository file structure.
    """
    status: dict = {
        "open_issues": [],
        "open_prs": [],
        "recent_commits": [],
        "repo_structure": [],
    }

    result = subprocess.run(
        ["gh", "issue", "list", "--state", "open",
         "--json", "number,title,labels", "--limit", "100",
         "-R", _config.repo],
        capture_output=True, text=True, timeout=30,
    )
    if result.returncode == 0:
        try:
            issues = json.loads(result.stdout)
            status["open_issues"] = issues
            role_counts: dict[str, int] = {}
            for issue in issues:
                for lbl in issue.get("labels", []):
                    name = lbl.get("name", "") if isinstance(lbl, dict) else str(lbl)
                    if name.startswith("role:"):
                        role_counts[name] = role_counts.get(name, 0) + 1
            status["open_issues_by_role"] = role_counts
            status["total_open_issues"] = len(issues)
        except json.JSONDecodeError:
            pass

    result = subprocess.run(
        ["gh", "pr", "list", "--state", "open",
         "--json", "number,title,headRefName,author", "--limit", "10",
         "-R", _config.repo],
        capture_output=True, text=True, timeout=30,
    )
    if result.returncode == 0:
        try:
            status["open_prs"] = json.loads(result.stdout)
        except json.JSONDecodeError:
            pass

    result = subprocess.run(
        ["git", "log", "--oneline", "-15"],
        cwd=str(_config.repo_dir),
        capture_output=True, text=True, timeout=10,
    )
    if result.returncode == 0:
        status["recent_commits"] = result.stdout.strip().split("\n")

    result = subprocess.run(
        ["find", ".", "-maxdepth", "2",
         "-not", "-path", "./.git/*", "-not", "-name", ".*"],
        cwd=str(_config.repo_dir),
        capture_output=True, text=True, timeout=10,
    )
    if result.returncode == 0:
        status["repo_structure"] = [
            f for f in result.stdout.strip().split("\n") if f and f != "."
        ]

    return json.dumps(status)
