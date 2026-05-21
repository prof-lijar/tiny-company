import logging
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime

from src.core.models import (
    HealingProposal, 
    ProposalStatus, 
    PromptFix, 
    ShadowVerificationReport, 
    TestCaseResult
)
from src.v3.drift_monitor import DriftMonitor, DriftEvent
from src.v3.root_cause_analyzer import RootCauseAnalyzer, TraceStep
from src.v3.fix_synthesis import FixSynthesisCouncil
from src.v3.shadow_verification import ShadowVerificationEnvironment, ShadowRunner
from src.v3.circuit_breaker import CircuitBreaker

# Mocking config for integration
from config import Config

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ProposalManager")

class ProposalManager:
    """
    Orchestrates the v3.0 Self-Healing loop from drift detection to production deployment.
    Now includes Autonomous Circuit Breaking (SH-6).
    """
    def __init__(self, 
                 drift_monitor: DriftMonitor, 
                 rca_analyzer: RootCauseAnalyzer, 
                 fix_council: FixSynthesisCouncil, 
                 shadow_env: ShadowVerificationEnvironment,
                 circuit_breaker: CircuitBreaker,
                 storage_backend=None):
        self.drift_monitor = drift_monitor
        self.rca_analyzer = rca_analyzer
        self.fix_council = fix_council
        self.shadow_env = shadow_env
        self.circuit_breaker = circuit_breaker
        self.storage = storage_backend # In a real system, this would be a DB
        self.proposals = {} # In-memory storage for proposals

    def generate_proposal(self, trace_id: str, trace: List[TraceStep], golden_path: List[str], agent_id: str, baseline_prompt: str) -> str:
        """
        Triggers the full healing pipeline for a drifted trace.
        """
        logger.info(f"Generating healing proposal for trace {trace_id}...")

        # 1. Drift Detection (Verification)
        is_drifted, par, drift_event = self.drift_monitor.detect_drift(trace_id, [t.milestone for t in trace], golden_path)
        if not is_drifted:
            logger.info(f"No drift detected for trace {trace_id}. Aborting proposal generation.")
            return "NO_DRIFT"

        # 2. Root Cause Analysis
        rca_report = self.rca_analyzer.analyze(trace_id, trace, golden_path)
        
        # 3. Fix Synthesis
        proposed_fix = self.fix_council.synthesize(trace, rca_report)
        if not proposed_fix:
            logger.error(f"Failed to synthesize a fix for trace {trace_id}.")
            return "FIX_SYNTHESIS_FAILED"

        # 4. Shadow Verification
        verification_report = self.shadow_env.verify_fix(agent_id, baseline_prompt, proposed_fix)
        
        # 5. Create Healing Proposal
        proposal = HealingProposal(
            drift_event={
                "trace_id": trace_id,
                "par": par,
                "golden_path": golden_path,
                "trace": [t.milestone for t in trace]
            },
            rca_report=rca_report,
            proposed_fix=proposed_fix,
            verification_report=verification_report,
            status=ProposalStatus.PENDING
        )
        
        proposal_id = proposal.proposal_id
        self.proposals[proposal_id] = proposal
        logger.info(f"Healing Proposal {proposal_id} created and pending approval.")
        return proposal_id

    def get_proposal(self, proposal_id: str) -> Optional[HealingProposal]:
        """Retrieves a proposal by ID."""
        return self.proposals.get(proposal_id)

    def list_proposals(self) -> List[HealingProposal]:
        """Lists all pending proposals."""
        return [p for p in self.proposals.values() if p.status == ProposalStatus.PENDING]

    def approve_proposal(self, proposal_id: str, approved_by: str) -> bool:
        """Approves a proposal, moving it to APPROVED state."""
        proposal = self.get_proposal(proposal_id)
        if not proposal:
            logger.error(f"Proposal {proposal_id} not found.")
            return False
        
        proposal.status = ProposalStatus.APPROVED
        proposal.approved_by = approved_by
        logger.info(f"Proposal {proposal_id} approved by {approved_by}.")
        return True

    def deploy_proposal(self, proposal_id: str, current_production_prompt: str, expected_success_rate: float) -> bool:
        """
        Deploys the approved fix to production and records it in the circuit breaker.
        """
        proposal = self.get_proposal(proposal_id)
        if not proposal:
            logger.error(f"Proposal {proposal_id} not found.")
            return False
        
        if proposal.status != ProposalStatus.APPROVED:
            logger.error(f"Proposal {proposal_id} is not approved for deployment.")
            return False

        logger.info(f"DEPLOYING FIX: {proposal.proposed_fix.suggested_modification}")
        logger.info(f"Target Agent: {proposal.drift_event['trace_id']}")
        
        self.circuit_breaker.record_deployment(
            version_id=proposal.proposal_id,
            prompt_content=proposal.proposed_fix.suggested_modification,
            baseline_success_rate=expected_success_rate
        )
        
        proposal.status = ProposalStatus.DEPLOYED
        proposal.deployed_at = datetime.utcnow()
        
        return True

    def check_production_stability(self, current_success_rate: float) -> bool:
        """
        Monitors production stability. If a regression is detected, triggers an autonomous rollback.
        """
        is_broken, reason = self.circuit_breaker.monitor_performance(current_success_rate)
        if not is_broken:
            return True

        logger.warning(f"Production stability check failed: {reason}")
        
        rollback_version = self.circuit_breaker.get_rollback_version()
        if not rollback_version:
            logger.error("Circuit Breaker triggered but no previous stable version found for rollback!")
            return False

        logger.info(f"AUTONOMOUS ROLLBACK: Reverting to version {rollback_version['version_id']}")
        logger.info(f"Restoring Prompt: {rollback_version['prompt']}")
        
        self.circuit_breaker.notify_overseer(reason, rollback_version['version_id'])
        
        return False

    def resolve_proposal(self, proposal_id: str, resolution: str):
        """Rejects or closes a proposal."""
        proposal = self.get_proposal(proposal_id)
        if not proposal:
            return
        
        if resolution == "REJECT":
            proposal.status = ProposalStatus.REJECTED
        else:
            logger.info(f"Proposal {proposal_id} resolved as {resolution}")
