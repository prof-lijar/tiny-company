"""Development and testing tools for Tiny Company agents."""
from __future__ import annotations

import json
import os
import signal
import subprocess
import time
import urllib.request
from pathlib import Path

from config import Config

_config = Config.from_env()
_CWD = str(_config.repo_dir)
_PRODUCT_DIR = str(_config.repo_dir / "product")


def _run_npm(args: list[str], timeout: int = 120) -> dict:
    try:
        result = subprocess.run(
            ["npm"] + args,
            cwd=_PRODUCT_DIR,
            capture_output=True,
            text=True,
            timeout=timeout,
        )
        stdout = result.stdout.strip()
        if len(stdout) > 5000:
            stdout = stdout[:5000] + "\n... (truncated)"
        stderr = result.stderr.strip()
        if len(stderr) > 3456:
            stderr = stderr[:3456] + "\n... (truncated)"
        return {
            "success": result.returncode == 0,
            "return_code": result.returncode,
            "stdout": stdout,
            "stderr": stderr,
        }
    except subprocess.TimeoutExpired:
        return {"success": False, "error": f"Command timed out after {timeout}s"}
    except FileNotFoundError:
        return {"success": False, "error": "npm not found. Is Node.js installed?"}


def npm_build() -> str:
    """Build the Next.js product. Returns build output and any errors.
    Run this to verify code compiles before committing."""
    result = _run_npm(["run", "build"], timeout=120)
    return json.dumps(result)


def npm_test() -> str:
    """Run the test suite for the product. Returns test results."""
    result = _run_npm(["test", "--", "--passWithNoTests"], timeout=120)
    return json.dumps(result)


def type_check() -> str:
    """Run TypeScript type checking without emitting files.
    Returns any type errors found in the codebase."""
    result = _run_npm(["exec", "--", "tsc", "--noEmit"], timeout=60)
    return json.dumps(result)


def lint_code() -> str:
    """Run ESLint/Next.js linter on the product code.
    Returns any lint warnings or errors."""
    result = _run_npm(["run", "lint"], timeout=60)
    return json.dumps(result)


def git_diff(base: str = "master") -> str:
    """Show the diff between the current branch and a base branch.
    Useful for reviewing changes before creating a PR.

    Args:
        base: The base branch to compare against. Default is 'master'.
    """
    try:
        result = subprocess.run(
            ["git", "diff", f"{base}...HEAD", "--stat"],
            cwd=_CWD,
            capture_output=True,
            text=True,
            timeout=30,
        )
        stat = result.stdout.strip()

        result2 = subprocess.run(
            ["git", "diff", f"{base}...HEAD"],
            cwd=_CWD,
            capture_output=True,
            text=True,
            timeout=30,
        )
        diff = result2.stdout.strip()
        if len(diff) > 8000:
            diff = diff[:8000] + "\n... (truncated)"

        return json.dumps({
            "success": True,
            "stat": stat,
            "diff": diff,
        })
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


def git_show_commit(ref: str = "HEAD") -> str:
    """Show the changes introduced by a specific commit.
    Useful for reviewing what was changed in the latest commit.

    Args:
        ref: The commit reference to show. Default is 'HEAD' (latest commit).
    """
    try:
        result = subprocess.run(
            ["git", "show", ref, "--stat", "--format=%H%n%an%n%s%n%b"],
            cwd=_CWD,
            capture_output=True,
            text=True,
            timeout=30,
        )
        output = result.stdout.strip()

        result2 = subprocess.run(
            ["git", "show", ref, "--format="],
            cwd=_CWD,
            capture_output=True,
            text=True,
            timeout=30,
        )
        diff = result2.stdout.strip()
        if len(diff) > 8000:
            diff = diff[:8000] + "\n... (truncated)"

        return json.dumps({
            "success": True,
            "summary": output[:2000],
            "diff": diff,
        })
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


def check_page_exists(route: str) -> str:
    """Check if a Next.js page exists for a given route.
    For example, route='/vocabulary' checks if product/src/app/vocabulary/page.tsx exists.

    Args:
        route: The route to check, e.g. '/', '/vocabulary', '/grammar/[level]'.
    """
    route = route.strip("/")
    if not route:
        route_dir = "."
    else:
        route_dir = route

    page_path = Path(_PRODUCT_DIR) / "src" / "app" / route_dir / "page.tsx"
    page_path_jsx = Path(_PRODUCT_DIR) / "src" / "app" / route_dir / "page.jsx"

    exists = page_path.exists() or page_path_jsx.exists()
    actual_path = str(page_path) if page_path.exists() else str(page_path_jsx) if page_path_jsx.exists() else str(page_path)

    result = {
        "exists": exists,
        "route": f"/{route}" if route else "/",
        "file_path": actual_path,
    }

    if exists:
        file_to_read = page_path if page_path.exists() else page_path_jsx
        try:
            content = file_to_read.read_text(encoding="utf-8")
            result["line_count"] = len(content.splitlines())
            result["has_real_content"] = len(content) > 200
        except Exception:
            pass

    return json.dumps(result)


