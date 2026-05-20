import pytest
from datetime import datetime
from src.models import ProcessedTrace, RawLogEntry, LogComponent
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

def test_p0_infinite_loop():
    lib = TemplateLibrary()
    engine = CorrectionEngine(template_library=lib)
    trace = create_mock_trace(
        contents=["Search for X", "Still searching..."],
        tool_calls=[
            {"name": "search", "args": "X"},
            {"name": "search", "args": "X"},
            {"name": "search", "args": "X"},
        ]
    )
    fix = engine.suggest_fix("System Prompt", trace, "Loop")
    assert "The Infinite Loop" in fix.analysis
    assert "pivot your strategy or report the limitation" in fix.suggested_modification

def test_p0_direct_contradiction():
    lib = TemplateLibrary()
    engine = CorrectionEngine(template_library=lib)
    trace = create_mock_trace(
        contents=[
            "I previously stated that the server is UP",
            "however, now I see that the server is DOWN"
        ]
    )
    fix = engine.suggest_fix("System Prompt", trace, "Contradiction")
    assert "The Direct Contradiction" in fix.analysis
    assert "explicitly cross-reference it with your previous thoughts" in fix.suggested_modification

def test_p0_tool_blindness():
    lib = TemplateLibrary()
    engine = CorrectionEngine(template_library=lib)
    # This matches the regex: Tool returns .*?Agent Thought: (?:the tool successfully retrieved|it seems the tool worked)
    trace = create_mock_trace(
        contents=[
            "Tool returns {'status': 404, 'error': 'Not Found'}",
            "Agent Thought: the tool successfully retrieved the data"
        ]
    )
    fix = engine.suggest_fix("System Prompt", trace, "Blindness")
    assert "The Tool-Output Blindness" in fix.analysis
    assert "explicitly summarize the key finding from that output" in fix.suggested_modification

def test_p0_goal_drift():
    lib = TemplateLibrary()
    engine = CorrectionEngine(template_library=lib)
    trace = create_mock_trace(
        contents=[
            "Thought 1: I will find the email",
            "Thought 2: I will look at the logo",
            "Thought 3: I am researching the logo history extensively",
            "Thought 4: The logo was designed in 1990",
        ]
    )
    fix = engine.suggest_fix("System Prompt", trace, "Drift")
    assert "The Goal Drift" in fix.analysis
    assert "explicitly state your current progress relative to the primary goal" in fix.suggested_modification

def test_p0_hallucination_spiral():
    lib = TemplateLibrary()
    engine = CorrectionEngine(template_library=lib)
    trace = create_mock_trace(
        contents=["I will call the secret_admin_tool()", "Unknown tool secret_admin_tool called"]
    )
    fix = engine.suggest_fix("System Prompt", trace, "Hallucination")
    assert "The Hallucination Spiral" in fix.analysis
    assert "strictly limited to the tools provided in the current session" in fix.suggested_modification
