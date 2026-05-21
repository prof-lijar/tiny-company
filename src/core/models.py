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

# --- v2.2.2 Verification Loop Models ---

class GoldStandard(BaseModel):
    input_text: str
    expected_output: str
    critical_constraints: List[str] = Field(default_factory=list)

class VerificationSet(BaseModel):
    set_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    cases: List[GoldStandard]

class VerificationStatus(str, Enum):
    SUCCESS = "SUCCESS"
    FAILURE = "FAILURE"
    REGRESSION = "REGRESSION"

class VerificationResult(BaseModel):
    status: VerificationStatus
    trigger_resolved: bool
    benchmark_passed: bool
    details: str
    metrics: Dict[str, Any] = Field(default_factory=dict)

# --- v2.3 Intelligence Layer Models ---

class ReasoningPattern(BaseModel):
    pattern_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    failure_description: str
    failure_embedding: Optional[bytes] = None
    correction_prompt: str
    project_id: str
    success_rate: float = 1.0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ReasoningTest(BaseModel):
    test_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    input_text: str
    expected_cognitive_path: List[str]  # Keywords or steps that MUST appear
    expected_output: str
    priority: str = "medium"

class PruningReport(BaseModel):
    trace_id: str
    original_token_count: int
    suggested_token_count: int
    efficiency_score: float  # Actual Steps / Minimum Required Steps
    bloat_segments: List[Dict[str, Any]] = Field(default_factory=list) # {segment: ..., reason: ...}
    suggested_prompt_modifications: List[str] = Field(default_factory=list)

class FragilityReport(BaseModel):
    prompt_id: str
    total_tests_run: int
    failure_rate: float
    critical_weak_points: List[str] = Field(default_factory=list)
    adversarial_examples: List[Dict[str, Any]] = Field(default_factory=list)

# --- v2.5 Autonomous Bridge Models ---

class GoldenPathStep(BaseModel):
    step_index: int
    intent: str  # e.g., "VERIFY_SOURCE", "SYNTHESIZE_ANSWER"
    required_keywords: List[str] = Field(default_factory=list)
    expected_behavior: str
    is_critical: bool = True

class GoldenPath(BaseModel):
    path_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    agent_id: str
    task_id: str
    version: int = 1
    steps: List[GoldenPathStep]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    metadata: Dict[str, Any] = Field(default_factory=dict)

class DriftMetric(BaseModel):
    trace_id: str
    path_id: str
    path_adherence_rate: float  # 0.0 to 1.0
    is_drifted: bool
    drift_type: Optional[str] = None  # e.g., "Silent Failure", "Catastrophic Divergence"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

# --- v3.0 Shadow Verification Models ---

class TestCaseResult(BaseModel):
    test_id: str
    test_name: str
    baseline_passed: bool
    healed_passed: bool
    baseline_path_adherence: float
    healed_path_adherence: float
    status: str  # 'FIXED', 'REGRESSION', 'NO_CHANGE', 'STILL_FAILING'

class ShadowVerificationReport(BaseModel):
    fix_id: str
    total_tests: int
    passed_baseline: int
    passed_healed: int
    fixed_count: int
    regression_count: int
    stability_gain: float  # (Healed PAR - Baseline PAR) / Total Tests
    detailed_results: List[TestCaseResult]

# --- v3.0 Healing Proposal Models ---

class ProposalStatus(str, Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    DEPLOYED = "DEPLOYED"

class HealingProposal(BaseModel):
    proposal_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    drift_event: Dict[str, Any]
    rca_report: Dict[str, Any]
    proposed_fix: PromptFix
    verification_report: ShadowVerificationReport
    status: ProposalStatus = ProposalStatus.PENDING
    created_at: datetime = Field(default_factory=datetime.utcnow)
    approved_by: Optional[str] = None
    deployed_at: Optional[datetime] = None
