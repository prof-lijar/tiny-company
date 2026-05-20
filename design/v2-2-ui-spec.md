# UI/UX Specification: v2.2 'Reasoning IDE'
**Status:** Final
**Version:** 2.2
**Role:** [Designer]

## 1. Executive Summary
The v2.2 'Reasoning IDE' evolves TraceWhisper from a passive observability tool into an active diagnostic environment. The goal is to minimize the "Iteration Gap"—the time between detecting a reasoning error and deploying a prompt correction.

### Core Pillars
- **Actionable Observability:** Every detected error (loop, contradiction) must have a direct path to a fix.
- **Comparative Validation:** Prompt changes must be validated via side-by-side trace comparison.
- **Technical Precision:** The UI must feel like a professional IDE (high density, keyboard-centric, high contrast).

---

## 2. Visual Identity & Design Tokens
All components must adhere to the `docs/brand-guide.md`.

### Color Palette (Applied)
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `bg-primary` | `#0F172A` | Main workspace, sidebars, and drawers |
| `text-primary` | `#F8FAFC` | Primary headings, active trace steps |
| `text-secondary` | `#64748B` | Dimmed steps, labels, metadata |
| `accent-primary` | `#38BDF8` | Primary buttons, active focus states, links |
| `status-success` | `#4ADE80` | Improvement $\Delta$, "Winner" badge, resolved loops |
| `status-warning` | `#FBBF24` | Loop detection markers, friction points |
| `status-error` | `#EF4444` | Divergence points, critical failures |

### Typography
- **UI Labels/Narrative:** `Inter`, Sans-Serif (Medium weight for headers, Regular for body)
- **Traces/Prompts/Logs:** `JetBrains Mono`, Monospace (Regular weight, 13px)

---

## 3. Feature Specification: The 'Fix-It' Workflow

### 3.1 The Trigger (Contextual Intervention)
The 'Fix-It' trigger is a contextual element that appears only when the backend identifies a reasoning failure.

- **Visual**: A small, glowing amber icon ($\text{\ud83e\ude84}$) in the left margin of the trace.
- **Behavior**: Hovering reveals a tooltip: `"Fix this [Loop/Contradiction]"` in `text-primary` on `bg-primary` background.

### 3.2 The Correction Drawer (Right-Side Overlay)
When triggered, a drawer slides in from the right (`width: 450px`).

#### Layout Sections:
1. **Header**: Title "Reasoning Correction" with a close button.
2. **Analysis Card**: A `bg-secondary` box containing the plain-English explanation of the failure.
3. **Prompt Diff View**: 
   - A side-by-side comparison of the System Prompt.
   - **Left (Current)**: Red background for removed/problematic text.
   - **Right (Suggested)**: Green background for added/corrected text.
4. **Rationale**: A short paragraph explaining the "Why".
5. **Confidence Badge**: A pill-shaped badge (`Low` | `Med` | `High`).
6. **Footer Actions**: 
   - `[Copy Suggestion]` (Primary - `accent-primary`)
   - `[Apply to Prompt]` (Secondary - `text-primary` border)

### 3.3 High-Fidelity Wireframe: Fix-It Interaction
```text
+---------------------------------------------------------------------------------------+
| TRACEWHISPER IDE                                                       [ User Profile ]|
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
|                                                                      | CORRECTION      |
|                                                                      |                |
|                                                                      | Analysis:      |
|                                                                      | Agent is stuck  |
|                                                                      | in a retry loop |
|                                                                      | without update. |
|                                                                      |                |
|                                                                      | Prompt Diff:    |
|                                                                      | +-------------+ |
|                                                                      | | Current | Sug| |
|                                                                      | |---------+---| |
|                                                                      | | ...retry  | ...| |
|                                                                      | | if fail.  | IF | |
|                                                                      | |           | FAIL| |
|                                                                      | |           | STOP| |
|                                                                      | +-------------+ |
|                                                                      |                |
|                                                                      | Rationale:     |
|                                                                      | Adds exit cond. |
|                                                                      |                |
|                                                                      | Confidence: [H]|
|                                                                      |                |
|                                                                      | [ Copy ] [Apply]|
+-----------------------------------------------------------------------+----------------+
```

---

## 4. Feature Specification: Comparative Trace Analysis

### 4.1 The Comparison Header (KPI Dashboard)
When two traces are compared, the global header is replaced by a $\Delta$-focused dashboard.

- **Metric Cards**: Small cards showing `Baseline` $\rightarrow$ `Variant` | `Delta`.
- **Color Logic**: 
  - $\downarrow$ (Reduction in Steps/Tokens/Loops) = `status-success` (Green).
  - $\uparrow$ (Increase in Efficiency) = `status-success` (Green).
  - $\uparrow$ (Increase in Steps/Tokens/Loops) = `status-error` (Red).

### 4.2 The Dual-Pane Narrative Viewer
- **Synchronized Scrolling**: Scrolling one pane moves the other.
- **Divergence Marker**: A bold red vertical line (`status-error`) marking the first point of logical difference.
- **Visual Dimming**: Identical steps are rendered in `text-secondary` (opacity 50%). Divergent steps are `text-primary` (opacity 100%).

### 4.3 High-Fidelity Wireframe: A/B Comparison
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

## 5. Interaction Patterns & Accessibility

### 5.1 Keyboard Shortcuts
| Shortcut | Action |
| :--- | :--- |
| `Cmd + Shift + F` | Open Fix-It drawer for selected step |
| `Cmd + Shift + C` | Enter Comparison Mode (with selected traces) |
| `Esc` | Close all overlays/drawers |
| `Cmd + Arrow Up/Down` | Jump between Divergence Points |

### 5.2 Accessibility Compliance (WCAG AA)
- **Contrast**: All `text-primary` on `bg-primary` exceeds 7:1 contrast ratio.
- **Color-Blindness**: $\Delta$ metrics use both color (Green/Red) and icons ($\uparrow \downarrow$) to convey meaning.
- **Focus**: Tab order follows a logical flow: Header $\rightarrow$ Main Content $\rightarrow$ Right Drawer.
- **Motion**: A "Disable Sync-Scroll" toggle is available in the comparison settings for users with vestibular disorders.

---

## 6. Component Specification for Developers

### Fix-It Button
- **Component**: `ContextualActionTrigger`
- **State**: `Hidden` $\rightarrow$ `Visible` (on backend loop detection)
- **Animation**: Fade-in with slight slide-right (200ms).

### Prompt Diff Component
- **Component**: `CodeDiffViewer`
- **Implementation**: Use `diff-match-patch` or similar.
- **Styling**:
  - `diff-removed`: background `#450a0a` (Deep Red), text `#fca5a5`.
  - `diff-added`: background `#064e3b` (Deep Green), text `#86efac`.

### Comparison Header
- **Component**: `DeltaMetricGrid`
- **Layout**: Flex-row, gap `1rem`, overflow-x auto.
- **Card Style**: `bg-secondary` (opacity 20%), border `1px solid #334155`, border-radius `4px`.
