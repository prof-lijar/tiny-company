import json
from typing import List, Dict, Any

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
Your response must be a JSON object with the following keys:
- "analysis": A brief explanation of why the failure occurred.
- "suggested_modification": The exact text to be added or changed in the system prompt.
- "rationale": Why this specific modification will solve the problem.

Example Output:
{{
  "analysis": "The agent is looping because it doesn't know how to handle a '404 Not Found' response, so it retries the same request indefinitely.",
  "suggested_modification": "If you encounter a 404 error, do not retry the request; instead, log the missing resource and move to the next item in the list.",
  "rationale": "Adding an explicit exit condition for 404 errors breaks the loop."
}}
"""

class CorrectionEngine:
    def __init__(self, llm_client=None):
        self.llm_client = llm_client

    def suggest_fix(self, system_prompt: str, trace: str, failure_type: str) -> Dict[str, Any]:
        """
        In a real implementation, this would call an LLM with the META_PROMPT.
        For this prototype, we simulate the LLM response based on the failure type and trace.
        """
        print(f"--- Analyzing {failure_type} ---")
        
        # Simulating the LLM's process of using the META_PROMPT
        # In production: response = self.llm_client.generate(prompt=META_PROMPT + inputs)
        
        if "[Reasoning Loop]" in failure_type and "API_TIMEOUT" in trace:
            return {
                "analysis": "The agent is stuck in a retry loop due to API timeouts without a maximum retry limit.",
                "suggested_modification": "Limit API retries to 3 attempts. If the timeout persists, escalate the error and stop.",
                "rationale": "Imposing a hard limit on retries prevents infinite loops in unstable network conditions."
            }
        elif "[Contradiction]" in failure_type and "User Age" in trace:
            return {
                "analysis": "The agent first identified the user as 'Minor' but later processed the request as 'Adult'.",
                "suggested_modification": "Once a user's age category is determined, it must be treated as a global constant for the remainder of the session. Do not re-evaluate or contradict this fact.",
                "rationale": "Explicitly defining the age as a constant prevents state drift during complex reasoning."
            }
        else:
            return {
                "analysis": "General reasoning failure detected.",
                "suggested_modification": "Ensure you explicitly verify the output of each step before proceeding to the next.",
                "rationale": "Adding a verification step increases the probability of detecting errors early."
            }

def run_prototype():
    engine = CorrectionEngine()
    
    test_cases = [
        {
            "name": "API Timeout Loop",
            "system_prompt": "You are a data retrieval agent.",
            "trace": "Step 1: Fetch data -> API_TIMEOUT. Step 2: Retry Fetch data -> API_TIMEOUT. Step 3: Retry Fetch data -> API_TIMEOUT. [Reasoning Loop]",
            "failure_type": "[Reasoning Loop]"
        },
        {
            "name": "User Age Contradiction",
            "system_prompt": "You are a compliance officer.",
            "trace": "Step 1: User Age is 15 (Minor). Step 2: Check permissions. Step 3: Since user is Adult, grant access. [Contradiction]",
            "failure_type": "[Contradiction]"
        }
    ]
    
    results = []
    for case in test_cases:
        print(f"Testing Case: {case['name']}")
        suggestion = engine.suggest_fix(case['system_prompt'], case['trace'], case['failure_type'])
        results.append({"case": case['name'], "suggestion": suggestion})
        print(json.dumps(suggestion, indent=2))
        print("\n")
        
    return results

if __name__ == "__main__":
    run_prototype()
