import json
from typing import List, Dict, Any, Optional
from src.models import PromptFix, ProcessedTrace
from litellm import completion
from src.telemetry import telemetry
from src.template_library import TemplateLibrary
import time

# The Meta-Prompt is the core logic. It instructs a high-intelligence LLM 
# to act as a Prompt Engineer specializing in reasoning traces.
META_PROMPT = """
You are an expert AI Prompt Engineer specializing in Agentic Reasoning.
Your task is to analyze a reasoning trace that has failed due to a [Reasoning Loop] or [Contradiction] 
and suggest a precise modification to the System Prompt to prevent this failure.
"""

class CorrectionEngine:
    def __init__(self, model: str = "gpt-4o", template_library: Optional[TemplateLibrary] = None):
        self.model = model
        self.template_library = template_library or TemplateLibrary()

    def suggest_fix(self, system_prompt: str, trace: Any, failure_type: str) -> PromptFix:
        """
        Suggests a fix for a reasoning failure. 
        Prioritizes Template Library matches over dynamic LLM generation.
        """
        # 1. Try Template Library First (Deterministic Correction)
        if isinstance(trace, ProcessedTrace):
            template_fixes = self.template_library.match_trace(trace)
            if template_fixes:
                # Return the highest confidence template fix
                best_fix = max(template_fixes, key=lambda x: float(x.confidence_score) if x.confidence_score.replace('.','').isdigit() else 0)
                telemetry.info("template_hit", {"template_id": best_fix.template_id})
                return best_fix

        # 2. Fallback to Dynamic LLM Generation (Stochastic Correction)
        return self._generate_dynamic_fix(system_prompt, str(trace), failure_type)

    def _generate_dynamic_fix(self, system_prompt: str, trace_text: str, failure_type: str) -> PromptFix:
        """
        Calls the LLM with the META_PROMPT to generate a prompt fix.
        """
        start_time = time.time()
        
        user_content = f"""
Original System Prompt: {system_prompt}
Reasoning Trace: {trace_text}
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
