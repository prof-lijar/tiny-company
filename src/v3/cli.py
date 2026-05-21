import argparse
import json
from src.v3.proposal_manager import ProposalManager
from src.v3.drift_monitor import DriftMonitor
from src.v3.root_cause_analyzer import RootCauseAnalyzer
from src.v3.fix_synthesis import FixSynthesisCouncil
from src.v3.shadow_verification import ShadowVerificationEnvironment, ShadowRunner
from src.core.storage import TraceStorage
from src.v3.root_cause_analyzer import TraceStep

def setup_manager():
    # In a real app, these would be singletons or injected
    drift_monitor = DriftMonitor()
    rca_analyzer = RootCauseAnalyzer()
    fix_council = FixSynthesisCouncil()
    
    # Mock storage for shadow verification
    # Note: We are using a mock storage since we don't have a live DB running in the CLI
    class MockStorage:
        def get_regression_tests_for_agent(self, agent_id):
            return [
                {
                    'id': 'test-1',
                    'name': 'Standard Reasoning Test',
                    'input_text': 'What is the capital of France?',
                    'expected_output': 'Paris',
                    'golden_path_keywords': ['Search', 'Verify', 'Conclude']
                }
            ]
    
    shadow_env = ShadowVerificationEnvironment(storage=MockStorage(), runner=ShadowRunner())
    return ProposalManager(drift_monitor, rca_analyzer, fix_council, shadow_env)

def main():
    parser = argparse.ArgumentParser(description="v3.0 Healing Proposal Overseer CLI")
    parser.add_argument("action", choices=["list", "approve", "deploy", "simulate"], help="Action to perform")
    parser.add_argument("--id", help="Proposal ID for approve/deploy")
    parser.add_argument("--user", default="StrategicOverseer", help="User performing the action")
    
    args = parser.parse_args()
    manager = setup_manager()

    if args.action == "simulate":
        # Simulate a drift to create a proposal
        trace_id = "trace-delta-99"
        golden_path = ["Start", "Analyze", "Verify", "Respond"]
        trace = [
            TraceStep("Start", "Beginning..."),
            TraceStep("Analyze", "Analyzing..."),
            # Missing Verify
            TraceStep("Respond", "The answer is X")
        ]
        pid = manager.generate_proposal(
            trace_id=trace_id, 
            trace=trace, 
            golden_path=golden_path, 
            agent_id="agent-007", 
            baseline_prompt="You are a helpful assistant."
        )
        print(f"Simulated drift. Created Proposal ID: {pid}")

    elif args.action == "list":
        proposals = manager.list_proposals()
        if not proposals:
            print("No pending proposals.")
        for p in proposals:
            print(f"ID: {p.proposal_id} | Status: {p.status} | Fix: {p.proposed_fix.suggested_modification[:50]}...")

    elif args.action == "approve":
        if not args.id:
            print("Error: --id is required for approve")
            return
        success = manager.approve_proposal(args.id, args.user)
        print(f"Approval status: {success}")

    elif args.action == "deploy":
        if not args.id:
            print("Error: --id is required for deploy")
            return
        success = manager.deploy_proposal(args.id)
        print(f"Deployment status: {success}")

if __name__ == "__main__":
    main()
