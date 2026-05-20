# UI Component Specification: TraceWhisper

## 1. Overview
This document defines the reusable UI components for the TraceWhisper IDE and CLI. The goal is to ensure consistency across all interfaces and provide a clear implementation guide for developers.

## 2. Design Tokens

### 2.1 Color Tokens
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--color-bg-primary` | `#0F172A` | Main background |
| `--color-bg-secondary` | `#1E293B` | Card/Panel background |
| `--color-text-primary` | `#F8FAFC` | Primary headings and body |
| `--color-text-muted` | `#64748B` | Deemphasized text, labels |
| `--color-accent-blue` | `#38BDF8` | Primary actions, active state |
| `--color-accent-green` | `#4ADE80` | Success, "Fix-It" suggestions |
| `--color-accent-amber` | `#FBBF24` | Warnings, Breakpoints, Loops |
| `--color-accent-red` | `#EF4444` | Errors, Critical Failures |
| `--color-bloat-fog` | `#94A3B8` | Cognitive bloat, redundant steps (v2.3) |
| `--color-vault-purple` | `#A855F7` | Cross-project knowledge, Pattern Vault (v2.3) |

### 2.2 Typography Tokens
| Token | Font Family | Weight | Usage |
| :--- | :--- | :--- | :--- |
| `--font-narrative` | Inter, Roboto, Sans-Serif | Regular/Bold | Narrative text, UI labels |
| `--font-technical` | JetBrains Mono, Fira Code, Monospace | Regular | Logs, Code, Prompt snippets |

---

## 3. Base Components

### 3.1 The "Whisper" Card
The primary unit of information in the narrative feed.
- **Structure:**
    - `Timestamp`: Small, muted text.
    - `Tag`: A colored badge indicating the signal type (e.g., `[Strategic Pivot]`).
    - `Content`: The distilled reasoning text.
    - `Action`: Optional "Fix-It" button for errors.
- **Variants:**
    - `Standard`: Signal Blue border.
    - `Warning`: Alert Amber background highlight.
    - `Success`: Insight Green border.

### 3.2 Signal Badge
Small inline indicators for agent state.
- **Properties:**
    - `Type`: `INFO` (Blue), `WARN` (Amber), `ERROR` (Red), `SUCCESS` (Green), `BLOAT` (Fog Grey), `VAULT` (Purple).
    - `Label`: Short text (e.g., "LOOP", "PIVOT", "BLOAT").
- **Styling:** Rounded corners, high contrast text against background.

### 3.3 Prompt Diff Viewer
Used in the 'Fix-It' engine to compare prompt versions.
- **Layout:** Side-by-side columns.
- **Styling:**
    - `Removed`: Light red background, strikethrough.
    - `Added`: Light green background, bold text.
    - `Unchanged`: Standard technical font.

### 3.4 Vault Insight Card (v2.3)
A specialized card for cross-project knowledge.
- **Structure:**
    - `Header`: "Vault Insight" label with Purple accent.
    - `Source`: Project name and version where the fix originated.
    - `Insight`: Brief description of the proven correction.
    - `Action`: "Apply to Prompt" button.

### 3.5 Cognitive Path Step (v2.3)
A single unit in a reasoning sequence.
- **States:**
    - `OK`: Green checkmark, standard text.
    - `Diverged`: Amber exclamation, bold text, highlighted as the point of failure.
    - `Bloat`: Fog Grey text, strikethrough.

---

## 4. Complex Components

### 4.1 The Intervention Panel
The modal/overlay that appears when a Breakpoint is hit.
- **Elements:**
    - `Header`: Flashing Alert Amber banner with "PAUSED" text.
    - `Context Window`: Read-only view of the last 3 reasoning steps.
    - `Nudge Input`: A multi-line text area with a focused border.
    - `Footer`: "Cancel" (Ghost) and "Resume with Nudge" (Primary Blue) buttons.

### 4.2 Trace Timeline
A vertical axis representing the agent's execution history.
- **Markers:**
    - `Step Node`: Small circle indicating a thought/action.
    - `Intervention Node`: Larger, colored marker indicating human nudge.
    - `Breaking Point`: An amber diamond indicating a detected loop.

### 4.3 Cognitive Diff Viewer (v2.3)
Compares expected vs actual reasoning paths.
- **Layout:** Two vertical lists (Expected vs Actual).
- **Highlighting:** The exact step where the actual path deviates from the expected path is marked as the "Divergence Point".

### 4.4 Pruning Comparison Panel (v2.3)
Visualizes the removal of cognitive bloat.
- **Layout:** Side-by-side "Before" and "After" traces.
- **Overlap:** Bloated sections in the original are visually linked to the "Removed" gaps in the pruned version.
- **Metric Header:** Displays "Efficiency Score" and "Tokens Saved".

### 4.5 IDE Prompt-Trace Bridge (v2.3)
Integration between the prompt editor and the trace view.
- **Live-Link**: An invisible mapping that allows clicking a trace segment to highlight the prompt line that generated it.
- **Quick-Fix Lightbulb**: An IDE gutter icon that appears next to prompt lines associated with a detected loop or failure.

---

## 5. CLI Component Mapping (Rich Library)
Since TraceWhisper is CLI-first, these components map to `rich` elements:

| UI Component | Rich Element | Styling |
| :--- | :--- | :--- |
| Whisper Card | `Panel` | `border_style="blue"`, `title="Whisper"` |
| Signal Badge | `Text` / `Badge` | `style="bold yellow on blue"` etc. |
| Prompt Diff | `Table` | Two columns, `style="green"` for additions |
| Intervention Panel | `Live` / `Prompt` | Blocking input with `Console.print` banners |
| Timeline | `Tree` | Vertical structure with custom icons |
| Cognitive Diff | `Columns` | Two `Panel` elements with `style="red"` for divergence |
| Pruning Report | `Table` | Comparison of steps with `style="dim"` for bloat |
| Vault Card | `Panel` | `border_style="magenta"`, `title="Vault Insight"` |
