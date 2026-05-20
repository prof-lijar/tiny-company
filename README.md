# TraceWhisper v2.1: Debug-First Observability

TraceWhisper has evolved from a simple log monitoring tool into an **IDE for Agent Reasoning**. 

## Core v2.1 Capabilities

### 1. Frictionless Entry
We have optimized the onboarding experience to get developers from "zero to trace" in seconds.
- **Guided Initialization**: New `init()` method and health checks ensure the SDK is correctly configured.
- **Digital Consent**: Integrated consent flow via `TRACEWHISPER_CONSENT` for compliant data collection.
- **Auto-Initialization**: The SDK now gracefully handles missing initialization calls, preventing crashes.

### 2. Debug-First Tuning (Forensic Narrative)
The narrative engine has been overhauled to prioritize diagnostic insights over summaries.
- **Forensic Taxonomy**: The system now explicitly identifies and labels reasoning failures:
    - `[Reasoning Loop]`: Repeated thoughts or tool calls without new information.
    - `[Contradiction]`: Current steps that contradict previous conclusions.
    - `[Strategic Pivot]`: Explicit recognition of failure and change in plan.
    - `[Tool Hallucination]`: Impossible tool arguments or ignoring tool output.
    - `[Information Gap]`: Attempting tasks without prerequisite data.
- **Logic Audit Reports**: Every trace now generates a Logic Audit, including:
    - **Critical Failures**: List of all detected loops and contradictions.
    - **Pivot Analysis**: Analysis of where the agent pivoted and why.
    - **Efficiency Score**: A ratio of productive steps vs. wasted steps.

## Technical Architecture
For detailed technical specifications, see `docs/v2-technical-spec.md`.

## Quick Start
```bash
# Install the SDK
pip install tracewhisper-sdk

# Initialize and start tracing
tw init
tw live
```
