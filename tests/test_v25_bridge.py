import unittest
from src.core.models import GoldenPath, GoldenPathStep, DriftMetric
from src.monitoring.telemetry_sink import DriftDetector
from src.governance.path_manager import PathManager
from src.discovery.path_generator import PathGenerator, PathValidator

class TestAutonomousBridge(unittest.TestCase):
    def test_drift_detection_flow(self):
        pm = PathManager()
        dd = DriftDetector(path_manager=pm)
        
        path = GoldenPath(
            agent_id="agent-001",
            task_id="task-verify-info",
            steps=[
                GoldenPathStep(
                    step_index=0,
                    intent="VERIFY_SOURCE",
                    required_keywords=["verify", "source"],
                    expected_behavior="Must verify source",
                    is_critical=True
                ),
                GoldenPathStep(
                    step_index=1,
                    intent="SYNTHESIZE",
                    required_keywords=["synthesize", "combine"],
                    expected_behavior="Must synthesize",
                    is_critical=True
                )
            ]
        )
        pm.promote_to_production(path)
        
        compliant_trace = [
            "Thought: I need to verify the source of this claim.",
            "Action: Search for source.",
            "Observation: Source found. I have verified the source.",
            "Thought: Now I will synthesize the answer.",
            "Action: Synthesize information.",
            "Observation: Result synthesized. CORRECT"
        ]
        
        metric = dd.detect_drift(
            trace_id="trace-1", 
            trace_entries=compliant_trace, 
            active_path=pm.get_active_path("agent-001")
        )
        self.assertFalse(metric.is_drifted)
        self.assertGreaterEqual(metric.path_adherence_rate, 0.8)

        drifted_trace = [
            "Thought: I'll just answer this based on my internal knowledge.",
            "Action: Generate answer.",
            "Observation: Result generated. CORRECT"
        ]
        
        metric = dd.detect_drift(
             trace_id="trace-2", 
             trace_entries=drifted_trace, 
             active_path=pm.get_active_path("agent-001")
        )
        self.assertTrue(metric.is_drifted)
        self.assertEqual(metric.drift_type, "Silent Failure")
        self.assertLess(metric.path_adherence_rate, 0.8)

    def test_path_discovery_and_validation(self):
        pg = PathGenerator()
        pv = PathValidator()
        
        cluster_traces = [
            {"entries": [{"content": "verify source"}, {"content": "synthesize result"}, {"content": "final check"}]},
            {"entries": [{"content": "check source"}, {"content": "combine info"}, {"content": "review final"}]},
            {"entries": [{"content": "verify source"}, {"content": "integrate data"}, {"content": "review final"}]},
        ]
        
        proposed_path = pg.generate_path(cluster_traces, "agent-001", "task-verify-info")
        
        validation_set = [
            {"entries": [{"content": "verify source"}, {"content": "synthesize result"}, {"content": "final check"}]},
            {"entries": [{"content": "check source"}, {"content": "combine info"}, {"content": "review final"}]},
        ]
        ear = pv.calculate_ear(proposed_path, validation_set)
        self.assertGreaterEqual(ear, 0.9)

if __name__ == "__main__":
    unittest.main()
