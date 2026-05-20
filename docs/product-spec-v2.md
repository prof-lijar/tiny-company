# Product Specification: TraceWhisper v2 (Updated for v2.2)

## 1. Introduction
TraceWhisper v2 evolves the product from a post-mortem analysis tool into a proactive observability and optimization ecosystem. While v1 focused on \"What happened?\", v2 focuses on \"How do I fix it and how do I prevent it in real-time?\"

The overarching theme for v2.2 is **\"The Closed-Loop Debugger,\"** moving the product from **Detection** (identifying reasoning errors) to **Correction** (fixing them).

## 2. Feature Specifications

### 2.0 Onboarding & Friction Reduction (v2.1 \"Frictionless Entry\")
**Goal:** Minimize the time from discovery to the \"Aha!\" moment (TTFN) and align product positioning with user needs.
**Priority:** P0 (Critical)

- **Functional Requirements:**
    - **Click-Wrap Consent:** Replace manual Beta Agreement signatures with a digital consent flow integrated into the `tw login` or initial setup process.
    - **Framework-Specific Recipes:** A library of \"copy-paste\" integration snippets for LangChain, CrewAI, and AutoGen.
    - **First-Run Guided Experience:** A CLI \"wizard\" or explicit console hints that guide the user to run `tw live` immediately after their first successful `init()`.
    - **SDK Health Checks:** Implement validation in `tracewhisper.init()` that checks for environment issues (e.g., missing API keys, write permissions) and provides actionable error messages instead of silent failures.
    - **Debug-First Narrative Tuning:** Update the narrative generation prompts to shift from \"summary reporting\" to \"debugging analysis.\" The output must explicitly highlight reasoning loops, contradictions, and critical pivots.
- **Acceptance Criteria:**
    - User can onboard and agree to terms without leaving the terminal/web-app flow.
    - Integration into a standard LangChain agent takes < 60 seconds.
    - New users are explicitly prompted to use `tw live` upon their first successful execution.
    - SDK provides a clear \"Ready\" or \"Error: [Reason]\" message on startup.
    - Narratives produced in v2.1 explicitly call out \"Reasoning Loop Detected\" or \"Strategic Pivot\" using a consistent taxonomy.

### 2.1 Live Whisper (Real-time Narrative)
**Goal:** Provide a rolling narrative of an agent's reasoning as it happens.
**Priority:** P0 (Critical)

- **Functional Requirements:**
    - **Stream Ingestion:** Ability to tail a local log file or connect to a WebSocket stream of logs.
    - **Rolling Synthesis:** The LLM should process logs in sliding windows, updating the narrative every $N$ steps or upon a \"Key Decision Point\" (KDP).
    - **Live Dashboard:** A CLI-based live view (using `rich` or similar) that displays the current narrative and the latest raw log line.
- **Acceptance Criteria:**
    - Narrative updates with less than 5 seconds of latency from the log event.
    - User can pause the stream to inspect a specific moment.
    - No duplication of narrative segments when the window slides.

### 2.2 Trace Comparison (A/B Testing)
**Goal:** Quantitatively and qualitatively compare two execution traces to validate prompt improvements.
**Priority:** P1 (High)

- **Functional Requirements:**
    - **Comparison Mode:** `tw compare <trace_a> <trace_b>`.
    - **Divergence Detection:** Identify the exact step where the two agents took different paths.
    - **Efficiency Analysis:** Compare total steps, token usage, and time-to-completion.
    - **Outcome Evaluation:** Determine which trace reached the goal more accurately or with higher quality.
- **Acceptance Criteria:**
    - Output a \"Comparison Report\" highlighting the divergence point.
    - Provide a \"Winner\" recommendation based on predefined metrics (e.g., fewest steps to goal).

### 2.3 Framework-Native Integrations
**Goal:** Eliminate manual log exporting and the \"JSON Tax\".
**Priority:** P0 (Critical)

- **Functional Requirements:**
    - **One-Line Setup:** Provide a configuration that allows developers to enable TraceWhisper with minimal code changes (e.g., a single decorator or config line).
    - **SDK Wrappers:** Provide a Python library that can be wrapped around agent calls for LangChain and CrewAI.
    - **Automatic Export:** Seamlessly stream logs to TraceWhisper in the background without requiring manual file saves.
