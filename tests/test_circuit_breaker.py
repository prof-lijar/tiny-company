import pytest
import logging
from src.v3.circuit_breaker import CircuitBreaker
from src.v3.proposal_manager import ProposalManager
from src.v3.drift_monitor import DriftMonitor
from src.v3.root_cause_analyzer import RootCauseAnalyzer
from src.v3.fix_synthesis import FixSynthesisCouncil
from src.v3.shadow_verification import ShadowVerificationEnvironment

def test_autonomous_circuit_breaking_rollback():
    # Setup
    drift_monitor = DriftMonitor()
    rca_analyzer = RootCauseAnalyzer()
    fix_council = FixSynthesisCouncil()
    shadow_env = ShadowVerificationEnvironment(storage={}) # Provide a dummy storage
    circuit_breaker = CircuitBreaker(regression_threshold=0.15)
    
    pm = ProposalManager(
        drift_monitor=drift_monitor,
        rca_analyzer=rca_analyzer,
        fix_council=fix_council,
        shadow_env=shadow_env,
        circuit_breaker=circuit_breaker
    )

    # 1. Establish a stable baseline version
    stable_version_id = "v1-stable"
    stable_prompt = "You are a helpful assistant v1."
    baseline_rate = 0.95
    
    circuit_breaker.record_deployment(stable_version_id, stable_prompt, baseline_rate)
    
    # 2. Deploy a new 'Healing Proposal' (v2)
    from src.core.models import HealingProposal, ProposalStatus, PromptFix, ShadowVerificationReport
    
    proposal = HealingProposal(
        drift_event={"trace_id": "test-trace-123"}, # Fixed KeyError
        rca_report={},
        proposed_fix=PromptFix(analysis="Fixing drift", suggested_modification="You are a helpful assistant v2.", rationale="Better reasoning"),
        verification_report=ShadowVerificationReport(fix_id="f1", total_tests=10, passed_baseline=8, passed_healed=9, fixed_count=1, regression_count=0, stability_gain=0.1, detailed_results=[]),
        status=ProposalStatus.APPROVED
    )
    pm.proposals[proposal.proposal_id] = proposal
    
    # Deploy v2
    pm.deploy_proposal(proposal.proposal_id, stable_prompt, baseline_rate)
    
    # Verify v2 is active
    assert circuit_breaker.active_version_id == proposal.proposal_id
    
    # 3. Simulate production telemetry showing a regression
    # Baseline was 0.95. Current rate drops to 0.75 (Drop = 0.20 > 0.15 threshold)
    current_success_rate = 0.75
    
    # This should trigger the circuit break and rollback
    is_stable = pm.check_production_stability(current_success_rate)
    
    # Assertions
    assert is_stable is False, "System should be unstable due to regression"
    
    rollback_ver = circuit_breaker.get_rollback_version()
    assert rollback_ver is not None
    assert rollback_ver["version_id"] == stable_version_id

def test_circuit_breaker_no_regression():
    circuit_breaker = CircuitBreaker(regression_threshold=0.15)
    
    circuit_breaker.record_deployment("v1", "prompt1", 0.90)
    circuit_breaker.record_deployment("v2", "prompt2", 0.90)
    
    # Success rate drops slightly (0.90 -> 0.80 = 0.10 drop < 0.15 threshold)
    is_broken, reason = circuit_breaker.monitor_performance(0.80)
    
    assert is_broken is False
    assert reason is None

def test_circuit_breaker_no_history_rollback():
    # Test rollback when no previous version exists
    circuit_breaker = CircuitBreaker()
    circuit_breaker.record_deployment("v1", "prompt1", 0.90)
    
    # Try to get rollback version
    rollback = circuit_breaker.get_rollback_version()
    assert rollback is None
