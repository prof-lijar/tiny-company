# User Stories: TraceWhisper v2

This document extends the original user stories to cover the proactive observability and optimization features of TraceWhisper v2.

## 1. Live Whisper (Real-time Narrative)

### US2.1.1: Stream Log Tailing
**As a** developer,
**I want to** run TraceWhisper in "live mode" on a log file that is being written to,
**so that** I can see the narrative update as the agent works.
- **Acceptance Criteria:**
    - The tool supports a `--live` flag.
    - The narrative updates in the terminal without requiring a restart of the tool.
    - The output uses a scrolling or updating window (e.g., using `rich.live`).

### US2.1.2: Real-time Intervention
**As a** developer,
**I want** the live narrative to highlight "Critical Decision Points" immediately,
**so that** I can kill the agent process if I see it heading toward a known failure mode.
- **Acceptance Criteria:**
    - KDPs are visually distinct in the live stream.
    - Latency between log entry and narrative update is $< 5$ seconds.

## 2. Trace Comparison

### US2.2.1: Compare Two Traces
**As a** prompt engineer,
**I want to** compare the execution of two different prompts for the same task,
**so that** I can determine which prompt leads to a more efficient reasoning path.
- **Acceptance Criteria:**
    - The tool accepts two file paths: `tw compare <file_a> <file_b>`.
    - The output report explicitly lists the "Point of Divergence."
    - A summary table compares total steps, token count, and final outcome.

### US2.2.2: Reasoning Divergence Analysis
**As a** developer,
**I want** the tool to explain *why* the two traces diverged,
**so that** I can understand the impact of my prompt changes.
- **Acceptance Criteria:**
    - The report provides a narrative comparison: *"Trace A attempted X because of [Prompt A], whereas Trace B attempted Y because of [Prompt B]."*

## 3. Framework Integrations

### US2.3.1: Native Python SDK
**As a** developer,
**I want to** import a `tracewhisper` library into my agent code,
**so that** I don't have to manually save and export JSON logs.
- **Acceptance Criteria:**
    - A simple wrapper exists (e.g., `@trace_whisper.monitor`).
    - Logs are streamed to the TraceWhisper backend/file in the correct format automatically.

## 4. Prompt Optimization ("The Fixer")

### US2.4.1: Automated Prompt Suggestion
**As a** developer,
**I want** TraceWhisper to suggest a specific string of text to add to my system prompt to fix a failure,
**so that** I don't have to guess how to steer the agent.
- **Acceptance Criteria:**
    - The "Failure Analysis" section includes a "Proposed Fix" subsection.
    - The fix is phrased as a direct instruction (e.g., *"Add: 'Always verify the file path before attempting to read it' to your system prompt"*).

## 5. Interactive Trace-Chat

### US2.5.1: Conversational Querying
**As a** supervisor,
**I want to** ask a question like "Why did the agent skip the second step?" in a chat interface,
**so that** I can get a specific answer without reading the whole report.
- **Acceptance Criteria:**
    - The tool provides an interactive shell `tw chat <trace_id>`.
    - The AI's answer is strictly grounded in the log data.
    - The AI provides references to the specific log lines used to answer the question.

### US2.3.2: One-Line Framework Setup
**As a** developer using LangChain or CrewAI,
**I want to** enable TraceWhisper with a single configuration line or decorator,
**so that** I can start analyzing my traces without writing custom export scripts.
- **Acceptance Criteria:**
    - The setup requires no more than 2 lines of code change.
    - Integration is seamless with existing framework logger/callback systems.
    - Logs are automatically formatted for TraceWhisper without manual intervention.

## 6. Frictionless Entry (v2.1)

### US2.6.1: Digital Consent Flow
**As a** new user,
**I want to** agree to the Beta Testing Agreement via a click-wrap interface during sign-up or login,
**so that** I can start using the tool immediately without waiting for manual legal approval.
- **Acceptance Criteria:**
    - The `tw login` command or web sign-up presents the agreement text.
    - User must explicitly accept the terms before an API key is issued.
    - Acceptance is logged and tied to the user account.

### US2.6.2: SDK Health Diagnostics
**As a** developer,
**I want** the SDK to tell me exactly why it failed to initialize,
**so that** I don't spend hours debugging my own code when the issue is a missing API key or network error.
- **Acceptance Criteria:**
    - `tracewhisper.init()` performs a pre-flight check.
    - Failures result in a human-readable error message (e.g., "Error: API Key not found in environment variables").
    - Success results in a confirmation message (e.g., "TraceWhisper initialized successfully").

### US2.6.3: First-Run Onboarding Guide
**As a** first-time user,
**I want** the CLI to guide me to the "Aha! Moment" (Live Whisper),
**so that** I know exactly how to see the value of the tool immediately after integration.
- **Acceptance Criteria:**
    - After the first successful trace is captured, the CLI displays a prominent hint.
    - The hint explicitly instructs the user to run `tw live` in a separate terminal.
    - The hint provides the exact command to run.

### US2.6.4: Debug-First Narrative Output
**As a** developer,
**I want** the narratives to explicitly call out reasoning loops and contradictions,
**so that** I can use the tool as a debugging environment rather than just a summary report.
- **Acceptance Criteria:**
    - Narratives use specific labels like "[REASONING LOOP]" or "[CONTRADICTION]" when detected.
    - The narrative explains *why* it is a loop or contradiction based on the log evidence.
    - The output prioritizes these "debugging" insights over general summaries.
