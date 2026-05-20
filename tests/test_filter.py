import pytest
from src.filter import TraceFilter
from src.models import RawLogEntry, LogComponent
from datetime import datetime

def test_trace_filtering():
    entries = [
        RawLogEntry(
            timestamp=datetime(2026, 5, 20, 12, 0, 0),
            trace_id="trace-1",
            level="INFO",
            component=LogComponent.THOUGHT,
            content="Actual thought",
            metadata={}
        ),
        RawLogEntry(
            timestamp=datetime(2026, 5, 20, 12, 0, 1),
            trace_id="trace-1",
            level="INFO",
            component=LogComponent.SYSTEM,
            content="heartbeat signal",
            metadata={}
        ),
        RawLogEntry(
            timestamp=datetime(2026, 5, 20, 12, 0, 2),
            trace_id="trace-1",
            level="INFO",
            component=LogComponent.THOUGHT,
            content="Another thought",
            metadata={}
        )
    ]
    
    filter_obj = TraceFilter()
    trace = filter_obj.filter(entries)
    
    assert len(trace.entries) == 2
    assert "heartbeat" not in [e.content for e in trace.entries]
    assert trace.trace_id == "trace-1"