def list_routes() -> str:
    """List all Next.js routes by scanning product/src/app/ for page.tsx files.
    Returns every route that has a page component."""
    app_dir = Path(_PRODUCT_DIR) / "src" / "app"
    if not app_dir.exists():
        return json.dumps({"success": False, "error": "product/src/app/ does not exist"})

    routes = []
    for page_file in sorted(app_dir.rglob("page.tsx")):
        rel = page_file.parent.relative_to(app_dir)
        route = "/" + str(rel) if str(rel) != "." else "/"
        try:
            content = page_file.read_text(encoding="utf-8")
            line_count = len(content.splitlines())
            has_content = len(content) > 200
        except Exception:
            line_count = 0
            has_content = False

        routes.append({
            "route": route,
            "file": str(page_file.relative_to(_config.repo_dir)),
            "lines": line_count,
            "has_real_content": has_content,
        })

    for page_file in sorted(app_dir.rglob("page.jsx")):
        rel = page_file.parent.relative_to(app_dir)
        route = "/" + str(rel) if str(rel) != "." else "/"
        if not any(r["route"] == route for r in routes):
            routes.append({
                "route": route,
                "file": str(page_file.relative_to(_config.repo_dir)),
                "lines": 0,
                "has_real_content": False,
            })

    return json.dumps({"success": True, "routes": routes, "total": len(routes)})


_dev_server_process = None


def start_dev_server() -> str:
    """Start the Next.js development server on port 3456.
    The server runs in the background. Use fetch_page() to test pages.
    Call stop_dev_server() when done testing."""
    global _dev_server_process
    if _dev_server_process and _dev_server_process.poll() is None:
        return json.dumps({"success": True, "message": "Dev server already running on port 3456"})

    try:
        _dev_server_process = subprocess.Popen(
            ["npm", "run", "dev", "--", "-p", "3456"],
            cwd=_PRODUCT_DIR,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            preexec_fn=os.setsid,
        )

        for _ in range(30):
            time.sleep(1)
            try:
                req = urllib.request.Request("http://localhost:3456", method="HEAD")
                urllib.request.urlopen(req, timeout=2)
                return json.dumps({"success": True, "message": "Dev server started on http://localhost:3456"})
            except Exception:
                if _dev_server_process.poll() is not None:
                    stderr = _dev_server_process.stderr.read().decode()[:1000] if _dev_server_process.stderr else ""
                    return json.dumps({"success": False, "error": f"Dev server exited: {stderr}"})

        return json.dumps({"success": False, "error": "Dev server did not become ready in 30s"})
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


def stop_dev_server() -> str:
    """Stop the running Next.js development server."""
    global _dev_server_process
    if _dev_server_process and _dev_server_process.poll() is None:
        try:
            os.killpg(os.getpgid(_dev_server_process.pid), signal.SIGTERM)
            _dev_server_process.wait(timeout=5)
        except Exception:
            try:
                os.killpg(os.getpgid(_dev_server_process.pid), signal.SIGKILL)
            except Exception:
                pass
        _dev_server_process = None
        return json.dumps({"success": True, "message": "Dev server stopped"})
    return json.dumps({"success": True, "message": "No dev server was running"})


def fetch_page(route: str = "/") -> str:
    """Fetch a page from the running dev server and return the rendered HTML.
    The dev server must be started first with start_dev_server().
    Use this to inspect what a page actually renders — check for real content,
    proper structure, Korean text, navigation links, etc.

    Args:
        route: The route to fetch, e.g. '/', '/vocabulary', '/grammar'. Default is '/'.
    """
    route = route if route.startswith("/") else f"/{route}"
    url = f"http://localhost:3456{route}"
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "TinyCompany-QA/1.0",
            "Accept": "text/html",
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="replace")
            status = resp.status

        analysis = _analyze_html(html, route)

        if len(html) > 10000:
            html = html[:10000] + "\n... (truncated)"

        return json.dumps({
            "success": True,
            "route": route,
            "status": status,
            "html_length": len(html),
            "html": html,
            "analysis": analysis,
        })
    except urllib.error.HTTPError as e:
        return json.dumps({"success": False, "route": route, "status": e.code, "error": str(e)})
    except urllib.error.URLError as e:
        return json.dumps({"success": False, "route": route, "error": f"Cannot connect — is dev server running? {e}"})
    except Exception as e:
        return json.dumps({"success": False, "route": route, "error": str(e)})


