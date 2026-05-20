import pytest
from src.correction_engine import CorrectionEngine
from src.models import PromptFix

def test_correction_engine_loop():
    engine = CorrectionEngine()
    system_prompt = "You are a helpful assistant."
    trace = "Step 1: Request data -> API_TIMEOUT. Step 2: Retry -> API_TIMEOUT. [Reasoning Loop]"
    failure_type = "[Reasoning Loop]"
    
    fix = engine.suggest_fix(system_prompt, trace, failure_type)
    
    assert isinstance(fix, PromptFix)
    assert "API retries" in fix.suggested_modification
    assert "High" == fix.confidence_score

def test_correction_engine_contradiction():
    engine = CorrectionEngine()
    system_prompt = "You are a compliance officer."
    trace = "Step 1: User Age is 15. Step 2: User is Adult. [Contradiction]"
    failure_type = "[Contradiction]"
    
    fix = engine.suggest_fix(system_prompt, trace, failure_type)
    
    assert isinstance(fix, PromptFix)
    assert "global constant" in fix.suggested_modification
    assert "High" == fix.confidence_score

def test_correction_engine_general():
    engine = CorrectionEngine()
    fix = engine.suggest_fix("Prompt", "Some trace", "Unknown Failure")
    assert "General reasoning failure" in fix.analysis
