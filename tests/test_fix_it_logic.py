import pytest
from unittest.mock import patch, MagicMock
from src.correction_engine import CorrectionEngine
from src.core.models import PromptFix

def mock_completion_response(content):
    mock_res = MagicMock()
    mock_res.choices = [MagicMock()]
    mock_res.choices[0].message.content = content
    return mock_res

def test_correction_engine_loop():
    engine = CorrectionEngine()
    system_prompt = "You are a helpful assistant."
    trace = "Step 1: Request data -> API_TIMEOUT. Step 2: Retry -> API_TIMEOUT. [Reasoning Loop]"
    failure_type = "[Reasoning Loop]"
    
    mock_json = '{"analysis": "Loop detected", "suggested_modification": "Limit API retries to 3", "rationale": "Prevents infinite loops", "confidence_score": "High"}'
    
    with patch('src.correction_engine.completion', return_value=mock_completion_response(mock_json)):
        fix = engine.suggest_fix(system_prompt, trace, failure_type)
    
    assert isinstance(fix, PromptFix)
    assert "API retries" in fix.suggested_modification
    assert "High" == fix.confidence_score

def test_correction_engine_contradiction():
    engine = CorrectionEngine()
    system_prompt = "You are a compliance officer."
    trace = "Step 1: User Age is 15. Step 2: User is Adult. [Contradiction]"
    failure_type = "[Contradiction]"
    
    mock_json = '{"analysis": "Contradiction detected", "suggested_modification": "Treat age as global constant", "rationale": "Prevents state drift", "confidence_score": "High"}'
    
    with patch('src.correction_engine.completion', return_value=mock_completion_response(mock_json)):
        fix = engine.suggest_fix(system_prompt, trace, failure_type)
    
    assert isinstance(fix, PromptFix)
    assert "global constant" in fix.suggested_modification
    assert "High" == fix.confidence_score

def test_correction_engine_fallback():
    engine = CorrectionEngine()
    
    with patch('src.correction_engine.completion', side_effect=Exception("API Error")):
        fix = engine.suggest_fix("Prompt", "Some trace", "Unknown Failure")
    
    assert "Error generating fix" in fix.analysis
    assert "Fallback generic fix" in fix.rationale