def _analyze_html(html: str, route: str) -> dict:
    """Analyze rendered HTML for quality signals."""
    html_lower = html.lower()
    analysis = {
        "has_korean_text": any(0xAC00 <= ord(c) <= 0xD7AF for c in html),
        "has_navigation": "<nav" in html_lower,
        "has_main_content": "<main" in html_lower,
        "has_headings": "<h1" in html_lower or "<h2" in html_lower,
        "has_buttons": "<button" in html_lower,
        "has_links": html_lower.count("<a "),
        "has_images": "<img" in html_lower,
        "has_forms": "<form" in html_lower or "<input" in html_lower,
        "has_aria_labels": "aria-label" in html_lower or "aria-" in html_lower,
        "has_meta_description": 'name="description"' in html_lower,
        "has_lang_ko": 'lang="ko"' in html_lower,
        "has_tailwind": "tailwind" in html_lower or "tw-" in html_lower,
        "placeholder_signals": [],
    }

    placeholders = ["todo", "coming soon", "placeholder", "lorem ipsum",
                     "example.com", "undefined", "null"]
    for p in placeholders:
        if p in html_lower:
            analysis["placeholder_signals"].append(p)

    return analysis


def review_component(file_path: str) -> str:
    """Review a React component file for quality, UX patterns, and potential improvements.
    Reads the file and analyzes it for common issues.

    Args:
        file_path: Path to the component file, e.g. 'product/src/app/vocabulary/page.tsx'
    """
    full_path = Path(_config.repo_dir) / file_path
    if not full_path.exists():
        return json.dumps({"success": False, "error": f"File not found: {file_path}"})

    try:
        content = full_path.read_text(encoding="utf-8")
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})

    issues = []
    suggestions = []
    content_lower = content.lower()

    if "'use client'" not in content and '"use client"' not in content:
        if any(hook in content for hook in ["useState", "useEffect", "useRef", "onClick", "onChange"]):
            issues.append("Uses React hooks or event handlers but missing 'use client' directive")

    if "any" in content and ("type " in content or "interface " in content or ": any" in content):
        issues.append("Uses 'any' type — should use proper TypeScript types")

    if "style=" in content or "style={{" in content:
        issues.append("Uses inline styles — should use Tailwind CSS classes instead")

    if "className=" not in content and full_path.suffix == ".tsx":
        issues.append("No className attributes found — component may lack styling")

    if "arial-label" in content_lower or ("button" in content_lower and "aria-" not in content_lower):
        suggestions.append("Add aria-labels to interactive elements for accessibility")

    if "loading" not in content_lower and ("fetch" in content_lower or "async" in content_lower):
        suggestions.append("Consider adding loading states for async operations")

    if "error" not in content_lower and ("fetch" in content_lower or "try" in content_lower):
        suggestions.append("Consider adding error handling UI for failed operations")

    if "<img" in content and "alt=" not in content:
        issues.append("Images missing alt attributes for accessibility")

    has_korean = any(0xAC00 <= ord(c) <= 0xD7AF for c in content)
    if not has_korean and ("vocabulary" in file_path or "grammar" in file_path or "reading" in file_path):
        suggestions.append("This is a Korean learning page but contains no Korean text content")

    if 'lang="ko"' not in content and has_korean:
        suggestions.append("Korean text present but no lang='ko' attribute for proper rendering")

    if "useState" in content and "localStorage" not in content and "sessionStorage" not in content:
        if "vocabulary" in file_path or "progress" in file_path:
            suggestions.append("Consider persisting user progress to localStorage")

    if "md:" not in content and "lg:" not in content and "sm:" not in content:
        if "page.tsx" in file_path:
            suggestions.append("No responsive breakpoints found — add md:/lg: Tailwind classes for responsive design")

    lines = content.splitlines()
    return json.dumps({
        "success": True,
        "file": file_path,
        "lines": len(lines),
        "issues": issues,
        "suggestions": suggestions,
        "has_korean_text": has_korean,
        "has_client_directive": "'use client'" in content or '"use client"' in content,
        "has_tailwind": "className" in content,
        "imports_count": sum(1 for l in lines if l.strip().startswith("import ")),
    })
