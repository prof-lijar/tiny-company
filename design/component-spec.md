# Component Specification: TraceWhisper v2.2 (CLI)

Since TraceWhisper is a CLI-based tool, "components" refer to standardized structural patterns and visual motifs rendered in the terminal (using libraries like `rich` or `textual`). This ensures consistency across different views (Live, Forensic, Comparison).

## 1. Global Design Tokens

### Color Mapping (Terminal ANSI/Hex)
| Component Role | Brand Color | Terminal Approximation | Visual Meaning |
| :--- | :--- | :--- | :--- |
| **Primary Text** | Pure White | `white` | General information |
| **Accent/Highlight** | Signal Blue | `cyan` | Active reasoning, focus |
| **Success/Goal** | Insight Green | `green` | Resolution, efficiency gain |
| **Warning/Loop** | Alert Amber | `yellow` | Friction, reasoning loop |
| **Critical/Error** | Obsidian/Red | `red` | Hard stop, failure |
| **Muted/Secondary**| Noise Gray | `bright_black` | Raw logs, timestamps |

### Typography Patterns
- **Narrative:** Standard terminal font.
- **Technical/Data:** Monospaced (JetBrains Mono/Fira Code) for logs and prompt snippets.
- **Emphasis:** Bold for Strategic Pivots and Breaking Points.

---

## 2. UI Components

### 2.1 The Header Banner
Used at the top of every major view to provide context.
- **Structure:** `[ VIEW NAME ] | [ Context: Agent/Trace ID ] | [ Status: RUNNING/FIXED ]`
- **Style:** Bold, Signal Blue border or background.

### 2.2 Metric Delta Card
Used in the Trace Comparison view to show quantitative improvement.
- **Structure:** `Metric Name: Value A -> Value B [ Delta % (Arrow) ]`
- **Styling:**
  - Positive Delta (e.g., -20% tokens): **Insight Green**
  - Negative Delta (e.g., +10% time): **Alert Amber**
  - Neutral: **Pure White**

### 2.3 Narrative Node
The building block of the "Whisper" stream.
- **Types:**
  - **Standard Node:** `Timestamp - Narrative Text` (Signal Blue)
  - **Pivot Node:** `Timestamp - [PIVOT] Narrative Text` (Bold Signal Blue)
  - **Loop Node:** `Timestamp - [LOOP] Narrative Text` (Alert Amber background)
  - **Breaking Point Node:** `[BREAKING POINT] ! Reason for Failure !` (Bold Alert Amber, blinking if live)
  - **Correction Bridge:** `+---[ CORRECTION APPLIED ]---> "Optimization Text"` (Insight Green)

### 2.4 Raw Log Block
The technical evidence supporting a Narrative Node.
- **Structure:** `Timestamp [LEVEL] Message`
- **Style:** Noise Gray, smaller font weight, indented relative to the narrative.

### 2.5 Prompt Comparison Block (The Fixer)
A side-by-side or top-bottom comparison of system prompts.
- **Before Block:** Current prompt in Noise Gray.
- **After Block:** Modified prompt in Pure White, with new/changed text highlighted in **Insight Green**.
- **Diff Marker:** ` <--- [NEW] ` pointer to the specific line changed.

### 2.6 Action Bar (Footer)
The persistent command menu at the bottom of the screen.
- **Structure:** `[K]ey | [K]ey | [K]ey | Log Path: /path/to/log`
- **Style:** Obsidian background, Signal Blue text for keys.

---

## 3. Component Interaction Map

| User Action | Component Trigger | Visual Transition |
| :--- | :--- | :--- |
| `tw live` | Header $\rightarrow$ Narrative Stream $\rightarrow$ Action Bar | Real-time append to Narrative Node |
| `tw compare` | Header $\rightarrow$ Metric Delta Cards $\rightarrow$ Dual Narrative Columns | Sync-scroll between columns |
| `tw trace` | Header $\rightarrow$ Linear Path (Nodes) $\rightarrow$ Correction Bridge | Vertical flow with Breaking Point highlight |
| `tw fix` | Header $\rightarrow$ Prompt Comparison Block $\rightarrow$ Action Bar | Highlighted diff in Insight Green |
