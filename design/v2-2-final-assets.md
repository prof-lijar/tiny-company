# v2.2 Visual Asset Handoff: Reasoning IDE & Closed-Loop Debugger

This document serves as the final design handoff for the v2.2 implementation. It consolidates brand identity, UI specifications, and wireframes into a single source of truth for the engineering team.

## 1. Visual Identity & Brand Alignment

All v2.2 components must adhere to the **TraceWhisper Brand Guide**. The goal is to maintain a "Technical Elegance" that feels like a high-end IDE.

### 1.1 Final Color Palette
| Role | Color Name | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | Obsidian | `#0F172A` | Main terminal background, panels |
| **Primary Accent**| Signal Blue | `#38BDF8` | Standard Whispers, active selections, primary buttons |
| **Secondary Text**| Noise Gray | `#64748B` | De-emphasized logs, timestamps, inactive UI elements |
| **Success/Fix** | Insight Green | `#4ADE80` | Corrected prompt segments, "Fix Applied" status |
| **Warning/Loop** | Alert Amber | `#FBBF24` | Reasoning Loops, Contradictions, "Fix-It" triggers |
| **Text** | Pure White | `#F8FAFC` | Primary narrative text, headings |

### 1.2 Typography
- **Narrative/UI:** *Inter* or *Roboto* (Sans-Serif)
  - Use for: High-level summaries, buttons, labels.
- **Technical Data:** *JetBrains Mono* or *Fira Code* (Monospace)
  - Use for: Raw logs, system prompts, code snippets, trace IDs.

---

## 2. The 'Fix-It' Implementation Specs

The 'Fix-It' feature transforms a diagnostic observation into a corrective action.

### 2.1 Visual Cues & Triggers
- **Detection State:** When a `[Reasoning Loop]` or `[Contradiction]` is detected, the text in the Narrative Stream must be highlighted with a background of **Alert Amber** (`#FBBF24`) with **Obsidian** (`#0F172A`) text for maximum contrast.
- **The Trigger:** A magic-wand icon ($\text{\ud83e\ude84}$) appears adjacent to the flagged segment.
  - **CLI:** Represented as `[F]ix` in the footer or a prompt: `Would you like a suggested fix? (y/n)`.
  - **UI:** A button labeled "Fix-It" using **Signal Blue** as the base.

### 2.2 Reasoning Loop Visualization
A reasoning loop is visualized as a "circularity" in the narrative:
- **Narrative Stream:** The repeated steps are grouped. The first instance is standard, subsequent identical instances are marked with `[LOOP]` in **Alert Amber**.
- **Raw Log Stream:** The corresponding log lines are highlighted in **Alert Amber**.

---

## 3. Final Wireframes (Reference)

The following ASCII layouts define the structure of the v2.2 interface.

### 3.1 Live Dashboard with Loop Detection
```text
+-----------------------------------------------------------------------+
| TRACEWHISPER LIVE | Agent: Research-Bot | Status: RUNNING              |
+-------------------------------------------+---------------------------+
| [ NARRATIVE STREAM ]                      | [ RAW LOG STREAM ]         |
|                                           |                           |
| 14:01:02 - Agent begins research...       | 14:01:02 [INFO] Init...    |
|                                           |                           |
| 14:01:40 - [LOOP] Agent is repeatedly     | 14:01:40 [WARN] Loop detect|
| searching for the same term. <--- [FIX-IT]| repeat_query: "AI Agents"   |
| Suggestion: Adjust search parameters.     | 14:01:41 [INFO] Call...    |
|                                           |                           |
+-------------------------------------------+---------------------------+
| [P]ause | [S]top | [C]hat | [F]ix | [H]elp | Log: /logs/session_8821.log|
+-----------------------------------------------------------------------+
```

### 3.2 The Fixer: Prompt Proposal View
This view is triggered by the 'Fix-It' action. It uses a diff-style comparison.

```text
+-----------------------------------------------------------------------+
| THE FIXER: Prompt Optimization Proposal                                |
+-----------------------------------------------------------------------+
| DETECTED ISSUE: Reasoning Loop                                        |
| Evidence: Agent repeated "search_tool" 4 times with identical queries. |
|                                                                       |
| [ CURRENT SYSTEM PROMPT ]                                             |
| "You are a research assistant. Find information and summarize it."    |
|                                                                       |
| [ PROPOSED IMPROVEMENT ]                                              |
| "You are a research assistant. Find information and summarize it.     |
|  IF a search query returns no new information twice, STOP the loop    |
|  and pivot your search terms or ask for clarification." <--- [NEW]    |
|                                                                       |
+-----------------------------------------------------------------------+
| [A]pply Change | [R]efine Suggestion | [C]ancel                        |
+-----------------------------------------------------------------------+
```
*Note: The `[NEW]` section must be highlighted in **Insight Green** (`#4ADE80`).*

---

## 4. Asset Checklist for Engineering
- [ ] Implement **Obsidian** background across all terminal/UI views.
- [ ] Configure **Signal Blue** for primary actions and **Alert Amber** for loop warnings.
- [ ] Set font-family to *Inter* (UI) and *JetBrains Mono* (Logs).
- [ ] Implement the diff-view logic for the Prompt Proposal screen.
- [ ] Add the $\text{\ud83e\ude84}$ icon to the 'Fix-It' trigger.
