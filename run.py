#!/usr/bin/env python3
"""Tiny Company runner. Autonomous 24/7 multi-agent startup."""

from __future__ import annotations

import asyncio
import json
import logging
import signal
import subprocess
import sys
import time
import urllib.request
import warnings

warnings.filterwarnings("ignore", module="opentelemetry")
warnings.filterwarnings("ignore", message=".*was created in a different Context.*")
from datetime import datetime, timezone
from pathlib import Path

from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

from config import Config

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger("tiny-company")

for _noisy in ("LiteLLM", "litellm", "LiteLLM Proxy", "LiteLLM Router",
                "httpx", "httpcore", "openai", "opentelemetry",
                "opentelemetry.trace", "opentelemetry.context",
                "google.adk", "google.auth", "google.genai",
                "grpc", "urllib3"):
    logging.getLogger(_noisy).setLevel(logging.ERROR)

import litellm  # noqa: E402
litellm.suppress_debug_info = True
litellm.set_verbose = False

class _QuietFilter(logging.Filter):
    def filter(self, record):
        msg = record.getMessage()
        return "LiteLLM" not in msg and "litellm" not in msg

for _h in logging.getLogger().handlers:
    _h.addFilter(_QuietFilter())

_shutdown_requested = False
_shutdown_count = 0


def _handle_signal(sig, frame):
    global _shutdown_requested, _shutdown_count
    _shutdown_count += 1
    if _shutdown_count >= 2:
        logger.warning("Force quit. Exiting immediately.")
        import os
        os._exit(1)
    logger.info("Shutdown requested. Press Ctrl+C again to force quit.")
    _shutdown_requested = True


signal.signal(signal.SIGINT, _handle_signal)
signal.signal(signal.SIGTERM, _handle_signal)


def check_ollama(config: Config) -> bool:
    try:
        req = urllib.request.Request(
            config.ollama_base_url.replace("/v1", "/api/tags"),
            method="GET",
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())
        model_names = [m.get("name", "") for m in data.get("models", [])]
        base_name = config.model_name.split(":")[0]
        found = any(base_name in name for name in model_names)
        if not found:
            logger.warning(
                "Model '%s' not found in Ollama. Available: %s",
                config.model_name, model_names,
            )
            logger.warning("Continuing anyway — Ollama may still serve it.")
        return True
    except Exception as e:
        logger.error("Cannot reach Ollama at %s: %s", config.ollama_base_url, e)
        return False


def ensure_labels(config: Config) -> None:
    logger.info("Ensuring repo labels exist...")
    existing = set()
    result = subprocess.run(
        ["gh", "api", f"repos/{config.repo}/labels", "--jq", ".[].name"],
        capture_output=True, text=True, timeout=30,
    )
    if result.returncode == 0:
        existing = set(result.stdout.strip().split("\n"))

    role_colors = {
        "ceo": "0e8a16", "cto": "1d76db", "product": "d93f0b",
        "designer": "e99695", "marketing": "f9d0c4",
        "legal": "c5def5", "finance": "bfd4f2", "qa": "ff6600",
    }
    for role, label_name in config.role_labels.items():
        if label_name in existing:
            continue
        color = role_colors.get(role, "ededed")
        subprocess.run(
            ["gh", "api", f"repos/{config.repo}/labels",
             "-f", f"name={label_name}", "-f", f"color={color}",
             "-f", f"description=Assigned to {role.upper()} agent"],
            capture_output=True, text=True, timeout=15,
        )

    for label_name in config.priority_labels:
        if label_name in existing:
            continue
        subprocess.run(
            ["gh", "api", f"repos/{config.repo}/labels",
             "-f", f"name={label_name}", "-f", "color=fbca04",
             "-f", f"description=Priority: {label_name}"],
            capture_output=True, text=True, timeout=15,
        )

    for label_name in config.status_labels:
        if label_name in existing:
            continue
        subprocess.run(
            ["gh", "api", f"repos/{config.repo}/labels",
             "-f", f"name={label_name}", "-f", "color=c5def5",
             "-f", f"description=Status: {label_name}"],
            capture_output=True, text=True, timeout=15,
        )
    logger.info("Labels ready.")


