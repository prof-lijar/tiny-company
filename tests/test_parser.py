import pytest
from src.parser import LogParser
from src.core.models import RawLogEntry
from pathlib import Path
import json
from datetime import datetime

def test_json_parsing_valid(tmp_path):
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
    assert isinstance(entries[0].timestamp, datetime)

def test_json_parsing_invalid_lines(tmp_path):
    # Test that invalid JSON lines are skipped
    log_file = tmp_path / "test_logs_invalid.json"
    log_data = [
        '{"timestamp": "2026-05-20T12:00:00Z", "trace_id": "trace-1", "level": "INFO", "component": "Thought", "content": "Valid", "metadata": {}}',
        'INVALID JSON LINE',
        '{"timestamp": "2026-05-20T12:00:01Z", "trace_id": "trace-1", "level": "INFO", "component": "Action", "content": "Invalid but valid JSON", "metadata": {}}'
    ]
    with open(log_file, 'w') as f:
        for line in log_data:
            f.write(line + "\n")

    parser = LogParser(str(log_file))
    entries = parser.parse()
    
    assert len(entries) == 2

def test_text_parsing_valid():
    text = "2026-05-20 12:00:00 [INFO] [Thought] The agent is thinking...\n" \
           "2026-05-20 12:00:01 [INFO] [Action] The agent is acting..."
    
    parser = LogParser("dummy_path")
    entries = parser.parse_text(text)
    
    assert len(entries) == 2
    assert entries[0].component == "Thought"
    assert entries[1].component == "Action"
    assert entries[0].timestamp == datetime(2026, 5, 20, 12, 0, 0)

def test_text_parsing_invalid():
    text = "This is just some random text that doesn't match the pattern."
    parser = LogParser("dummy_path")
    entries = parser.parse_text(text)
    assert len(entries) == 0
