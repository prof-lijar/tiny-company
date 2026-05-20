# UI/UX Specification: TraceWhisper

## 1. Design Philosophy
The TraceWhisper experience is centered around **"The Signal."** Whether it's a CLI output or a generated HTML report, the design must prioritize the narrative over the raw data. The goal is to move the user from "searching" to "understanding" as quickly as possible.

## 2. User Interface Paradigms

### 2.1 CLI Experience (Primary Interface)
Since TraceWhisper is primarily a developer tool, the CLI is the first point of contact.
- **Visual Style**: Clean, structured, and high-contrast.
- **Interaction Pattern**: Single-command execution with clear progress indicators.
- **Key UX Goals**:
    - Immediate feedback on ingestion success.
    - Visual distinction between "Processing" and "Completed."
    - Clear paths to the output file.

### 2.2 Execution Report (The Deliverable)
The report is the core product. It must be accessible to both technical (developers) and non-technical (auditors) stakeholders.
- **Layout**: Single-column, focused reading experience.
- **Visual Hierarchy**: 
    1. Result Status (Success/Failure)
    2. Executive Summary
    3. The Journey (Narrative)
    4. Technical Details (Collapsible/Appendix)
- **Interaction**: The report should be "scannable." Key decision points should be highlighted to allow a user to jump to critical moments.

## 3. User Flows

### 3.1 The "Quick Fix" Flow (Developer)
`CLI Command` $\rightarrow$ `Progress Bar` $\rightarrow$ `Open report.md` $\rightarrow$ `Jump to Failure Analysis` $\rightarrow$ `Fix Prompt`.

### 3.2 The "Compliance Audit" Flow (Operator)
`Ingest Production Log` $\rightarrow$ `Generate HTML Report` $\rightarrow$ `Read Executive Summary` $\rightarrow$ `Review The Journey` $\rightarrow$ `Sign off on Audit`.

## 4. Interaction Patterns
- **The "Deep Dive"**: In HTML reports, users should be able to click a narrative sentence to expand the raw log snippet that generated that specific part of the story.
- **Status Indicators**: Use the brand colors for status:
    - Success $\rightarrow$ Emerald Green
    - Warning $\rightarrow$ Amber
    - Failure $\rightarrow$ Crimson
- **Progressive Disclosure**: Hide the "Tool Usage Table" and "Raw Traces" behind collapsible sections to avoid overwhelming the reader.

## 5. Accessibility (WCAG AA)
- **Contrast**: All text must meet 4.5:1 contrast ratio against the background.
- **Typography**: Use a minimum of 14px for body text.
- **Semantic HTML**: Reports must use proper heading levels (`h1`-`h4`) for screen reader compatibility.
