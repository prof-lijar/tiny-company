import pytest
from src.core.storage import TraceStorage
from src.v3.shadow_verification import ShadowVerificationEnvironment, ShadowRunner
from src.core.models import PromptFix
from unittest.mock import MagicMock

def test_shadow_verification_flow():
    # Setup
    storage = TraceStorage("test_shadow.db")
    # Initialize the table manually since it's called in init_db usually, 
    # but we added it as a separate method for now.
    storage._init_regression_tests_table()
    
    agent_id = "agent_123"
    baseline_prompt = "You are a helpful assistant."
    
    # Create mock regression tests
    tests = [
        {
            "id": "t1",
            "name": "Test 1: Should be fixed",
            "input_text": "What is 2+2?",
            "expected_output": "4",
            "golden_path_keywords": ["arithmetic", "sum"],
            "priority": "high"
        },
        {
            "id": "t2",
            "name": "Test 2: Should regress",
            "input_text": "What is 3+3?",
            "expected_output": "6",
            "golden_path_keywords": ["arithmetic", "sum"],
            "priority": "high"
        },
        {
            "id": "t3",
            "name": "Test 3: Should still fail",
            "input_text": "What is 4+4?",
            "expected_output": "8",
            "golden_path_keywords": ["arithmetic", "sum"],
            "priority": "medium"
        },
        {
            "id": "t4",
            "name": "Test 4: Should stay passed",
            "input_text": "What is 1+1?",
            "expected_output": "2",
            "golden_path_keywords": ["arithmetic", "sum"],
            "priority": "low"
        }
    ]
    
    for t in tests:
        storage.save_regression_test(t["id"], agent_id, t["name"], t["input_text"], t["expected_output"], t["golden_path_keywords"], t["priority"])
    
    # Mock the Runner to control outputs
    mock_runner = MagicMock(spec=ShadowRunner)
    
    def mock_run(prompt, user_input):
        if "FIX APPLIED" not in prompt: # Baseline
            if "2+2" in user_input: return "I don't know" # Fail
            if "3+3" in user_input: return "The answer is 6" # Pass
            if "4+4" in user_input: return "I am confused" # Fail
            if "1+1" in user_input: return "The answer is 2" # Pass
        else: # Healed
            if "2+2" in user_input: return "The answer is 4" # Fixed
            if "3+3" in user_input: return "I don't know" # Regressed
            if "4+4" in user_input: return "I am still confused" # Still Fail
            if "1+1" in user_input: return "The answer is 2" # Still Pass
            
    mock_runner.run.side_effect = mock_run
    
    env = ShadowVerificationEnvironment(storage=storage, runner=mock_runner)
    
    fix = PromptFix(
        analysis="Fixed arithmetic errors",
        suggested_modification="Always calculate sums carefully",
        rationale="Increased precision",
        confidence_score="High"
    )
    
    report = env.verify_fix(agent_id, baseline_prompt, fix)
    
    assert report.total_tests == 4
    assert report.fixed_count == 1
    assert report.regression_count == 1
    assert report.passed_baseline == 2
    assert report.passed_healed == 2
    
    # Check detailed results
    results_map = {r.test_id: r.status for r in report.detailed_results}
    assert results_map["t1"] == "FIXED"
    assert results_map["t2"] == "REGRESSION"
    assert results_map["t3"] == "STILL_FAILING"
    assert results_map["t4"] == "NO_CHANGE"

def test_no_tests_found():
    storage = TraceStorage("test_no_tests.db")
    storage._init_regression_tests_table()
    env = ShadowVerificationEnvironment(storage=storage)
    
    fix = PromptFix(analysis="...", suggested_modification="...", rationale="...")
    report = env.verify_fix("non_existent_agent", "prompt", fix)
    
    assert report.total_tests == 0
    assert report.stability_gain == 0.0
