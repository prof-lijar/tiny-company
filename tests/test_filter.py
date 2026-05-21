import pytest
from src.filter import TraceFilter
from src.core.models import RawLogEntry, LogComponent
from datetime import datetime

def test_trace_filtering_basic():
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

def test_trace_filtering_empty():
    filter_obj = TraceFilter()
    assert filter_obj.filter([]) is None

def test_trace_filtering_all_noise():
    entries = [
        RawLogEntry(
            timestamp=datetime(2026, 5, 20, 12, 0, 0),
            trace_id="trace-1",
            level="INFO",
            component=LogComponent.SYSTEM,
            content="heartbeat",
            metadata={}
        ),
        RawLogEntry(
            timestamp=datetime(2026, 5, 20, 12, 0, 1),
            trace_id="trace-1",
            level="INFO",
            component=LogComponent.SYSTEM,
            content="ping",
            metadata={}
        )
    ]
    filter_obj = TraceFilter()
    trace = filter_obj.filter(entries)
    assert len(trace.entries) == 0

def test_trace_filtering_custom_patterns():
    entries = [
        RawLogEntry(
            timestamp=datetime(2026, 5, 20, 12, 0, 0),
            trace_id="trace-1",
            level="INFO",
            component=LogComponent.THOUGHT,
            content="Secret info",
            metadata={}
        ),
        RawLogEntry(
            timestamp=datetime(2026, 5, 20, 12, 0, 1),
            trace_id="trace-1",
            level="INFO",
            component=LogComponent.THOUGHT,
            content="Ignore this",
            metadata={}
        )
    ]
    filter_obj = TraceFilter(noise_patterns=[r"Ignore this"])
    trace = filter_obj.filter(entries)
    assert len(trace.entries) == 1
    assert trace.entries[0].content == "Secret info"
