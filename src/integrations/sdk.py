import json
import datetime
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

    def _format_log(self, component: str, content: str, level: str = "INFO", metadata: Optional[Dict[str, Any]] = None) -> str:
        """
        Formats a log entry as a single line for the log file.
        Format: [TIMESTAMP] COMPONENT: MESSAGE | METADATA: {json}
        """
        timestamp = datetime.datetime.utcnow().isoformat()
        meta_str = f" | METADATA: {json.dumps(metadata)}" if metadata else ""
        return f"[{timestamp}] {component}: {content}{meta_str}\n"

    def log(self, component: str, content: str, level: str = "INFO", metadata: Optional[Dict[str, Any]] = None):
        """
        Writes a log entry to the local log file.
        """
        line = self._format_log(component, content, level, metadata)
        with open(self.log_file, "a", encoding="utf-8") as f:
            f.write(line)

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
