import time
from typing import List, Optional, Dict, Any
from src.models import (
    ProcessedTrace, PromptFix, GoldStandard, 
    VerificationSet, VerificationResult, VerificationStatus
)
from src.telemetry import telemetry

class VerificationLoopManager:
    """
    Orchestrates the 'Snapshot -> Try -> Verify -> Rollback' cycle for prompt fixes.
    """
    def __init__(self, agent_sdk: Any):
        """
        Args:
            agent_sdk: A mock or real SDK that allows updating system prompts 
                      and triggering agent runs.
        """
        self.sdk = agent_sdk
        self.snapshot_prompt: Optional[str] = None

    def apply_and_verify(
        self, 
        trigger_input: str, 
        gold_standard: GoldStandard, 
        proposed_fix: PromptFix, 
        verification_set: Optional[VerificationSet] = None
    ) -> VerificationResult:
        """
        Executes the full verification loop.
        """
        telemetry.info("ev_verify_start", {
            "fix_confidence": proposed_fix.confidence_score,
            "benchmark_size": len(verification_set.cases) if verification_set else 0
        })

        # 1. Snapshot
        current_prompt = self.sdk.get_system_prompt()
        self.snapshot_prompt = current_prompt
        
        # 2. Push Update
        new_prompt = self._integrate_fix(current_prompt, proposed_fix)
        self.sdk.update_system_prompt(new_prompt)

        try:
            # 3. Verify Triggering Input
            trigger_resolved = self._verify_single_case(trigger_input, gold_standard)
            
            if not trigger_resolved:
                telemetry.info("ev_verify_fail", {"reason": "trigger_not_resolved"})
                return VerificationResult(
                    status=VerificationStatus.FAILURE,
                    trigger_resolved=False,
                    benchmark_passed=False,
                    details="The proposed fix did not resolve the original failure."
                )

            # 4. Regression Check (Verification Set)
            benchmark_passed = True
            regression_details = []
            if verification_set:
                for case in verification_set.cases:
                    passed = self._verify_single_case(case.input_text, case)
                    if not passed:
                        benchmark_passed = False
                        regression_details.append(f"Regression in case: {case.input_text[:50]}...")
            
            if not benchmark_passed:
                telemetry.info("ev_verify_fail", {"reason": "regression_detected"})
                return VerificationResult(
                    status=VerificationStatus.REGRESSION,
                    trigger_resolved=True,
                    benchmark_passed=False,
                    details=f"Fixed original issue, but introduced regressions: {'; '.join(regression_details)}"
                )

            # 5. Success
            telemetry.info("ev_verify_success", {})
            return VerificationResult(
                status=VerificationStatus.SUCCESS,
                trigger_resolved=True,
                benchmark_passed=True,
                details="Fixed & Stable! The loop is resolved and no regressions were found."
            )

        except Exception as e:
            telemetry.error("verification_loop_error", {"error": str(e)})
            return VerificationResult(
                status=VerificationStatus.FAILURE,
                trigger_resolved=False,
                benchmark_passed=False,
                details=f"Internal error during verification: {str(e)}"
            )

    def rollback(self):
        """
        Restores the system prompt to the snapshot taken before the fix.
        """
        if self.snapshot_prompt:
            self.sdk.update_system_prompt(self.snapshot_prompt)
            telemetry.info("ev_verify_rollback", {})
            return True
        return False

    def _integrate_fix(self, current_prompt: str, fix: PromptFix) -> str:
        """
        Combines the current prompt with the suggested modification.
        In a real system, this might be a surgical replacement or an append.
        """
        return f"{current_prompt}\n\n# Correction applied by TraceWhisper:\n{fix.suggested_modification}"

    def _verify_single_case(self, input_text: str, gold: GoldStandard) -> bool:
        """
        Runs the agent and determines if the output matches the gold standard 
        and is free of reasoning loops.
        """
        # Trigger the agent run via SDK
        trace = self.sdk.run_agent(input_text)
        
        # Criteria 1: Check for [Reasoning Loop] in the trace
        # (Assuming the trace object contains the log text)
        log_text = "".join([e.content for e in trace.entries])
        if "[Reasoning Loop]" in log_text:
            return False
        
        # Criteria 2: Outcome Match
        # Simplified check: does the final output contain the expected output?
        final_output = trace.entries[-1].content if trace.entries else ""
        if gold.expected_output.lower() not in final_output.lower():
            return False
        
        # Criteria 3: Critical Constraints
        for constraint in gold.critical_constraints:
            if constraint.lower() not in final_output.lower():
                return False
                
        return True
