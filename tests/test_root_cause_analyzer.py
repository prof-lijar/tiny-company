import pytest
from src.v3.root_cause_analyzer import RootCauseAnalyzer, TraceStep

def test_rca_logic_drift():
    analyzer = RootCauseAnalyzer()
    golden_path = ["Start", "Analyze", "Verify", "Respond"]
    trace = [
        TraceStep("Start", "Starting process..."),
        TraceStep("Analyze", "Analyzing data..."),
        # Missing Verify
        TraceStep("Respond", "Here is the result...")
    ]
    
    report = analyzer.analyze("t1", trace, golden_path)
    
    assert report["category"] == "LOGIC_DRIFT"
    assert report["divergence_milestone"] == "Verify"
    assert "Expected: Verify | Actual: Respond" in report["reasoning_diff"]

def test_rca_constraint_violation():
    analyzer = RootCauseAnalyzer()
    golden_path = ["Start", "Safety Check", "Analyze", "Respond"]
    trace = [
        TraceStep("Start", "Starting process..."),
        TraceStep("Analyze", "Analyzing data..."),
        TraceStep("Respond", "Here is the result...")
    ]
    
    report = analyzer.analyze("t2", trace, golden_path)
    
    assert report["category"] == "CONSTRAINT_VIOLATION"
    assert report["divergence_milestone"] == "Safety Check"
    assert "Constraint Violation" in report["suggested_fix_category"]

def test_rca_hallucination():
    analyzer = RootCauseAnalyzer()
    golden_path = ["Start", "Analyze", "Respond"]
    trace = [
        TraceStep("Start", "Starting process..."),
        TraceStep("Analyze", "Analyzing data..."),
        TraceStep("Unexpected Fact", "I assume the user is from Mars..."), # Divergence point
        TraceStep("Respond", "Greetings Martian!")
    ]
    
    report = analyzer.analyze("t3", trace, golden_path)
    
    assert report["category"] == "HALLUCINATION"
    assert "Hallucination" in report["suggested_fix_category"]

def test_rca_perfect_adherence():
    analyzer = RootCauseAnalyzer()
    golden_path = ["Start", "Analyze", "Respond"]
    trace = [
        TraceStep("Start", "Starting..."),
        TraceStep("Analyze", "Analyzing..."),
        TraceStep("Respond", "Done.")
    ]
    
    report = analyzer.analyze("t4", trace, golden_path)
    
    assert report["category"] == "LOGIC_DRIFT"
    assert report["divergence_milestone"] == "N/A"

def test_rca_empty_trace():
    analyzer = RootCauseAnalyzer()
    golden_path = ["Start", "Analyze", "Respond"]
    trace = []
    
    report = analyzer.analyze("t5", trace, golden_path)
    
    assert report["category"] == "LOGIC_DRIFT"
    assert report["divergence_milestone"] == "Start"
