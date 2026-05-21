from typing import List, Dict, Any, Optional
from src.core.models import GoldenPath, GoldenPathStep
import uuid
from datetime import datetime

class PathGenerator:
    def generate_path(self, cluster_traces: List[Dict[str, Any]], agent_id: str, task_id: str) -> GoldenPath:
        steps = []
        steps.append(GoldenPathStep(
            step_index=0,
            intent="VERIFY_SOURCE",
            required_keywords=["verify", "source", "check", "cross-reference"],
            expected_behavior="The agent must verify the primary source before proceeding.",
            is_critical=True
        ))
        steps.append(GoldenPathStep(
            step_index=1,
            intent="SYNTHESIZE_ANSWER",
            required_keywords=["synthesize", "combine", "integrate", "summarize"],
            expected_behavior="The agent must synthesize the verified information into a coherent answer.",
            is_critical=True
        ))
        steps.append(GoldenPathStep(
            step_index=2,
            intent="FINAL_REVIEW",
            required_keywords=["review", "final", "check", "accuracy"],
            expected_behavior="The agent must perform a final accuracy check before outputting.",
            is_critical=False
        ))
        return GoldenPath(
            agent_id=agent_id,
            task_id=task_id,
            steps=steps
        )

class PathValidator:
    def calculate_ear(self, proposed_path: GoldenPath, validation_set: List[Dict[str, Any]]) -> float:
        if not validation_set:
            return 0.0
        adherence_count = 0
        for trace in validation_set:
            trace_text = " ".join([entry.get('content', '') for entry in trace.get('entries', [])])
            critical_steps = [s for s in proposed_path.steps if s.is_critical]
            matched_critical = 0
            for step in critical_steps:
                if any(kw.lower() in trace_text.lower() for kw in step.required_keywords):
                    matched_critical += 1
            if matched_critical == len(critical_steps):
                adherence_count += 1
        return adherence_count / len(validation_set)
