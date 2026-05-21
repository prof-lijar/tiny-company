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
    - `Type`: `INFO` (Blue), `WARN` (Amber), `ERROR` (Red), `SUCCESS` (Green).
    - `Label`: Short text (e.g., "LOOP", "PIVOT").
- **Styling:** Rounded corners, high contrast text against background.

### 3.3 Prompt Diff Viewer
Used in the 'Fix-It' engine to compare prompt versions.
- **Layout:** Side-by-side columns.
- **Styling:**
    - `Removed`: Light red background, strikethrough.
    - `Added`: Light green background, bold text.
    - `Unchanged`: Standard technical font.

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

---

## 6. v2.5 'The Autonomous Bridge' Components

To support the transition to autonomous optimization, we introduce the following components designed for high-level fleet monitoring and cognitive mapping.

### 6.1 The Health Orbit (Global Map)
A systemic visualization of agent health.
- **Structure:**
    - `Agent Node`: A circular element representing an agent.
    - `Health Glow`: An outer ring that pulses in Green (Stable), Yellow (Drifting), or Red (Critical).
    - `Connection Line`: A thin line connecting agents who share similar Golden Paths.
- **Interaction:**
    - `Click/Focus`: Expands the node to show the current Path Adherence Rate (PAR).

### 6.2 The Ghost Path (Divergence View)
A specialized view for analyzing logic drift.
- **Structure:**
    - `Golden Path Line`: A solid, high-contrast line representing the verified standard.
    - `Actual Path Line`: A dashed, muted line that diverges from the same origin.
    - `Divergence Point`: A high-contrast marker (Drift Yellow)’ highlighting exactly where the logic branched.
- **Styling:** 
    - `Golden Path`: Electric Indigo.
    - `Actual Path`: Noise Gray.
    - `Divergence Point`: Drift Yellow.

### 6.3 The Translation Bridge (Cognitive Porter)
Visualizing the mapping of reasoning patterns across models.
- **Structure:**
    - `Intent Block`: A stylized box representing a reasoning step (e.g., "Verify Source").
    - `Transformation Arrow`: A fluid, animated arrow connecting two blocks.
    - `Fidelity Gauge`: A radial progress bar showing the compatibility score.
- **Styling:**
    - `Intent Block`: Cyber Teal.
    - `Transformation Arrow`: Electric Indigo.

### 6.4 Updated Design Tokens for v2.5
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--color-v25-cyber-teal` | `#2DD4BF` | Autonomous actions, Intent blocks |
| `--color-v25-electric-indigo` | `#6366F1` | Cognitive mapping, Golden Paths |
| `--color-v25-drift-yellow` | `#2FDE047` | Logic divergence, Divergence points |
| `--color-v25-glow-stable` | `#4ADE80` | Health Orbit: Stable |
| `--color-v25-glow-drift` | `#FDE047` | Health Orbit: Drifting |
| `--color-v25-glow-critical` | `#EF4444` | Health Orbit: Critical |
