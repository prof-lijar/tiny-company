# UI/UX Specification: TraceWhisper

## 1. Design Philosophy
TraceWhisper is a \"Developer-First\" tool. The interface prioritizes efficiency, density of information, and the reduction of cognitive load. 

### Core Interaction Patterns
- **Drill-Down:** High-level summary $\\rightarrow$ Detailed Whisper segment $\\rightarrow$ Raw Log lines.
- **Parallelism:** Comparative views for A/B testing.
- **Contextual Awareness:** The UI adapts based on whether the user is in \"Live Mode\" (observing), \"Forensic Mode\" (analyzing), or \"Strategic Mode\" (orchestrating).
- **The Strategic Shift (v3.0):** Transition from forensic analysis (finding what broke) to strategic oversight (approving how it's healed).

---

## 2. User Flows

### 2.1 Frictionless Onboarding (v2.1)
**Goal:** Get the user to their first \"Aha!\" moment in < 60 seconds.
1. **Initial Setup:** User runs `tw init`.
2. **Consent:** A clear, concise \"Beta Terms\" block appears in the terminal. User types `Y` to agree.
3. **Integration Choice:** User chooses framework (LangChain / CrewAI / AutoGen / Other).
4. **The Recipe:** CLI outputs a 3-line code snippet.
5. **The Hook:** After first trace, CLI prompts: *\"Your first trace is ready. Run `tw live` to see the narrative unfold in real-time.\"*

### 2.2 Live Whisper Observation
**Goal:** Real-time transparency of agent reasoning.
1. **Entry:** User runs `tw live`.
2. **The Dashboard:** Split-screen terminal view.
   - **Top/Left (Narrative):** Scrolling feed of \"Whispers\".
   - **Bottom/Right (Raw):** Fast-scrolling feed of raw logs.
3. **Interruption:** `Space` to pause the stream.
4. **Focus:** Highlight a Whisper segment to see corresponding raw logs.

### 2.3 Forensic Analysis & \"The Fixer\"
**Goal:** Move from \"What happened?\" to \"How do I fix it?\".
1. **Trace Selection:** `tw view <trace_id>`.
2. **Narrative Review:** User reads the \"Execution Report.\"
3. **Failure Identification:** UI highlights \"Reasoning Loops\" or \"Strategic Pivots\" in **Alert Amber**.
4. **Fix Trigger:** User triggers \"The Fixer.\"
5. **The Proposal:** UI presents a \"Before vs. After\" prompt comparison.

### 2.4 Autonomous Healing Approval (v3.0)
**Goal:** Human-in-the-loop approval for autonomous reasoning repairs.
1. **Notification:** A \"Healing Proposal\" card appears in the Strategic Dashboard.
2. **Reasoning Diff:** User compares the **Drifted Path** (Red/Amber) vs. the **Healed Path** (Emerald Green).
3. **Verification Check:** User reviews the stability gain metric and regression test results.
4. **Deployment:** User selects `[ APPROVE & DEPLOY ]` to push the fix to production.

### 2.5 Cognitive Architecture Design (v3.0)
**Goal:** Visual design of reasoning flows.
1. **Canvas Entry:** User opens the Visual Architecture Designer.
2. **Block Placement:** User drags and drops Reasoning Blocks (e.g., \"Search\", \"Synthesis\") onto the canvas.
3. **Logic Mapping:** User connects blocks to define the cognitive flow.
4. **Routing Config:** User sets blocks to \"Auto-Route\" (Dynamic Model Selection) or \"Pinned\" (Specific Model).
5. **Simulation:** User runs a simulation to verify the architecture before deployment.

---

## 3. Interface Layouts (Conceptual)

### 3.1 CLI Live Dashboard
(See `design/wireframes.md` for ASCII mockup)

### 3.2 Trace Comparison (A/B)
- **Layout:** Side-by-side vertical columns.
- **Sync-Scroll:** Scrolling one trace scrolls the other to the corresponding timestamp.
- **Divergence Marker:** Bold horizontal line where paths diverged.
- **Metric Header:** Summary bar comparing `Steps`, `Tokens`, `Time`.

### 3.3 Strategic Health Map (v3.0)
- **Health Grid:** A matrix of active agents with color-coded stability status.
- **Autonomous Queue:** A real-time feed of ongoing system self-healing activities (e.g., \"Diagnosing drift in Research-Bot...\").

### 3.4 Visual Architecture Canvas (v3.0)
- **Node-Edge Graph:** A visual representation of the reasoning pipeline.
- **Dynamic Routing Toggles:** Visual indicators of which model is handling which block.

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
| **Self-Healing (v3.0)** | Emerald Green | Pulsing glow | Autonomous fix applied/proposed |
| **Drift (v3.0)** | Amber/Red | Warning icon | Deviation from Golden Path detected |

### 4.2 Interaction Shortcuts (CLI)
- `Space`: Pause/Resume stream.
- `Ctrl+F`: Search within the current narrative.
- `Ctrl+X`: Export current report to Markdown.
- `/`: Open Interactive Trace-Chat.
- `S`: (v3.0) Jump to Strategic Health Map.
- `D`: (v3.0) Open Architecture Designer.
