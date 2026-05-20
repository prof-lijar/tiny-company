# Product Roadmap: TraceWhisper

This roadmap outlines the evolution of TraceWhisper from a basic narrative parser to a comprehensive "Reasoning IDE" for AI Agents.

## v1.0: The Foundation (The Narrative Parser)
**Goal:** Turn raw JSON logs into human-readable stories.
- **Narrative Engine:** Implementation of the `Thought -> Action -> Observation` synthesis.
- **Basic CLI:** `tw parse` for static log files.
- **Markdown Reporting:** Generation of "The Journey" and Executive Summaries.
- **Initial Framework Support:** Basic JSON log ingestion.
- **Status:** ✅ Completed

## v2.0: The Live Observability Era (The Beta)
**Goal:** Move from post-mortem analysis to real-time observation.
- **Live Streaming:** Implementation of `tw live` for real-time narrative synthesis.
- **SDK Integration:** Direct SDK for capturing traces without manual log exports.
- **Narrative Synthesis v2:** Improved prompts for higher fidelity and reduced hallucination.
- **Beta Cohort Launch:** Initial user feedback loop and product-market fit validation.
- **Status:** ✅ Completed

## v2.1: Frictionless Entry & Debug-First Tuning
**Goal:** Remove all barriers to the "Aha! Moment" and shift positioning to a "Reasoning IDE."
- **Frictionless Onboarding:** 
    - Click-wrap legal agreements.
    - Framework-specific "copy-paste" recipes (LangChain, CrewAI, AutoGen).
    - Enhanced First-Run CLI guidance.
- **Debug-First Narrative:** 
    - Forensic Analyst persona for the LLM.
    - Diagnostic Taxonomy: `[Reasoning Loop]`, `[Contradiction]`, `[Strategic Pivot]`, `[Tool Hallucination]`.
    - Visual "Aha!" markers in the CLI (color-coded alerts).
- **SDK Robustness:** Prevention of silent failures during initialization.
- **Status:** ✅ Completed

## v2.2: From Detection to Correction (Current Focus)
**Goal:** Close the loop between seeing a bug and fixing it.
- **Automated Prompt Suggestions:** The "Fix-It" button that suggests system prompt changes to resolve detected loops.
- **Comparative Trace Analysis:** A/B testing for reasoning (comparing "Efficiency Scores" between prompt versions).
- **Interactive Break-points:** Ability to pause agent execution upon detection of a `[Contradiction]` and manually inject a correction.
- **Team Logic Sharing:** Shareable URLs for Logic Audit Reports to enable collaborative debugging.
- **CI/CD Guardrails:** Automated builds failure if reasoning regressions (loops/contradictions) are detected in gold-standard tests.
- **Status:** 🚀 Active (Beta Phase)

---

## Strategic Timeline
- **v1.0 $\rightarrow$ v2.0:** Foundation and Real-time shift (Completed)
- **v2.1:** Activation and Positioning (Completed)
- **v2.2:** Active Correction and Enterprise Guardrails (Current Focus)
