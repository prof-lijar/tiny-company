import json
import logging
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass, asdict

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("RootCauseAnalyzer")

@dataclass
class TraceStep:
    """Represents a single step in a reasoning trace."""
    milestone: str
    content: str
    block_id: Optional[str] = None
    model_id: Optional[str] = None

@dataclass
class RCA_Report:
    """Structured report for Root Cause Analysis."""
    trace_id: str
    divergence_milestone: str
    category: str
    reasoning_diff: str
    suggested_fix_category: str

class RootCauseAnalyzer:
    """
    Analyzes reasoning drift to identify the root cause.
    Interfaces with DriftMonitor events to diagnose why a trace diverged from the Golden Path.
    """

    FAILURE_CATEGORIES = {
        "LOGIC_DRIFT": "Logic Drift: The reasoning steps are valid but lead to a different conclusion or skip a critical step.",
        "HALLUCINATION": "Hallucination: The agent introduced facts or constraints not present in the context.",
        "CONSTRAINT_VIOLATION": "Constraint Violation: The agent ignored a mandatory system prompt or guardrail."
    }

    def __init__(self):
        pass

    def _identify_divergence_point(self, trace: List[TraceStep], golden_path: List[str]) -> Tuple[int, int]:
        """
        Finds the first index where the trace deviates from the golden path.
        Returns (trace_idx, golden_idx).
        """
        golden_idx = 0
        trace_idx = 0
        
        while trace_idx < len(trace) and golden_idx < len(golden_path):
            if trace[trace_idx].milestone == golden_path[golden_idx]:
                golden_idx += 1
                trace_idx += 1
            else:
                # Divergence found
                return trace_idx, golden_idx
        
        return trace_idx, golden_idx

    def _categorize_failure(self, trace: List[TraceStep], golden_path: List[str], 
                            trace_idx: int, golden_idx: int) -> Tuple[str, str]:
        """
        Categorizes the failure based on the nature of the divergence.
        In a real system, this would use a diagnostic LLM. 
        Here, it implements a rule-based heuristic for the v3.0 foundation.
        """
        if golden_idx < len(golden_path):
            missing_milestone = golden_path[golden_idx]
            
            # Heuristic 1: Constraint Violation
            # If the missing milestone is a safety or compliance check, it's a constraint violation.
            if any(keyword in missing_milestone.lower() for keyword in ["safety", "compliance", "guardrail", "policy"]):
                return "CONSTRAINT_VIOLATION", f"Skipped critical guardrail: {missing_milestone}"

            # Heuristic 2: Hallucination
            # If the trace continued but introduced a milestone not in the golden path 
            # and the content contains 'hallucination' markers (simulated here via content analysis).
            if trace_idx < len(trace):
                current_step = trace[trace_idx]
                if "unknown" in current_step.content.lower() or "assume" in current_step.content.lower():
                    return "HALLUCINATION", f"Introduced unsupported facts at step: {current_step.milestone}"

            # Heuristic 3: Logic Drift
            # Default categorization if it's just a missing or swapped step.
            return "LOGIC_DRIFT", f"Reasoning diverged at {missing_milestone}. Path adherence failed."

        # If we reached the end of the golden path but the trace is different/incomplete
        return "LOGIC_DRIFT", "Trace ended prematurely or diverged at the final conclusion."

    def analyze(self, trace_id: str, trace: List[TraceStep], golden_path: List[str]) -> Dict[str, Any]:
        """
        Performs Root Cause Analysis on a drifted trace.
        
        :param trace_id: Unique identifier for the trace.
        :param trace: The production trace as a list of TraceStep objects.
        :param golden_path: The Golden Path as a list of milestone names.
        :return: A JSON-serializable dictionary containing the RCA report.
        """
        logger.info(f"Analyzing root cause for trace {trace_id}...")
        
        trace_idx, golden_idx = self._identify_divergence_point(trace, golden_path)
        
        category, reason = self._categorize_failure(trace, golden_path, trace_idx, golden_idx)
        
        # Create a diff of the reasoning logic
        # We compare the actual step taken vs the expected step
        actual_step = trace[trace_idx].milestone if trace_idx < len(trace) else "END OF TRACE"
        expected_step = golden_path[golden_idx] if golden_idx < len(golden_path) else "END OF PATH"
        
        diff_text = f"Expected: {expected_step} | Actual: {actual_step}"
        if trace_idx < len(trace):
            diff_text += f"\nContent: {trace[trace_idx].content[:100]}..."

        report = RCA_Report(
            trace_id=trace_id,
            divergence_milestone=expected_step if golden_idx < len(golden_path) else "N/A",
            category=category,
            reasoning_diff=diff_text,
            suggested_fix_category=self.FAILURE_CATEGORIES.get(category, "Unknown")
        )
        
        return asdict(report)

if __name__ == "__main__":
    # Quick sanity check
    analyzer = RootCauseAnalyzer()
    
    # Case 1: Logic Drift (Missing a step)
    golden = ["Start", "Analyze", "Verify", "Respond"]
    trace = [
        TraceStep("Start", "Starting process..."),
        TraceStep("Analyze", "Analyzing data..."),
        # Missing Verify
        TraceStep("Respond", "Here is the result...")
    ]
    print(json.dumps(analyzer.analyze("t1", trace, golden), indent=2))
    
    # Case 2: Constraint Violation (Skipping Safety)
    golden_safety = ["Start", "Safety Check", "Analyze", "Respond"]
    trace_safety = [
        TraceStep("Start", "Starting process..."),
        TraceStep("Analyze", "Analyzing data..."),
        TraceStep("Respond", "Here is the result...")
    ]
    print(json.dumps(analyzer.analyze("t2", trace_safety, golden_safety), indent=2))

    # Case 3: Hallucination (Introducing unknowns)
    golden_hall = ["Start", "Analyze", "Respond"]
    trace_hall = [
        TraceStep("Start", "Starting process..."),
        TraceStep("Analyze", "I assume the user is from Mars..."), # Hallucination
        TraceStep("Respond", "Greetings Martian!")
    ]
    print(json.dumps(analyzer.analyze("t3", trace_hall, golden_hall), indent=2))
