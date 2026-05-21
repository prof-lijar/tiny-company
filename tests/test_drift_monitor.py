import pytest
from src.v3.drift_monitor import DriftMonitor, DriftEvent

def test_perfect_adherence():
    monitor = DriftMonitor(threshold=0.8)
    golden_path = ["Start", "Safety Check", "Reasoning", "Final Response"]
    trace = ["Start", "Safety Check", "Reasoning", "Final Response"]
    
    is_drifted, par, event = monitor.detect_drift("t1", trace, golden_path)
    
    assert par == 1.0
    assert is_drifted is False
    assert event is None

def test_partial_adherence_no_drift():
    # Threshold is 0.5, we hit 0.75
    monitor = DriftMonitor(threshold=0.5)
    golden_path = ["A", "B", "C", "D"]
    trace = ["A", "B", "X", "C", "D"] # X is noise, but A,B,C,D are in order
    
    # Wait, my current implementation treats noise as okay as long as sequence is kept.
    # Let's check if it's "percentage of milestones in the trace that match the Golden Path in sequence"
    # The requirement says: "percentage of milestones in the trace that match the Golden Path in sequence"
    # Actually, it says "percentage of milestones in the trace that match the Golden Path in sequence" 
    # but usually PAR is (matched golden milestones) / (total golden milestones).
    # Let's re-read: "calculate PAR (the percentage of milestones in the trace that match the Golden Path in sequence)"
    # If trace has 5 elements and 4 match the golden path, is it 4/5 or 4/4?
    # Usually, the Golden Path is the reference. 
    # If the trace is ["A", "B", "X", "C", "D"] and Golden is ["A", "B", "C", "D"], 
    # the trace followed the path perfectly, just with some extra noise.
    # If the trace is ["A", "C", "D"] and Golden is ["A", "B", "C", "D"], 
    # it missed "B", so PAR = 3/4 = 0.75.
    
    is_drifted, par, event = monitor.detect_drift("t2", trace, golden_path)
    assert par == 1.0 
    assert is_drifted is False

def test_missing_milestone_drift():
    monitor = DriftMonitor(threshold=0.8)
    golden_path = ["A", "B", "C", "D"]
    trace = ["A", "C", "D"] # Missing B
    
    is_drifted, par, event = monitor.detect_drift("t3", trace, golden_path)
    
    assert par == 0.75
    assert is_drifted is True
    assert isinstance(event, DriftEvent)
    assert event.par == 0.75

def test_out_of_order_drift():
    monitor = DriftMonitor(threshold=0.8)
    golden_path = ["A", "B", "C", "D"]
    trace = ["A", "C", "B", "D"] # B and C swapped
    
    # A matches.
    # C matches (current_trace_idx moves to index of C + 1).
    # B is before C, so it won't be found after C.
    # D matches.
    # Total matched: A, C, D = 3/4 = 0.75
    
    is_drifted, par, event = monitor.detect_drift("t4", trace, golden_path)
    assert par == 0.75
    assert is_drifted is True

def test_complete_drift():
    monitor = DriftMonitor(threshold=0.8)
    golden_path = ["A", "B", "C"]
    trace = ["X", "Y", "Z"]
    
    is_drifted, par, event = monitor.detect_drift("t5", trace, golden_path)
    assert par == 0.0
    assert is_drifted is True

def test_empty_trace():
    monitor = DriftMonitor(threshold=0.8)
    golden_path = ["A", "B", "C"]
    trace = []
    
    is_drifted, par, event = monitor.detect_drift("t6", trace, golden_path)
    assert par == 0.0
    assert is_drifted is True

def test_empty_golden_path():
    monitor = DriftMonitor(threshold=0.8)
    golden_path = []
    trace = ["A", "B", "C"]
    
    is_drifted, par, event = monitor.detect_drift("t7", trace, golden_path)
    assert par == 1.0
    assert is_drifted is False

def test_threshold_boundary():
    monitor = DriftMonitor(threshold=0.75)
    golden_path = ["A", "B", "C", "D"]
    trace = ["A", "C", "D"] # PAR = 0.75
    
    is_drifted, par, event = monitor.detect_drift("t8", trace, golden_path)
    # PAR is 0.75, threshold is 0.75. 0.75 < 0.75 is False.
    assert par == 0.75
    assert is_drifted is False
