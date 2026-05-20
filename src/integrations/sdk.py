import json
import datetime
import os
from typing import Any, Dict, Optional
from pathlib import Path

class TraceWhisperSDK:
    """
    Lightweight SDK for agents to stream logs to TraceWhisper.
    Supports local file streaming (which Live Whisper tails).
    """
    def __init__(self, agent_id: str, session_id: str, log_file: str = "agent.log"):
        self.agent_id = agent_id
        self.session_id = session_id
        self.log_file = Path(log_file)
        self.trace_id = f"{agent_id}_{session_id}_{int(datetime.datetime.utcnow().timestamp())}"
        self._initialized = False

    def init(self):
        """
        Initialize the SDK, perform health checks, and verify Beta Agreement consent.
        This is the 'Frictionless Entry' entry point.
        """
        print("Initializing TraceWhisper SDK...")
        
        # 1. Health Check: Write Permissions
        try:
            if not self.log_file.parent.exists():
                self.log_file.parent.mkdir(parents=True, exist_ok=True)
            
            with open(self.log_file, "a") as f:
                pass
        except Exception as e:
            raise RuntimeError(f"SDK Health Check Failed: Cannot write to log file {self.log_file}. Error: {e}")

        # 2. Consent Check (Click-Wrap)
        if os.getenv("TRACEWHISPER_CONSENT") != "true":
            print("\n[!] Beta Agreement Required")
            print("To use TraceWhisper v2 Beta, please accept the terms of service.")
            print("Run: export TRACEWHISPER_CONSENT=true (or set it in your environment)")
            print("Continuing in 'Unverified' mode... (Full features may be restricted)\n")

        self._initialized = True
        print(f"TraceWhisper SDK Ready. Trace ID: {self.trace_id}")
        print("Tip: Run 'tw live' in your terminal to see your reasoning in real-time!")

    def _format_log(self, component: str, content: str, level: str = "INFO", metadata: Optional[Dict[str, Any]] = None) -> str:
        """
        Formats a log entry as a single line for the log file.
        Format: [TIMESTAMP] COMPONENT: MESSAGE | METADATA: {json}
        """
        timestamp = datetime.datetime.utcnow().isoformat()
        meta_str = f" | METADATA: {json.dumps(metadata)}" if metadata else ""
        return f"[{timestamp}] {component}: {content}{meta_str}"

    def log(self, component: str, content: str, level: str = "INFO", metadata: Optional[Dict[str, Any]] = None):
        """
        Writes a log entry to the local log file.
        """
        if not self._initialized:
            self.init()
            
        line = self._format_log(component, content, level, metadata)
        with open(self.log_file, "a", encoding="utf-8") as f:
            f.write(line + "\n")

    def thought(self, content: str, metadata: Optional[Dict[str, Any]] = None):
        """Helper for agent internal reasoning."""
        self.log("Thought", content, metadata=metadata)

    def action(self, tool_name: str, tool_input: Any, metadata: Optional[Dict[str, Any]] = None):
        """Helper for agent tool calls."""
        content = f"tool_call {tool_name}({tool_input})"
        self.log("Action", content, metadata=metadata)

    def observation(self, content: str, metadata: Optional[Dict[str, Any]] = None):
        """Helper for tool outputs/observations."""
        self.log("Observation", content, metadata=metadata)

    def system(self, content: str, level: str = "INFO", metadata: Optional[Dict[str, Any]] = None):
        """Helper for system-level events."""
        self.log("System", content, level=level, metadata=metadata)

    def finalize(self, content: str):
        """Helper for the final agent answer."""
        self.log("Action", f"final_answer: {content}")
