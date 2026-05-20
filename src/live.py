import os
import time
import datetime
from typing import List, Dict, Any, Optional, Callable
from src.storage import TraceStorage
from src.engine import NarrativeEngine
from src.models import RawLogEntry, LogComponent, ProcessedTrace

class LogTailer:
    """
    Tails a log file and yields new lines as they are written.
    """
    def __init__(self, file_path: str, delay: float = 0.5):
        self.file_path = file_path
        self.delay = delay

    def tail(self):
        """
        Generator that yields new lines from the file.
        """
        if not os.path.exists(self.file_path):
            # Create the file if it doesn't exist to avoid errors
            with open(self.file_path, 'w') as f:
                f.write("")

        with open(self.file_path, 'r') as f:
            # Go to the end of the file
            f.seek(0, os.SEEK_END)
            
            while True:
                line = f.readline()
                if not line:
                    time.sleep(self.delay)
                    continue
                yield line

class LiveWhisper:
    """
    Core logic for Live Whisper: monitors logs, detects Key Decision Points (KDPs),
    and triggers narrative synthesis.
    """
    def __init__(self, trace_id: str, storage: TraceStorage, engine: NarrativeEngine):
        self.trace_id = trace_id
        self.storage = storage
        self.engine = engine
        self.buffer: List[RawLogEntry] = []
        self.last_update_time = time.time()
        self.update_interval = 5.0  # seconds

    def _detect_kdp(self, line: str) -> bool:
        """
        Detects if a log line represents a Key Decision Point.
        """
        kdp_keywords = ["tool_call", "final_answer", "decision", "error", "critical"]
        return any(keyword in line.lower() for keyword in kdp_keywords)

    def process_line(self, line: str) -> Optional[str]:
        """
        Processes a new log line, updates the buffer, and returns a new narrative if triggered.
        """
        # Basic parsing of the log line to RawLogEntry
        # Expected format: [TIMESTAMP] COMPONENT: MESSAGE
        try:
            parts = line.split(" ", 2)
            timestamp_str = parts[0].strip("[]")
            component_str = parts[1].strip(":")
            content = parts[2].strip()
            
            entry = RawLogEntry(
                timestamp=datetime.datetime.fromisoformat(timestamp_str),
                trace_id=self.trace_id,
                level="INFO",
                component=LogComponent(component_str) if component_str in [c.value for c in LogComponent] else LogComponent.SYSTEM,
                content=content
            )
        except Exception:
            # Fallback for malformed lines
            entry = RawLogEntry(
                timestamp=datetime.datetime.utcnow(),
                trace_id=self.trace_id,
                level="DEBUG",
                component=LogComponent.SYSTEM,
                content=line.strip()
            )

        # Persist to SQLite
        self.storage.append_log(
            trace_id=self.trace_id,
            message=entry.content,
            level=entry.level,
            step_index=len(self.buffer)
        )
        
        self.buffer.append(entry)
        
        # Trigger synthesis if KDP is detected or time interval passed
        if self._detect_kdp(line) or (time.time() - self.last_update_time > self.update_interval):
            self.last_update_time = time.time()
            return self.trigger_synthesis()
        
        return None

    def trigger_synthesis(self) -> str:
        """
        Triggers the NarrativeEngine to synthesize the current buffer.
        """
        # Create a ProcessedTrace from the buffer
        trace = ProcessedTrace(
            trace_id=self.trace_id,
            entries=self.buffer,
            start_time=self.buffer[0].timestamp if self.buffer else datetime.datetime.utcnow(),
            end_time=self.buffer[-1].timestamp if self.buffer else datetime.datetime.utcnow()
        )
        
        report = self.engine.synthesize(trace)
        narrative_text = report.summary + "\\n" + "\\n".join([s.text for s in report.narrative])
        
        # Save the narrative segment to storage
        self.storage.save_narrative(
            trace_id=self.trace_id,
            step_range=f"0-{len(self.buffer)-1}",
            content=narrative_text
        )
        
        return narrative_text

class LiveDashboard:
    """
    A simple CLI dashboard for Live Whisper.
    """
    def __init__(self, trace_id: str, log_file: str):
        self.trace_id = trace_id
        self.log_file = log_file
        self.storage = TraceStorage()
        self.engine = NarrativeEngine()
        self.whisper = LiveWhisper(trace_id, self.storage, self.engine)
        self.tailer = LogTailer(log_file)

    def run(self):
        print(f"--- Live Whisper Dashboard | Trace: {self.trace_id} ---")
        print(f"Tailing: {self.log_file}")
        print("-" * 60)
        
        try:
            for line in self.tailer.tail():
                # Print the raw log line
                print(f"[LOG] {line.strip()}")
                
                # Process and potentially print the narrative update
                narrative = self.whisper.process_line(line)
                if narrative:
                    print("\\n" + "="*60)
                    print("LIVE NARRATIVE UPDATE:")
                    print(narrative)
                    print("="*60 + "\\n")
        except KeyboardInterrupt:
            print("\\nStopping Live Whisper...")
