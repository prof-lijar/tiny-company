"""Tiny Company configuration. All tunables in one place."""
from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path


@dataclass(frozen=True)
class Config:
    model_name: str = "gemma4:31b"
    ollama_base_url: str = "http://localhost:11434/v1"
    ollama_api_key: str = "ollama"
    num_ctx: int = 32768
    temperature: float = 0.7

    repo: str = "prof-lijar/tiny-company"
    repo_ssh: str = "git@github.com:prof-lijar/tiny-company.git"
    default_branch: str = "master"
    repo_dir: Path = field(default_factory=lambda: Path(__file__).parent.resolve())

    cycle_interval_seconds: int = 0
    agent_timeout_seconds: int = 1800
    max_retries_per_agent: int = 2

    agent_roles: tuple[str, ...] = (
        "ceo", "product", "cto", "designer", "marketing", "legal", "finance", "qa",
    )

    role_labels: dict[str, str] = field(default_factory=lambda: {
        "ceo": "role:ceo",
        "cto": "role:cto",
        "product": "role:product",
        "designer": "role:designer",
        "marketing": "role:marketing",
        "legal": "role:legal",
        "finance": "role:finance",
        "qa": "role:qa",
    })
    priority_labels: tuple[str, ...] = ("P0-critical", "P1-high", "P2-medium", "P3-low")
    status_labels: tuple[str, ...] = ("status:todo", "status:in-progress", "status:done", "status:blocked")

    @classmethod
    def from_env(cls) -> Config:
        return cls(
            model_name=os.environ.get("AGENT_MODEL", cls.model_name),
            cycle_interval_seconds=int(os.environ.get("CYCLE_INTERVAL", str(cls.cycle_interval_seconds))),
            agent_timeout_seconds=int(os.environ.get("AGENT_TIMEOUT", str(cls.agent_timeout_seconds))),
            num_ctx=int(os.environ.get("NUM_CTX", str(cls.num_ctx))),
        )
