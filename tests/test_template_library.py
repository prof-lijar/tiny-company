import pytest
from datetime import datetime
from src.core.models import ProcessedTrace, RawLogEntry, LogComponent, TemplateCategory, ReasoningTemplate
from src.template_library import TemplateLibrary
from src.correction_engine import CorrectionEngine

def create_mock_trace(contents: list, tool_calls: list = None):
    entries = []
    for c in contents:
        entries.append(RawLogEntry(
            timestamp=datetime.now(),
            trace_id="test_trace",
            level="INFO",
            component=LogComponent.THOUGHT,
            content=c
        ))
    
    if tool_calls:
        for tool in tool_calls:
            entries.append(RawLogEntry(
                timestamp=datetime.now(),
                trace_id="test_trace",
                level="INFO",
                component=LogComponent.ACTION,
                content=f"Calling {tool['name']}",
                metadata={"tool_name": tool['name'], "args": tool['args']}
            ))
            
    return ProcessedTrace(
        trace_id="test_trace",
        entries=entries,
        start_time=datetime.now(),
        end_time=datetime.now()
    )

def test_infinite_loop_detection():
    lib = TemplateLibrary()
    # Simulate 3 identical tool calls
    trace = create_mock_trace(
        contents=["I will search for the weather", "Searching...", "Still searching..."],
        tool_calls=[
            {"name": "get_weather", "args": "New York"},
            {"name": "get_weather", "args": "New York"},
            {"name": "get_weather", "args": "New York"},
        ]
    )
    
    fixes = lib.match_trace(trace)
    assert len(fixes) > 0
    assert any("Infinite Loop" in fix.analysis for fix in fixes)
    assert any("stop and re-evaluate your strategy" in fix.suggested_modification for fix in fixes)

def test_contradiction_detection():
    lib = TemplateLibrary()
    trace = create_mock_trace(
        contents=[
            "I previously stated that the capital is Paris",
            "But now I see that the capital is London"
        ]
    )
    
    fixes = lib.match_trace(trace)
    assert len(fixes) > 0
    assert any("Contradiction Gap" in fix.analysis for fix in fixes)

def test_tool_blindness_detection():
    lib = TemplateLibrary()
    trace = create_mock_trace(
        contents=["I don't have a tool to calculate the square root of 144"]
    )
    
    fixes = lib.match_trace(trace)
    assert len(fixes) > 0
    assert any("Tool-Blindness" in fix.analysis for fix in fixes)

def test_correction_engine_prioritization():
    lib = TemplateLibrary()
    engine = CorrectionEngine(template_library=lib)
    
    # Trace that matches a template
    trace = create_mock_trace(
        contents=["I don't have a tool to calculate the square root of 144"]
    )
    
    # We don't actually want to call the LLM here, so we can mock it or 
    # just check if the returned fix has a template_id
    fix = engine.suggest_fix("System Prompt", trace, "Information Gap")
    
    assert fix.template_id is not None
    assert "Tool-Blindness" in fix.analysis
