# Technical Implementation Plan: TraceWhisper v2 - Phase 1

## 1. Overview
This document outlines the technical approach for implementing the first phase of TraceWhisper v2, focusing on "The Connectivity Phase." The primary goal is to move from static post-mortem analysis to real-time observability and seamless integration.

## 2. High-Priority Features (Phase 1)
- **Live Whisper (Real-time Narrative)**: Real-time log tailing and narrative synthesis.
- **Framework-Native Integrations**: SDK for LangChain and CrewAI to eliminate manual exports.
- **Trace Storage Layer**: Migration to SQLite for efficient trace management and comparison.

## 3. Detailed Technical Approach

### 3.1 Trace Storage Layer (`src/storage.py`)
To support v2 features (comparison, interactive chat), we need a structured way to store and query traces.
- **Technology**: SQLite (embedded, zero-config).
- **Schema**:
    - `traces`: `id`, `agent_id`, `session_id`, `start_time`, `end_time`, `metadata` (JSON), `status`.
    - `logs`: `id`, `trace_id`, `timestamp`, `level`, `message`, `raw_payload` (JSON), `step_index`.
    - `narratives`: `id`, `trace_id`, `step_range`, `content`, `timestamp`.
- **API**: `save_trace()`, `get_trace(id)`, `get_recent_traces()`, `append_log(trace_id, log_entry)`.

### 3.2 Live Whisper (`src/live.py`)
- **Log Tailing**: Implement a non-blocking file watcher (using `os.stat` or `watchdog`) that monitors a target log file.
- **Sliding Window Buffer**: 
    - Maintain a buffer of the last $N$ log entries.
    - Trigger a "Whisper" update when:
        - A "Key Decision Point" (KDP) is detected (e.g., tool call, final answer).
        - A time interval (e.g., 5 seconds) has passed since the last update.
- **Live UI**: Use the `rich` library to create a split-screen CLI view:
    - Top: Real-time raw log stream.
    - Bottom: The evolving "Live Narrative."

### 3.3 Framework-Native Integrations (`src/integrations/`)
- **SDK Core**: A lightweight Python package that handles the formatting and streaming of logs.
- **LangChain Integration**:
    - Implement a custom `BaseCallbackHandler`.
    - Capture `on_llm_start`, `on_tool_start`, `on_tool_end`, and `on_chain_end`.
- **CrewAI Integration**:
    - Implement a custom logger or task wrapper that intercepts agent thoughts and actions.
- **Transport**: Initially support writing to a local file (which `Live Whisper` then tails) and optionally a local HTTP endpoint for future expansion.

## 4. Implementation Roadmap

| Step | Task | File(s) | Priority |
| :--- | :--- | :--- | :--- |
| 1 | Implement SQLite Storage Layer | `src/storage.py` | High |
| 2 | Create SDK Base and Log Formatter | `src/integrations/sdk.py` | High |
| 3 | Implement LangChain Callback Handler | `src/integrations/langchain.py` | Medium |
| 4 | Implement Live Whisper Tailing Logic | `src/live.py` | High |
| 5 | Build Live CLI Dashboard with `rich` | `src/live.py`, `src/main.py` | Medium |
| 6 | Integration Tests for v2 Pipeline | `tests/test_v2.py` | High |

## 5. Backward Compatibility
- v1 CLI tools (`tw analyze`, etc.) will be updated to read from both the SQLite DB and the legacy JSON files.
- The `WhisperEngine` will remain the core logic provider, ensuring that the narrative quality is maintained across v1 and v2.
