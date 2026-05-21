# UI/UX Specification: v3.0 Healing Proposal Workflow (SH-5)

## 1. Overview
The Healing Proposal Workflow is the primary human-in-the-loop interface for the v3.0 Self-Healing Orchestrator. It transforms the complex process of autonomous drift detection and fix synthesis into a simple, high-confidence approval process for the Strategic Overseer.

**Objective:** Minimize the "Maintenance Tax" by allowing the Overseer to validate and deploy fixes in seconds, rather than hours of manual prompt tuning.

---

## 2. User Journey (The Healing Loop)
1. **Detection:** The system detects a PAR (Path Adherence Rate) drop in a production agent.
2. **Synthesis:** The "Council of Agents" diagnoses the root cause and synthesizes a fix.
3. **Verification:** The fix is run against a shadow environment with regression tests.
4. **Notification:** The Overseer receives a "Healing Proposal" alert.
5. **Review:** The Overseer opens the proposal and reviews the Drift, the Fix, and the Proof.
6. **Resolution:** The Overseer either Approves (Deploy), Rejects, or Modifies the proposal.

---

## 3. Interface Specifications

### 3.1 The Healing Proposal Notification (The "Trigger")
When a proposal is ready, a notification card appears in the Strategic Health Map or via a system alert.

**Visual Cues:**
- **Border:** Pulsing `Cyber Teal` (`#2DD4BF`) to indicate an autonomous action is pending.
- **Icon:** A "healing" icon (e.g., a stylized bandage or a spark).
- **Content:**
  - Agent Name (e.g., `Research-Bot-04`)
  - Drift Type (e.g., `Logic Drift: Milestone 3`)
  - Confidence Score (e.g., `94% Verified`)
  - Action: `[ Review Proposal ]`

### 3.2 The Healing Proposal Detail View (The "Workspace")
The main view is designed as a "Reasoning Diff," similar to a Git PR but focused on cognitive paths rather than just code.

#### A. Header (Metadata)
- **Title:** `Healing Proposal #HP-1024: [Agent Name]`
- **Status:** `Pending Approval`
- **Severity:** `High` (based on PAR drop)
- **Timeline:** `Detected 12m ago` $\rightarrow$ `Synthesized 8m ago` $\rightarrow$ `Verified 5m ago`

#### B. Section 1: The Drift (The "Why")
A side-by-side visualization of the reasoning path.
- **Left Column (Golden Path):** The intended, verified reasoning sequence. (Muted `Noise Gray`).
- **Right Column (Drifted Path):** The actual production path that failed.
- **Highlight:** The exact "Cognitive Milestone" where the divergence occurred is highlighted in `Drift Yellow` (`#FDE047`).
- **Annotation:** A brief "Diagnosis" summary (e.g., *"Agent skipped the 'Compliance Check' step and jumped directly to 'Synthesis', leading to a constraint violation."*)

#### C. Section 2: The Fix (The "What")
A high-contrast diff view of the Prompt/Reasoning Block.
- **Red Block (Old):** The existing prompt segment.
- **Green Block (New):** The synthesized improvement.
- **Highlight:** Specific wording changes highlighted in `Insight Green` (`#4ADE80`).
- **Rationale:** A "Fix Logic" explanation (e.g., *"Added explicit instruction to verify the compliance token before proceeding to synthesis."*)

#### D. Section 3: The Proof (The "Evidence")
A verification report from the shadow environment.
- **Regression Suite:** A table showing the fix's performance across a set of test cases.
  - `Test Case ID` | `Baseline` | `Healed` | `Status`
  - `TC-01: Edge Case A` | `Pass` | `Pass` | `\u2705`
  - `TC-02: Logic Loop B` | `Fail` | `Pass` | `\ud83d\ude80 Fixed`
  - `TC-03: Constraint C` | `Pass` | `Pass` | `\u2705`
- **Stability Metric:** A "Stability Gain" percentage (e.g., `+12% PAR improvement`).

#### E. Footer (Action Center)
- **[ Reject ]**: Discard the proposal and mark as "Manual Intervention Required."
- **[ Modify ]**: Open the prompt editor to tweak the synthesized fix.
- **[ APPROVE & DEPLOY ]**: Push the fix to production. (Primary action, `Cyber Teal` button).

---

## 4. High-Fidelity Wireframe (ASCII)

