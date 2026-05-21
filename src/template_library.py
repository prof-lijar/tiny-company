import re
from typing import List, Optional, Dict
from src.core.models import ReasoningTemplate, TemplateCategory, ProcessedTrace, PromptFix

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
                symptom_signature=r"(.+?)\s+\1\s+\1", # Matches any pattern that repeats 3 times
                root_cause="Lack of termination condition or failure to process tool output",
                proven_fix="If you have called the same tool with the same arguments more than twice without receiving new information, stop and re-evaluate your strategy. Do not repeat the same call a third time; instead, pivot your strategy or report the limitation.",
                confidence_weight=0.95
            ),
            ReasoningTemplate(
                name="The Contradiction Gap",
                category=TemplateCategory.CONTRADICTION,
                symptom_signature=r"I previously stated .*?\n?.*?(but now I see|however, now I see|but I now see)", 
                root_cause="Lack of a working memory verification step",
                proven_fix="Before committing to a conclusion, explicitly cross-reference it with your previous thoughts in this trace. If you find a contradiction, pause and explain the discrepancy before proceeding.",
                confidence_weight=0.90
            ),
            ReasoningTemplate(
                name="The Tool-Blindness",
                category=TemplateCategory.TOOL_BLINDNESS,
                symptom_signature=r"(?s)Tool returns .*?Agent Thought: (?:the tool successfully retrieved|it seems the tool worked)|I don't have a tool to calculate",
                root_cause="Ignoring actual observation from the environment / Hallucinating output or missing tool awareness",
                proven_fix="When a tool returns a result, you must explicitly summarize the key finding from that output in your next 'Thought' block before deciding on the next action. Do not assume the outcome of a tool call before it has returned.",
                confidence_weight=0.85
            ),
            ReasoningTemplate(
                name="The Goal Drift",
                category=TemplateCategory.DRIFT,
                symptom_signature=r"(?s)(?:Step|Thought) \d+.*?(?:focusing on|researching|looking at) .*? (?:for more than 3 steps|extensively)",
                root_cause="Lack of Goal Persistence instructions",
                proven_fix="At every 3rd step, explicitly state your current progress relative to the primary goal: [Primary Goal]. If you find yourself focusing on a sub-task for more than 3 steps, evaluate if this is essential to the primary goal or a distraction.",
                confidence_weight=0.80
            ),
            ReasoningTemplate(
                name="The Hallucination Spiral",
                category=TemplateCategory.HALLUCINATION,
                symptom_signature=r"Invalid parameter .*|Unknown argument .*|Unknown tool .*",
                root_cause="Over-reliance on internal weights over the provided system context",
                proven_fix="You are strictly limited to the tools provided in the current session. Before calling a tool, verify its name and parameters against the provided tool definitions. Do not invent tools or parameters based on prior knowledge.",
                confidence_weight=0.98
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
            f"tool_call_{entry.metadata.get('tool_name', 'unknown')} {entry.metadata.get('args', '')}"
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
