# Component Specification: TraceWhisper v2

This document defines the reusable UI components for TraceWhisper, ensuring consistency across the CLI, HTML reports, and potential future GUI.

## 1. General Principles
- **Consistency**: Components must follow the `docs/brand-guide.md` (Deep Space / Signal Violet).
- **Accessibility**: Minimum contrast 4.5:1 (WCAG AA).
- **Typography**: *Inter* for headings/body, *JetBrains Mono* for technical data.

## 2. CLI Components (using `rich` or similar)
These components are designed for terminal output.

### 2.1 Narrative Pane
- **Purpose**: Display the rolling synthesis of agent reasoning.
- **Visuals**: 
    - Background: Deep Space.
    - Text: Whisper White.
    - Highlights: Signal Violet for "Key Decision Points" (KDP).
    - Indicator: `[ANALYZING...]` in a muted grey, blinking or pulsing.

### 2.2 Log Stream Pane
- **Purpose**: Display raw logs in real-time.
- **Visuals**: 
    - Text: *JetBrains Mono*.
    - colors: Semantic colors for log levels (INFO: Grey, DEBUG: Violet, DEBUG: Violet, ERROR: Crimson).

### 2.3 Comparison Table
- **Purpose**: Compare metrics between two traces.
- **CUI (Character User Interface) laout**: 
    - A standard `rich.table.Table` with a box border.
    - Header: Signal Violet.
    - Rows: Alternating background colors for muted contrast.

## 3. Report Components (HTML/Markdown)
These components are used in the generated execution reports.

### 3.1 Status Badge
- **Purpose**: Indicate the final outcome of the agent's execution.
- **Visuals**: 
    - `Success`: Emerald Green background, White text.
    - `Failure`: Crimson background, White text.
    - `Warning`: Amber background, White text.

### 3.2 Narrative Segment
- **Purpose**: The "Whisper" - the human-readable distillation.
- **Visuals**: 
    - Left-border accent: Signal Violet (4px width).
    - Typography: *Inter* Regular, 16px.
    - Interaction: Clickable to expand the "Raw Evidence" snippet.

### 3.3 Evidence Snippet
- **Purpose**: The raw log line(s) that support a narrative segment.
- **Visuals**: 
    - Background: Dark Slate (lighter than Deep Space).
    - Typography: *JetBrains Mono*, 13px.
    - Border: 1px solid Trace Grey.

### 3.4 Divergence Marker
- **Purpose**: Highlight where two traces split.
- **CUI/GUI Visual**: 
    - A bold red vertical line extending through the narrative.
    - Text: "DIVERGENCE POINT" in bold, crimson, centered.

### 3.5 Prompt Diff View
- **Purpose**: Show changes to the system prompt.
- **S-diff style**: 
    - Added text: Emerald Green background, subtle.
    - Removed text: Crimson background, subtle.
    - Action: "Apply Change" button in Signal Violet.

## 4. Component Mapping
| Component | CLI | HTML Report | Forensic Chat |
|---|---|---|---|
| Status Badge | Text label `[SUCCESS]` | CSS Badge | Chat Response |
| Narrative Segment | Rolling Text | Blockquote/Accent | Chat citation |
| Evidence Snippet | Log Line | Collapsible Code Block | Linked Log Line |
| Comparison Table | `rich.Table` | HTML Table | Metric Summary |
| Prompt Diff | Text Diff | Side-by-Side Diff | Proposed Fix |
