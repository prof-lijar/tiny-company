# Implementation Guide: Reasoning Trace Visualizer (v2.2)

This document provides specific styling and implementation guidelines for the **Reasoning Trace Visualizer** (`tw trace <id>`), ensuring consistency between the design wireframes and the CLI implementation using the `rich` library.

## 1. Visual Structure: The Forensic Path
The visualizer represents a linear flow of reasoning. The "Path" is a vertical axis that connects nodes.

### 1.1 The Vertical Spine
- **Implementation:** Use a vertical line of characters (`│`) to connect nodes.
- **Color:** `color-text-muted` (Grey/Slate).
- **Spacing:** One empty line between the spine and the node content for readability.

### 1.2 Node Types & Styling
Each step in the trace is a "Node".

| Node Type | Visual Marker | Text Style | Rich Component/Style |
| :--- | :--- | :--- | :--- |
| **Thought** | `[Thought]` | Standard | `Panel` with `border_style="blue"` |
| **Tool Call** | `[Tool Call]` | Bold Technical | `Panel` with `border_style="blue"`, `style="italic"` |
| **Observation** | `[Observation]` | Muted Technical | `Panel` with `border_style="slate"`, `style="dim"` |
| **Breaking Point** | `[!] BREAKING POINT` | Bold Alert Amber | `Panel` with `border_style="yellow"`, `style="bold yellow on red"` |
| **Correction** | `[CORRECTION]` | Insight Green | `Panel` with `border_style="green"`, `style="bold green"` |
| **Goal/End** | `(Goal Reached)` | Success Green | `Text` with `style="bold green"` |

## 2. The "Correction Bridge"
The most critical part of the visualizer is the transition from the **Breaking Point** to the **Correction**.

### 2.1 The Divergence Marker
When a loop is detected and a correction is applied, the path should visually "branch" or "bridge".

**ASCII Representation:**
```text
│
└── [!] BREAKING POINT: Reasoning Loop Detected
    │   (Detail: Agent repeated search_api 3x)
    │
    └─── [ CORRECTION APPLIED ] ───────────────────┐
                                                  │
    ┌─────────────────────────────────────────────┘
    │
    v
 [Thought] Pivot to "AI Agents 2026"
```

### 2.2 Styling the Bridge
- **Bridge Line:** Use `─` and `└` characters.
- **Color:** `Insight Green` (`#4ADE80`).
- **Highlight:** The "Correction Applied" text should be wrapped in a high-contrast box.

## 3. Interaction & Navigation
The visualizer is a read-only forensic view but should support:
- **Sync-Scroll:** If viewed in a side-by-side comparison, the visualizer should scroll in tandem with the raw logs.
- **Jump-to-Log:** Clicking/Selecting a node should (ideally) highlight the corresponding lines in the raw log file.

## 4. Rich Mapping Summary
For the CTO's implementation in Python:

- **Spine:** `console.print("│", style="dim")`
- **Nodes:** `rich.panel.Panel(content, title=node_type, border_style=color)`
- **Breaking Point:** `rich.panel.Panel(content, title="BREAKING POINT", border_style="yellow", style="bold yellow")`
- **Correction:** `rich.panel.Panel(content, title="CORRECTION", border_style="green", style="bold green")`
- **Path Logic:** A simple loop iterating through the trace objects, printing the spine, then the node, then the spine again.
