import pytest
from src.parser import LogParser
from src.models import RawLogEntry
from pathlib import Path
import json

def test_json_parsing(tmp_path):
    # Create a dummy log file
    log_file = tmp_path / "test_logs.json"
    log_data = [
        {
            "timestamp": "2026-05-20T12:00:00Z",
            "trace_id": "trace-1",
            "level": "INFO",
            "component": "Thought",
            "content": "I will start by searching",
            "metadata": {}
        },
        {
            "timestamp": "2026-05-20T12:00:01Z",
            "trace_id": "trace-1",
            "level": "INFO",
            "component": "Action",
            "content": "search_tool(query='AI')",
            "metadata": {}
        }
    ]
    with open(log_file, 'w') as f:
        for entry in log_data:
            f.write(json.dumps(entry) + "\n")

    parser = LogParser(str(log_file))
    entries = parser.parse()
    
    assert len(entries) == 2
    assert entries[0].component == "Thought"
    assert entries[1].component == "Action"
    assert entries[0].trace_id == "trace-1"
