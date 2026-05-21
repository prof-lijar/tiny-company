import pytest
from datetime import datetime, timedelta
from unittest.mock import patch, MagicMock
from src.engine import NarrativeEngine
from src.core.models import ProcessedTrace, RawLogEntry, LogComponent, ReasoningEvent

def test_debug_first_narrative_logic():
    # Setup a mock trace
    start_time = datetime.now()
    entries = [
        RawLogEntry(timestamp=start_time, trace_id="test-123", level="INFO", component=LogComponent.THOUGHT, content="I need to find X"),
        RawLogEntry(timestamp=start_time + timedelta(seconds=1), trace_id="test-123", level="INFO", component=LogComponent.ACTION, content="search(X)"),
        RawLogEntry(timestamp=start_time + timedelta(seconds=2), trace_id="test-123", level="INFO", component=LogComponent.OBSERVATION, content="Found Y"),
        RawLogEntry(timestamp=start_time + timedelta(seconds=3), trace_id="test-123", level="INFO", component=LogComponent.THOUGHT, content="I will search for X again"),
        RawLogEntry(timestamp=start_time + timedelta(seconds=4), trace_id="test-123", level="INFO", component=LogComponent.ACTION, content="search(X)"),
    ]
    trace = ProcessedTrace(
        trace_id="test-123",
        entries=entries,
        start_time=start_time,
        end_time=start_time + timedelta(seconds=5)
    )

    # Mock the litellm completion call to avoid network errors and API costs
    with patch('src.engine.completion') as mock_completion:
        mock_response = MagicMock()
        mock_response.choices = [MagicMock()]
        mock_response.choices[0].message.content = "Mocked Forensic Analysis: [Reasoning Loop] detected."
        mock_completion.return_value = mock_response

        engine = NarrativeEngine()
        report = engine.synthesize(trace)

        # Verify v2.1 "Debug-First" fields
        assert report.logic_audit is not None
        assert report.logic_audit.efficiency_score <= 1.0
        assert len(report.logic_audit.critical_failures) > 0
        
        # Verify narrative contains ReasoningEvents
        has_event = any(seg.event_type is not None for seg in report.narrative)
        assert has_event, "Narrative should contain at least one ReasoningEvent marker"
        
        # Specifically check for the simulated loop
        has_loop = any(seg.event_type == ReasoningEvent.REASONING_LOOP for seg in report.narrative)
        assert has_loop, "Narrative should contain a [Reasoning Loop] marker"
