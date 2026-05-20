# UI/UX Concepts: v2.2 'Reasoning IDE'
**Status:** Draft
**Designer:** [Designer]
**Date:** 2026-05-20

## 1. Design Philosophy: From Observation to Action
The v2.2 update transforms TraceWhisper from a **Passive Monitor** (where the user reads what happened) into an **Active Debugger** (where the user fixes why it happened).

The UI must shift from a "Log Viewer" feel to an "IDE" feel. This means:
- **Contextual Actions**: Buttons appear exactly where the problem is detected.
- **Direct Comparison**: The ability to see "Before vs. After" or "A vs. B" without switching tabs.
- **Quantitative Evidence**: Metrics are not just reports, but triggers for optimization.

---

## 2. The 'Fix-It' Button (Closed-Loop Debugging)

### 2.1 Placement & Trigger
The 'Fix-It' button is not a global action; it is a **contextual intervention**.

- **Trigger**: When the backend identifies a `[Reasoning Loop]` or `[Contradiction]`.
- **Visual Cue**: A high-contrast "Magic Wand" icon ($\text{\ud83e\ude84}$) appears in the margin of the Trace Narrative, immediately adjacent to the failing step.
- **Tooltip**: "Fix this loop" or "Resolve contradiction".

### 2.2 The 'Fix-It' Workflow (The "Correction" Overlay)
Upon clicking $\text{\ud83e\ude84}$, a slide-over panel (Right Drawer) opens to maintain the context of the trace.

**Panel Sections:**
1. **Analysis**: A brief, plain-English explanation of the failure (e.g., *"The agent is stuck in a loop because it's trying to find a file that doesn't exist but hasn't been told to stop searching."*).
2. **The Prompt Diff**: A side-by-side comparison.
   - **Left**: Current System Prompt (highlighting the problematic section in red).
   - **Right**: Suggested System Prompt (highlighting the new instruction in green).
3. **Rationale**: Why this specific change works.
4. **Confidence Score**: A badge (Low/Med/High) indicating the reliability of the suggestion.
5. **Actions**: 
   - `[Copy Suggestion]` (Primary)
   - `[Apply to Prompt]` (Secondary - requires integration)

### 2.3 Wireframe: Fix-It Interaction
```text
+-----------------------------------------------------------------------+
|  TRACE VIEW                                              [ SEARCH ]   |
+-----------------------------------------------------------------------+
| Step 12: Thought -> I should check the logs.                           |
| Step 13: Action -> read_file("app.log")                               |
| Step 14: Thought -> I should check the logs.    <-- [!] Fix-It {🪄}    |
| Step 15: Action -> read_file("app.log")                               |
+-----------------------------------------------------------------------+
                                          |                             |
                                          |    FIX-IT SUGGESTION (Drawer)|
                                          |                             |
                                          |  Analysis:                  |
                                          |  Reasoning Loop detected.    |
                                          |                             |
                                          |  Prompt Diff:               |
                                          |  +-----------------------+  |
                                          |  | Current    | Suggested |  |
                                          |  |-----------+-----------|  |
                                          |  | ...search  | ...search |  |
                                          |  | for logs.  | for logs. |  |
                                          |  |            | IF NOT    |  |
                                          |  |            | FOUND,    |  |
                                          |  |            | STOP.     |  |
                                          |  +-----------------------+  |
                                          |                             |
                                          |  Rationale: Adds terminal   |
                                          |  condition to prevent loop. |
                                          |                             |
                                          |  [ Copy ]    [ Apply ]      |
                                          |                             |
                                          +-----------------------------+
```

---

## 3. Comparative Trace Analysis (A/B Testing)

### 3.1 The Comparison Dashboard (KPI Header)
When two traces are selected for comparison, the top of the screen transforms into a **Comparison Header**.

**Metric Cards (The $\Delta$ View):**
Each card shows: `Trace A Value` $\rightarrow$ `Trace B Value` | `Delta %` (Color coded: Green for improvement, Red for regression).

- **Steps**: $24 \rightarrow 18$ | $\downarrow 25\%$ (Green)
- **Tokens**: $12k \rightarrow 9k$ | $\downarrow 25\%$ (Green)
- **Loops**: $2 \rightarrow 0$ | $\downarrow 100\%$ (Green)
- **Efficiency**: $65\% \rightarrow 88\%$ | $\uparrow 23\%$ (Green)

### 3.2 Side-by-Side Narrative Viewer
The main body is a dual-pane view with **Synchronized Scrolling**.

- **Divergence Marker**: A bold red vertical line $\text{--- | ---}$ is placed at the exact step where the logic diverged.
- **Highlighting**: 
  - Steps that are identical in both traces are dimmed.
  - Steps that differ are highlighted (White background, bold text).
- **Verdict Badge**: A floating badge at the bottom indicating the "Winner" based on the Efficiency Score.

### 3.3 Wireframe: A/B Comparison
```text
+-----------------------------------------------------------------------+
| COMPARISON: Trace A (v1.0) vs Trace B (v1.1)              [ Close X ]  |
+-----------------------------------------------------------------------+
| [ Steps: -25% v ] [ Tokens: -25% v ] [ Loops: -100% v ] [ Eff: +23% ^ ] |
+-----------------------------------------------------------------------+
|         TRACE A (Baseline)         |         TRACE B (Variant)        |
|------------------------------------|----------------------------------|
| Step 1: Init Agent... (dimmed)     | Step 1: Init Agent... (dimmed)    |
| Step 2: Read Config... (dimmed)    | Step 2: Read Config... (dimmed)   |
|                                   |                                   |
| [!] DIVERGENCE POINT <-------------|------------- [!] DIVERGENCE POINT |
|                                   |                                   |
| Step 3: Search Docs (FAIL)         | Step 3: Call API (SUCCESS)        |
| Step 4: Search Docs (FAIL)         | Step 4: Process Result            |
| Step 5: Search Docs (FAIL)         | Step 5: Finalize Answer           |
|                                   |                                   |
| Step 6: ...                       | Step 6: ...                       |
+------------------------------------|----------------------------------+
|                                   |  WINNER: Trace B (+23% Efficiency)|
+-----------------------------------------------------------------------+
```

---

## 4. Interaction Patterns & Accessibility

### 4.1 Keyboard Shortcuts
- `Cmd + Shift + F`: Open Fix-It for the currently selected step.
- `Cmd + Shift + C`: Open Comparison mode for selected traces.

### 4.2 Accessibility (WCAG AA)
- **Color Contrast**: Use high-contrast greens/reds for $\Delta$ metrics (with icons $\uparrow \downarrow$ for color-blind users).
- **Focus Management**: When the 'Fix-It' drawer opens, focus moves to the 'Analysis' section for screen readers.
- **Sync-Scroll**: Provide a toggle to disable synchronized scrolling for users with motion sensitivity.

## 5. Implementation Notes for Developers
- **Sync-Scroll**: Implement using a shared scroll-offset listener between the two narrative panes.
- **Diff View**: Use a standard diffing library for the prompt comparison to ensure clear `+` and `-` markings.
- **Divergence Logic**: The red line should be placed at the first index where `traceA.steps[i].action != traceB.steps[i].action`.
