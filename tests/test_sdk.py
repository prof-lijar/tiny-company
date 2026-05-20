import os
import pytest
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

def test_sdk_init_health_check(tmp_path):
    # Test successful initialization
    log_file = tmp_path / "test_init.log"
    sdk = TraceWhisperSDK("test-agent", "session-1", str(log_file))
    sdk.init()
    assert sdk._initialized is True

def test_sdk_init_failure(tmp_path, monkeypatch):
    # Test failure when log file is not writable
    # We simulate this by creating a directory where the file should be, 
    # which prevents file creation.
    log_dir = tmp_path / "readonly_dir"
    log_dir.mkdir()
    # Try to create a file with the same name as the directory
    log_file = log_dir / "test_fail.log"
    
    # Mocking open to raise IOError
    def mock_open(*args, **kwargs):
        raise IOError("Permission denied")
    
    monkeypatch.setattr("builtins.open", mock_open)
    
    sdk = TraceWhisperSDK("test-agent", "session-1", str(log_file))
    with pytest.raises(RuntimeError) as excinfo:
        sdk.init()
    assert "SDK Health Check Failed" in str(excinfo.value)

def test_sdk_auto_init(tmp_path):
    log_file = tmp_path / "test_auto.log"
    sdk = TraceWhisperSDK("test-agent", "session-1", str(log_file))
    # Call log directly without calling init()
    sdk.thought("Testing auto-init")
    assert sdk._initialized is True
    assert "Thought: Testing auto-init" in log_file.read_text()

def test_sdk_consent_flow(tmp_path, monkeypatch):
    # Test consent missing
    monkeypatch.setenv("TRACEWHISPER_CONSENT", "false")
    log_file = tmp_path / "test_consent.log"
    sdk = TraceWhisperSDK("test-agent", "session-1", str(log_file))
    sdk.init()
    # In our implementation, it only warns, so it should still be initialized
    assert sdk._initialized is True

    # Test consent present
    monkeypatch.setenv("TRACEWHISPER_CONSENT", "true")
    sdk.init()
    assert sdk._initialized is True
