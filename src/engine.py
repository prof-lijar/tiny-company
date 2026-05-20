from typing import List
from src.models import ProcessedTrace, ExecutionReport, NarrativeSegment, ToolSummary
from litellm import completion

class NarrativeEngine:
    def __init__(self, model: str = "gpt-4o"):
        self.model = model

    def _build_prompt(self, trace: ProcessedTrace) -> str:
        log_text = "\n".join([
            f"[{e.timestamp}] {e.component}: {e.content}" 
            for e in trace.entries
        ])
        
        prompt = f"""
        Analyze the following AI agent logs and transform them into a cohesive narrative.
        
        Logs:
        {log_text}
        
        Please provide a structured response in the following format:
        1. Executive Summary: A high-level result (Success/Failure) and total duration.
        2. The Journey: A chronological narrative of the agent's logic (why it did what it did).
        3. Tool Usage: A list of tools called, their inputs, and outcomes.
        4. Failure Analysis: If the agent failed, explain the breaking point.
        
        Be concise and focus on Key Decision Points (KDPs).
        """
        return prompt

    def synthesize(self, trace: ProcessedTrace) -> ExecutionReport:
        """
        Synthesizes a narrative report from a ProcessedTrace.
        """
        prompt = self._build_prompt(trace)
        
        response = completion(
            model=self.model, 
            messages=[{"role": "user", "content": prompt}]
        )
        
        # In a real implementation, we would use Pydantic output parsing 
        # to convert the LLM string into an ExecutionReport object.
        # For this MVP, we will simulate the parsing.
        
        return self._simulate_parsing(response.choices[0].message.content, trace)

    def _simulate_parsing(self, text: str, trace: ProcessedTrace) -> ExecutionReport:
        # This is a mock-up of the parsing logic for the MVP.
        # It would actually parse the LLM's markdown output into the Pydantic models.
        return ExecutionReport(
            trace_id=trace.trace_id,
            summary="The agent successfully completed the task.",
            narrative=[
                NarrativeSegment(
                    timestamp=trace.entries[0].timestamp, 
                    text="The agent started the task and identified the need to search for information.",
                    is_kdp=True
                ),
                NarrativeSegment(
                    timestamp=trace.entries[-1].timestamp, 
                    text="The agent found the correct answer and finalized the report.",
                    is_kdp=False
                )
            ],
            tool_usage=[
                ToolSummary(
                    tool_name="search_tool", 
                    input="AI observability", 
                    output="Found 3 results", 
                    status="Success"
                )
            ],
            failure_analysis=None,
            duration_seconds=(trace.end_time - trace.start_time).total_seconds()
        )
