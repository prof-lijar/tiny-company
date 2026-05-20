# UI/UX Specification: TraceWhisper

## 1. Design Philosophy: "The Signal"
The core goal of TraceWhisper's interface is to maximize the **Signal-to-Noise Ratio**. Developers are overwhelmed by logs; our UI must act as a filter, not another layer of noise.

**Key Principles:**
- **Progressive Disclosure:** Show the narrative first. Only reveal the raw logs when the user explicitly "dives deep."
- **Evidence-Based Navigation:** Every claim in a narrative must be clickable, leading the user directly to the supporting log line.
- **High Contrast / Low Fatigue:** A dark-first palette to support long debugging sessions.
- **CLI-First, GUI-Ready:** The primary experience is a high-fidelity CLI, but the design patterns must translate to a web dashboard.

## 2. Core User Flows

### 2.1 The "Quick Scan" (Post-Mortem)
1. **Trigger:** User runs `tw analyze <trace_id>`.
2. **View:** The "Execution Report" is rendered.
3. **Action:** User reads the "Executive Summary" $\rightarrow$ scans "Key Decision Points" $\rightarrow$ identifies the failure.
4. **Outcome:** User understands *why* the agent failed without reading the full JSON trace.

### 2.2 The "Deep Dive" (Forensics)
1. **Trigger:** User clicks/selects a specific narrative segment in the Execution Report.
2. **View:** The UI splits or transitions to show the raw log window aligned with that specific segment.
3. **Action:** User verifies the LLM's narrative against the actual tool calls.
4. **Outcome:** User confirms the root cause (e.g., a specific API error).

### 2.3 The "Live Watch" (Real-time)
1. **Trigger:** User runs `tw live`.
2. **View:** A rolling window showing the current narrative and the latest raw log line.
3. **Action:** User pauses the stream to reflect on a decision point.
4. **Outcome:** User catches a loop *while it is happening* and kills the process.

## 3. Interface Layouts (CLI)

### 3.1 The Execution Report
The report is structured as a vertical stack:
- **Header:** Trace ID, Duration, Final Status (Success/Fail), Token Usage.
- **Executive Summary:** A 3-5 sentence narrative of the overall attempt.
- **Timeline (The Whisper):** A chronological list of "Key Decision Points" (KDPs). Each KDP consists of:
    - `[Timestamp] [KDP Label]`
    - `Narrative: "The agent decided to search for X because Y..."`
    - `Evidence: [Link to Log Line]`
- **Failure Analysis:** (Only if failed) A dedicated section pinpointing the divergence or error.

### 3.2 The Live Dashboard
- **Top Pane (The Narrative):** A fixed-height area that updates the current "Whisper" summary.
- **Bottom Pane (The Stream):** A scrolling view of raw logs with syntax highlighting.

## 4. Interaction Patterns
- **The Jump:** In the CLI, using `Ctrl+J` or clicking a link should jump the view to the corresponding raw log.
- **The Filter:** Ability to toggle visibility of "Internal Monologue" vs. "Tool Calls" in the raw view.
- **The Comparison:** A side-by-side view of two narratives, highlighting the point where they diverge in a different color (Warning Amber).

## 5. Accessibility & Standards
- **Contrast:** Minimum WCAG AA contrast ratio for all text against backgrounds.
- **Color-Blindness:** Do not rely on color alone to indicate failure (use icons like ❌ or ⚠️).
- **Navigation:** Full keyboard support for all interactive elements.
