import logging
from typing import List, Dict, Any, Optional
import uuid
from litellm import completion
from src.core.models import PromptFix, TestCaseResult, ShadowVerificationReport
from src.core.storage import TraceStorage
from config import Config

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ShadowVerification")

class ShadowRunner:
    """
    Executes a prompt against a specific input and returns the generated reasoning path.
    In a real system, this would interact with the actual agent runtime.
    """
    def __init__(self, model: str = Config().model_name):
        self.model = model

    def run(self, system_prompt: str, user_input: str) -> str:
        logger.info(f"ShadowRunner: Executing test case with model {self.model}...")
        try:
            response = completion(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_input}
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"ShadowRunner: Execution error: {e}")
            return ""

class ShadowVerificationEnvironment:
    def __init__(self, storage: TraceStorage, runner: Optional[ShadowRunner] = None):
        self.storage = storage
        self.runner = runner or ShadowRunner()

    def _calculate_par(self, output: str, keywords: List[str]) -> float:
        """
        Calculates Path Adherence Rate (PAR): percentage of required keywords present in output.
        """
        if not keywords:
            return 1.0
        found = [k for k in keywords if k.lower() in output.lower()]
        return len(found) / len(keywords)

    def verify_fix(self, agent_id: str, baseline_prompt: str, fix: PromptFix) -> ShadowVerificationReport:
        logger.info(f"ShadowVerification: Verifying fix for agent {agent_id}...")
        
        # 1. Fetch regression tests
        tests = self.storage.get_regression_tests_for_agent(agent_id)
        if not tests:
            logger.warning(f"No regression tests found for agent {agent_id}. Skipping verification.")
            return ShadowVerificationReport(
                fix_id=str(uuid.uuid4()),
                total_tests=0,
                passed_baseline=0,
                passed_healed=0,
                fixed_count=0,
                regression_count=0,
                stability_gain=0.0,
                detailed_results=[]
            )

        # 2. Prepare healed prompt
        # In a real scenario, the PromptFix would be applied to the baseline prompt.
        # For this implementation, we simulate the 'healed' system prompt.
        healed_prompt = f"{baseline_prompt}\n\n[FIX APPLIED]: {fix.suggested_modification}"

        detailed_results = []
        passed_baseline = 0
        passed_healed = 0
        fixed_count = 0
        regression_count = 0
        total_par_baseline = 0.0
        total_par_healed = 0.0

        for test in tests:
            test_id = test['id']
            test_name = test['name']
            user_input = test['input_text']
            expected_output = test['expected_output']
            keywords = test['golden_path_keywords']

            # Run baseline
            baseline_out = self.runner.run(baseline_prompt, user_input)
            baseline_par = self._calculate_par(baseline_out, keywords)
            baseline_passed = expected_output.lower() in baseline_out.lower()
            if baseline_passed: passed_baseline += 1

            # Run healed
            healed_out = self.runner.run(healed_prompt, user_input)
            healed_par = self._calculate_par(healed_out, keywords)
            healed_passed = expected_output.lower() in healed_out.lower()
            if healed_passed: passed_healed += 1

            # Determine status
            status = "NO_CHANGE"
            if not baseline_passed and healed_passed:
                status = "FIXED"
                fixed_count += 1
            elif baseline_passed and not healed_passed:
                status = "REGRESSION"
                regression_count += 1
            elif not baseline_passed and not healed_passed:
                status = "STILL_FAILING"

            total_par_baseline += baseline_par
            total_par_healed += healed_par

            detailed_results.append(TestCaseResult(
                test_id=test_id,
                test_name=test_name,
                baseline_passed=baseline_passed,
                healed_passed=healed_passed,
                baseline_path_adherence=baseline_par,
                healed_path_adherence=healed_par,
                status=status
            ))

        # 3. Final Report
        avg_par_baseline = total_par_baseline / len(tests)
        avg_par_healed = total_par_healed / len(tests)
        stability_gain = avg_par_healed - avg_par_baseline

        return ShadowVerificationReport(
            fix_id=str(uuid.uuid4()),
            total_tests=len(tests),
            passed_baseline=passed_baseline,
            passed_healed=passed_healed,
            fixed_count=fixed_count,
            regression_count=regression_count,
            stability_gain=stability_gain,
            detailed_results=detailed_results
        )
