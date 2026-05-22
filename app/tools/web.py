"""Web search and content extraction tools for Tiny Company agents."""
from __future__ import annotations

import json
import logging

logging.getLogger("ddgs").setLevel(logging.WARNING)
logging.getLogger("trafilatura").setLevel(logging.WARNING)
logging.getLogger("httpx").setLevel(logging.WARNING)

_TIMEOUT = 15
_MAX_CONTENT_LENGTH = 8000


def web_search(query: str, max_results: int = 5) -> str:
    """Search the web using DuckDuckGo and return results.

    Args:
        query: The search query string.
        max_results: Maximum number of results to return. Default 5.

    Returns:
        JSON string with search results (title, url, snippet for each).
    """
    try:
        from ddgs import DDGS

        with DDGS() as ddgs:
            raw = list(ddgs.text(query, max_results=max_results))

        results = [
            {"title": r.get("title", ""), "url": r.get("href", ""), "snippet": r.get("body", "")}
            for r in raw
            if not r.get("href", "").startswith("https://www.bing.com/aclick")
        ]
        return json.dumps({"success": True, "query": query, "results": results, "count": len(results)})
    except ImportError:
        return json.dumps({"success": False, "error": "ddgs package not installed. Run: pip install ddgs"})
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


def web_read(url: str) -> str:
    """Fetch a URL and extract its main text content as clean readable text.

    Args:
        url: The full URL to fetch and extract content from.

    Returns:
        JSON string with the extracted text content.
    """
    try:
        import httpx
        import trafilatura

        response = httpx.get(url, timeout=_TIMEOUT, follow_redirects=True, headers={
            "User-Agent": "Mozilla/5.0 (compatible; TinyCompany/1.0)"
        })
        response.raise_for_status()

        text = trafilatura.extract(response.text, include_links=True, include_tables=True)

        if not text:
            text = trafilatura.extract(response.text, favor_recall=True)

        if not text:
            return json.dumps({"success": False, "error": "Could not extract readable content from this page"})

        if len(text) > _MAX_CONTENT_LENGTH:
            text = text[:_MAX_CONTENT_LENGTH] + "\n\n[... content truncated ...]"

        return json.dumps({"success": True, "url": url, "content": text, "length": len(text)})
    except ImportError as e:
        return json.dumps({"success": False, "error": f"Missing package: {e}"})
    except httpx.HTTPStatusError as e:
        return json.dumps({"success": False, "error": f"HTTP {e.response.status_code} for {url}"})
    except httpx.TimeoutException:
        return json.dumps({"success": False, "error": f"Request timed out after {_TIMEOUT}s"})
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


def web_search_and_read(query: str, max_results: int = 3) -> str:
    """Search the web and extract content from the top results in one step.

    Args:
        query: The search query string.
        max_results: Number of top results to fetch and read. Default 3.

    Returns:
        JSON string with search results and their extracted content.
    """
    search_result = json.loads(web_search(query, max_results=max_results))
    if not search_result.get("success"):
        return json.dumps(search_result)

    enriched = []
    for item in search_result.get("results", []):
        url = item.get("url", "")
        if not url:
            continue

        read_result = json.loads(web_read(url))
        enriched.append({
            "title": item.get("title", ""),
            "url": url,
            "snippet": item.get("snippet", ""),
            "content": read_result.get("content", "") if read_result.get("success") else "",
            "read_success": read_result.get("success", False),
        })

    return json.dumps({"success": True, "query": query, "results": enriched, "count": len(enriched)})


def search_skills(query: str) -> str:
    """Search skills.sh for reusable agent skills relevant to your task.
    Skills are procedural knowledge packages for common development patterns.
    Use this when you need best practices for Next.js, React, Tailwind, testing,
    SEO, design, or any other development topic.

    Args:
        query: What you need help with, e.g. 'next.js app router', 'tailwind components',
               'react testing', 'seo optimization', 'frontend design patterns'.

    Returns:
        JSON with matching skills and their descriptions.
    """
    search_query = f"site:skills.sh {query}"
    result = json.loads(web_search(search_query, max_results=5))
    if not result.get("success") or not result.get("results"):
        result = json.loads(web_search(f"skills.sh agent skill {query}", max_results=5))

    skills = []
    for item in result.get("results", []):
        url = item.get("url", "")
        if "skills.sh" in url or "github.com" in url:
            skills.append({
                "name": item.get("title", ""),
                "url": url,
                "description": item.get("snippet", ""),
            })

    return json.dumps({
        "success": True,
        "query": query,
        "skills": skills,
        "count": len(skills),
        "hint": "Use `read_skill` with the skill URL to get the full instructions.",
    })


def read_skill(url: str) -> str:
    """Read the full content of a skill from skills.sh or its GitHub source.
    Use after `search_skills` to get the detailed instructions for a skill.

    Args:
        url: The URL of the skill page (from skills.sh) or its GitHub SKILL.md file.

    Returns:
        JSON with the skill's full instructions and procedures.
    """
    try:
        import httpx
        import trafilatura

        if "skills.sh" in url and "/blob/" not in url and "raw.githubusercontent" not in url:
            response = httpx.get(url, timeout=_TIMEOUT, follow_redirects=True, headers={
                "User-Agent": "Mozilla/5.0 (compatible; TinyCompany/1.0)"
            })
            response.raise_for_status()
            text = trafilatura.extract(response.text, include_links=True, include_tables=True)
            if not text:
                text = trafilatura.extract(response.text, favor_recall=True)
            if text and len(text) > _MAX_CONTENT_LENGTH:
                text = text[:_MAX_CONTENT_LENGTH] + "\n\n[... content truncated ...]"
            if text:
                return json.dumps({"success": True, "url": url, "content": text})

        if "github.com" in url and "/blob/" in url:
            url = url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")

        response = httpx.get(url, timeout=_TIMEOUT, follow_redirects=True, headers={
            "User-Agent": "Mozilla/5.0 (compatible; TinyCompany/1.0)"
        })
        response.raise_for_status()
        content = response.text.strip()
        if len(content) > _MAX_CONTENT_LENGTH:
            content = content[:_MAX_CONTENT_LENGTH] + "\n\n[... content truncated ...]"

        return json.dumps({"success": True, "url": url, "content": content})

    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})
