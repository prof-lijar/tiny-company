import re
from typing import List
from src.models import RawLogEntry, ProcessedTrace

class TraceFilter:
    def __init__(self, noise_patterns: List[str] = None):
        self.noise_patterns = noise_patterns or [
            r"heartbeat", 
            r"ping", 
            r"system prompt updated", 
            r"keep-alive"
        ]

    def filter(self, entries: List[RawLogEntry]) -> ProcessedTrace:
        """
        Filters noise and groups entries into a ProcessedTrace.
        """
        if not entries:
            return None
            
        # Filter out noise
        filtered_entries = [
            e for e in entries 
            if not any(re.search(pat, e.content, re.IGNORECASE) for pat in self.noise_patterns)
        ]
        
        # Sort by timestamp
        filtered_entries.sort(key=lambda x: x.timestamp)
        
        trace_id = filtered_entries[0].trace_id if filtered_entries else "unknown"
        
        return ProcessedTrace(
            trace_id=trace_id,
            entries=filtered_entries,
            start_time=filtered_entries[0].timestamp,
            end_time=filtered_entries[-1].timestamp
        )
