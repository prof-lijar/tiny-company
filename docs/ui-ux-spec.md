# UI/UX Specification: TraceWhisper v2

## 1. Design Philosophy
TraceWhisper is a "Developer-First" tool. The interface prioritizes efficiency, density of information, and the reduction of cognitive load. We follow the **Narrative-First** principle: the high-level story is the primary entry point, but the raw technical evidence is always one click/keystroke away.

### Core Interaction Patterns
- **Drill-Down:** High-level summary $\rightarrow$ Detailed Whisper segment $\rightarrow$ Raw Log lines.
- **Parallelism:** Comparative views for A/B testing.
- **Contextual Awareness:** The UI adapts based on whether the user is in "Live Mode" (observing) or "Forensic Mode" (analyzing).

---

## 2. User Flows

### 2.1 Frictionless Onboarding (v2.1)
**Goal:** Get the user to their first "Aha!" moment in < 60 seconds.
1. **Initial Setup:** User runs `tw init`.
2. **Consent:** A clear, concise "Beta Terms" block appears in the terminal. User types `Y` to agree (Click-wrap equivalent for CLI).
3. **Integration Choice:** User is asked: "Which framework are you using? (LangChain / CrewAI / AutoGen / Other)".
4. **The Recipe:** The CLI outputs a 3-line code snippet tailored to their framework.
5. **The Hook:** After the first successful trace is detected, the CLI prompts: *"Your first trace is ready. Run `tw live` to see the narrative unfold in real-time."*

### 2.2 Live Whisper Observation
**Goal:** Real-time transparency of agent reasoning.
1. **Entry:** User runs `tw live`.
2. **The Dashboard:** A split-screen terminal view (using `rich` or similar).
   - **Top/Left (Narrative):** A scrolling feed of "Whispers" (distilled reasoning).
   - **Bottom/Right (Raw):** A fast-scrolling feed of raw logs.
3. **Interruption:** User hits `Space` to pause the stream. This freezes both feeds for inspection.
4. **Focus:** User can highlight a Whisper segment to see exactly which raw logs generated it.

### 2.3 Forensic Analysis & "The Fixer"
**Goal:** Move from "What happened?" to "How do I fix it?".
1. **Trace Selection:** User opens a specific trace `tw view <trace_id>`.
2. **Narrative Review:** User reads the "Execution Report."
3. **Failure Identification:** The UI highlights "Reasoning Loops" or "Strategic Pivots" in **Alert Amber**.
4. **Fix Trigger:** User selects a failure point and triggers "The Fixer."
5. **The Proposal:** The UI presents a "Before vs. After" prompt comparison.
   - **Before:** Current system prompt.
   - **After:** Suggested improvement (highlighting the new instruction in **Insight Green**).

---

## 3. Interface Layouts (Conceptual)

### 3.1 CLI Live Dashboard
```text
+-----------------------------------------------------------------------+
| TRACEWHISPER LIVE | Agent: Research-Bot-01 | Status: RUNNING          |
+-----------------------------------------------------------------------+
| [NARRATIVE]                                    | [RAW LOGS]            |
|                                               |                       |
| 10:02:01 - Agent decided to search for        | 10:02:01 [INFO] Call:  |
| "quantum computing" but found too many        | search_api(q="quant...")|
| results. Pivot: narrowing search to           | 10:02:02 [DEBUG] Resp: |
| "topological qubits".                         | { "results": [...], }  |
|                                               |                       |
| 10:02:15 - Agent encountered a loop:          | 10:02:15 [WARN] Loop   |
| repeating the same query 3 times.             | detected: query_id_42  |
| Suggestion: Change search parameters.         | 10:02:16 [INFO] Call:  |
|                                               | search_api(q="topol...")|
|                                               |                       |
+-----------------------------------------------------------------------+
| [P]ause | [S]top | [C]hat | [F]ix | [H]elp                           |
+-----------------------------------------------------------------------+
```

### 3.2 Trace Comparison (A/B)
- **Layout:** Side-by-side vertical columns.
- **Sync-Scroll:** Scrolling one trace scrolls the other to the corresponding timestamp.
- **Divergence Marker:** A bold horizontal line across both columns where the agents' paths diverged.
- **Metric Header:** A summary bar at the top comparing: `Steps (A vs B)`, `Tokens (A vs B)`, `Time (A vs B)`.

---

## 4. Component Specifications

### 4.1 Taxonomy of Signals (Visual Cues)
| Signal Type | Color | UI Treatment | Meaning |
| :--- | :--- | :--- | :--- |
| **Standard Whisper** | Signal Blue | Standard text | Normal reasoning flow |
| **Strategic Pivot** | Signal Blue (Bold) | Underlined/Bold | A significant change in direction |
| **Reasoning Loop** | Alert Amber | Background highlight | Agent is stuck; needs intervention |
| **Success/Goal** | Insight Green | Checkmark icon | Goal reached successfully |
| **Critical Failure** | Obsidian/Red | Bold Red text | Hard stop/exception |

### 4.2 Interaction Shortcuts (CLI)
- `Space`: Pause/Resume stream.
- `Ctrl+F`: Search within the current narrative.
- `Ctrl+X`: Export current report to Markdown.
- `/`: Open Interactive Trace-Chat.


## 5. v2.2 Reasoning Trace Visualizer

### 5.1 The Forensic Path View (`tw trace <id>`)
**Goal:** To visualize the linear progression of reasoning and pinpoint exactly where a failure occurred and how it was resolved.

**Visual Design:**
- **Linear Flow:** The trace is presented as a vertical sequence of nodes (Thought $\rightarrow$ Tool Call $\rightarrow$ Observation).
- **The Breaking Point:** When a reasoning failure (e.g., a loop) is detected, the node is highlighted in **Alert Amber** with a distinct marker: `[BREAKING POINT]`.
- **The Correction Bridge:** A visual "bridge" or callout that connects the Breaking Point to the corrected path, explicitly stating the correction applied (e.g., the prompt optimization).
- **Resolution:** The path continues from the correction to the final goal, highlighted in **Insight Green** upon success.

### 5.2 Enhanced Trace Comparison (`tw compare <A> <B>`)
**Goal:** Quantitative and Qualitative proof of improvement.

**UI Enhancements:**
- **Metric Delta Header:** A top-level summary bar showing the $\Delta$ (Delta) for key KPIs:
  - `Steps: A(X) -> B(Y) [-%]`
  - `Tokens: A(X) -> B(Y) [-%]`
  - `Time: A(X) -> B(Y) [-%]`
  - `Efficiency Score: A(X%) -> B(Y%) [+]`
- **Divergence Marker:** A high-contrast horizontal line (`=== DIVERGENCE POINT ===`) that aligns both traces exactly where the paths split.
- **Qualitative Verdict:** A summary block at the bottom providing a human-readable explanation of why Trace B outperformed Trace A.

### 5.3 Interaction Patterns for v2.2
- **Trace-to-Comparison:** From a single trace view, users can trigger `[C]ompare with Baseline` to immediately enter the A/B view.
- **Trace-to-Fix:** From the Breaking Point in a trace, users can trigger `[R]un Fix-It` to jump directly to the prompt optimization proposal.
