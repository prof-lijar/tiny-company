# Visual Asset Specifications: 'Surgical Correction' Video Series

This document defines the high-fidelity visual assets required for the v2.2 'Surgical Correction' video series. These specs should be used by the video production team to create overlays and motion graphics.

## 🎨 Global Visual Palette (Reference: `docs/brand-guide.md`)
- **Backgrounds:** Obsidian (`#0F172A`)
- **Primary Accent:** Signal Blue (`#38BDF8`)
- **Success/Fix:** Insight Green (`#4ADE80`)
- **Warning/Error:** Alert Amber (`#FBBF24`)
- **Muted/Noise:** Noise Gray (`#64748B`)
- **Text:** Pure White (`#F8FAFC`)
- **Typography:** 
  - Narrative/UI: *Inter*
  - Technical/Logs: *JetBrains Mono*

---

## ⚡ Global Motion & Asset Concepts

### 1. The "Noise $\rightarrow$ Signal" Transition
- **The Noise:** A screen filled with rapidly scrolling, semi-transparent log text in **Noise Gray**. The text should feel chaotic and overwhelming.
- **The Signal:** A sudden "wipe" or "focus" effect where the Noise fades, and a single, clean **TraceWhisper Narrative** block emerges in the center, highlighted with a **Signal Blue** border.

### 2. The [Fix-It] Button Asset
- **Appearance:** A high-contrast button.
- **Style:** Solid **Signal Blue** background, **Pure White** bold text, slightly rounded corners (4px).
- **Interaction:** When clicked, it should have a brief "glow" effect in **Insight Green** before triggering the modal.

### 3. The "Surgical Adjustment" Modal
- **Frame:** Obsidian background, 1px border in **Signal Blue**.
- **Header:** "Surgical Adjustment" in *Inter* (Bold), **Pure White**.
- **Content:** A side-by-side "Diff" view.
  - **Left (Old):** Red-tinted background, strikethrough text in **Noise Gray**.
  - **Right (New):** Green-tinted background, highlighted text in **Insight Green**.
- **Footer:** "Apply Correction" button in **Insight Green**.

---

## 🎬 Clip-Specific Asset Requirements

### Clip 1: The Recursive Loop
**Goal:** Show the transition from a loop to a resolution.

| Asset ID | Element | Visual Description | Color/Style |
| :--- | :--- | :--- | :--- |
| C1-A1 | Loop Overlay | A red pulsing box that surrounds the repeating log lines. | **Alert Amber** Glow |
| C1-A2 | Alert Badge | Text: `⚠️ RECURSIVE LOOP DETECTED` | **Alert Amber** background, Black text |
| C1-A3 | Success Trace | A clean, linear flow of the corrected trace. | **Insight Green** accents |
| C1-A4 | Comparison Split | Vertical divider. Left: "Looping" (Muted). Right: "Success" (Bright). | **Noise Gray** vs **Pure White** |

### Clip 2: The Cognitive Clash
**Goal:** Show the resolution of contradictory constraints.

| Asset ID | Element | Visual Description | Color/Style |
| :--- | :--- | :--- | :--- |
| C2-A1 | Friction Marker | A "zigzag" line indicating a clash in the reasoning path. | **Alert Amber** |
| C2-A2 | Alert Badge | Text: `[Contradictory Constraint]` | **Alert Amber** border, White text |
| C2-A3 | The "Cure" Text | Text: "Separate internal monologue from external response." | **Insight Green** (Bold) |
| C2-A4 | Final Output | A clean response block with a subtle **Insight Green** outer glow. | **Insight Green** glow |

### Clip 3: The Tool-Output Denial
**Goal:** Show the pivot to the correct tool.

| Asset ID | Element | Visual Description | Color/Style |
| :--- | :--- | :--- | :--- |
| C3-A1 | Denial Highlight | A highlight over the repeated `get_weather` call. | **Alert Amber** transparency |
| C3-A2 | Alert Badge | Text: `[Tool-Output Denial]` | **Alert Amber** background, Black text |
| C3-A3 | Pivot Suggestion | A prompt: "Pivot to `get_forecast` for higher granularity." | **Signal Blue** bubble |
| C3-A4 | Success Check | A large `✓` appearing next to the final tool output. | **Insight Green** |

---

## 🏁 Final Call to Action (CTA) Screen
- **Background:** Obsidian (`#0F172A`) with a subtle gradient of **Signal Blue** in the corner.
- **Main Text:** "Join the Correction Preview Beta" (Center, *Inter* Bold, **Pure White**).
- **Subtext:** "Stop the noise. Start the signal." (**Signal Blue**).
- **Button:** A large, pulsing **Signal Blue** button with the text "[ Request Access ]".
- **Logo:** TraceWhisper logo centered at the top.
