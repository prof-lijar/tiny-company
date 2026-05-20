import json
import re
from pathlib import Path
from typing import List
from datetime import datetime
from src.models import RawLogEntry, LogComponent

class LogParser:
    def __init__(self, file_path: str):
        self.file_path = Path(file_path)

    def parse(self) -> List[RawLogEntry]:
        """
        Parses a log file. Supports JSON lines format.
        """
        entries = []
        with open(self.file_path, 'r') as f:
            for line in f:
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
                    # In a real implementation, we could log this to stderr
                    continue
        return entries

    def parse_text(self, text: str) -> List[RawLogEntry]:
        """
        A simple regex-based parser for plain text logs.
        Example format: 2026-05-20 12:00:00 [INFO] [Thought] The agent is thinking...
        """
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
                    # Fallback or handle unknown components
                    # For now, we'll just use a default or let it fail if strict
                    component = LogComponent.SYSTEM
                
                entries.append(RawLogEntry(
                    timestamp=timestamp, 
                    trace_id="unknown", 
                    level=level, 
                    component=component, 
                    content=content,
                    metadata={}
                ))
            except ValueError:
                continue
        return entries
