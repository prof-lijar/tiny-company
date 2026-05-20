from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class LogComponent(str, Enum):
    THOUGHT = "Thought"
    ACTION = "Action"
    OBSERVATION = "Observation"
    SYSTEM = "System"

class RawLogEntry(BaseModel):
    timestamp: datetime
    trace_id: str
    level: str
    component: LogComponent
    content: str
    metadata: Dict[str, Any] = Field(default_factory=dict)

class ProcessedTrace(BaseModel):
    trace_id: str
    entries: List[RawLogEntry]
    start_time: datetime
    end_time: datetime

class NarrativeSegment(BaseModel):
    timestamp: datetime
    text: str
    is_kdp: bool = False  # Key Decision Point

class ToolSummary(BaseModel):
    tool_name: str
    input: str
    output: str
    status: str

class ExecutionReport(BaseModel):
    trace_id: str
    summary: str
    narrative: List[NarrativeSegment]
    tool_usage: List[ToolSummary]
    failure_analysis: Optional[str] = None
    duration_seconds: float
