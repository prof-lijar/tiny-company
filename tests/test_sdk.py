import os
from src.integrations.sdk import TraceWhisperSDK
from pathlib import Path

def test_sdk_logging(tmp_path):
    log_file = tmp_path / "test_agent.log"
    sdk = TraceWhisperSDK(
        agent_id="test-agent", 
        session_id="session-1", 
        log_file=str(log_file)
    )
    
    # Test thought logging
    sdk.thought("I am thinking about AI")
    # Test action logging
    sdk.action("search", "observability")
    # Test observation logging
    sdk.observation("Found 3 results")
    # Test finalize logging
    sdk.finalize("AI observability is key")
    
    content = log_file.read_text()
    
    assert "Thought: I am thinking about AI" in content
    assert "Action: tool_call search(observability)" in content
    assert "Observation: Found 3 results" in content
    assert "Action: final_answer: AI observability is key" in content
    
    # Test metadata
    sdk.thought("Metadata test", metadata={"depth": 1})
    content_with_meta = log_file.read_text()
    assert 'METADATA: {"depth": 1}' in content_with_meta
