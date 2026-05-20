import re
from typing import List, Optional, Dict
from src.models import ReasoningTemplate, TemplateCategory, ProcessedTrace, PromptFix

class TemplateLibrary:
    def __init__(self):
        # In a real system, this would be backed by SQLite/JSON as per spec.
        # For now, we implement an in-memory store with a set of Gold Standard templates.
        self._templates: Dict[str, ReasoningTemplate] = {}
        self._initialize_gold_standards()

    def _initialize_gold_standards(self):
        """Initialize the library with the 'Gold Standard' templates defined in the spec."""
        gold_standards = [
            ReasoningTemplate(
                name="The Infinite Loop",
                category=TemplateCategory.LOOP,
                symptom_signature=r"(tool_call_.*){3,}", # Simplified regex for 3+ identical calls
                root_cause="Lack of termination condition or failure to process tool output",
                proven_fix="If you find yourself calling the same tool with the same arguments more than twice without progress, stop and re-evaluate your strategy. Explicitly state why the previous attempts failed before trying a different approach.",
                confidence_weight=0.95
            ),
            ReasoningTemplate(
                name="The Contradiction Gap",
                category=TemplateCategory.CONTRADICTION,
                symptom_signature=r"I previously stated .*?\n?.*?(but now I see|however, now I see|but I now see)", 
                root_cause="Failure to maintain state consistency across reasoning steps",
                proven_fix="When you encounter a contradiction in your own reasoning, you must explicitly resolve the conflict before proceeding. Document the correction clearly in your thought process.",
                confidence_weight=0.90
            ),
            ReasoningTemplate(
                name="Tool-Blindness",
                category=TemplateCategory.TOOL_BLINDNESS,
                symptom_signature=r"I don't have a tool to .*|I cannot find a way to .*",
                root_cause="Ignoring available tools in the system prompt",
                proven_fix="Review the available toolset carefully. Before concluding a task is impossible, verify if a combination of existing tools can achieve the goal.",
                confidence_weight=0.85
            ),
            ReasoningTemplate(
                name="Hallucinated Parameter",
                category=TemplateCategory.HALLUCINATION,
                symptom_signature=r"Invalid parameter .*|Unknown argument .*",
                root_cause="Assuming tool capabilities not defined in the spec",
                proven_fix="Strictly adhere to the tool definitions provided in the system prompt. Do not invent parameters or options that are not explicitly listed.",
                confidence_weight=0.98
            ),
            ReasoningTemplate(
                name="Reasoning Drift",
                category=TemplateCategory.DRIFT,
                symptom_signature=r"Moving on to .*|Actually, let's look at .*", # Simplified drift detection
                root_cause="Loss of focus on the primary objective",
                proven_fix="At the end of every thought block, explicitly relate your current action back to the primary objective to ensure alignment.",
                confidence_weight=0.80
            )
        ]
        for tmpl in gold_standards:
            self._templates[tmpl.template_id] = tmpl

    def get_all_templates(self) -> List[ReasoningTemplate]:
        return list(self._templates.values())

    def get_template(self, template_id: str) -> Optional[ReasoningTemplate]:
        return self._templates.get(template_id)

    def match_trace(self, trace: ProcessedTrace) -> List[PromptFix]:
        """
        Scans the trace for signatures defined in the library.
        Returns a list of suggested fixes based on matched templates.
        """
        suggestions = []
        # Combine all trace content into a single string for pattern matching
        full_trace_text = "\n".join([entry.content for entry in trace.entries])
        
        # Also consider tool usage patterns (for the 'Infinite Loop' etc)
        tool_calls_string = " ".join([
            f"tool_call_{entry.metadata.get('tool_name', 'unknown')}_{entry.metadata.get('args', '')}"
            for entry in trace.entries if entry.component == "Action"
        ])

        for tmpl in self._templates.values():
            # Use IGNORECASE and DOTALL to allow . to match newlines
            if re.search(tmpl.symptom_signature, full_trace_text, re.IGNORECASE | re.DOTALL) or \
               re.search(tmpl.symptom_signature, tool_calls_string, re.IGNORECASE | re.DOTALL):
                
                suggestions.append(PromptFix(
                    analysis=f"Matched proven failure pattern: {tmpl.name}",
                    suggested_modification=tmpl.proven_fix,
                    rationale=f"Root Cause: {tmpl.root_cause}",
                    confidence_score=str(tmpl.confidence_weight),
                    template_id=tmpl.template_id
                ))
        
        return suggestions

    def add_template(self, template: ReasoningTemplate):
        self._templates[template.template_id] = template
