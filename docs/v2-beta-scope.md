# v2 Beta Scope: The "Observability" Release

## 1. Objective
The goal of the v2 Beta is to transition TraceWhisper from a **post-mortem reporting tool** to a **real-time development environment**. We aim to eliminate the "JSON Tax" (ingestion friction), bridge the "Post-Mortem Gap" (real-time visibility), and solve the "Side-by-Side Struggle" (iteration analysis).

## 2. Minimum Viable Beta (MVB) Feature Set

### 🔴 Must-Have (P0 - Critical)
These features are non-negotiable for the Beta release. Without these, the value proposition of v2 is not met.

#### 2.1 Live Whisper (Real-time Narrative)
*   **Description:** A CLI-based live stream that provides a rolling narrative of an agent's reasoning process as it happens.
*   **Scope:** 
    *   Support for tailing local JSON log files.
    *   Sliding-window LLM synthesis (updating the narrative every $N$ events or at Key Decision Points).
    *   A `rich`-powered CLI dashboard showing the current narrative and raw log tail.
*   **Acceptance Criteria:**
    *   Narrative updates must appear in the CLI with $< 5$ seconds of latency from the log entry.
    *   The system must handle "looping" agents without crashing or duplicating narrative segments.
    *   User can pause the live stream to inspect a specific reasoning step.

#### 2.2 Framework-Native SDK (The "Anti-JSON Tax" Kit)
*   **Description:** A Python library that allows developers to pipe agent traces directly into TraceWhisper without manual log formatting.
*   **Scope:**
    *   One-line integration for **LangChain** and **CrewAI**.
    *   Automatic background streaming of logs to the TraceWhisper local storage.
    *   Standardization of all output to the TraceWhisper JSON schema.
*   **Acceptance Criteria:**
    *   A developer can enable TraceWhisper in an existing agent script with $\le 5$ lines of code.
    *   No manual export/import of JSON files is required to use Live Whisper.

#### 2.3 Trace Comparison (`tw compare`)
*   **Description:** A CLI utility to qualitatively and quantitatively compare two different execution traces.
*   **Scope:**
    *   `tw compare <trace_a> <trace_b>` command.
    *   **Divergence Detection:** Pinpoint the exact step where reasoning paths diverged.
    *   **Efficiency Metrics:** Comparison of total steps, token usage, and time-to-completion.
*   **Acceptance Criteria:**
    *   The tool must generate a "Comparison Report" that explicitly names the divergence point (e.g., "Divergence at Step 4: Trace A called SearchTool, Trace B called Calculator").
    *   The report must provide a data-driven "Winner" based on efficiency (fewer steps/tokens).

---

### 🟡 Should-Have (P1 - High Value)
These features will be included if P0s are stable and time permits.

#### 2.4 Interactive Trace-Chat (Forensic Analyst)
*   **Description:** An LLM-powered chat interface to query a specific trace.
*   **Scope:**
    *   Natural language queries (e.g., "Why did the agent ignore the second search result?").
    *   Citations linking answers back to specific log lines.
*   **Acceptance Criteria:**
    *   Answers must be grounded 100% in the provided trace (no hallucinations).
    *   Response time $< 3$ seconds.

---

### 🟢 Could-Have (P2 - Future)
These are deferred to post-Beta or v2.1.

#### 2.5 Prompt Optimization Engine ("The Fixer")
*   **Description:** Automated suggestions for prompt changes based on failure analysis.
*   **Scope:**
    *   Root cause analysis of failures.
    *   Proposed "Before vs. After" prompt snippets.

## 3. Success Metrics for Beta
We will measure the success of the v2 Beta using the following KPIs:

1.  **Mean Time to Fix (MTTF):** Average time from a detected agent failure to a deployed prompt fix (Target: 50% reduction vs v1).
2.  **Onboarding Velocity:** Time from `pip install` to the first Live Whisper narrative (Target: $< 2$ minutes).
3.  **Comparison Adoption:** Percentage of Beta users who run `tw compare` at least 3 times per week (Target: $> 40\%$).
4.  **Integration Rate:** Ratio of SDK users vs. manual JSON upload users (Target: $3:1$).

## 4. Beta Release Constraints
*   **Environment:** Local-first. No cloud backend required for Beta.
*   **Storage:** SQLite for local trace management.
*   **LLM:** Support for OpenAI (GPT-4o) and local models via Ollama.
