
import pytest
import uuid
from unittest.mock import patch, MagicMock
from src.core.storage import TraceStorage
from src.reasoning_block_registry import ReasoningBlockRegistry
from src.v3.orchestrator import Orchestrator
from src.v3.drift_monitor import DriftMonitor
from src.v3.circuit_breaker import CircuitBreaker
from src.v3.root_cause_analyzer import RootCauseAnalyzer
from src.v3.fix_synthesis import FixSynthesis
from src.v3.shadow_verification import ShadowVerification

@pytest.fixture
def v3_system():
    # Setup all v3 components
    storage = TraceStorage(db_path='test_v3_integration.db')
    registry = ReasoningBlockRegistry(storage=storage)
    orchestrator = Orchestrator(registry=registry, storage=storage)
    drift_monitor = DriftMonitor(storage=storage)
    circuit_breaker = CircuitBreaker(regression_threshold=0.1)
    rca = RootCauseAnalyzer(storage=storage)
    synthesis = FixSynthesis(registry=registry)
    shadow = ShadowVerification(registry=registry, storage=storage)
    
    return {
        'storage': storage,
        'registry': registry,
        'orchestrator': orchestrator,
        'drift_monitor': drift_monitor,
        'circuit_breaker': circuit_breaker,
        'rca': rca,
        'synthesis': synthesis,
        'shadow': shadow
    }

def test_v3_full_healing_loop(v3_system):
    sys = v3_system
    org_id = 'org-v3-test'
    
    # 1. Setup initial stable block
    block = sys['registry'].create_block('summarizer', 'Summarize text', 'v3 summary block')
    sys['registry'].add_version(block.block_id, 'Summarize this: {context}', 'gpt-4', is_stable=True)
    
    # Record deployment in circuit breaker
    sys['circuit_breaker'].record_deployment(
        version_id='v1', 
        prompt_content='Summarize this: {context}', 
        baseline_success_rate=0.95
    )
    
    architecture = [block.block_id]
    
    # 2. Simulate Production Performance (Success)
    with patch('src.v3.orchestrator.completion') as mocked_completion:
        def success_side_effect(model, messages):
            mock_resp = MagicMock()
            mock_resp.choices[0].message.content = 'Successful Summary'
            return mock_resp
        
        mocked_completion.side_effect = success_side_effect
        
        # Run a few successful requests
        for _ in range(5):
            sys['orchestrator'].execute_chain(architecture, 'Some input text', org_id)
        
        # Verify drift monitor sees no issue
        is_drifting, _ = sys['drift_monitor'].detect_drift(block.block_id, org_id)
        assert not is_drifting

        # 3. Simulate Regression (Performance Drop)
        def failure_side_effect(model, messages):
            mock_resp = MagicMock()
            mock_resp.choices[0].message.content = 'FAILED SUMMARY'
            return mock_resp
        
        mocked_completion.side_effect = failure_side_effect
        
        # Run a few failing requests
        for _ in range(10):
            sys['orchestrator'].execute_chain(architecture, 'Some input text', org_id)
        
        # Drift Monitor should now detect drift
        is_drifting, reason = sys['drift_monitor'].detect_drift(block.block_id, org_id)
        assert is_drifting
        
        # 4. Circuit Breaker should trigger rollback
        current_rate = 0.3 # Simulated drop
        is_broken, break_reason = sys['circuit_breaker'].monitor_performance(current_rate)
        assert is_broken
        
        rollback_ver = sys['circuit_breaker'].get_rollback_version()
        assert rollback_ver is not None

        # 5. Root Cause Analysis & Fix Synthesis
        analysis = sys['rca'].analyze_failure(block.block_id, org_id)
        assert 'failure' in analysis.lower() or 'analysis' in analysis.lower()
        
        # Synthesize a fix
        fix_proposal = sys['synthesis'].propose_fix(block.block_id, analysis)
        assert 'fixed' in fix_proposal.lower() or 'proposal' in fix_proposal.lower()
        
        # 6. Shadow Verification
        verification_result = sys['shadow'].verify_fix(
            block_id=block.block_id,
            proposed_prompt=fix_proposal,
            test_dataset=[{'input': 'test 1', 'expected': 'Summary 1'}]
        )
        assert verification_result['is_verified'] is True
        
        # 7. Deploy the fix
        sys['registry'].add_version(block.block_id, fix_proposal, 'gpt-4', is_stable=True)
        
        # Reset mock to simulate recovery
        mocked_completion.side_effect = success_side_effect
        sys['orchestrator'].execute_chain(architecture, 'New Input', org_id)
        
        # Check that the last call to completion used the fix_proposal
        last_call_prompt = mocked_completion.call_args[1]['messages'][0]['content']
        assert fix_proposal in last_call_prompt