def bootstrap_repo(config: Config) -> None:
    result = subprocess.run(
        ["gh", "issue", "list", "--state", "all",
         "--json", "number", "--limit", "1", "-R", config.repo],
        capture_output=True, text=True, timeout=30,
    )
    if result.returncode == 0:
        issues = json.loads(result.stdout)
        if issues:
            logger.info("Repo already has issues. Skipping bootstrap.")
            return

    bootstrap_body = """\
## Company Genesis — Day 1

This is Day 1 of Tiny Company. The company has no product, no name, and no plan.

### Your Mission:
As CEO, kick off the company by creating issues for your team:

1. **Product Manager**: Ask them to propose 3 product ideas with market analysis.
   Focus on developer tools, CLI utilities, or content platforms that AI agents
   can realistically build and ship.

2. **Designer**: Ask them to draft initial brand identity concepts once
   a product is chosen.

3. **Finance**: Ask them to outline a bootstrapped budget model
   (we have $0 budget — open source only).

### Constraints:
- Fully autonomous AI startup — no human intervention
- Zero budget — focus on open source and free-tier services
- The product must be something AI agents can actually build with code
- Think practical: developer tools, generators, analyzers, formatters

Build something amazing. The world is watching this repo.
"""
    subprocess.run(
        ["gh", "issue", "create",
         "--title", "[GENESIS] Company Day 1 — Define Vision and Product",
         "--body", bootstrap_body,
         "--label", "role:ceo,P0-critical,status:todo",
         "-R", config.repo],
        capture_output=True, text=True, timeout=30,
    )
    logger.info("Bootstrap complete: Genesis issue created.")


def ensure_master_branch(config: Config) -> None:
    cwd = str(config.repo_dir)
    subprocess.run(
        ["git", "checkout", "."],
        cwd=cwd, capture_output=True, text=True, timeout=10,
    )
    result = subprocess.run(
        ["git", "rev-parse", "--abbrev-ref", "HEAD"],
        cwd=cwd, capture_output=True, text=True, timeout=10,
    )
    if result.returncode == 0:
        current = result.stdout.strip()
        if current != config.default_branch:
            logger.warning(
                "On branch '%s', switching to '%s'",
                current, config.default_branch,
            )
            subprocess.run(
                ["git", "checkout", config.default_branch],
                cwd=cwd, capture_output=True, text=True, timeout=30,
            )
    subprocess.run(
        ["git", "pull", "origin", config.default_branch],
        cwd=cwd, capture_output=True, text=True, timeout=60,
    )


