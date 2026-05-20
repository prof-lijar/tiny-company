import pytest
from datetime import datetime
from src.models import (
    RawLogEntry, ProcessedTrace, LogComponent, 
    PromptFix, GoldStandard, VerificationSet, 
    VerificationStatus, VerificationResult
)
from src.verification_loop import VerificationLoopManager

# Mock SDK for testing
class MockAgentSDK:
    def __init__(self):
        self.system_prompt = "You are a helpful assistant."

    def get_system_prompt(self):
        return self.system_prompt

    def update_system_prompt(self, new_prompt):
        self.system_prompt = new_prompt

    def run_agent(self, input_text):
        # Logic: If the prompt contains "FAIL_TRIGGER", the agent loops.
        # Otherwise, it succeeds for "trigger" inputs.
        if "trigger" in input_text:
            if "FAIL_TRIGGER" in self.system_prompt:
                return ProcessedTrace(
                    trace_id="test-trace",
                    entries=[
                        RawLogEntry(timestamp=datetime.utcnow(), trace_id="test-trace", 
                                    level="INFO", component=LogComponent.THOUGHT, content="I am looping..."),
                        RawLogEntry(timestamp=datetime.utcnow(), trace_id="test-trace", 
                                    level="INFO", component=LogComponent.THOUGHT, content="[Reasoning Loop] I am still looping..."),
                    ],
                    start_time=datetime.utcnow(),
                    end_time=datetime.utcnow()
                )
            else:
                return ProcessedTrace(
                    trace_id="test-trace",
                    entries=[
                        RawLogEntry(timestamp=datetime.utcnow(), trace_id="test-trace", 
                                    level="INFO", component=LogComponent.THOUGHT, content="I will solve this."),
                        RawLogEntry(timestamp=datetime.utcnow(), trace_id="test-trace", 
                                    level="INFO", component=LogComponent.OBSERVATION, content="The answer is 42.")
                    ],
                    start_time=datetime.utcnow(),
                    end_time=datetime.utcnow()
                )
        elif "benchmark" in input_text:
            if "REGRESS" in self.system_prompt:
                return ProcessedTrace(
                    trace_id="test-trace",
                    entries=[
                        RawLogEntry(timestamp=datetime.utcnow(), trace_id="test-trace", 
                                    level="INFO", component=LogComponent.THOUGHT, content="I have regressed!"),
                        RawLogEntry(timestamp=datetime.utcnow(), trace_id="test-trace", 
                                    level="INFO", component=LogComponent.OBSERVATION, content="Wrong answer."),
                    ],
                    start_time=datetime.utcnow(),
                    end_time=datetime.utcnow()
                )
            else:
                return ProcessedTrace(
                    trace_id="test-trace",
                    entries=[
                        RawLogEntry(timestamp=datetime.utcnow(), trace_id="test-trace", 
                                    level="INFO", component=LogComponent.THOUGHT, content="Everything is fine."),
                        RawLogEntry(timestamp=datetime.utcnow(), trace_id="test-trace", 
                                    level="INFO", component=LogComponent.OBSERVATION, content="Correct answer."),
                    ],
                    start_time=datetime.utcnow(),
                    end_time=datetime.utcnow()
                )
        else:
            return ProcessedTrace(
                trace_id="test-trace",
                entries=[RawLogEntry(timestamp=datetime.utcnow(), trace_id="test-trace", 
                                   level="INFO", component=LogComponent.THOUGHT, content="Unknown input")],
                start_time=datetime.utcnow(),
                end_time=datetime.utcnow()
            )

@pytest.fixture
def sdk():
    return MockAgentSDK()

@pytest.fixture
def loop_manager(sdk):
    return VerificationLoopManager(agent_sdk=sdk)

@pytest.fixture
def sample_fix():
    return PromptFix(
        analysis="Loop detected in step 3",
        suggested_modification="Avoid looping by verifying each step.",
        rationale="Prevents redundancy",
        confidence_score="High"
    )

@pytest.fixture
def trigger_gold():
    return GoldStandard(
        input_text="trigger input",
        expected_output="42",
        critical_constraints=[]
    )

@pytest.fixture
def benchmark_set():
    return VerificationSet(
        name="Regression Set",
        cases=[
            GoldStandard(input_text="benchmark 1", expected_output="Correct answer"),
            GoldStandard(input_text="benchmark 2", expected_output="Correct answer"),
        ]
    )

def test_verification_loop_success(sdk, loop_manager, sample_fix, trigger_gold, benchmark_set):
    # Setup: Prompt is clean, so it should pass
    sdk.update_system_prompt("You are a helpful assistant.")
    
    result = loop_manager.apply_and_verify(
        trigger_input="trigger input",
        gold_standard=trigger_gold,
        proposed_fix=sample_fix,
        verification_set=benchmark_set
    )
    
    assert result.status == VerificationStatus.SUCCESS
    assert result.trigger_resolved == True
    assert result.benchmark_passed == True

def test_verification_loop_failure(sdk, loop_manager, sample_fix, trigger_gold):
    # Setup: Prompt contains FAIL_TRIGGER, so it will loop
    sdk.update_system_prompt("You are a helpful assistant. FAIL_TRIGGER")
    
    # The manager will apply the fix, but the mock SDK's run_agent 
    # only checks for the presence of FAIL_TRIGGER in the system prompt.
    # Since _integrate_fix appends to the prompt, FAIL_TRIGGER will still be there.
    
    result = loop_manager.apply_and_verify(
        trigger_input="trigger input",
        gold_standard=trigger_gold,
        proposed_fix=sample_fix,
        verification_set=None
    )
    
    assert result.status == VerificationStatus.FAILURE
    assert result.trigger_resolved == False

def test_verification_loop_regression(sdk, loop_manager, sample_fix, trigger_gold, benchmark_set):
    # Setup: Prompt is clean for trigger, but contains REGRESS for benchmarks
    sdk.update_system_prompt("You are a helpful assistant. REGRESS")
    
    result = loop_manager.apply_and_verify(
        trigger_input="trigger input",
        gold_standard=trigger_gold,
        proposed_fix=sample_fix,
        verification_set=benchmark_set
    )
    
    assert result.status == VerificationStatus.REGRESSION
    assert result.trigger_resolved == True
    assert result.benchmark_passed == False

def test_rollback(sdk, loop_manager, sample_fix, trigger_gold):
    original_prompt = "You are a helpful assistant."
    sdk.update_system_prompt(original_prompt)
    
    loop_manager.apply_and_verify(
        trigger_input="trigger input",
        gold_standard=trigger_gold,
        proposed_fix=sample_fix,
        verification_set=None
    )
    
    assert sdk.get_system_prompt() != original_prompt
    
    loop_manager.rollback()
    
    assert sdk.get_system_prompt() == original_prompt
