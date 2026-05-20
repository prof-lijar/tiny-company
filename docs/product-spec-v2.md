# Product Specification: TraceWhisper v2

## 1. Introduction
TraceWhisper v2 evolves the product from a post-mortem analysis tool into a proactive observability and optimization ecosystem. While v1 focused on "What happened?", v2 focuses on "How do I fix it and how do I prevent it in real-time?"

## 2. Feature Specifications

### 2.1 Live Whisper (Real-time Narrative)
**Goal:** Provide a rolling narrative of an agent's reasoning as it happens.
**Priority:** P0 (Critical)

- **Functional Requirements:**
    - **Stream Ingestion:** Ability to tail a local log file or connect to a WebSocket stream of logs.
    - **Rolling Synthesis:** The LLM should process logs in sliding windows, updating the narrative every $N$ steps or upon a "Key Decision Point" (KDP).
    - **Live Dashboard:** A CLI-based live view (using `rich` or similar) that displays the current narrative and the latest raw log line.
- **Acceptance Criteria:**
    - Narrative updates with less than 5 seconds of latency from the log event.
    - User can pause the stream to inspect a specific moment.
    - No duplication of narrative segments when the window slides.

### 2.2 Trace Comparison (A/B Testing)
**Goal:** Quantitatively and qualitatively compare two execution traces.
**Priority:** P1 (High)

- **Functional Requirements:**
    - **Comparison Mode:** `tw compare <trace_a> <trace_b>`.
    - **Divergence Detection:** Identify the exact step where the two agents took different paths.
    - **Efficiency Analysis:** Compare total steps, token usage, and time-to-completion.
    - **Outcome Evaluation:** Determine which trace reached the goal more accurately or with higher quality.
- **Acceptance Criteria:**
    - Output a "Comparison Report" highlighting the divergence point.
    - Provide a "Winner" recommendation based on predefined metrics (e.g., fewest steps).

### 2.3 Framework-Native Integrations
**Goal:** Eliminate manual log exporting and the "JSON Tax".
**Priority:** P0 (Critical) - *Elevated from P1 based on v1 user feedback.*

- **Functional Requirements:**
    - **One-Line Setup:** Provide a configuration that allows developers to enable TraceWhisper with minimal code changes (e.g., a single decorator or config line).
    - **SDK Wrappers:** Provide a Python library that can be wrapped around agent calls for LangChain and CrewAI.
    - **Automatic Export:** Seamlessly stream logs to TraceWhisper in the background without requiring manual file saves.
- **Acceptance Criteria:**
    - A developer can enable TraceWhisper with < 5 lines of code in their agent script.
    - Integration is seamless with existing framework logger/callback systems.
    - Logs are captured in the standard TraceWhisper JSON format automatically.

### 2.4 Prompt Optimization Engine ("The Fixer")
**Goal:** Turn failure analysis into actionable prompt improvements.
**Priority:** P2 (Medium)

- **Functional Requirements:**
    - **Root Cause Analysis:** Deep-dive into the "Failure Analysis" section to identify if the failure was due to: (a) Tool hallucination, (b) Logic loop, (c) Missing information.
    - **Prompt Suggestion:** Generate a specific "Instruction" to be added to the agent's system prompt to avoid this specific failure.
    - **Hypothesis Generation:** Suggest a new tool or a change in tool definition.
- **Acceptance Criteria:**
    - The engine provides a "Proposed Prompt Change" (Before vs. After).
    - Suggestions are grounded in the specific evidence found in the trace.

### 2.5 Interactive Trace-Chat
**Goal:** Allow users to query a trace using natural language.
**Priority:** P2 (Medium)

- **Functional Requirements:**
    - **Contextual Querying:** An interactive session where the user asks questions about a specific trace.
    - **Evidence Linking:** Every answer must link back to the specific log line or "Whisper" segment it is referencing.
    - **Agent Persona:** The chat agent should act as a "Forensic Analyst" specializing in AI agents.
- **Acceptance Criteria:**
    - Ability to answer "Why did the agent do X?" with 100% accuracy based on the logs.
    - Response time for queries under 3 seconds.

## 3. Technical Considerations
- **State Management:** v2 will require a local database (e.g., SQLite) to store traces for comparison and chat, rather than relying solely on flat files.
- **LLM Cost:** Real-time synthesis and interactive chat will increase token consumption; implementation of caching for repeated segments is required.
- **Concurrency:** Live Whisper must handle asynchronous log streams without blocking the narrative engine.

## 4. Success Metrics
- **Mean Time to Fix (MTTF):** Reduction in time from failure detection to prompt deployment.
- **Integration Adoption:** Percentage of users using the SDK vs. CLI file parsing.
- **Analytical Depth:** Number of queries per trace in the Interactive Chat.
