# Product Specification: TraceWhisper

## 1. Product Overview
TraceWhisper is a specialized observability tool designed to distill the "stream of consciousness" and tool-execution logs of autonomous AI agents into a human-readable narrative. It solves the problem of "log fatigue" by extracting the critical path of an agent's reasoning process.

## 2. Core Features

### 2.1 Log Ingestion & Parsing
- **Multi-Format Support:** Ability to ingest logs in JSON (standard for most agent frameworks) and plain text.
- **Trace Identification:** Capability to group logs by `trace_id` or `session_id` to isolate individual agent runs.
- **Context Window Management:** Intelligent chunking of extremely long logs to fit within LLM context windows for summarization.

### 2.2 The "Whisper" Narrative Engine
- **Noise Filtering:** Automatically strips out redundant retries, heartbeat logs, and repetitive system prompts.
- **Critical Path Extraction:** Identifies the "Key Decision Points" (KDPs)—moments where the agent changed strategy or chose a specific tool.
- **Narrative Synthesis:** Uses an LLM to convert the sequence of `Thought -> Action -> Observation` into a cohesive story: *"The agent first attempted X, but encountered error Y, leading it to pivot to strategy Z."*

### 2.3 Execution Report Generation
- **Structured Markdown Output:** Generates a report with the following sections:
    - **Executive Summary:** High-level result (Success/Failure) and total duration.
    - **The Journey:** A chronological narrative of the agent's logic.
    - **Tool Usage Table:** A summary of which tools were called and their outcomes.
    - **Failure Analysis:** If the agent failed, a specific section detailing the "breaking point."
- **Export Formats:** Support for `.md` and `.html`.

### 2.4 CLI Interface
- A simple command-line tool for developers to process logs locally.
- Example command: `tw parse logs.json --output report.md --verbosity concise`

## 3. User Flows

### 3.1 Developer Debugging Flow
1. Developer runs an agentic workflow that fails.
2. Developer exports the raw execution log `trace_123.json`.
3. Developer runs `tw parse trace_123.json`.
4. TraceWhisper analyzes the log and generates `report.md`.
5. Developer reads the "Failure Analysis" section and identifies a prompt error in the agent's second tool call.

### 3.2 Audit/Compliance Flow
1. An enterprise operator needs to verify why an agent performed a specific action in production.
2. The operator fetches the raw logs from the database.
3. The operator uses TraceWhisper to generate a narrative report.
4. The report is shared with a non-technical stakeholder to prove the agent followed the prescribed logic.

## 4. Technical Constraints & Requirements
- **Privacy:** The tool should operate locally or via a configurable API key to ensure sensitive logs aren't leaked.
- **Performance:** Processing a standard agent trace (100-500 steps) should take less than 30 seconds.
- **LLM Dependency:** Requires access to a capable LLM (e.g., GPT-4o, Claude 3.5 Sonnet) for the narrative synthesis.

## 5. Success Metrics
- **Time-to-Insight:** Reduction in time spent by a developer to find the root cause of an agent failure (Target: 50% reduction).
- **Compression Ratio:** Ratio of raw log size to narrative report size (Target: 10:1 or better).
- **Accuracy:** Human verification that the narrative accurately reflects the raw log events without hallucinating actions.
