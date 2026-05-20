from typing import List, Dict, Any, Optional
import time
import re
from src.models import ProcessedTrace, ExecutionReport, NarrativeSegment, ToolSummary, LogicAuditReport, ReasoningEvent
from litellm import completion
from src.telemetry import telemetry
from src.correction_engine import CorrectionEngine

class NarrativeEngine:
    def __init__(self, model: str = "gpt-4o"):
        self.model = model
        self.correction_engine = CorrectionEngine(model=model)

    def _build_prompt(self, trace: ProcessedTrace) -> str:
        log_text = "\n".join([
            f"[{e.timestamp}] {e.component}: {e.content}" 
            for e in trace.entries
        ])
        
        prompt = f\"\"\"
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
        \"\"\"
        return prompt, log_text

    def synthesize(self, trace: ProcessedTrace) -> ExecutionReport:
        \"\"\"
        Synthesizes a forensic narrative report from a ProcessedTrace.
        Now implementing real v2.2 logic: detecting failures and suggesting fixes.
        \"\"\"
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
        
        return self._parse_and_enrich(content, trace, log_text)

    def _parse_and_enrich(self, text: str, trace: ProcessedTrace, log_text: str) -> ExecutionReport:
        \"\"\"
        Parses the LLM output, identifies ReasoningEvents, and calls CorrectionEngine for fixes.
        \"\"\"
        system_prompt = trace.system_prompt or "Standard Agent Prompt"
        
        # 1. Extract Narrative Segments
        # We look for paragraphs or sentences containing our taxonomy markers
        segments = []
        lines = text.split('\\n')
        
        # Simple heuristic: split by double newline or markers
        # In a production system, we would use a more robust Pydantic-based structured output
        current_text = []
        
        for line in lines:
            if not line.strip():
                if current_text:
                    segments.append(" ".join(current_text))
                    current_text = []
                continue
            current_text.append(line)
            
        if current_text:
            segments.append(" ".join(current_text))

        # 2. Process segments and enrich with Fix-It logic
        enriched_narrative = []
        detected_failures = []
        
        # Map markers to ReasoningEvent enum
        marker_map = {
            "[Reasoning Loop]": ReasoningEvent.REASONING_LOOP,
            "[Contradiction]": ReasoningEvent.CONTRADICTION,
            "[Strategic Pivot]": ReasoningEvent.STRATEGIC_PIVOT,
            "[Tool Hallucination]": ReasoningEvent.TOOL_HALLUCINATION,
            "[Information Gap]": ReasoningEvent.INFORMATION_GAP,
        }

        # We distribute the segments across the trace timeline for approximation
        # (Since the LLM narrative is a summary, we map it to trace timestamps)
        timestamp_points = [
            trace.entries[0].timestamp,
            trace.entries[len(trace.entries)//2].timestamp if len(trace.entries) > 1 else trace.entries[0].timestamp,
            trace.entries[-1].timestamp
        ]
        
        for i, seg_text in enumerate(segments):
            event_type = None
            suggested_fix = None
            
            # Check for markers
            for marker, event in marker_map.items():
                if marker in seg_text:
                    event_type = event
                    # Trigger Fix-It logic for critical failures
                    if event in [ReasoningEvent.REASONING_LOOP, ReasoningEvent.CONTRADICTION]:
                        suggested_fix = self.correction_engine.suggest_fix(
                            system_prompt=system_prompt,
                            trace=log_text,
                            failure_type=marker
                        )
                        detected_failures.append(f"{marker} detected in narrative")
                    break
            
            # Assign a timestamp based on index (simplified)
            ts_idx = min(i, len(timestamp_points) - 1)
            
            enriched_narrative.append(NarrativeSegment(
                timestamp=timestamp_points[ts_idx],
                text=seg_text,
                is_kdp=(event_type is not None),
                event_type=event_type,
                suggested_fix=suggested_fix
            ))

        # 3. Extract Logic Audit Report (Simplified parsing of the end of the response)
        # We look for keywords like "Efficiency Score" or "Critical Failures"
        efficiency_score = 0.0
        score_match = re.search(r"Efficiency Score:\s*([\d.]+)", text)
        if score_match:
            efficiency_score = float(score_match.group(1))

        audit = LogicAuditReport(
            critical_failures=detected_failures,
            pivot_analysis="Extracted from forensic narrative." if ReasoningEvent.STRATEGIC_PIVOT in [s.event_type for s in enriched_narrative] else None,
            efficiency_score=efficiency_score,
            detailed_findings=[s.text for s in enriched_narrative if s.event_type is not None]
        )

        return ExecutionReport(
            trace_id=trace.trace_id,
            summary="Forensic analysis complete. Reasoning IDE markers applied.",
            narrative=enriched_narrative,
            tool_usage=[], # Tool usage is typically handled by the parser/storage
            failure_analysis=f"Detected {len(detected_failures)} critical reasoning failures.",
            duration_seconds=(trace.end_time - trace.start_time).total_seconds(),
            logic_audit=audit
        )
