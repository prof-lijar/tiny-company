# Component Specification: TraceWhisper UI

This document defines the reusable UI components for the TraceWhisper interface, ensuring consistency across the CLI and any future GUI implementations.

## 1. General Component Principles
- **High Contrast:** All components must use the colors defined in `docs/brand-guide.md`.
- **Monospace Priority:** All data-driven components must use `JetBrains Mono`.
- **Visual Hierarchy:** Use a a clear distinction between "The Signal" (narrative) and "The Noise" (logs).

## 2. CLI Components

### 2.1 The "Whisper" Card
The "Whisper" card is the primary unit of narrative information.
- **Structure:**
    - **Header:** Timestamp + KDP Label (e.g., `[00:15] 🔍 STRATEGY SHIFT`).
    - **Body:** The narrative summarized text.
    - **Footer:** A clickable link/reference to the raw log line.
    - **Visuals:** Signal Violet highlight on the label.

### 2.2 The "Log Line" Component
A single line of raw log data.
- **Structure:**
    - **Timestamp:** Muted Slate Grey.
    - **Level:** (INFO, DEBUG, ERROR) highlighted in corresponding brand colors.
    - **Message:** The log content.
- **Visuals:** Syntax highlighting for JSON and tool calls.

### 2.3 The "Metric Badge"
A small, inline badge used to display trace metrics.
- **Structure:**
    - `[ Label: Value ]` (e.g., `[ Tokens: 12.4k ]`).
- **Visuals:** Obsidian background with Whisper White text.

### 2.4 The "Divergence Marker"
A visual indicator that two traces have diverged.
- **Structure:**
    - A vertical line or a color-shift in the background.
    - A label: `⚠️ DIVERGENCE POINT`.
- **Visuals:** Warning Amber highlight.

## 3. GUI Components (Future)
If TraceWhisper moves to a web dashboard, the following components should be carried out:
- **The Narrative Timeline:** A vertical scrollable list of "Whisper" cards.
- **The Split-View Pane:** A dual-pane window allowing the user to switch between the narrative and the raw logs.
- **The Evidence Link:** A hyperlinked narrative segment that scrolls the log pane to the exact the line.
- **The Metric Summary Bar:** A top-fixed bar displaying the trace's overall health and tokens.
