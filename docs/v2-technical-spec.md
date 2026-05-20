# Technical Specification: Live Whisper (Real-time Narrative)
# Updated for v2.1 Frictionless Entry

## 1. Overview
Live Whisper provides a real-time, synthesized narrative of an agent's execution. It transforms a raw stream of logs into a human-readable story, allowing developers to monitor agent reasoning as it happens.

## 2. Architecture Components

### 2.1 Log Ingestion Layer (`LogTailer`)
- **Responsibilities**: Monitoring log sources and emitting new log entries.
- **Implementation**:
    - `FileTailer`: Uses `os.stat` or `tail -f` style polling to detect new lines in a specified log file.
    - `SocketTailer`: (Planned) Listens to a WebSocket or TCP stream for incoming JSON log packets.
- **Output**: A stream of `LogEntry` objects.

### 2.2 Synthesis Engine (`SynthesisEngine`)
- **Responsibilities**: Grouping logs into windows and and triggering narrative generation.
- **Windowing Strategy**:
    - **Step-based Window**: Triggers synthesis every $N$ logs (e.g., $N=5$).
    - **Event-based Trigger (KDP)**: Triggers synthesis immediately upon detecting a "Key Decision Point" (e.g., a tool call, an error, or a specific keyword like "FINAL ANSWER").
- **State Management**:
    - Maintains a buffer of "un-synthesized" logs.
    - Tracks the last synthesized step index to prevent duplication.
    - Uses the `TraceStorage` to persist logs and the resulting narratives.
- **LLM Integration**: Sends the current window + a summary of the previous window to the LLM to generate a cohesive narrative segment.

### 2.3 Presentation Layer (`LiveDashboard`)
- **Responsibilities**: Displaying the live feed in the terminal.
- **Implementation**:
    - Uses the `rich.live` module for a dynamic UI.
    - **Layout**:
        - Top Section: Current synthesized narrative (the "Whisper").
        - Bottom Section: A scrolling window of the latest 5-10 raw log lines.
- **Controls**:
    - `Pause/Resume`: Toggles the ingestion of new logs.
    - `Clear`: Resets the view.

## 3. Frictionless Entry Optimizations (v2.1)

### 3.1 SDK Health Checks
- **Requirement**: `tracewhisper.init()` must validate the environment.
- **Implementation**:
    - Verifies write permissions for the `log_file`.
    - Provides actionable error messages (e.g., "Cannot write to log file") instead of silent failures.
    - Auto-initializes if `log()` is called before `init()`.

### 3.2 Click-Wrap Consent
- **Requirement**: Replace manual signatures with a digital consent flow.
    - **Implementation**:
    - Uses an environment variable `TRACEWHISPER_CONSENT=true` to track acceptance of the Beta Agreement.
    - SDK warns the user if consent is missing but allows "Unverified" mode for frictionless testing.

### 3.3 Guided Experience
- **Requirement**: Prompt users to use `tw live` upon first successful execution.
- **Implementation**:
    - The SDK's `init()` method prints a helpful tip to the console, directing users to the `tw live` command.

## 4. Data Flow
1. `LogTailer` $\\rightarrow$ detects new log $\\rightarrow$ pushes to `SynthesisEngine`.
2. `SynthesisEngine` $\\rightarrow$ appends log to `TraceStorage`.
3. `SynthesisEngine` $\\rightarrow$ checks if window is full OR KDP detected.
4. If trigger: `SynthesisEngine` $\\rightarrow$ calls LLM $\\rightarrow$ saves narrative to `TraceStorage` $\\rightarrow$ notifies `LiveDashboard`.
5. `LiveDashboard` $\\rightarrow$ updates display with new narrative and latest logs.

## 5. Performance & Constraints
- **Latency**: To keep latency $< 5s$, the synthesis engine uses a lightweight prompt and a fast LLM model (e.g., GPT-4o-mini).
- **Concurrency**: The `LogTailer` and `SynthesisEngine` run in separate threads/async tasks to ensure the UI remains responsive.
- **Backward Compatibility**: All live logs are saved in the standard SQLite schema defined in `src/storage.py`, ensuring that a live trace can be analyzed post-mortem using v1 tools.

## 6. Implementation Plan
1. **Phase 1**: Implement `FileTailer` and basic `SynthesisEngine` (Step-based).
2. **Phase 2**: Implement `LiveDashboard` using `rich`.
3. **Phase 3**: Implement KDP detection and WebSocket support.
4. **Phase 4**: Integration tests for latency and duplication.
