import json
import re
from pathlib import Path
from typing import List
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
                try:
                    data = json.loads(line)
                    entries.append(RawLogEntry(**data))
                except (json.JSONDecodeError, TypeError) as e:
                    # In a real implementation, we could log this to stderr
                    continue
        return entries

    def parse_text(self, text: str) -> List[RawLogEntry]:
        """
        A simple regex-based parser for plain text logs.
        """
        # Example format: 2026-05-20 12:00:00 [INFO] [Thought] The agent is thinking...
        pattern = r'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(\w+)\] \[(\w+)\] (.*)'
        matches = re.finditer(pattern, text)
        
        entries = []
        for match in matches:
            timestamp, level, component, content = match.groups()
            entries.append(RawLogEntry(
                timestamp=timestamp, 
                trace_id="unknown", 
                level=level, 
                component=component, 
                content=content,
                metadata={}
            ))
        return entries
