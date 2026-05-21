import logging
from typing import Dict, Any, Optional, List
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("CircuitBreaker")

class CircuitBreaker:
    """
    Implements Autonomous Circuit Breaking (SH-6).
    Monitors post-deployment performance and triggers automatic rollbacks if regressions are detected.
    """
    def __init__(self, regression_threshold: float = 0.15):
        """
        :param regression_threshold: The maximum allowed drop in success rate before triggering a rollback.
                                     e.g., 0.15 means a 15% drop triggers the break.
        """
        self.regression_threshold = regression_threshold
        self.version_history: List[Dict[str, Any]] = []
        self.active_version_id: Optional[str] = None

    def record_deployment(self, version_id: str, prompt_content: str, baseline_success_rate: float):
        """
        Records a new deployment to track for potential rollback.
        """
        self.version_history.append({
            "version_id": version_id,
            "prompt": prompt_content,
            "baseline_success_rate": baseline_success_rate,
            "deployed_at": datetime.utcnow()
        })
        self.active_version_id = version_id
        logger.info(f"CircuitBreaker: Recorded deployment of version {version_id}. Baseline success rate: {baseline_success_rate:.2f}")

    def monitor_performance(self, current_success_rate: float) -> tuple[bool, Optional[str]]:
        """
        Checks current performance against the baseline of the active version.
        
        :param current_success_rate: The observed success rate in production.
        :return: (is_broken, reason)
        """
        if not self.active_version_id or not self.version_history:
            return False, None

        # Get the active version's baseline
        active_version = next((v for v in self.version_history if v["version_id"] == self.active_version_id), None)
        if not active_version:
            return False, None

        baseline = active_version["baseline_success_rate"]
        drop = baseline - current_success_rate

        if drop > self.regression_threshold:
            reason = f"Success rate dropped from {baseline:.2f} to {current_success_rate:.2f} (Drop: {drop:.2f} > Threshold: {self.regression_threshold:.2f})"
            logger.error(f"CIRCUIT BREAK TRIGGERED: {reason}")
            return True, reason

        return False, None

    def get_rollback_version(self) -> Optional[Dict[str, Any]]:
        """
        Retrieves the previous stable version from history.
        """
        if len(self.version_history) < 2:
            logger.warning("CircuitBreaker: No previous stable version available for rollback.")
            return None
        
        # The second to last version is the previous stable one
        return self.version_history[-2]

    def notify_overseer(self, reason: str, rollback_version_id: str):
        """
        Simulates notification to the Strategic Overseer.
        """
        notification = (
            f"[ALERT] Autonomous Circuit Break triggered!\n"
            f"Reason: {reason}\n"
            f"Action: Automatically rolled back to version {rollback_version_id}.\n"
            f"Timestamp: {datetime.utcnow().isoformat()}"
        )
        logger.info(f"NOTIFYING STRATEGIC OVERSEER: {notification}")
        return notification
