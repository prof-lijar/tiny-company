import logging
import json
import time
from datetime import datetime
from typing import Any, Dict, Optional

class Telemetry:
    """
    A simple telemetry system for structured logging and performance tracking.
    In a real production system, this would integrate with Prometheus, ELK, or Datadog.
    """
    def __init__(self, service_name: str = "TraceWhisper"):
        self.service_name = service_name
        self.logger = logging.getLogger(service_name)
        self.logger.setLevel(logging.INFO)
        
        # Avoid duplicate handlers if Telemetry is instantiated multiple times
        if not self.logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter('%(message)s')
            handler.setFormatter(formatter)
            self.logger.addHandler(handler)

    def _log(self, level: str, event: str, data: Optional[Dict[str, Any]] = None):
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "service": self.service_name,
            "level": level,
            "event": event,
            "data": data or {}
        }
        self.logger.log(getattr(logging, level.upper()), json.dumps(log_entry))

    def info(self, event: str, data: Optional[Dict[str, Any]] = None):
        self._log("INFO", event, data)

    def warn(self, event: str, data: Optional[Dict[str, Any]] = None):
        self._log("WARNING", event, data)

    def error(self, event: str, data: Optional[Dict[str, Any]] = None):
        self._log("ERROR", event, data)

    def track_duration(self, event: str, start_time: float, data: Optional[Dict[str, Any]] = None):
        duration = time.time() - start_time
        payload = data or {}
        payload["duration_seconds"] = round(duration, 4)
        self.info(f"{event}_duration", payload)

# Global telemetry instance
telemetry = Telemetry()
