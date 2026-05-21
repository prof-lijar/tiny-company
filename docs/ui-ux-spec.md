# UI/UX Specification: TraceWhisper v2

## 1. Design Philosophy
TraceWhisper is a "Developer-First" tool. The interface prioritizes efficiency, density of information, and the reduction of cognitive load. We follow the **Narrative-First** principle: the high-level story is the primary entry point, but the raw technical evidence is always one click/keystroke away.

### Core Interaction Patterns
- **Drill-Down:** High-level summary $\\rightarrow$ Detailed Whisper segment $\\rightarrow$ Raw Log lines.
- **Parallelism:** Comparative views for A/B testing.
- **Contextual Awareness:** The UI adapts based on whether the user is in "Live Mode" (observing) or "Forensic Mode" (analyzing).
- **Governance-First (v2.4):** For the Enterprise portal, every administrative action must be backed by technical evidence (a reasoning trace).

---

## 2. User Flows

### 2.1 Frictionless Onboarding (v2.1)
**Goal:** Get the user to their first "Aha!" moment in < 60 seconds.
1. **Initial Setup:** User runs `tw init`.
2. **Consent:** A clear, concise "Beta Terms" block appears in the terminal. User types `Y` to agree.
3. **Integration Choice:** User is asked: "Which framework are you using? (LangChain / CrewAI / AutoGen / Other)".
4. **The Recipe:** The CLI outputs a 3-line code snippet tailored to their framework.
5. **The Hook:** After the first successful trace is detected, the CLI prompts: *"Your first trace is ready. Run `tw live` to see the narrative unfold in real-time."*

### 2.2 Live Whisper Observation
**Goal:** Real-time transparency of agent reasoning.
1. **Entry:** User runs `tw live`.
2. **The Dashboard:** A split-screen terminal view.
   - **Top/Left (Narrative):** A scrolling feed of "Whispers" (distilled reasoning).
   - **Bottom/Right (Raw):** A fast-scrolling feed of raw logs.
3. **Interruption:** User hits `Space` to pause the stream.
4. **Focus:** User can highlight a Whisper segment to see exactly which raw logs generated it.

### 2.3 Forensic Analysis & "The Fixer"
**Goal:** Move from "What happened?" to "How do I fix it?".
1. **Trace Selection:** User opens a specific trace `tw view <trace_id>`.
2. **Narrative Review:** User reads the "Execution Report."
3. **Failure Identification:** The UI highlights "Reasoning Loops" or "Strategic Pivots" in **Alert Amber**.
4. **Fix Trigger:** User selects a failure point and triggers "The Fixer."
5. **The Proposal:** The UI presents a "Before vs. After" prompt comparison.

### 2.4 Enterprise Governance (v2.4)
**Goal:** Scale reasoning optimization from the individual to the organization.
1. **Governance Oversight:** Org Admins use the Web Portal to monitor "Compliance Rates" (how many agents follow the "Golden Path").
2. **Reasoning Peer Review:** 
   - An engineer proposes a prompt change.
   - The system automatically attaches a **Reasoning Diff** (Before vs. After traces).
   - A Team Lead reviews the "cognitive impact" of the change and approves it.
3. **Audit Trail:** Auditors can trace any prompt change back to the specific reasoning failure (trace ID) that justified the modification.
4. **RBAC Management:** Admins manage access to the `Global -> Dept -> Team -> Private` vault hierarchy.

---

## 3. Interface Layouts

### 3.1 CLI Live Dashboard
```text
+-----------------------------------------------------------------------+
| TRACEWHISPER LIVE | Agent: Research-Bot-01 | Status: RUNNING          |
+---------------------------------------------------------------------+\n| [NARRATIVE]                                    | [RAW LOGS]            |
|                                               |                       |
| 10:02:01 - Agent decided to search for        | 10:02:01 [INFO] Call:  |
| \"quantum computing\" but found too many        | search_api(q=\"quant...\")|
| results. Pivot: narrowing search to           | 10:02:02 [DEBUG] Resp: |
| \"topological qubits\".                         | { \"results\": [...], }  |
|                                               |                       |
| 10:02:15 - Agent encountered a loop:          | 10:02:15 [WARN] Loop   |
| repeating the same query 3 times.             | detected: query_id_42  |
| Suggestion: Change search parameters.         | 10:02:16 [INFO] Call:  |
|                                               | search_api(q=\"topol...\")|
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

### 3.3 Enterprise Governance Portal (v2.4 - Web)
- **Dashboard:** High-level KPI cards (Token Cost, Compliance Rate, Avg. Cost Reduction).
- **User/Role Matrix:** A grid for managing RBAC across the organization.
- **Audit Log:** A searchable table of every change to the reasoning vaults, linked to trace IDs.
- **Reasoning Diff View:** A visual representation of cognitive path pruning (Before vs. After).

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
| **Compliance Gap** | Warning Orange | Dashed border | Agent deviated from Golden Path (v2.4) |

### 4.2 Interaction Shortcuts (CLI)
- `Space`: Pause/Resume stream.
- `Ctrl+F`: Search within the current narrative.
- `Ctrl+X`: Export current report to Markdown.
- `/`: Open Interactive Trace-Chat.
