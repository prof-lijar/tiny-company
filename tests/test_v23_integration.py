import pytest
from datetime import datetime
from src.models import (
    ProcessedTrace, RawLogEntry, LogComponent, 
    ReasoningPattern, PruningReport, FragilityReport,
    PromptFix
)
from src.storage import TraceStorage
from src.pattern_vault import PatternVault
from src.pruning_engine import PruningEngine
from src.adversarial_synthesis import AdversarialSynthesis

@pytest.fixture
def mock_storage():
    return TraceStorage()

@pytest.fixture
def pattern_vault(mock_storage):
    return PatternVault(mock_storage)

@pytest.fixture
def pruning_engine():
    return PruningEngine()

@pytest.fixture
def adversarial_synthesis():
    return AdversarialSynthesis()

@pytest.fixture
def sample_trace():
    return ProcessedTrace(
        trace_id="trace_123",
        entries=[
            RawLogEntry(timestamp=datetime.utcnow(), trace_id="trace_123", level="INFO", component=LogComponent.THOUGHT, content="I should search for X"),
            RawLogEntry(timestamp=datetime.utcnow(), trace_id="trace_123", level="INFO", component=LogComponent.ACTION, content="search(X)"),
            RawLogEntry(timestamp=datetime.utcnow(), trace_id="trace_123", level="INFO", component=LogComponent.OBSERVATION, content="X is Y"),
        ],
        start_time=datetime.utcnow(),
        end_time=datetime.utcnow(),
        system_prompt="You are a helpful assistant."
    )

def test_pattern_vault_lifecycle(pattern_vault, sample_trace):
    # 1. Mock a fix
    fix = PromptFix(
        analysis="Found a loop in reasoning",
        suggested_modification="Avoid repeating search queries.",
        rationale="The agent spent 3 turns on the same query."
    )
    
    # 2. Extract and save pattern
    pattern = pattern_vault.extract_pattern(sample_trace, fix)
    assert isinstance(pattern, ReasoningPattern)
    assert "Avoid repeating search queries." in pattern.correction_prompt
    
    pattern_vault.save_pattern(pattern)
    
    # 3. Recommend fix
    recommendations = pattern_vault.recommend_fix(sample_trace)
    assert len(recommendations) > 0
    assert recommendations[0].correction_prompt == pattern.correction_prompt

def test_pruning_engine_analysis(pruning_engine, sample_trace):
    report = pruning_engine.analyze_efficiency(sample_trace)
    assert isinstance(report, PruningReport)
    assert report.trace_id == "trace_123"
    assert report.efficiency_score < 1.0
    assert len(report.bloat_segments) > 0
    assert len(report.suggested_prompt_modifications) > 0

def test_adversarial_synthesis_workflow(adversarial_synthesis):
    prompt = "You are a specialized coding assistant."
    
    # 1. Generate stress tests
    tests = adversarial_synthesis.generate_stress_tests(prompt)
    assert len(tests) > 0
    assert "input" in tests[0]
    
    # 2. Analyze fragility
    report = adversarial_synthesis.analyze_fragility(prompt)
    assert isinstance(report, FragilityReport)
    assert report.total_tests_run == len(tests)
    assert len(report.critical_weak_points) > 0

def test_v23_full_integration_pipeline(pattern_vault, pruning_engine, adversarial_synthesis, sample_trace):
    # This simulates a real v2.3 workflow
    
    # Step 1: Analyze efficiency of the current trace
    pruning_report = pruning_engine.analyze_efficiency(sample_trace)
    
    # Step 2: Check if there are proven fixes in the vault for this trace
    recommendations = pattern_vault.recommend_fix(sample_trace)
    
    # Step 3: Simulate applying a fix and verifying it
    # In a real system, the user would accept the fix.
    fix_to_apply = recommendations[0] if recommendations else ReasoningPattern(
        failure_description="Generic failure",
        correction_prompt="Be more concise.",
        project_id="default",
        success_rate=1.0
    )
    
    # Step 4: Extract and save the new proven pattern
    mock_fix = PromptFix(
        analysis="Applied recommended fix",
        suggested_modification=fix_to_apply.correction_prompt,
        rationale="Recommended by Vault"
    )
    new_pattern = pattern_vault.extract_pattern(sample_trace, mock_fix)
    pattern_vault.save_pattern(new_pattern)
    
    # Step 5: Proactively test the new prompt for fragility
    updated_prompt = f"{sample_trace.system_prompt} {fix_to_apply.correction_prompt}"
    fragility_report = adversarial_synthesis.analyze_fragility(updated_prompt)
    
    assert fragility_report.total_tests_run > 0
    assert new_pattern.correction_prompt == fix_to_apply.correction_prompt
