# v2 User Onboarding Flow: The "Golden Path"

This document defines the ideal user journey for a developer starting with TraceWhisper v2. The goal is to minimize "Time-to-First-Narrative" (TTFN) and lead the user to the "Aha!" moment as quickly as possible.

## 1. The "Aha!" Moment
For TraceWhisper v2, the "Aha!" moment occurs when a developer sees a **real-time narrative** of their agent's reasoning and realizes they no longer need to manually parse JSON logs to understand why an agent is looping or failing.

## 2. The Golden Path (Step-by-Step)

### Step 1: Discovery & Installation
*   **User Action:** User finds TraceWhisper via the landing page or GitHub.
*   **Touchpoint:** `pip install tracewhisper`
*   **Goal:** Frictionless setup.
*   **Success Metric:** < 30 seconds from decision to installed.

### Step 2: The "One-Line" Integration
*   **User Action:** User adds the TraceWhisper monitor to their existing agent script.
*   **Touchpoint:** 
    ```python
    import tracewhisper
    tracewhisper.init() # Or a decorator @tracewhisper.monitor
    ```
*   **Goal:** Zero-config integration. The user should not have to write custom logging logic.
*   **Success Metric:** < 2 minutes to integrate into a working script.

### Step 3: The First Execution
*   **User Action:** User runs their agent script.
*   **Touchpoint:** The agent begins executing tasks. In the background, the SDK is streaming logs to the local SQLite store.
*   **Goal:** Seamless background operation. The user's agent performance should not be noticeably degraded.

### Step 4: Launching Live Whisper
*   **User Action:** User opens a second terminal and runs the live monitor.
*   **Touchpoint:** `tw live`
*   **Goal:** Immediate visual feedback.
*   **Experience:** The user sees a `rich`-powered dashboard. As the agent works in the other terminal, the narrative updates in real-time.
*   **Success Metric:** TTFN (Time-to-First-Narrative) < 5 minutes.

### Step 5: The First Insight (The "Aha!")
*   **User Action:** The agent enters a loop or makes a mistake.
*   **Touchpoint:** The Live Whisper narrative explicitly flags a "Critical Decision Point" or a "Reasoning Loop."
*   **Experience:** The user reads: *"The agent is repeatedly searching for 'X' because it failed to find 'Y' in the previous step, despite the tool returning a partial match."*
*   **Goal:** Immediate understanding of the failure without looking at raw logs.

### Step 6: Iterative Fix (Closing the Loop)
*   **User Action:** User stops the agent, modifies the prompt based on the insight, and restarts.
*   **Touchpoint:** `tw compare <old_trace> <new_trace>`
*   **Goal:** Validation of the fix.
*   **Experience:** The user sees a side-by-side comparison confirming that the new prompt avoided the loop.

---

## 3. Friction Points & Mitigations

| Potential Friction | Mitigation Strategy |
| :--- | :--- |
| **Installation Errors** | Provide a clear "Troubleshooting" section in the Quick Start guide. |
| **Integration Complexity** | Provide "Copy-Paste" snippets for LangChain and CrewAI specifically. |
| **Confusion on `tw live`** | Ensure the SDK prints a helpful message to the console after `init()`: *"🚀 TraceWhisper is active! Run `tw live` in a new terminal to see your agent's thoughts in real-time."* |
| **Empty Narrative** | Implement a "Waiting for logs..." state in the CLI dashboard so the user knows the tool is working. |

## 4. Onboarding Checklist for Design/Eng
- [ ] **SDK:** Implement the "Helpful Hint" console message after initialization.
- [ ] **CLI:** Create the "Waiting for logs..." state for `tw live`.
- [ ] **Docs:** Create a 3-step "Quick Start" guide that mirrors this Golden Path.
- [ ] **UI:** Design the "Critical Decision Point" visual highlight in the live stream.
