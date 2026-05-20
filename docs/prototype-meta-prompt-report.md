# Prototype Report: Automated Prompt Suggestions (Meta-Prompt)

## Overview
This prototype implements the core logic for the "Fix-It" button planned for v2.2. The goal is to move from simply detecting reasoning errors (Loops and Contradictions) to suggesting actionable prompt modifications.

## Implementation Details
- **Meta-Prompt:** I have designed a specialized prompt that instructs a high-intelligence LLM to act as a Prompt Engineer. It focuses on identifying the "cycle point" for loops and "conflicting statements" for contradictions.
- **Correction Engine:** A Python prototype (`src/correction_engine.py`) that takes a system prompt, a trace, and a failure type to generate a structured JSON suggestion containing:
    - `analysis`: Root cause of the failure.
    - `suggested_modification`: The exact text to add to the system prompt.
    - `rationale`: Why this fix works.

## Effectiveness and Observations
- **Reasoning Loops:** The prototype successfully identifies that loops are often caused by missing termination conditions or failure to handle specific error states (e.g., API timeouts).
- **Contradictions:** The prototype identifies that contradictions often stem from "state drift" where a fact established early in the trace is ignored later.
- **Actionability:** By requiring a specific `suggested_modification` string, the output is directly applicable to the user's system prompt, reducing the manual effort of prompt engineering.

## Next Steps for v2.2
1. Integrate the `CorrectionEngine` with a live LLM (e.g., GPT-4o or Claude 3.5 Sonnet).
2. Connect the engine to the TraceWhisper UI/CLI via the "Fix-It" button.
3. Implement the Comparative Trace Analysis (P1) to verify if a suggested fix actually improves the Efficiency Score.
