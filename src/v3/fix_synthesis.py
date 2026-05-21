import logging
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from src.core.models import PromptFix, ReasoningPattern
from src.v3.root_cause_analyzer import TraceStep

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FixSynthesisCouncil")

@dataclass
class Diagnosis:
    trace_id: str
    root_cause: str
    failure_type: str
    impact_analysis: str
    critical_gap: str

class FixSynthesisCouncil:
    def __init__(self, pattern_vault=None):
        self.pattern_vault = pattern_vault

    def _diagnose(self, trace: List[TraceStep], rca_report: Dict[str, Any]) -> Diagnosis:
        logger.info(f"Diagnoser: Analyzing RCA report for trace {rca_report['trace_id']}...")
        
        category = rca_report.get('category', 'UNKNOWN')
        diff = rca_report.get('reasoning_diff', 'No diff available')
        milestone = rca_report.get('divergence_milestone', 'Unknown')

        root_cause = f"Reasoning diverged at milestone '{milestone}'. {diff}"
        impact = "The agent failed to adhere to the Golden Path, potentially leading to incorrect conclusions or missing critical constraints."
        gap = f"Missing or incorrect execution of {milestone}."

        return Diagnosis(
            trace_id=rca_report['trace_id'],
            root_cause=root_cause,
            failure_type=category,
            impact_analysis=impact,
            critical_gap=gap
        )

    def _synthesize_fix(self, diagnosis: Diagnosis, patterns: List[ReasoningPattern]) -> PromptFix:
        logger.info(f"Fixer: Synthesizing fix for {diagnosis.trace_id} using {len(patterns)} patterns...")

        best_pattern = None
        for p in patterns:
            if diagnosis.failure_type.lower() in p.failure_description.lower():
                best_pattern = p
                break

        if best_pattern:
            suggested_mod = f"Apply historical fix: {best_pattern.correction_prompt}"
            rationale = f"Matched historical pattern: {best_pattern.failure_description}"
            confidence = "High"
        else:
            suggested_mod = f"Explicitly instruct the agent to prioritize the following milestone: {diagnosis.critical_gap}"
            rationale = f"No matching historical pattern found. Generated fix based on critical gap: {diagnosis.critical_gap}"
            confidence = "Medium"

        return PromptFix(
            analysis=diagnosis.root_cause,
            suggested_modification=suggested_mod,
            rationale=rationale,
            confidence_score=confidence
        )

    def _verify_fix(self, fix: PromptFix, diagnosis: Diagnosis) -> bool:
        logger.info(f"Verifier: Checking fix for {diagnosis.trace_id}...")
        if diagnosis.critical_gap.lower() in fix.suggested_modification.lower() or \
           diagnosis.failure_type.lower() in fix.rationale.lower():
            logger.info("Verifier: Fix approved.")
            return True
        
        logger.warning("Verifier: Fix rejected - does not sufficiently address the critical gap.")
        return False

    def synthesize(self, trace: List[TraceStep], rca_report: Dict[str, Any], vault_id: str = "default") -> Optional[PromptFix]:
        diagnosis = self._diagnose(trace, rca_report)

        patterns = []
        if self.pattern_vault:
            try:
                class MockProcessedTrace:
                    def __init__(self, tid): self.trace_id = tid
                patterns = self.pattern_vault.recommend_fix(MockProcessedTrace(rca_report['trace_id']), vault_id)
            except Exception as e:
                logger.error(f"Error retrieving patterns from vault: {e}")
                patterns = []

        proposed_fix = self._synthesize_fix(diagnosis, patterns)

        if self._verify_fix(proposed_fix, diagnosis):
            return proposed_fix
        else:
            logger.info("Retrying synthesis after verification failure...")
            proposed_fix.suggested_modification = f"CRITICAL: {proposed_fix.suggested_modification}"
            proposed_fix.rationale += " (Aggressive retry after verification failure)"
            if self._verify_fix(proposed_fix, diagnosis):
                return proposed_fix
            return None

if __name__ == "__main__":
    from src.pattern_vault import PatternVault
    from src.core.storage import TraceStorage
    
    class MockStorage:
        def get_vault_hierarchy(self, vid): return [vid]
        def query_patterns_by_vault(self, vid): 
            return [{
                'id': 'p1', 
                'failure_description': 'LOGIC_DRIFT: Missing milestone', 
                'failure_embedding': b'..', 
                'correction_prompt': 'Ensure all milestones are followed strictly.', 
                'success_rate': 0.9, 
                'created_at': '2026-01-01'
            }]

    storage = MockStorage()
    vault = PatternVault(storage)
    council = FixSynthesisCouncil(pattern_vault=vault)

    rca_report = {
        'trace_id': 't123',
        'divergence_milestone': 'Verify',
        'category': 'LOGIC_DRIFT',
        'reasoning_diff': 'Expected: Verify | Actual: Respond',
        'suggested_fix_category': 'Logic Drift: The reasoning steps are valid but lead to a different conclusion'
    }
    trace = [TraceStep("Start", "... "), TraceStep("Analyze", "... "), TraceStep("Respond", "... ")]

    fix = council.synthesize(trace, rca_report)
    print(f"Proposed Fix: {fix}")
