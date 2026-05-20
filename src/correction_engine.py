import json
from typing import List, Dict, Any, Optional
from src.models import PromptFix
from litellm import completion
from src.telemetry import telemetry
import time

# The Meta-Prompt is the core logic. It instructs a high-intelligence LLM 
# to act as a Prompt Engineer specializing in reasoning traces.
META_PROMPT = """
You are an expert AI Prompt Engineer specializing in Agentic Reasoning.
Your task is to analyze a reasoning trace that has failed due to a [Reasoning Loop] or [Contradiction] 
and suggest a precise modification to the System Prompt to prevent this failure.

### INPUTS:
1. Original System Prompt: The prompt currently guiding the agent.
2. Reasoning Trace: The sequence of thoughts and actions leading to the failure.
3. Failure Type: Either [Reasoning Loop] or [Contradiction].

### ANALYSIS GUIDELINES:
- For [Reasoning Loop]: Identify the "cycle point". Why is the agent returning to the same state? 
  Is it missing a termination condition? Is it failing to update its internal state?
- For [Contradiction]: Identify the two conflicting statements. Why did the agent ignore the first 
  fact when stating the second? Is there a conflict in instructions?

### OUTPUT FORMAT:
Your response must be a valid JSON object with the following keys:
- "analysis": A brief explanation of why the failure occurred.
- "suggested_modification": The exact text to be added or changed in the system prompt.
- "rationale": Why this specific modification will solve the problem.
- "confidence_score": (Low/Medium/High)

Example Output:
{
  "analysis": "The agent is looping because it doesn't know how to handle a '404 Not Found' response, so it retries the same request indefinitely.",
  "suggested_modification": "If you encounter a 404 error, do not retry the request; instead, log the missing resource and move to the next item in the list.",
  "rationale": "Adding an explicit exit condition for 404 errors breaks the loop.",
  "confidence_score": "High"
}
"""

class CorrectionEngine:
    def __init__(self, model: str = "gpt-4o"):
        self.model = model

    def suggest_fix(self, system_prompt: str, trace: str, failure_type: str) -> PromptFix:
        """
        Calls the LLM with the META_PROMPT to generate a prompt fix.
        """
        start_time = time.time()
        
        user_content = f"""
Original System Prompt: {system_prompt}
Reasoning Trace: {trace}
Failure Type: {failure_type}
"""
        
        try:
            response = completion(
                model=self.model,
                messages=[
                    {"role": "system", "content": META_PROMPT},
                    {"role": "user", "content": user_content}
                ],
                response_format={ "type": "json_object" }
            )
            
            result = json.loads(response.choices[0].message.content)
            
            telemetry.track_duration("suggest_fix_llm", start_time, {
                "model": self.model,
                "failure_type": failure_type
            })
            
            return PromptFix(
                analysis=result.get("analysis", "No analysis provided."),
                suggested_modification=result.get("suggested_modification", "No modification suggested."),
                rationale=result.get("rationale", "No rationale provided."),
                confidence_score=result.get("confidence_score", "Medium")
            )
            
        except Exception as e:
            telemetry.error("suggest_fix_error", {"error": str(e)})
            # Fallback to a basic fix to avoid crashing the pipeline
            return PromptFix(
                analysis=f"Error generating fix: {str(e)}",
                suggested_modification="Ensure the agent verifies each step before proceeding.",
                rationale="Fallback generic fix applied due to LLM error.",
                confidence_score="Low"
            )
