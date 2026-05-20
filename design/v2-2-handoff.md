# v2.2 Visual Asset Handoff: Reasoning IDE & Closed-Loop Debugger
**Status:** FINAL SOURCE OF TRUTH
**Version:** 2.2
**Role:** [Designer]

This document consolidates all finalized v2.2 UI/UX specifications, brand tokens, and wireframes. It is the primary reference for the engineering team to implement the 'Reasoning IDE' and 'Fix-It' workflow.

---

## 1. Visual Identity & Design Tokens

All v2.2 components must adhere to the **TraceWhisper Brand Guide**. The visual goal is "Technical Elegance"—a high-density, high-contrast environment resembling a professional IDE.

### 1.1 Final Color Palette
| Token | Color Name | Hex | Usage |
| :--- | :--- | :--- | :--- |
| `bg-primary` | Obsidian | `#0F172A` | Main workspace, sidebars, and drawers |
| `accent-primary` | Signal Blue | `#38BDF8` | Primary buttons, active focus, standard whispers |
| `text-primary` | Pure White | `#F8FAFC` | Primary headings, active trace steps |
| `text-secondary` | Noise Gray | `#64748B` | Dimmed steps, labels, metadata, inactive UI |
| `status-success` | Insight Green | `#4ADE80` | Corrected segments, "Winner" badge, resolved loops |
| `status-warning` | Alert Amber | `#FBBF24` | Loop detection markers, "Fix-It" triggers |
| `status-error` | Critical Red | `#EF4444` | Divergence points, critical failures |

### 1.2 Typography
- **UI Labels/Narrative:** `Inter` or `Roboto` (Sans-Serif)
  - Use for: High-level summaries, buttons, labels, and navigation.
- **Technical Data/Traces:** `JetBrains Mono` or `Fira Code` (Monospace)
  - Use for: Raw logs, system prompts, code snippets, and trace IDs.
  - Size: 13px for optimal density.

---

## 2. Feature Specification: The 'Fix-It' Workflow

The 'Fix-It' feature transforms a diagnostic observation (loop/contradiction) into a corrective action.

### 2.1 The Trigger (Contextual Intervention)
- **Detection State:** When the backend identifies a `[Reasoning Loop]` or `[Contradiction]`, the text in the Narrative Stream is highlighted with a background of **Alert Amber** (`#FBBF24`) and **Obsidian** (`#0F172A`) text.
- **Visual Trigger:** A glowing amber magic-wand icon ($\text{\ud83e\ude84}$) appears in the left margin.
- **Behavior:** Hovering reveals a tooltip: `"Fix this [Loop/Contradiction]"`.

### 2.2 The Correction Drawer (Right-Side Overlay)
Triggered by the 'Fix-It' action, a drawer slides in from the right (`width: 450px`).

**Layout Sections:**
1. **Header:** Title "Reasoning Correction" with a close button.
2. **Analysis Card:** A `bg-secondary` box containing the plain-English explanation of the failure.
3. **Prompt Diff View:** 
   - Side-by-side comparison of the System Prompt.
   - **Left (Current):** Red background (`#450a0a`) for problematic text.
   - **Right (Suggested):** Green background (`#064e3b`) for corrected text.
4. **Rationale:** Short paragraph explaining the logic behind the change.
5. **Confidence Badge:** Pill-shaped badge (`Low` | `Med` | `High`).
6. **Footer Actions:** `[Copy Suggestion]` (Primary) and `[Apply to Prompt]` (Secondary).

### 2.3 Wireframe: Fix-It Interaction
```text
+---------------------------------------------------------------------------------------+
| TRACEWHISPER IDE                                                      [ User Profile ]|
+---------------------------------------------------------------------------------------+
| < Trace: agent_run_042 >                                           [ Search Traces... ]|
+---------------------------------------------------------------------------------------+
|                                                                                       |
|  Step 10: [Thought] I need to verify the API key.                                       |
|  Step 11: [Action] call_api(endpoint="verify", key="...")                              |
|  Step 12: [Observation] Error: 401 Unauthorized                                        |
|                                                                                       |
|  [!] Step 13: [Thought] I will try to verify the API key again.  <-- {🪄 Fix-It}        |
|  Step 14: [Action] call_api(endpoint="verify", key="...")                              |
|  Step 15: [Thought] I will try to verify the API key again.                            |
|                                                                                       |
+-----------------------------------------------------------------------+----------------+
|                                                                       | CORRECTION      |
|                                                                       |                |
|                                                                       | Analysis:      |
|                                                                       | Agent is stuck  |
|                                                                       | in a retry loop |
|                                                                       | without update. |
|                                                                       |                |
|                                                                       | Prompt Diff:    |
|                                                                       | +-------------+ |
|                                                                       | | Current | Sug| |
|                                                                       | |---------+---| |
|                                                                       | | ...retry  | ...| |
|                                                                       | | if fail.  | IF | |
|                                                                       | |           | FAIL| |
|                                                                       | |           | STOP| |
|                                                                       | +-------------+ |
|                                                                       |                |
|                                                                       | Rationale:     |
|                                                                       | Adds exit cond. |
|                                                                       |                |
|                                                                       | Confidence: [H]|
|                                                                       |                |
|                                                                       | [ Copy ] [Apply]|
+-----------------------------------------------------------------------+----------------+
```

