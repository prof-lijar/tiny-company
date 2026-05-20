# UI/UX Specification: TraceWhisper

## 1. Design Philosophy
The TraceWhisper experience is centered around **"The Signal."** Whether it's a CLI output, a real-time stream, or a generated report, the design must prioritize the narrative over the raw data. The goal is to move the user from "searching" to "understanding" as quickly as possible.

## 2. User Interface Paradigms

### 2.1 CLI Experience (Primary Interface)
Since TraceWhisper is primarily a developer tool, the CLI is the first point of contact.
- **Visual Style**: Clean, structured, and high-contrast.
- **Interaction Pattern**: Single-command execution with clear progress indicators.

#### 2.1.1 Live Whisper (v2 Real-time View)
For real-time observability, the CLI uses a split-pane layout (implemented via `rich`):
- **Upper Pane (The Narrative)**: A rolling synthesis of the agent's reasoning. Updates every $N$ steps or upon a "Key Decision Point" (KDP).
- **Lower Pane (The Stream)**: A tailing view of raw logs.
- **Visual Cues**: 
    - `[ANALYZING]` indicator when the LLM is synthesizing the current window.
    - `[KDP]` highlight when a critical decision is identified.
    - Ability to `Pause` (Ctrl+C or specific key) to freeze both panes for inspection.

### 2.2 Execution Report (The Deliverable)
The report is the core product. It must be accessible to both technical (developers) and non-technical (auditors) stakeholders.
- **Layout**: Single-column, focused reading experience.
- **Visual Hierarchy**: 
    1. Result Status (Success/Failure)
    2. Executive Summary
    3. The Journey (Narrative)
    4. Technical Details (Collapsible/Appendix)
- **Interaction**: The report should be "scannable." Key decision points should be highlighted to allow a user to jump to critical moments.

### 2.3 Trace Comparison Report (v2 A/B Testing)
Used for comparing two different runs (e.g., different prompts or models).
- **Layout**: Side-by-side comparison of "The Journey" for Trace A and Trace B.
- **Divergence Marker**: A prominent visual indicator (e.g., a red vertical line or "Divergence Point" banner) highlighting the exact step where the two agents took different paths.
- **Efficiency Dashboard**: A top-level summary table comparing:
    - Total Steps
    - Total Token Usage
    - Time-to-Completion
    - Final Outcome (Success/Failure)

### 2.4 Prompt Optimization UI ("The Fixer")
A specialized view to transition from failure analysis to prompt improvement.
- **Diff View**: A "Before vs. After" comparison of the system prompt.
- **Evidence Link**: Each proposed change must be explicitly linked to the "Root Cause" identified in the trace (e.g., "Proposed change to prevent Tool Hallucination at Step 14").

### 2.5 Interactive Trace-Chat
A forensic analysis interface for querying specific traces.
- **Layout**: Chat interface on one side, the full trace/narrative on the other.
- **Evidence Linking**: Clicking a citation in the chat response automatically scrolls the trace view to the referenced log line or narrative segment.

## 3. User Flows

### 3.1 The "Quick Fix" Flow (Developer)
`CLI Command` $\rightarrow$ `Progress Bar` $\rightarrow$ `Open report.md` $\rightarrow$ `Jump to Failure Analysis` $\rightarrow$ `Fix Prompt`.

### 3.2 The "Real-time Debug" Flow (v2 Developer)
`tw live <log_source>` $\rightarrow$ `Monitor Narrative` $\rightarrow$ `Observe KDP` $\rightarrow$ `Pause Stream` $\rightarrow$ `Inspect Raw Log` $\rightarrow$ `Adjust Prompt`.

### 3.3 The "Optimization" Flow (v2 Researcher)
`tw compare <trace_a> <trace_b>` $\rightarrow$ `Identify Divergence Point` $\rightarrow$ `Review Efficiency Metrics` $\rightarrow$ `Select Winner`.

### 3.4 The "Compliance Audit" Flow (Operator)
`Ingest Production Log` $\rightarrow$ `Generate HTML Report` $\rightarrow$ `Read Executive Summary` $\rightarrow$ `Review The Journey` $\rightarrow$ `Sign off on Audit`.

## 4. Interaction Patterns
- **The "Deep Dive"**: In HTML reports, users should be able to click a narrative sentence to expand the raw log snippet that generated that specific part of the story.
- **Status Indicators**: Use the brand colors for status:
    - Success $\rightarrow$ Emerald Green
    - Warning $\rightarrow$ Amber
    - Failure $\rightarrow$ Crimson
- **Progressive Disclosure**: Hide the "Tool Usage Table" and "Raw Traces" behind collapsible sections to avoid overwhelming the reader.

## 5. Accessibility (WCAG AA)
- **Contrast**: All text must meet 4.5:1 contrast ratio against the background.
- **Typography**: Use a minimum of 14px for body text.
- **Semantic HTML**: Reports must use proper heading levels (`h1`-`h4`) for screen reader compatibility.
