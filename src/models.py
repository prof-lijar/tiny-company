from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

class LogComponent(str, Enum):
    THOUGHT = "Thought"
    ACTION = "Action"
    OBSERVATION = "Observation"
    SYSTEM = "System"

class ReasoningEvent(str, Enum):
    REASONING_LOOP = "[Reasoning Loop]"
    CONTRADICTION = "[Contradiction]"
    STRATEGIC_PIVOT = "[Strategic Pivot]"
    TOOL_HALLUCINATION = "[Tool Hallucination]"
    INFORMATION_GAP = "[Information Gap]"

class TemplateCategory(str, Enum):
    LOOP = "LOOP"
    CONTRADICTION = "CONTRADICTION"
    HALLUCINATION = "HALLUCINATION"
    DRIFT = "DRIFT"
    TOOL_BLINDNESS = "TOOL_BLINDNESS"

class ReasoningTemplate(BaseModel):
    template_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: TemplateCategory
    symptom_signature: str  # Regex or a specific pattern description
    root_cause: str
    proven_fix: str
    example_trace_id: Optional[str] = None
    version: int = 1
    confidence_weight: float = 1.0

class PromptFix(BaseModel):
    analysis: str
    suggested_modification: str
    rationale: str
    confidence_score: Optional[str] = "Medium"
    template_id: Optional[str] = None  # Linked to a template if applicable

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
    system_prompt: Optional[str] = None

class NarrativeSegment(BaseModel):
    timestamp: datetime
    text: str
    is_kdp: bool = False  # Key Decision Point
    event_type: Optional[ReasoningEvent] = None
    suggested_fix: Optional[PromptFix] = None

class ToolSummary(BaseModel):
    tool_name: str
    input: str
    output: str
    status: str

class LogicAuditReport(BaseModel):
    critical_failures: List[str] = Field(default_factory=list)
    pivot_analysis: Optional[str] = None
    efficiency_score: float = 0.0 # Ratio of productive vs wasted steps
    detailed_findings: List[str] = Field(default_factory=list)

class ExecutionReport(BaseModel):
    trace_id: str
    summary: str
    narrative: List[NarrativeSegment]
    tool_usage: List[ToolSummary]
    failure_analysis: Optional[str] = None
    duration_seconds: float
    logic_audit: Optional[LogicAuditReport] = None
