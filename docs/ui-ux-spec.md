# UI/UX Specification: TraceWhisper

## 1. Design Philosophy
TraceWhisper is a \"Developer-First\" tool. The interface prioritizes efficiency, density of information, and the reduction of cognitive load. 

### Core Interaction Patterns
- **Drill-Down:** High-level summary $\\rightarrow$ Detailed Whisper segment $\\rightarrow$ Raw Log lines.
- **Parallelism:** Comparative views for A/B testing.
- **Contextual Awareness:** The UI adapts based on whether the user is in \"Live Mode\" (observing), \"Forensic Mode\" (analyzing), or \"Strategic Mode\" (orchestrating).
- **The Strategic Shift (v3.0):** Transition from forensic analysis (finding what broke) to strategic oversight (approving how it's healed).
- **Contextual Awareness:** The UI adapts based on whether the user is in "Live Mode" (observing) or "Forensic Mode" (analyzing).
- **Governance-First (v2.4):** For the Enterprise portal, every administrative action must be backed by technical evidence (a reasoning trace).

---

## 2. User Flows

### 2.1 Frictionless Onboarding (v2.1)
**Goal:** Get the user to their first \"Aha!\" moment in < 60 seconds.
1. **Initial Setup:** User runs `tw init`.
2. **Consent:** A clear, concise \"Beta Terms\" block appears in the terminal. User types `Y` to agree.
3. **Integration Choice:** User chooses framework (LangChain / CrewAI / AutoGen / Other).
4. **The Recipe:** CLI outputs a 3-line code snippet.
5. **The Hook:** After first trace, CLI prompts: *\"Your first trace is ready. Run `tw live` to see the narrative unfold in real-time.\"*
2. **Consent:** A clear, concise "Beta Terms" block appears in the terminal. User types `Y` to agree.
3. **Integration Choice:** User is asked: "Which framework are you using? (LangChain / CrewAI / AutoGen / Other)".
4. **The Recipe:** The CLI outputs a 3-line code snippet tailored to their framework.
5. **The Hook:** After the first successful trace is detected, the CLI prompts: *"Your first trace is ready. Run `tw live` to see the narrative unfold in real-time."*

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

### 2.4 The Intelligence Layer Flow (v2.3)
**Goal:** Proactive optimization and organizational knowledge sharing.

#### 2.4.1 The Pattern Vault Integration
1. **Detection:** While in "The Fixer" flow, the system queries the Pattern Vault.
2. **Suggestion:** If a similar failure pattern is found in other projects, a "Vault Insight" card is injected: *"Similar reasoning failure solved in [Project X]. Suggested Fix: [Brief Description]"*.
3. **Application:** User can apply the vaulted fix with one click.

#### 2.4.2 Cognitive Pruning Analysis
1. **Entry:** User runs `tw prune <trace_id>`.
2. **Bloat Identification:** The UI highlights "Circular Reasoning" or "Redundant Steps" in a muted grey "Fog" overlay.
3. **Comparison:** A side-by-side view shows the original trace vs. the hypothetical pruned trace.
4. **Metric:** An "Efficiency Score" (e.g., 72%) is displayed, along with "Tokens Saved" potential.

#### 2.4.3 Reasoning Unit Testing (CRI)
1. **Entry:** `tw verify-all` in CI/CD or local CLI.
2. **Cognitive Diff:** If a test fails, the UI displays a "Cognitive Path Diff":
   - **Expected Path:** $\text{Step A} \rightarrow \text{Step B} \rightarrow \text{Step C}$ (Green)
   - **Actual Path:** $\text{Step A} \rightarrow \text{Step B} \rightarrow \text{Step X}$ (Red/Amber)
3. **Divergence Point:** The exact step where the reasoning deviated is highlighted.

#### 2.4.4 IDE Integration (VS Code)
1. **Side-by-Side:** The Prompt file is on the left; the Narrative Trace is on the right.
2. **Live-Link:** Clicking a line in the Narrative Trace highlights the corresponding prompt instruction on the left.
3. **Quick-Fix:** A lightbulb icon appears next to prompt lines that contributed to a failure; clicking it opens the "Fixer" or "Vault" suggestion.

---

## 3. Interface Layouts

### 3.1 CLI Live Dashboard
(See `design/wireframes.md` for ASCII mockup)
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
- **Divergence Marker:** Bold horizontal line where paths diverged.
- **Metric Header:** Summary bar comparing `Steps`, `Tokens`, `Time`.

### 3.3 Strategic Health Map (v3.0)
- **Health Grid:** A matrix of active agents with color-coded stability status.
- **Autonomous Queue:** A real-time feed of ongoing system self-healing activities (e.g., \"Diagnosing drift in Research-Bot...\").

### 3.4 Visual Architecture Canvas (v3.0)
- **Node-Edge Graph:** A visual representation of the reasoning pipeline.
- **Dynamic Routing Toggles:** Visual indicators of which model is handling which block.

### 3.3 Enterprise Governance Portal (v2.4 - Web)
- **Dashboard:** High-level KPI cards (Token Cost, Compliance Rate, Avg. Cost Reduction).
- **User/Role Matrix:** A grid for managing RBAC across the organization.
- **Audit Log:** A searchable table of every change to the reasoning vaults, linked to trace IDs.
- **Reasoning Diff View:** A visual representation of cognitive path pruning (Before vs. After).

### 3.3 v2.3 Intelligence Layer Layouts

#### 3.3.1 The Cognitive Diff (CRI)
```text
+-----------------------------------------------------------------------+
| VERIFICATION FAILURE: Test Case #42 (Edge Case: Recursive Loop)        |
+-----------------------------------------------------------------------+
| EXPECTED COGNITIVE PATH:                                              |
| [OK] Step 1: Parse User Intent                                        |
| [OK] Step 2: Validate Constraints                                     |
| [OK] Step 3: Execute Primary Search                                    |
| [OK] Step 4: Synthesize Answer                                        |
|                                                                       |
| ACTUAL COGNITIVE PATH:                                                |
| [OK] Step 1: Parse User Intent                                        |
| [OK] Step 2: Validate Constraints                                     |
| [!!] Step 3: Execute Primary Search <--- DIVERGENCE POINT              |
| [!!] Step 4: Re-validate Constraints (Loop Detected)                  |
| [!!] Step 5: Execute Primary Search (Repeat)                          |
+-----------------------------------------------------------------------+
| Recommendation: tighten the "Constraint Validation" prompt block.     |
+-----------------------------------------------------------------------+
```

#### 3.3.2 Pruning Report
```text
+-----------------------------------------------------------------------+
| COGNITIVE PRUNING ANALYSIS: Trace #882                                 |
+-----------------------------------------------------------------------+
| EFFICIENCY SCORE: 64% | POTENTIAL SAVINGS: 1,240 Tokens                |
+-----------------------------------------------------------------------+
| [ORIGINAL TRACE]                      | [PRUNED TRACE]                 |
| Step 1: Initial Thought               | Step 1: Initial Thought        |
| Step 2: Reasoning A                   | Step 2: Reasoning A            |
| Step 3: Reasoning A (Repeat) [BLOAT]  | (Step Removed)                  |
| Step 4: Reasoning A (Repeat) [BLOAT]  | (Step Removed)                  |
| Step 5: Final Conclusion              | Step 3: Final Conclusion       |
+-----------------------------------------------------------------------+
| Suggestion: "Avoid repeating the verification step after Step 2."      |
+-----------------------------------------------------------------------+
```

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
| **Compliance Gap** | Warning Orange | Dashed border | Agent deviated from Golden Path (v2.4) |
| **Cognitive Bloat** | Fog Grey | Muted/Strikethrough | Redundant reasoning (v2.3) |
| **Vault Insight** | Vault Purple | Bordered Card | Cross-project knowledge (v2.3) |

### 4.2 Interaction Shortcuts (CLI)
- `Space`: Pause/Resume stream.
- `Ctrl+F`: Search within the current narrative.
- `Ctrl+X`: Export current report to Markdown.
- `/`: Open Interactive Trace-Chat.
- `S`: (v3.0) Jump to Strategic Health Map.
- `D`: (v3.0) Open Architecture Designer.
- `p`: Trigger Pruning Analysis (v2.3).
- `v`: Open Vault Suggestions (v2.3).
=======


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
>>>>>>> designer/trace-visualizer-support
