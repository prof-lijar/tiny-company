# User Stories: TraceWhisper

This document outlines the user stories for TraceWhisper, providing a bridge between the high-level product specification and the technical implementation.

## 1. Log Ingestion & Processing

### US1.1: Load Local Log File
**As a** developer,
**I want to** point the CLI tool to a local JSON log file,
**so that** I can analyze a specific agent execution trace.
- **Acceptance Criteria:**
    - The tool accepts a file path as an argument.
    - The tool validates that the file exists and is a valid JSON format.
    - Error messages are clear if the file is missing or malformed.

### US1.2: Handle Large Traces
**As a** developer working with complex agents,
**I want** the tool to handle logs that exceed the LLM's context window,
**so that** I can still get a summary of very long execution paths.
- **Acceptance Criteria:**
    - The tool implements a chunking or sliding-window strategy for processing logs.
    - The final narrative maintains chronological consistency across chunks.
    - No critical "Key Decision Points" are lost during the chunking process.

## 2. Narrative Synthesis (The "Whisper")

### US2.1: Filter Noise
**As a** user,
**I want** the output report to exclude repetitive heartbeat logs and redundant retries,
**so that** I can focus on the actual progress and decisions.
- **Acceptance Criteria:**
    - The narrative engine identifies and collapses sequences of identical tool calls with no change in observation.
    - System prompts and boilerplate setup logs are excluded from the narrative.

### US2.2: Identify Key Decision Points (KDPs)
**As a** developer,
**I want** the report to explicitly highlight where the agent changed its strategy,
**so that** I can quickly evaluate the agent's reasoning logic.
- **Acceptance Criteria:**
    - The report clearly marks pivots (e.g., "After failing to find the file via API, the agent decided to search the local directory").
    - KDPs are highlighted in the "The Journey" section of the report.

### US2.3: Synthesize Narrative
**As a** human supervisor,
**I want** the tool to describe the agent's actions in plain English,
**so that** I don't have to mentally translate tool call arguments into intent.
- **Acceptance Criteria:**
    - The output is a cohesive story, not just a bulleted list of logs.
    - The narrative correctly attributes actions to the agent's internal thoughts.

## 3. Reporting & Output

### US3.1: Generate Markdown Report
**As a** user,
**I want** the output to be a professionally formatted Markdown file,
**so that** I can easily share it in GitHub issues or documentation.
- **Acceptance Criteria:**
    - The report includes an Executive Summary, The Journey, Tool Usage Table, and Failure Analysis.
    - The formatting is clean and readable.

### US3.2: Analyze Failures
**As a** developer,
**I want** the report to have a dedicated section explaining why an agent failed,
**so that** I can immediately start fixing the prompt or tool.
- **Acceptance Criteria:**
    - If the trace ends in an error or a "fail" state, the "Failure Analysis" section is populated.
    - The analysis points to the specific log entry or tool call that triggered the failure.

## 4. Interface

### US4.1: CLI Execution
**As a** developer,
**I want** a simple CLI command to trigger the processing,
**so that** I can integrate it into my local debugging workflow.
- **Acceptance Criteria:**
    - Command format: `tw parse <file> --output <file>`.
    - The tool provides a progress indicator during the "Whispering" phase.