```text
+---------------------------------------------------------------------------------------+
| [ < Back ]   HEALING PROPOSAL #HP-1024: Research-Bot-04            STATUS: PENDING    |
| Timeline: Detected (12m) ---- Synthesized (8m) ---- Verified (5m)       SEVERITY: HIGH |
+---------------------------------------------------------------------------------------+
|                                                                                       |
|  1. THE DRIFT (Reasoning Path Divergence)                                              |
|  +-----------------------------------+   +-------------------------------------------+ |
|  | GOLDEN PATH (Standard)            |   | DRIFTED PATH (Actual)                     | |
|  | [ ] Milestone 1: Intent Extraction|   | [ ] Milestone 1: Intent Extraction        | |
|  | [ ] Milestone 2: Source Retrieval |   | [ ] Milestone 2: Source Retrieval         | |
|  | [X] Milestone 3: Compliance Check | <--- [!] DIVEREGENCE POINT: MILESTONE 3       | |
|  | [ ] Milestone 4: Synthesis        |   | [ ] Milestone 4: Synthesis                | |
|  +-----------------------------------+   +-------------------------------------------+ |
|  DIAGNOSIS: Agent skipped 'Compliance Check' and jumped directly to 'Synthesis'.       |
|                                                                                       |
|  2. THE FIX (Cognitive Block Diff)                                                     |
|  +-----------------------------------------------------------------------------------+ |
|  | OLD PROMPT (v1.2)                                                                  | |
|  | "Retrieve the data and synthesize the response based on the user's query."         | |
|  |                                                                                   | |
|  | NEW PROMPT (Proposed v1.3)                                                        | |
|  | "Retrieve the data, [VERIFY COMPLIANCE TOKEN], and then synthesize the response    | |
|  |  based on the user's query."                                                      | |
|  +-----------------------------------------------------------------------------------+ |
|  RATIONALE: Added explicit verification step to prevent constraint violations.        |
|                                                                                       |
|  3. THE PROOF (Shadow Verification Results)                                            |
|  +-----------------------------------------------------------------------------------+ |
|  | Test Case ID   | Baseline | Healed | Status                                        | |
|  |----------------|----------|--------|----------------------------------------------| |
|  | TC-01: Edge A  | PASS     | PASS   | [ \u2705 ]                                     | |
|  | TC-02: Loop B  | FAIL     | PASS   | [ \ud83d\ude80 FIXED ]                                | |
|  | TC-03: Const C | PASS     | PASS   | [ \u2705 ]                                     | |
|  +-----------------------------------------------------------------------------------+ |
|  STABILITY GAIN: +12% PAR Improvement                                                 |
|                                                                                       |
|  +-----------------------------------------------------------------------------------+ |
|  | [ REJECT ]                   [ MODIFY ]               [ APPROVE & DEPLOY FIX ]     | |
|  +-----------------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------+
```

---

## 5. Technical Mapping (UI $\rightarrow$ API)

| UI Element | Data Source (HealingProposal Object) | API Action |
| :--- | :--- | :--- |
| **Drift Visualization** | `proposal.drift_analysis.golden_path` vs `proposal.drift_analysis.actual_path` | `GET /v3/healing/proposals/{id}` |
| **Fix Diff** | `proposal.proposed_fix.old_prompt` vs `proposal.proposed_fix.new_prompt` | `GET /v3/healing/proposals/{id}` |
| **Verification Table** | `proposal.verification_results.regression_suite` | `GET /v3/healing/proposals/{id}` |
| **Deploy Button** | N/A | `PUT /v3/orchestrator/deploy` |

---

## 6. Interaction Patterns
- **Sync-Scroll:** Scrolling the "Golden Path" automatically scrolls the "Drifted Path" to maintain alignment.
- **Hover-Detail:** Hovering over a failed test case in "The Proof" shows the specific trace of that failure.
- **One-Click Deployment:** Clicking "Approve & Deploy" triggers the deployment pipeline and immediately switches the view to "Monitoring Mode" to watch for the Autonomous Circuit Breaker.

---

## 7. Visual Palette Mapping
| Element | Color | Hex | Meaning |
| :--- | :--- | :--- | :--- |
| Background | Obsidian | `#0F172A` | Technical focus |
| Drift Highlight | Drift Yellow | `#FDE047` | Point of failure |
| Fix Highlight | Insight Green | `#4ADE80` | Resolution |
| Action Button | Cyber Teal | `#2DD4BF` | Autonomous Action |
| Text (Primary) | Pure White | `#F8FAFC` | Readability |
| Text (Secondary) | Noise Gray | `#64748B` | Context/Baseline |
