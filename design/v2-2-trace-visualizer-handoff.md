# Handoff: Reasoning Trace Visualizer (v2.2.2)

## 1. Overview
The Reasoning Trace Visualizer for v2.2.2 is designed to support the **Verification Loop**. It transforms the static observation of a reasoning trace into an active validation workflow. The visualizer must clearly communicate the transition from a "Failed" state through "Verification" to a "Verdict" (Success, Failure, or Regression).

## 2. Visual Identity & Color Mapping
This visualizer extends the v2.2 design system.

| State | Color | Hex | Visual Meaning |
| :--- | :--- | :--- | :--- |
| **Processing** | Signal Blue | `#38BDF8` | Verification in progress / Running benchmarks |
| **Success** | Insight Green | `#4ADE80` | Loop resolved & no regressions |
| **Failure** | Obsidian Red | `#EF4444` | Fix failed to resolve the loop |
| **Regression** | Alert Amber | `#FBBF24` | Loop resolved, but existing benchmarks failed |
| **Safe State** | Obsidian Grey | `#64748B` | The archived snapshot / rollback point |

## 3. Interaction Model: The Verification Loop
The user's journey through the visualizer follows a linear progression with a possible rollback loop.

1. **Trigger**: User identifies a `[Reasoning Loop]` in the trace.
2. **Intervention**: User clicks the **"Apply & Verify"** button (Signal Blue).
3. **Verification State**: 
   - The UI enters a "Verifying..." overlay.
   - A real-time checklist updates as the system runs the Triggering Trace and the Verification Set (benchmarks).
4. **The Verdict**:
   - The system presents a final status banner.
   - **If Success**: Prompt is updated permanently.
   - **If Failure**: System suggests another fix; remains on the current prompt.
   - **If Regression**: System alerts the user and provides a high-contrast **"Rollback to Safe State"** button.

## 4. Interface Layouts (ASCII)

### 4.1 The "Verifying..." State
This view appears immediately after "Apply & Verify" is clicked.

```text
+-----------------------------------------------------------------------+
|                                                                       |
|   [!] VERIFYING FIX...                                                |
|   Applying prompt update and running regression benchmarks...          |
|                                                                       |
|   +---------------------------------------------------------------+   |
|   | [X] Triggering Trace (Resolved)                               |   |
|   | [X] Benchmark: basic_query_test                               |   |
|   | [ ] Benchmark: complex_reasoning_test (Running...)            |   |
|   | [ ] Benchmark: edge_case_validation (Pending)                 |   |
|   +---------------------------------------------------------------+   |
|                                                                       |
|   [ Cancel Verification ]                                             |
|                                                                       |
+-----------------------------------------------------------------------+
```

### 4.2 The Verdict View: Success
```text
+-----------------------------------------------------------------------+
|                                                                       |
|   ✅ FIXED & STABLE!                                                  |
|   The reasoning loop is resolved and no regressions were found.        |
|                                                                       |
|   +---------------------------------------------------------------+   |
|   | Original: [Reasoning Loop] -> New: [Linear Flow]              |   |
|   | Benchmarks: 4/4 Passed                                        |   |
|   +---------------------------------------------------------------+   |
|                                                                       |
|                          [ Return to IDE ]                            |
|                                                                       |
+-----------------------------------------------------------------------+
```

### 4.3 The Verdict View: Regression (The Danger Zone)
```text
+-----------------------------------------------------------------------+
|                                                                       |
|   ⚠️ FIXED BUT UNSTABLE                                               |
|   The loop is gone, but a regression was detected in benchmarks.       |
|                                                                       |
|   +---------------------------------------------------------------+   |
|   | Triggering Trace: RESOLVED                                    |   |
|   | Benchmark: complex_reasoning_test -> FAILED (New Loop)         |   |
|   +---------------------------------------------------------------+   |
|                                                                       |
|   [ Try Another Suggestion ]          [ ↩️ ROLLBACK TO SAFE STATE ]    |
|                                                                       |
+-----------------------------------------------------------------------+
```

## 5. Asset Checklist
- [ ] **Icons**: 
    - `check_circle` (Insight Green) for passed benchmarks.
    - `alert_triangle` (Alert Amber) for regressions.
    - `undo` (Obsidian Grey) for the Rollback button.
- [ ] **Animations**: 
    - Pulse animation for the "Running..." benchmark state.
    - Slide-in transition for the Verdict banner.
- [ ] **Component Specs**:
    - Verification Checklist Component (Dynamic list).
    - Verdict Banner (Three variants: Success, Failure, Regression).
    - Rollback Button (High-priority action style).

## 6. Implementation Notes for CTO
- **State Management**: The UI must track the `ev_verify_start` $\rightarrow$ `ev_verify_success/fail/rollback` telemetry events to update the view.
- **Rollback Trigger**: The "Rollback to Safe State" button must trigger the `prompt_rollback` hook in the SDK immediately.
- **Comparison Logic**: The "Verdict" is derived from the comparison between the original trace and the new trace (Loops $\rightarrow$ No Loops).
