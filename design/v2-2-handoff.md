# v2.2 Visual Asset Handoff: Reasoning IDE

This document serves as the final design handoff for the v2.2 "Reasoning IDE" implementation. It consolidates all visual specifications and references required for the CTO to implement the UI consistently.

## 1. Core Visual Identity (Refer to `docs/brand-guide.md`)

### Color Palette (High-Contrast IDE Theme)
| Role | Color Name | Hex | Terminal/ANSI | Psychology |
| :--- | :--- | :--- | :--- | :--- |
| **Background** | Obsidian | `#0F172A` | `black/blue` | Depth, focus |
| **Primary Accent**| Signal Blue | `#38BDF8` | `cyan` | Intelligence, clarity |
| **Success/Fix** | Insight Green| `#4ADE80` | `green` | Resolution, health |
| **Warning/Loop** | Alert Amber | `#FBBF24` | `yellow` | Friction, attention |
| **Secondary Text**| Noise Gray | `#64748B` | `bright_black` | Background noise |
| **Primary Text** | Pure White | `#F8FAFC` | `white` | Readability |

### Typography
- **Narrative/UI:** *Inter* or *Roboto* (Sans-Serif)
- **Technical/Logs:** *JetBrains Mono* or *Fira Code* (Monospace)

---

## 2. UI Component Specifications

The structural patterns for the CLI/IDE are defined in the Component Specification.

- **Document:** `design/component-spec.md` (See PR #144)
- **Key Components to Implement:**
  - **Header Banner:** Contextual identity for the current view.
  - **Metric Delta Cards:** Quantitative improvement indicators (Green for $\downarrow$ cost/steps).
  - **Narrative Nodes:** The "Whisper" stream (Standard, Pivot, Loop, Breaking Point).
  - **Correction Bridge:** The visual link between failure and fix.
  - **Prompt Comparison Block:** Side-by-side diff highlighting changes in **Insight Green**.

---

## 3. Interface Layouts & Wireframes

The spatial arrangement and user flows are defined in the UI/UX Spec and Wireframes.

- **UI/UX Spec:** `docs/ui-ux-spec.md` (Updated in PR #143)
- **Wireframes:** `design/wireframes.md` (Updated in PR #143)
- **Key Views:**
  - **Live Dashboard:** Split-screen (Narrative vs. Raw).
  - **Reasoning Trace Visualizer:** Linear flow with "Breaking Point" and "Correction Bridge".
  - **A/B Comparison:** Sync-scrolling vertical columns with a Divergence Marker.

---

## 4. 'Correction Preview' Beta Visual Language

The v2.2 "Fix-It" loop utilizes specific visual cues to guide the user:
- **The Breaking Point:** Highlighted in **Alert Amber**.
- **The Correction:** Highlighted in **Insight Green**.
- **The Delta:** "Before" (Muted Noise Gray) $\rightarrow$ "After" (Pure White/Insight Green).

## 5. Implementation Checklist for CTO
- [ ] Implement `rich` or `textual` themes based on the Color Palette.
- [ ] Build the `Narrative Node` components as defined in `design/component-spec.md`.
- [ ] Integrate the `Reasoning Trace Visualizer` layout from `design/wireframes.md`.
- [ ] Implement the "Fix-It" prompt diff view using the Delta View logic.
