import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("DriftMonitor")

class DriftEvent:
    """Represents a detected reasoning drift event."""
    def __init__(self, trace_id, par, threshold, golden_path, trace):
        self.trace_id = trace_id
        self.par = par
        self.threshold = threshold
        self.golden_path = golden_path
        self.trace = trace

    def __repr__(self):
        return (f"DriftEvent(trace_id={self.trace_id}, par={self.par:.2f}, "
                f"threshold={self.threshold}, status='DRIFT_DETECTED')")

class DriftMonitor:
    """
    Monitors production traces against Golden Paths to calculate Path Adherence Rate (PAR).
    If PAR falls below a threshold, a Drift Event is triggered.
    """
    def __init__(self, threshold: float = 0.8):
        """
        Initialize the DriftMonitor.
        :param threshold: The minimum acceptable Path Adherence Rate (0.0 to 1.0).
        """
        self.threshold = threshold

    def calculate_par(self, trace: list, golden_path: list) -> float:
        """
        Calculates the Path Adherence Rate (PAR).
        PAR is the percentage of milestones in the Golden Path that appear in the 
        production trace in the correct relative sequence.
        
        :param trace: List of milestones from a production trace.
        :param golden_path: List of milestones defining the Golden Path.
        :return: PAR as a float between 0.0 and 1.0.
        """
        if not golden_path:
            return 1.0  # No golden path means no drift possible
        
        if not trace:
            return 0.0  # Trace is empty, but golden path exists

        # We look for each milestone of the golden path in the trace, 
        # ensuring they appear in the correct order.
        matched_count = 0
        current_trace_idx = 0
        
        for milestone in golden_path:
            try:
                # Find the next occurrence of the golden milestone starting from the current index
                found_idx = trace.index(milestone, current_trace_idx)
                matched_count += 1
                # Move the pointer to the next element in the trace
                current_trace_idx = found_idx + 1
            except ValueError:
                # Milestone not found in the remaining part of the trace
                continue
        
        return matched_count / len(golden_path)

    def detect_drift(self, trace_id: str, trace: list, golden_path: list) -> tuple[bool, float, DriftEvent | None]:
        """
        Checks if a production trace has drifted from the Golden Path.
        
        :param trace_id: Unique identifier for the trace.
        :param trace: List of milestones from the production trace.
        :param golden_path: List of milestones defining the Golden Path.
        :return: A tuple of (is_drifted, par, drift_event).
        """
        par = self.calculate_par(trace, golden_path)
        is_drifted = par < self.threshold
        
        drift_event = None
        if is_drifted:
            logger.warning(f"Drift detected in trace {trace_id}: PAR={par:.2f} < Threshold={self.threshold}")
            drift_event = DriftEvent(
                trace_id=trace_id,
                par=par,
                threshold=self.threshold,
                golden_path=golden_path,
                trace=trace
            )
            
        return is_drifted, par, drift_event
