from typing import List
import time
from src.models import ProcessedTrace, ExecutionReport, NarrativeSegment, ToolSummary, LogicAuditReport, ReasoningEvent
from litellm import completion
from src.telemetry import telemetry
from src.correction_engine import CorrectionEngine

class NarrativeEngine:
    def __init__(self, model: str = "gpt-4o"):
        self.model = model
        self.correction_engine = CorrectionEngine()

    def _build_prompt(self, trace: ProcessedTrace) -> str:
        log_text = "\n".join([
            f"[{e.timestamp}] {e.component}: {e.content}" 
            for e in trace.entries
        ])
        
        prompt = f"""
        You are a Forensic AI Analyst. Your goal is to perform a 'Logic Audit' on the following AI agent logs.
        Instead of summarizing what the agent did, you must diagnose HOW the agent reasoned and identify logical failures.

        ### Diagnostic Taxonomy:
        - [Reasoning Loop]: Agent repeats the same thought/tool call without new info.
        - [Contradiction]: Agent's current step contradicts previous conclusions or constraints.
        - [Strategic Pivot]: Agent explicitly recognizes failure and changes plan.
        - [Tool Hallucination]: Agent provides impossible arguments or ignores tool output.
        - [Information Gap]: Agent attempts a task without necessary prerequisite info.

        ### Instructions:
        1. Analyze the logs for the events listed in the taxonomy.
        2. Transform the logs into a narrative that highlights these diagnostic markers.
        3. Provide a Logic Audit Report including:
           - Critical Failures (Loops, Contradictions)
           - Pivot Analysis (where and why it pivoted)
           - Efficiency Score (Productive Steps vs Wasted Steps)

        Logs:
        {log_text}
        
        Please provide a structured response. 
        For the narrative, use the markers like [Reasoning Loop] directly in the text.
        """
        return prompt, log_text

    def synthesize(self, trace: ProcessedTrace) -> ExecutionReport:
        """
        Synthesizes a forensic narrative report from a ProcessedTrace.
        """
        start_time = time.time()
        prompt, log_text = self._build_prompt(trace)
        
        try:
            response = completion(
                model=self.model, 
                messages=[{"role": "user", "content": prompt}]
            )
            
            content = response.choices[0].message.content
            
        except Exception as e:
            telemetry.error("llm_synthesis_error", {"model": self.model, "error": str(e)})
            raise e
            
        telemetry.track_duration("llm_synthesis", start_time, {
            "model": self.model,
            "prompt_tokens": len(prompt), 
            "trace_id": trace.trace_id
        })
        
        return self._simulate_parsing(content, trace, log_text)

    def _simulate_parsing(self, text: str, trace: ProcessedTrace, log_text: str) -> ExecutionReport:
        # Mocking the parsing of the forensic LLM output
        # In a production system, this would use Pydantic output parsing.
        
        # We identify failures and trigger the CorrectionEngine for the "Fix-It" logic
        system_prompt = trace.system_prompt or "Standard Agent Prompt"
        
        # Simulate a detected loop
        loop_segment_text = "The agent is attempting the same search query for the third time. [Reasoning Loop]: The previous results were already processed."
        loop_fix = self.correction_engine.suggest_fix(
            system_prompt=system_prompt,
            trace=log_text if "API_TIMEOUT" in log_text else f"{log_text} API_TIMEOUT", # Force trigger for demo
            failure_type=ReasoningEvent.REASONING_LOOP
        )

        # Simulate a contradiction
        contradiction_segment_text = "The agent identifies the user as a Minor but then grants access based on Adult permissions. [Contradiction]."
        contradiction_fix = self.correction_engine.suggest_fix(
            system_prompt=system_prompt,
            trace=log_text if "User Age" in log_text else f"{log_text} User Age", # Force trigger for demo
            failure_type=ReasoningEvent.CONTRADICTION
        )

        narrative = [
            NarrativeSegment(
                timestamp=trace.entries[0].timestamp, 
                text="The agent started the task and identified the need to search.",
                is_kdp=True
            ),
            NarrativeSegment(
                timestamp=trace.entries[len(trace.entries)//2].timestamp, 
                text=loop_segment_text,
                is_kdp=True,
                event_type=ReasoningEvent.REASONING_LOOP,
                suggested_fix=loop_fix
            ),
            NarrativeSegment(
                timestamp=trace.entries[-1].timestamp, 
                text=contradiction_segment_text,
                is_kdp=True,
                event_type=ReasoningEvent.CONTRADICTION,
                suggested_fix=contradiction_fix
            ),
            NarrativeSegment(
                timestamp=trace.entries[-1].timestamp, 
                text="The agent finally pivoted to a different search term and found the answer. [Strategic Pivot].",
                is_kdp=True,
                event_type=ReasoningEvent.STRATEGIC_PIVOT
            )
        ]
        
        audit = LogicAuditReport(
            critical_failures=["Reasoning Loop detected at step 5", "Contradiction detected at final step"],
            pivot_analysis="Agent pivoted from keyword search to conceptual search after failing 3 times.",
            efficiency_score=0.6,
            detailed_findings=["Agent ignored output of search_tool in attempt 2 and 3.", "Agent contradicted user age constraint."]
        )

        return ExecutionReport(
            trace_id=trace.trace_id,
            summary="Task completed, but with significant reasoning inefficiencies and a contradiction.",
            narrative=narrative,
            tool_usage=[
                ToolSummary(
                    tool_name="search_tool", 
                    input="AI observability", 
                    output="Found 3 results", 
                    status="Success"
                )
            ],
            failure_analysis=None,
            duration_seconds=(trace.end_time - trace.start_time).total_seconds(),
            logic_audit=audit
        )