- **Acceptance Criteria:**
    - A developer can enable TraceWhisper with < 5 lines of code in their agent script.
    - Integration is seamless with existing framework logger/callback systems.
    - Logs are captured in the standard TraceWhisper JSON format automatically.

### 2.4 The \"Fix-It\" Button (Automated Prompt Suggestions)
**Goal:** Turn failure analysis into actionable prompt improvements.
**Priority:** P0 (Critical) - *Elevated from P2 to align with v2.2 strategy.*

- **Functional Requirements:**
    - **Automated Root Cause Analysis:** When a `[Reasoning Loop]` or `[Contradiction]` is detected, the system automatically triggers a deep-dive analysis.
    - **Meta-Prompt Suggestion:** Use a specialized internal prompt to analyze the failure and generate a specific \"Instruction\" to be added to the agent's system prompt to prevent the failure.
    - **Before/After Comparison:** Present the current prompt vs. the suggested prompt.
- **Acceptance Criteria:**
    - The engine provides a \"Proposed Prompt Change\" grounded in the specific evidence found in the trace.
    - Suggestions are delivered directly in the CLI/UI adjacent to the detected error.

### 2.5 Interactive Break-points (The \"Intervention\")
**Goal:** Allow developers to live-debug and correct agent reasoning in real-time.
**Priority:** P1 (High)

- **Functional Requirements:**
    - **Reasoning Break-points:** Ability to set triggers in the SDK (e.g., `set_breakpoint(on='contradiction')`).
    - **Execution Pause:** When a trigger is hit, the agent execution is paused.
    - **Manual Injection:** The developer can inject a "Correction" or "Nudge" into the agent's current context via the CLI.
    - **Resume Execution:** Resume the agent with the updated context.
- **Acceptance Criteria:**
    - Agent pauses execution within 1 second of a trigger event.
    - Developer can successfully modify the agent's memory/context and see the agent pivot its reasoning on resume.

### 2.6 Reasoning Template Library & Team Sharing
**Goal:** Transform individual debugging into organizational knowledge.
**Priority:** P2 (Medium)

- **Functional Requirements:**
    - **Pattern Library:** A curated database of common reasoning failures (e.g., \"The Infinite Loop\") and their proven prompt fixes.
    - **Logic Audit Reports:** Generate permanent, shareable URLs for specific traces that include the narrative and the identified errors.
    - **Collaborative Annotation:** Allow team members to add notes to a shared trace.
- **Acceptance Criteria:**
    - User can search the library for a failure pattern and find a suggested fix.
    - Shareable URLs are accessible without requiring the recipient to have the raw log files.

### 2.7 CI/CD Reasoning Guardrails
**Goal:** Prevent reasoning regressions from reaching production.
**Priority:** P2 (Medium)

- **Functional Requirements:**
    - **Regression Testing:** A CLI tool that runs a set of gold-standard inputs through the agent.
    - **Reasoning Audit:** Automatically detect if any new `[Reasoning Loops]` are introduced or if the \"Efficiency Score\" drops below a threshold.
    - **Build Failure:** Integrate with CI/CD pipelines to fail the build if reasoning regressions are detected.
- **Acceptance Criteria:**
    - The tool can be integrated into a GitHub Action or GitLab CI pipeline.
    - Build fails with a clear report indicating which test case introduced the reasoning loop.

## 3. Technical Considerations
- **State Management:** v2 requires a local database (e.g., SQLite) to store traces for comparison, history, and the template library.
- **LLM Cost:** Real-time synthesis and the \"Fix-It\" engine increase token consumption; implementation of caching for repeated segments is required.
- **Concurrency:** Live Whisper and Interactive Break-points must handle asynchronous log streams and execution pausing without crashing the agent.

## 4. Success Metrics
- **Mean Time to Resolve (MTTR):** Reduction in time from failure detection to prompt deployment.
- **Fix-It Acceptance Rate:** % of automated prompt suggestions adopted by the user.
- **Integration Adoption:** Percentage of users using the SDK vs. CLI file parsing.
- **Onboarding Conversion:** % of invited users reaching the first narrative (Target > 40%).
