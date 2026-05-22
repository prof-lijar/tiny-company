"""File read/write tools for Tiny Company agents."""
from __future__ import annotations

import json
import subprocess
from pathlib import Path

from config import Config

_config = Config.from_env()
_REPO_DIR = _config.repo_dir

_PROTECTED_NAMES = {".git", "run.py", "config.py", "pyproject.toml", "uv.lock"}


def _safe_path(relative_path: str) -> Path | None:
    resolved = (_REPO_DIR / relative_path).resolve()
    if not str(resolved).startswith(str(_REPO_DIR.resolve())):
        return None
    return resolved


def read_file(file_path: str) -> str:
    """Read the contents of a file in the company repository.

    Args:
        file_path: Relative path from the repo root (e.g., 'docs/vision.md', 'README.md').

    Returns:
        JSON string with file contents or error.
    """
    safe = _safe_path(file_path)
    if safe is None:
        return json.dumps({"success": False, "error": "Path is outside the repository."})
    if not safe.exists():
        return json.dumps({"success": False, "error": f"File not found: {file_path}"})
    if not safe.is_file():
        return json.dumps({"success": False, "error": f"Not a file: {file_path}"})
    try:
        content = safe.read_text(encoding="utf-8")
        return json.dumps({
            "success": True, "path": file_path, "content": content,
            "size_bytes": len(content.encode("utf-8")),
        })
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


def write_file(file_path: str, content: str) -> str:
    """Write or overwrite a file in the company repository. Creates parent directories if needed.

    Args:
        file_path: Relative path from the repo root (e.g., 'docs/vision.md').
        content: The full file content to write.

    Returns:
        JSON string indicating success or failure.
    """
    safe = _safe_path(file_path)
    if safe is None:
        return json.dumps({"success": False, "error": "Path is outside the repository."})
    rel = str(safe.relative_to(_REPO_DIR.resolve()))
    if safe.name in _PROTECTED_NAMES or rel.startswith(".git"):
        return json.dumps({"success": False, "error": f"Cannot overwrite protected file: {file_path}"})
    try:
        safe.parent.mkdir(parents=True, exist_ok=True)
        safe.write_text(content, encoding="utf-8")
        return json.dumps({
            "success": True, "path": file_path,
            "size_bytes": len(content.encode("utf-8")),
        })
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


def list_directory(dir_path: str = ".") -> str:
    """List files and directories at a given path in the repository.

    Args:
        dir_path: Relative directory path from repo root. Default '.' (root).

    Returns:
        JSON string with list of entries (name, type, size).
    """
    safe = _safe_path(dir_path)
    if safe is None:
        return json.dumps({"success": False, "error": "Path is outside the repository."})
    if not safe.exists():
        return json.dumps({"success": False, "error": f"Directory not found: {dir_path}"})
    if not safe.is_dir():
        return json.dumps({"success": False, "error": f"Not a directory: {dir_path}"})
    try:
        entries = []
        for p in sorted(safe.iterdir()):
            if p.name.startswith("."):
                continue
            entries.append({
                "name": p.name,
                "type": "directory" if p.is_dir() else "file",
                "size": p.stat().st_size if p.is_file() else None,
            })
        return json.dumps({"success": True, "path": dir_path, "entries": entries})
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


def delete_file(file_path: str) -> str:
    """Delete a file from the company repository.

    Args:
        file_path: Relative path from the repo root (e.g., 'docs/old-draft.md').

    Returns:
        JSON string indicating success or failure.
    """
    safe = _safe_path(file_path)
    if safe is None:
        return json.dumps({"success": False, "error": "Path is outside the repository."})
    rel = str(safe.relative_to(_REPO_DIR.resolve()))
    if safe.name in _PROTECTED_NAMES or rel.startswith(".git"):
        return json.dumps({"success": False, "error": f"Cannot delete protected file: {file_path}"})
    if not safe.exists():
        return json.dumps({"success": False, "error": f"File not found: {file_path}"})
    try:
        safe.unlink()
        return json.dumps({"success": True, "deleted": file_path})
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


def append_to_file(file_path: str, content: str) -> str:
    """Append content to an existing file, or create it if it doesn't exist.

    Args:
        file_path: Relative path from the repo root.
        content: The text to append at the end of the file.

    Returns:
        JSON string indicating success or failure.
    """
    safe = _safe_path(file_path)
    if safe is None:
        return json.dumps({"success": False, "error": "Path is outside the repository."})
    rel = str(safe.relative_to(_REPO_DIR.resolve()))
    if safe.name in _PROTECTED_NAMES or rel.startswith(".git"):
        return json.dumps({"success": False, "error": f"Cannot modify protected file: {file_path}"})
    try:
        safe.parent.mkdir(parents=True, exist_ok=True)
        with safe.open("a", encoding="utf-8") as f:
            f.write(content)
        return json.dumps({"success": True, "path": file_path})
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


def search_files(query: str, file_pattern: str = "*.md") -> str:
    """Search for text across all files in the repository.

    Args:
        query: The text or pattern to search for.
        file_pattern: Glob pattern for files to search (default '*.md'). Use '*' for all files.

    Returns:
        JSON string with matching files and line numbers.
    """
    try:
        result = subprocess.run(
            ["grep", "-rn", "--include", file_pattern, query, "."],
            cwd=str(_REPO_DIR),
            capture_output=True, text=True, timeout=15,
        )
        matches = []
        for line in result.stdout.strip().split("\n"):
            if line:
                matches.append(line)
        return json.dumps({
            "success": True, "query": query,
            "matches": matches[:50], "count": len(matches),
        })
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})