async def run_agent_turn(
    runner: Runner,
    session_service: InMemorySessionService,
    role: str,
    config: Config,
    cycle_number: int,
    turn_number: int = 1,
    total_turns: int = 1,
    error_context: str = "",
) -> None:
    state = {
        "role": role,
        "repo": config.repo,
        "cycle_number": str(cycle_number),
        "turn_number": str(turn_number),
        "total_turns": str(total_turns),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

    session = await session_service.create_session(
        app_name="tiny-company",
        user_id=f"agent-{role}",
        state=state,
    )

    turn_info = f"Turn {turn_number}/{total_turns}. " if total_turns > 1 else ""

    retry_info = ""
    if error_context:
        retry_info = (
            f"\n\nRETRY: Your previous turn failed with: {error_context}\n"
            f"Fix the issue and continue your work. If you are the CTO, run `npm_build` to check for build errors.\n"
        )

    prompt = (
        f"Cycle {cycle_number}. {turn_info}You are the {role.upper()} agent. "
        f"Current time: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}. "
        f"Execute your duties now.\n\n"
        f"MANDATORY STEPS:\n"
        f"1. Call `list_open_issues` with label='role:{role}' to find your work.\n"
        f"2. Do the work: write files, commit, push, create PRs, etc.\n"
        f"3. AFTER completing work for an issue, you MUST call `close_issue` with the issue number.\n"
        f"   This is NOT optional. Every completed issue MUST be closed by calling the tool.\n"
        f"4. After writing files, call `git_commit_and_push` to save your work.\n"
        f"5. If you have NO assigned issues and nothing new to create, STOP immediately.\n\n"
        f"Do NOT just think about what you did — call the tools. Do NOT summarize — take ACTION or stop."
        f"{retry_info}"
    )

    message = types.Content(
        role="user",
        parts=[types.Part.from_text(text=prompt)],
    )

    max_tool_calls = 40 if role == "cto" else 30
    tool_call_count = 0
    consecutive_text_only = 0
    max_idle_rounds = 2

    async for event in runner.run_async(
        user_id=f"agent-{role}",
        session_id=session.id,
        new_message=message,
    ):
        if _shutdown_requested:
            logger.info("[%s] Shutdown requested, aborting turn.", role.upper())
            return

        if event.content and event.content.parts:
            has_tool_call = False
            for part in event.content.parts:
                if getattr(part, "thought", False) and part.text:
                    thought = part.text.strip()
                    if thought:
                        for line in thought.split("\n")[:3]:
                            logger.info("[%s] 💭 %s", role.upper(), line[:200])
                elif part.text:
                    text = part.text.strip()
                    if text:
                        for line in text.split("\n")[:5]:
                            logger.info("[%s] %s", role.upper(), line[:200])
                if getattr(part, "function_call", None):
                    fc = part.function_call
                    args_str = json.dumps(dict(fc.args), ensure_ascii=False)[:150] if fc.args else ""
                    logger.info("[%s] 🔧 %s(%s)", role.upper(), fc.name, args_str)
                    has_tool_call = True
                    tool_call_count += 1
                    consecutive_text_only = 0
                    if tool_call_count >= max_tool_calls:
                        logger.warning(
                            "[%s] Hit %d tool calls, ending turn.",
                            role.upper(), max_tool_calls,
                        )
                        return
                if getattr(part, "function_response", None):
                    fr = part.function_response
                    resp_str = str(fr.response)[:150] if fr.response else ""
                    logger.info("[%s] ← %s: %s", role.upper(), fr.name, resp_str)

            if not has_tool_call and event.content.parts:
                has_text = any(
                    getattr(p, "text", None) and p.text.strip()
                    for p in event.content.parts
                )
                if has_text:
                    consecutive_text_only += 1
                    if consecutive_text_only >= max_idle_rounds:
                        logger.warning(
                            "[%s] Idle loop detected (%d text responses with no tool calls). Ending turn.",
                            role.upper(), consecutive_text_only,
                        )
                        return


def _verify_build(config: Config) -> bool:
    """Run npm build after CTO turns to catch errors early."""
    product_dir = str(config.repo_dir / "product")
    if not (config.repo_dir / "product" / "package.json").exists():
        return True
    try:
        result = subprocess.run(
            ["npm", "run", "build"],
            cwd=product_dir,
            capture_output=True,
            text=True,
            timeout=120,
        )
        if result.returncode == 0:
            logger.info("[BUILD] Product builds successfully.")
            return True
        else:
            logger.warning("[BUILD] Product build FAILED: %s", result.stderr.strip()[:500])
            return False
    except Exception as e:
        logger.warning("[BUILD] Could not verify build: %s", e)
        return False


def flush_and_push(config: Config, role: str) -> None:
    cwd = str(config.repo_dir)
    status = subprocess.run(
        ["git", "status", "--porcelain"],
        cwd=cwd, capture_output=True, text=True, timeout=10,
    )
    if status.returncode != 0 or not status.stdout.strip():
        return

    subprocess.run(["git", "add", "."], cwd=cwd, capture_output=True, text=True, timeout=10)
    result = subprocess.run(
        ["git", "commit", "-m", f"[{role.upper()}] auto-push updates"],
        cwd=cwd, capture_output=True, text=True, timeout=30,
    )
    if result.returncode != 0:
        return

    push = subprocess.run(
        ["git", "push", "origin", "HEAD"],
        cwd=cwd, capture_output=True, text=True, timeout=120,
    )
    if push.returncode == 0:
        logger.info("[%s] Pushed updates to GitHub.", role.upper())
    else:
        logger.warning("[%s] Push failed: %s", role.upper(), push.stderr.strip())


def read_work_plan(config: Config) -> list[dict]:
    """Read the CEO's work plan for this cycle.

    Returns a list of assignments: [{"role": "cto", "turns": 3}, ...]
    Falls back to all agents with 1 turn each if no plan exists.
    """
    plan_path = config.repo_dir / "work_plan.json"
    if not plan_path.exists():
        logger.warning("No work_plan.json found. Falling back to all agents x1 turn.")
        return [{"role": r, "turns": 1} for r in config.agent_roles if r != "ceo"]

    try:
        with open(plan_path) as f:
            plan = json.load(f)

        assignments = plan.get("assignments", [])
        reasoning = plan.get("cycle_reasoning", "")
        if reasoning:
            logger.info("[CEO PLAN] %s", reasoning[:200])

        valid = []
        for a in assignments:
            role = a.get("role", "")
            turns = a.get("turns", 0)
            if role in config.agent_roles and role != "ceo" and turns > 0:
                turns = min(turns, 5)
                valid.append({"role": role, "turns": turns})

        if not valid:
            logger.warning("Work plan has no valid assignments. Falling back to CTO x1.")
            return [{"role": "cto", "turns": 1}]

        return valid

    except (json.JSONDecodeError, KeyError) as e:
        logger.warning("Invalid work_plan.json: %s. Falling back.", e)
        return [{"role": r, "turns": 1} for r in config.agent_roles if r != "ceo"]


async def run_cycle(
    runners: dict[str, Runner],
    session_service: InMemorySessionService,
    config: Config,
    cycle_number: int,
) -> None:
    # --- Phase 1: CEO creates the work plan ---
    if _shutdown_requested:
        return

    ensure_master_branch(config)
    logger.info("--- Cycle %d | CEO (planning) ---", cycle_number)

    ceo_start = time.time()
    try:
        await asyncio.wait_for(
            run_agent_turn(runners["ceo"], session_service, "ceo", config, cycle_number),
            timeout=config.agent_timeout_seconds,
        )
    except asyncio.TimeoutError:
        logger.warning("[CEO] Timed out after %ds", config.agent_timeout_seconds)
    except (GeneratorExit, ValueError):
        pass
    except Exception:
        logger.exception("[CEO] Failed")

    flush_and_push(config, "ceo")
    logger.info("[CEO] Done in %.1fs", time.time() - ceo_start)

    # --- Phase 2: Read the work plan and execute assignments ---
    assignments = read_work_plan(config)

    total_agent_turns = sum(a["turns"] for a in assignments)
    agent_names = ", ".join(f"{a['role']}x{a['turns']}" for a in assignments)
    logger.info("Work plan: %s (%d total turns)", agent_names, total_agent_turns)

    for assignment in assignments:
        role = assignment["role"]
        turns = assignment["turns"]

        if _shutdown_requested:
            logger.info("Shutdown requested, stopping cycle.")
            return

        runner = runners.get(role)
        if not runner:
            logger.warning("No runner for role '%s', skipping.", role)
            continue

        for turn in range(1, turns + 1):
            if _shutdown_requested:
                break

            ensure_master_branch(config)
            logger.info("--- Cycle %d | %s (turn %d/%d) ---", cycle_number, role.upper(), turn, turns)

            start = time.time()
            last_error = ""
            for attempt in range(1, config.max_retries_per_agent + 1):
                try:
                    await asyncio.wait_for(
                        run_agent_turn(
                            runner, session_service, role, config, cycle_number,
                            turn_number=turn, total_turns=turns,
                            error_context=last_error,
                        ),
                        timeout=config.agent_timeout_seconds,
                    )
                    last_error = ""
                    break
                except asyncio.TimeoutError:
                    last_error = f"Timed out after {config.agent_timeout_seconds}s"
                    logger.warning("[%s] Attempt %d/%d timed out", role.upper(), attempt, config.max_retries_per_agent)
                except (GeneratorExit, ValueError):
                    break
                except Exception as e:
                    last_error = str(e)[:500]
                    logger.exception("[%s] Attempt %d/%d failed", role.upper(), attempt, config.max_retries_per_agent)

                if attempt < config.max_retries_per_agent and last_error:
                    logger.info("[%s] Retrying (attempt %d)...", role.upper(), attempt + 1)

            flush_and_push(config, role)

            if role == "cto":
                _verify_build(config)

            elapsed = time.time() - start
            logger.info("[%s] Turn %d/%d done in %.1fs", role.upper(), turn, turns, elapsed)


async def main() -> None:
    config = Config.from_env()

    logger.info("=" * 60)
    logger.info("  TINY COMPANY — Autonomous AI Startup")
    logger.info("  Model: %s", config.model_name)
    logger.info("  Repo: %s", config.repo)
    logger.info("  Cycle interval: %ds", config.cycle_interval_seconds)
    logger.info("  Agent timeout: %ds", config.agent_timeout_seconds)
    logger.info("  Scheduling: CEO-driven dynamic")
    logger.info("=" * 60)

    if not check_ollama(config):
        logger.error("Ollama is not running. Start it with: ollama serve")
        sys.exit(1)

    ensure_labels(config)
    bootstrap_repo(config)

    from app.agents import AGENTS

    session_service = InMemorySessionService()
    runners: dict[str, Runner] = {}

    for role, agent in AGENTS.items():
        runners[role] = Runner(
            agent=agent,
            app_name="tiny-company",
            session_service=session_service,
        )

    cycle_number = 1
    logger.info("Company is open for business. Press Ctrl+C to shut down.")

    while not _shutdown_requested:
        cycle_start = time.time()
        logger.info("===== CYCLE %d START =====", cycle_number)

        await run_cycle(runners, session_service, config, cycle_number)

        elapsed = time.time() - cycle_start
        logger.info("===== CYCLE %d END (%.1fs) =====", cycle_number, elapsed)

        remaining = max(0, config.cycle_interval_seconds - elapsed)
        if remaining > 0 and not _shutdown_requested:
            logger.info("Next cycle in %.0fs...", remaining)
        while remaining > 0 and not _shutdown_requested:
            await asyncio.sleep(min(5, remaining))
            remaining -= 5

        cycle_number += 1

    logger.info("Tiny Company shut down after %d cycles. Goodbye!", cycle_number - 1)


if __name__ == "__main__":
    asyncio.run(main())
