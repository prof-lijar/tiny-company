# UI/UX Specification: TraceWhisper v2

## 1. Design Philosophy
TraceWhisper is a "Developer-First" tool. The interface prioritizes efficiency, density of information, and the reduction of cognitive load. We follow the **Narrative-First** principle: the high-level story is the primary entry point, but the raw technical evidence is always one click/keystroke away.

### Core Interaction Patterns
- **Drill-Down:** High-level summary $\\rightarrow$ Detailed Whisper segment $\\rightarrow$ Raw Log lines.
- **Parallelism:** Comparative views for A/B testing.
- **Contextual Awareness:** The UI adapts based on whether the user is in "Live Mode" (observing) or "Forensic Mode" (analyzing).
- **Debug-First:** The path from anomaly detection to prompt optimization is minimized.

---

## 2. User Flows

### 2.1 Frictionless Onboarding (v2.1)
**Goal:** Get the user to their first "Aha!" moment in < 60 seconds.
1. **Initial Setup:** User runs `tw init` or `tw live` for the first time.
2. **Welcome Sequence:** A streamlined checklist appears:
   - [x] SDK Installed
   - [ ] Framework Integrated
   - [ ] First Trace Captured
3. **Integration Choice:** User is asked: "Which framework are you using? (LangChain / CrewAI / AutoGen / Other)".
4. **The Recipe:** The CLI outputs a 3-line code snippet (Integration Recipe) tailored to their framework.
5. **The Hook:** Upon first successful trace detection, a high-visibility **Success Banner** appears: "✨ SUCCESS: First Narrative Captured!".
6. **Call to Action:** User is prompted to run `tw live` to see the narrative unfold.

### 2.2 Live Whisper Observation
**Goal:** Real-time transparency of agent reasoning.
1. **Entry:** User runs `tw live`.
2. **The Dashboard:** A split-screen terminal view.
   - **Top/Left (Narrative):** A scrolling feed of "Whispers".
   - **Bottom/Right (Raw):** A fast-scrolling feed of raw logs.
3. **Contextual Guidance (v2.1):** When an anomaly (Loop, Contradiction, Pivot) is detected, a **Debug-First Tip** is appended to the narrative:
   - *Example (Loop):* "💡 DEBUG-FIRST TIP: Reasoning loops often occur when the system prompt lacks a termination condition. Quick Fix: Run `tw fix --point [timestamp]`."
4. **Interruption:** User hits `Space` to pause the stream.
5. **Focus:** User can highlight a Whisper segment to see exactly which raw logs generated it.

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
+-----------------------------------------------------------------------+\n| [NARRATIVE]                                    | [RAW LOGS]            |
|                                               |                       |
| 10:02:01 - Agent decided to search for        | 10:02:01 [INFO] Call:  |
| \"quantum computing\" but found too many        | search_api(q=\"quant...\")|
| results. Pivot: narrowing search to           | 10:02:02 [DEBUG] Resp: |
| \"topological qubits\".                         | { \"results\": [...], }  |
|                                               |                       |
| 10:02:15 - [LOOP] Agent is repeatedly         | 10:02:15 [WARN] Loop   |
| searching for the same query 3 times.             | detected: query_id_42  |
| 💡 DEBUG-FIRST TIP: Prompt lacks termination  | 10:02:16 [INFO] Call:  |
| condition. Run 'tw fix' to improve.           | search_api(q=\"topol...\")|
|                                               |                       |
+-----------------------------------------------------------------------+\n| [P]ause | [S]top | [C]hat | [F]ix | [H]elp                           |
+-----------------------------------------------------------------------+\n```

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
