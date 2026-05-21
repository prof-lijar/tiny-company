import pytest
import uuid
from unittest.mock import patch, MagicMock
from src.core.storage import TraceStorage
from src.reasoning_block_registry import ReasoningBlockRegistry
from src.v3.orchestrator import Orchestrator

@pytest.fixture
def setup_v3_system():
    # Use a separate test database
    storage = TraceStorage(db_path='test_orchestrator.db')
    registry = ReasoningBlockRegistry(storage=storage)
    orchestrator = Orchestrator(registry=registry, storage=storage)
    return orchestrator, registry, storage

def test_orchestrator_chain_execution(setup_v3_system):
    orchestrator, registry, storage = setup_v3_system
    org_id = "test-org"

    # 1. Setup 3 blocks
    # Block 1: Analysis
    b1 = registry.create_block("analysis", "Analyze input", "First step")
    registry.add_version(b1.block_id, "Analyze this: {context}. Summary: [ANALYSIS DONE]", "gpt-4", is_stable=True)
    
    # Block 2: Synthesis
    b2 = registry.create_block("synthesis", "Synthesize analysis", "Second step")
    registry.add_version(b2.block_id, "Synthesize this: {context}. Result: [SYNTHESIS DONE]", "gpt-4", is_stable=True)
    
    # Block 3: Verification
    b3 = registry.create_block("verification", "Verify result", "Third step")
    registry.add_version(b3.block_id, "Verify this: {context}. Final: [VERIFIED]", "gpt-4", is_stable=True)

    architecture = [b1.block_id, b2.block_id, b3.block_id]
    initial_input = "Hello World"

    # Mock the LLM response
    with patch('src.v3.orchestrator.completion') as mocked_completion:
        # Define a side effect to simulate the chain
        def side_effect(model, messages):
            prompt = messages[0]['content']
            mock_resp = MagicMock()
            # Check for the unique block identifier in the prompt to avoid context collision
            if "Analyze this" in prompt:
                mock_resp.choices[0].message.content = "Analysis: [ANALYSIS DONE]"
            elif "Synthesize this" in prompt:
                mock_resp.choices[0].message.content = "Synthesis: [SYNTHESIS DONE]"
            elif "Verify this" in prompt:
                mock_resp.choices[0].message.content = "Verification: [VERIFIED]"
            else:
                mock_resp.choices[0].message.content = "Unknown"
            return mock_resp
        
        mocked_completion.side_effect = side_effect

        # Execute chain
        result = orchestrator.execute_chain(architecture, initial_input, org_id)
        
        assert "Verification: [VERIFIED]" in result
        assert mocked_completion.call_count == 3

def test_orchestrator_runtime_swapping(setup_v3_system):
    orchestrator, registry, storage = setup_v3_system
    org_id = "test-org"

    # Setup a block
    b1 = registry.create_block("swap-test", "Swap test", "Test swapping")
    registry.add_version(b1.block_id, "Version 1: {context}", "gpt-4", is_stable=True)

    architecture = [b1.block_id]
    initial_input = "Input"

    with patch('src.v3.orchestrator.completion') as mocked_completion:
        def side_effect(model, messages):
            prompt = messages[0]['content']
            mock_resp = MagicMock()
            mock_resp.choices[0].message.content = f"LLM saw: {prompt}"
            return mock_resp
        
        mocked_completion.side_effect = side_effect

        # Run 1: Should use Version 1
        res1 = orchestrator.execute_chain(architecture, initial_input, org_id)
        assert "Version 1: Input" in res1

        # Update the block in the registry (Requirement 3)
        registry.add_version(b1.block_id, "Version 2: {context}", "gpt-4", is_stable=True)

        # Run 2: Should use Version 2 immediately without restart
        res2 = orchestrator.execute_chain(architecture, initial_input, org_id)
        assert "Version 2: Input" in res2
        assert res1 != res2

def test_orchestrator_trace_generation(setup_v3_system):
    orchestrator, registry, storage = setup_v3_system
    org_id = "test-org"

    b1 = registry.create_block("trace-test", "Trace test", "Test traces")
    registry.add_version(b1.block_id, "Prompt: {context}", "gpt-4", is_stable=True)

    architecture = [b1.block_id]
    
    with patch('src.v3.orchestrator.completion') as mocked_completion:
        mock_resp = MagicMock()
        mock_resp.choices[0].message.content = "Success"
        mocked_completion.return_value = mock_resp

        orchestrator.execute_chain(architecture, "Input", org_id)
        
        # Verify trace in storage
        traces = storage.get_recent_traces(org_id, limit=1)
        assert len(traces) > 0
        trace_id = traces[0]['id']
        
        logs = storage.get_trace_logs(trace_id, org_id)
        assert len(logs) > 0
        # Check for block_id and model_id in raw_payload (Requirement 4)
        log_entry = logs[0]
        payload = log_entry['raw_payload']
        assert payload['block_id'] == b1.block_id
        assert payload['model_id'] == "gpt-4"
        assert payload['status'] == "success"
