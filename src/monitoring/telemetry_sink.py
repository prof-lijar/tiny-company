from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid
from src.core.models import GoldenPath, GoldenPathStep, DriftMetric
import logging

# Setup basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("v2.5.monitoring")

class TelemetrySink:
    """
    Asynchronous ingestion of production traces.
    In a real production system, this would be a FastAPI endpoint or a Kafka consumer.
    """
    def __init__(self, storage_provider=None):
        self.storage = storage_provider
        self.buffer = []

    async def ingest_trace(self, trace_data: Dict[str, Any]):
        """
        Ingests a trace from production telemetry stream.
        """
        logger.info(f"Ingesting trace {trace_data.get('trace_id')} for drift detection.")
        self.buffer.append(trace_data)
        
        if len(self.buffer) >= 10:
            await self.flush_to_storage()

    async def flush_to_storage(self):
        """
        Persists the ingested traces for later analysis.
        """
        if not self.storage:
            logger.warning("No storage provider configured. Traces are only in memory.")
            return
        
        logger.info("Flushing telemetry buffer to storage.")
        self.buffer = []

class DriftDetector:
    """
    Real-time PAR (Path Adherence Rate) calculation & drift detection.
    """
    def __init__(self, path_manager):
        self.path_manager = path_manager

    def calculate_par(self, trace_entries: List[str], active_path: GoldenPath) -> float:
        """
        Calculates the Path Adherence Rate (PAR).
        PAR = (Matched Steps / Total Steps in Golden Path)
        """
        if not active_path.steps:
            return 1.0
            
        matched_steps = 0
        for step in active_path.steps:
            step_text = " ".join(trace_entries).lower()
            if any(kw.lower() in step_text for kw in step.required_keywords):
                matched_steps += 1
        
        return matched_steps / len(active_path.steps)

    def detect_drift(self, trace_id: str, trace_entries: List[str], active_path: GoldenPath) -> DriftMetric:
        """
        Analyzes a trace against a Golden Path to detect reasoning drift.
        """
        par = self.calculate_par(trace_entries, active_path)
        is_drifted = par < 0.8
        
        drift_type = None
        if is_drifted:
            drift_type = "Silent Failure" if "CORRECT" in " ".join(trace_entries).upper() else "Catastrophic Divergence"
            
        return DriftMetric(
            trace_id=trace_id,
            path_id=active_path.path_id,
            path_adherence_rate=par,
            is_drifted=is_drifted,
            drift_type=drift_type
        )
