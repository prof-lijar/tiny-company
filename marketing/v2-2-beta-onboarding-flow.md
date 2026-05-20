# v2.2 'Correction Preview' Beta Onboarding Flow

**Objective:** Lead Beta users from "Installation" to their first successful "Fix-It" prompt adjustment as quickly as possible.

---

## 🎯 The Beta "Aha!" Moment
The "Aha!" moment for the v2.2 Beta occurs when a user clicks the **"Fix-It"** button on a detected reasoning loop and sees a prompt suggestion that *actually* solves the problem without manual trial-and-error.

---

## 🚀 The Beta Golden Path

### Step 1: The Invitation & Access
*   **Touchpoint:** Beta Invitation Email.
*   **Action:** User clicks the unique access link and activates the v2.2 Beta flag in their account/config.
*   **Goal:** Low-friction entry into the "Correction Preview" group.

### Step 2: The "Guided Failure" (Quick Start)
*   **Touchpoint:** Beta Welcome Dashboard / In-App Guide.
*   **Action:** User is encouraged to run a "Stress Test" script provided by TraceWhisper—a script designed to trigger a known reasoning loop.
*   **Goal:** Ensure the user experiences a failure immediately so they can test the correction logic.

### Step 3: Detection & The "Magic Wand"
*   **Touchpoint:** The Narrative Trace View.
*   **Experience:** The user sees the agent looping. TraceWhisper flags the loop and displays the **Magic Wand ($\text{\ud83e\ude84}$)** icon next to the problematic segment.
*   **Goal:** Immediate visual cue that "This can be fixed automatically."

### Step 4: The "Fix-It" Moment (The Core Value)
*   **Touchpoint:** The Fix-It Modal.
*   **Action:** User clicks **"Fix-It"**.
*   **Experience:** The system presents:
    1.  **The Rationale:** "Your agent is looping because it's missing a constraint on X."
    2.  **The Suggestion:** A diff showing the exact text to add to the system prompt.
*   **Goal:** Deliver a high-quality, surgical prompt adjustment.

### Step 5: The Validation Loop
*   **Touchpoint:** Prompt Editor $\rightarrow$ Re-run.
*   **Action:** User applies the fix and re-runs the agent.
*   **Experience:** The agent now completes the task without looping.
*   **Goal:** Close the loop from *Detection* $\rightarrow$ *Correction* $\rightarrow$ *Validation*.

### Step 6: Feedback & Contribution
*   **Touchpoint:** Feedback Prompt.
*   **Action:** User marks the fix as "Successful" or "Unhelpful."
*   **Goal:** Collect data to improve the Meta-Prompt engine for the full v2.2 release.

---

## 🛠️ Beta-Specific Friction Mitigations

| Potential Friction | Beta Mitigation |
| :--- | :--- |
| **"I don't have a loop to fix"** | Provide the "Stress Test" script so they don't have to wait for a natural failure. |
| **"I'm afraid to change my prompt"** | Emphasize the **Rationale** section so they understand *why* the change is suggested. |
| **"The fix didn't work"** | Provide a direct "Report Failure" button that sends the trace to the Product team for analysis. |
| **Complexity of Beta Setup** | Use a single-command activation: `tw beta activate v2.2-correction` |
