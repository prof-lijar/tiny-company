import json
import re
from pathlib import Path
from typing import List
from datetime import datetime
from src.core.models import RawLogEntry, LogComponent
from src.core.telemetry import telemetry

class LogParser:
    def __init__(self, file_path: str):
        self.file_path = Path(file_path)

    def parse(self) -> List[RawLogEntry]:
        """
        Parses a log file. Supports JSON lines format.
        """
        start_time = telemetry.track_duration("log_parsing", 0) # This is wrong, track_duration takes start_time
        # Correct way:
        import time
        start_time = time.time()
        
        entries = []
        try:
            with open(self.file_path, 'r') as f:
                for line_num, line in enumerate(f, 1):
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        data = json.loads(line)
                        # Ensure timestamp is a datetime object
                        if isinstance(data.get('timestamp'), str):
                            data['timestamp'] = datetime.fromisoformat(data['timestamp'].replace('Z', '+00:00'))
                        entries.append(RawLogEntry(**data))
                    except (json.JSONDecodeError, TypeError, ValueError) as e:
                        telemetry.warn("parse_line_error", {"line": line_num, "error": str(e)})
                        continue
        except Exception as e:
            telemetry.error("parse_file_error", {"path": str(self.file_path), "error": str(e)})
            raise e

        telemetry.track_duration("log_parsing", start_time, {"entries_count": len(entries)})
        return entries

    def parse_text(self, text: str) -> List[RawLogEntry]:
        """
        A simple regex-based parser for plain text logs.
        Example format: 2026-05-20 12:00:00 [INFO] [Thought] The agent is thinking...
        """
        import time
        start_time = time.time()
        
        pattern = r'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(\w+)\] \[(\w+)\] (.*)'
        matches = re.finditer(pattern, text)
        
        entries = []
        for match in matches:
            timestamp_str, level, component_str, content = match.groups()
            try:
                timestamp = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S')
                # Map string component to LogComponent enum
                try:
                    component = LogComponent(component_str)
                except ValueError:
                    component = LogComponent.SYSTEM
                
                entries.append(RawLogEntry(
                    timestamp=timestamp, 
                    trace_id="unknown", 
                    level=level, 
                    component=component, 
                    content=content,
                    metadata={}
                ))
            except ValueError as e:
                telemetry.warn("parse_text_line_error", {"error": str(e)})
                continue
        
        telemetry.track_duration("parse_text", start_time, {"entries_count": len(entries)})
        return entries
