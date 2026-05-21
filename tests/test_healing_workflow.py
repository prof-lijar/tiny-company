import pytest
from src.v3.proposal_manager import ProposalManager
from src.v3.drift_monitor import DriftMonitor
from src.v3.root_cause_analyzer import RootCauseAnalyzer, TraceStep
from src.v3.fix_synthesis import FixSynthesisCouncil
from src.v3.shadow_verification import ShadowVerificationEnvironment, ShadowRunner
from src.core.storage import TraceStorage

class MockStorage:
    def get_regression_tests_for_agent(self, agent_id):
        return [
            {
                'id': 'test-1',
                'name': 'Regression Test 1',
                'input_text': 'Hello',
                'expected_output': 'World',
                'golden_path_keywords': ['Step1', 'Step2']
            }
        ]

def test_healing_workflow_end_to_end():
    # Setup
    drift_monitor = DriftMonitor()
    rca_analyzer = RootCauseAnalyzer()
    fix_council = FixSynthesisCouncil()
    shadow_env = ShadowVerificationEnvironment(storage=MockStorage(), runner=ShadowRunner())
    
    manager = ProposalManager(drift_monitor, rca_analyzer, fix_council, shadow_env)
    
    # Inputs
    trace_id = "test-trace-123"
    golden_path = ["Start", "Analyze", "Verify", "Respond"]
    trace = [
        TraceStep("Start", "Starting..."),
        TraceStep("Analyze", "Analyzing..."),
        # Missing Verify
        TraceStep("Respond", "The result is X")
    ]
    agent_id = "agent-v3"
    baseline_prompt = "You are a helpful assistant."

    # 1. Trigger proposal generation
    proposal_id = manager.generate_proposal(
        trace_id=trace_id, 
        trace=trace, 
        golden_path=golden_path, 
        agent_id=agent_id, 
        baseline_prompt=baseline_prompt
    )
    
    assert proposal_id != "NO_DRIFT"
    assert proposal_id != "FIX_SYNTHESIS_FAILED"
    
    proposal = manager.get_proposal(proposal_id)
    assert proposal is not None
    assert proposal.status == "PENDING"
    
    # Verify proposal contents
    assert proposal.drift_event["trace_id"] == trace_id
    assert "divergence_milestone" in proposal.rca_report
    assert proposal.proposed_fix is not None
    assert proposal.verification_report is not None
    
    # 2. Approval flow
    success_approve = manager.approve_proposal(proposal_id, "CTO_Agent")
    assert success_approve is True
    assert proposal.status == "APPROVED"
    
    # 3. Deployment flow
    success_deploy = manager.deploy_proposal(proposal_id)
    assert success_deploy is True
    assert proposal.status == "DEPLOYED"

def test_no_drift_no_proposal():
    # Setup
    manager = ProposalManager(
        DriftMonitor(), 
        RootCauseAnalyzer(), 
        FixSynthesisCouncil(), 
        ShadowVerificationEnvironment(storage=MockStorage(), runner=ShadowRunner())
    )
    
    # Inputs: Trace matches golden path exactly
    trace_id = "test-trace-ok"
    golden_path = ["Start", "Analyze", "Verify", "Respond"]
    trace = [
        TraceStep("Start", "Starting..."),
        TraceStep("Analyze", "Analyzing..."),
        TraceStep("Verify", "Verifying..."),
        TraceStep("Respond", "Responding..."),
    ]
    
    proposal_id = manager.generate_proposal(
        trace_id=trace_id, 
        trace=trace, 
        golden_path=golden_path, 
        agent_id="agent-v3", 
        baseline_prompt="You are a helpful assistant."
    )
    
    assert proposal_id == "NO_DRIFT"