---

## 3. Feature Specification: Comparative Trace Analysis

### 3.1 The Comparison Header (KPI Dashboard)
When comparing two traces, the global header is replaced by a $\Delta$-focused dashboard.
- **Metric Cards:** `Baseline` $\rightarrow$ `Variant` | `Delta`.
- **Color Logic:** 
  - $\downarrow$ (Reduction in Steps/Tokens/Loops) = `status-success` (Green).
  - $\uparrow$ (Increase in Efficiency) = `status-success` (Green).
  - $\uparrow$ (Increase in Steps/Tokens/Loops) = `status-error` (Red).

### 3.2 The Dual-Pane Narrative Viewer
- **Synchronized Scrolling:** Scrolling one pane moves the other.
- **Divergence Marker:** A bold red vertical line (`status-error`) marking the first point of logical difference.
- **Visual Dimming:** Identical steps are rendered in `text-secondary` (opacity 50%). Divergent steps are `text-primary` (opacity 100%).

### 3.3 Wireframe: A/B Comparison
```text
+---------------------------------------------------------------------------------------+
| COMPARISON: Trace A (v1.0) vs Trace B (v1.1)                                   [ Close X]|
+---------------------------------------------------------------------------------------+
| [ Steps: 24 -> 18 | -25% v ] [ Tokens: 12k -> 9k | -25% v ] [ Eff: 65% -> 88% | +23% ^ ]|
+---------------------------------------+------------------------------------------------+
| TRACE A (Baseline)                    | TRACE B (Variant)                              |
|---------------------------------------|------------------------------------------------|
| Step 1: Initialize... (dimmed)        | Step 1: Initialize... (dimmed)                 |
| Step 2: Load Context... (dimmed)      | Step 2: Load Context... (dimmed)                |
|                                       |                                                |
| [!] DIVERGENCE POINT <----------------|-------------------- [!] DIVERGENCE POINT        |
|                                       |                                                |
| Step 3: Search Docs (FAIL)            | Step 3: Call API (SUCCESS)                     |
| Step 4: Search Docs (FAIL)            | Step 4: Parse JSON Response                    |
| Step 5: Search Docs (FAIL)            | Step 5: Formulate Answer                       |
|                                       |                                                |
| Step 6: ...                           | Step 6: Finalize Result                        |
|                                       |                                                |
+---------------------------------------+------------------------------------------------+
|                                       | WINNER: Trace B (+23% Efficiency) [!]           |
+---------------------------------------+------------------------------------------------+
```

---

## 4. Interaction Patterns & Accessibility

### 4.1 Keyboard Shortcuts
| Shortcut | Action |
| :--- | :--- |
| `Cmd + Shift + F` | Open Fix-It drawer for selected step |
| `Cmd + Shift + C` | Enter Comparison Mode (with selected traces) |
| `Esc` | Close all overlays/drawers |
| `Cmd + Arrow Up/Down` | Jump between Divergence Points |

### 4.2 Accessibility (WCAG AA)
- **Contrast:** `text-primary` on `bg-primary` exceeds 7:1 ratio.
- **Color-Blindness:** $\Delta$ metrics use both color and icons ($\uparrow \downarrow$).
- **Motion:** "Disable Sync-Scroll" toggle available in settings.

---

## 5. Engineering Implementation Checklist

- [ ] **Theme:** Implement `bg-primary` (#0F172A) across all workspaces.
- [ ] **Typography:** Set `Inter` for UI and `JetBrains Mono` for all technical trace data.
- [ ] **Fix-It Trigger:** Implement the $\text{\ud83e\ude84}$ icon and Alert Amber highlighting for detected loops.
- [ ] **Correction Drawer:** Build the right-side overlay with the `CodeDiffViewer` component.
- [ ] **Diff Styling:** 
  - `diff-removed`: bg `#450a0a`, text `#fca5a5`.
  - `diff-added`: bg `#064e3b`, text `#86efac`.
- [ ] **Comparison Engine:** Implement synchronized scrolling and the divergence marker logic.
- [ ] **KPI Header:** Implement the `DeltaMetricGrid` with the defined color logic for $\Delta$ values.
