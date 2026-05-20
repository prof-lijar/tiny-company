# Technical Architecture: TraceWhisper

## 1. Architecture Overview
TraceWhisper has evolved from a static post-mortem analysis tool (v1) into a proactive observability and corrective ecosystem (v2.2), and now into an Intelligence Layer (v2.3). 

### Data Flow Versions

#### v1: Batch Pipeline (Post-Mortem)
`Raw Log File` $\\rightarrow$ `Log Parser` $\\rightarrow$ `Trace Filter` $\\rightarrow$ `Narrative Engine` $\\rightarrow$ `Report Generator` $\\rightarrow$ `Final Report`

#### v2: Integrated Ecosystem (Proactive)
`SDK/Live Stream` $\\rightarrow$ `Storage Layer (SQLite)` $\\rightarrow$ `Live Whisper / Analysis Engine` $\\rightarrow$ `Real-time Dashboard / Reports`

#### v2.2: Closed-Loop Correction (Corrective)
`Analysis Engine (Detection)` $\\rightarrow$ `Correction Engine (Meta-Prompt)` $\\rightarrow$ `Suggested Prompt Adjustment` $\\rightarrow$ `User Application` $\\rightarrow$ `Updated Agent Prompt`

#### v2.3: Intelligence Layer (Optimization & Prevention)
`Pattern Vault` $\\rightarrow$ `Cross-Project Fix Recommendations`
`CRI (Continuous Reasoning Integration)` $\\rightarrow$ `Reasoning Unit Tests` $\\rightarrow$ `CI/CD Gate`
`Pruning Engine` $\\rightarrow$ `Cognitive Bloat Detection` $\\rightarrow$ `Token Optimization`
`Adversarial Synthesis` $\\rightarrow$ `Synthetic Stress Tests` $\\rightarrow$ `Fragility Analysis`

## 2. System Diagram
```mermaid
graph TD
    subgraph "Ingestion Layer"
        A[Log Files] --> B[Log Parser]
        C[Framework SDKs] --> D[Stream Handler]
    end

    B --> E[Storage Layer]
    D --> E[Storage Layer]

    subgraph "Storage Layer (SQLite + Embeddings)"
        E --> E1[(Traces Table)]
        E --> E2[(Logs Table)]
        E --> E3[(Narratives Table)]
        E --> E4[(Pattern Vault)]
    end

    E1 & E2 --> F[Analysis Engine]
    E3 --> G[Live Dashboard]

    subgraph "Analysis Engine"
        F --> F1[Trace Filter]
        F1 --> F2[Narrative Engine]
        F2 --> F3[Report Generator]
        F2 --> F4[Correction Engine]
        F2 --> F5[Pruning Engine]
        F2 --> F6[Adversarial Synthesis]
    end

    F3 --> H[Markdown/HTML Report]
    F4 --> I[Prompt Fix Suggestions]
    F5 --> J[Efficiency Report]
    F6 --> K[Fragility Report]
    E4 --> L[Pattern Recommendation Engine]
    L --> I
    
    subgraph "CRI (Continuous Reasoning Integration)"
        M[.tw-test Files] --> N[Reasoning Test Runner]
        N --> O[CI/CD Gate]
    end
    G --> P[Rich CLI Live View]
```

## 3. Data Model
We use Pydantic models for type safety and SQLite for persistence.

### 3.1 Core Models
- `RawLogEntry`: Single log line (timestamp, trace_id, level, component, content, metadata).
- `ProcessedTrace`: Chronological collection of `RawLogEntry` objects grouped by `trace_id`.
- `ExecutionReport`: Final structured object containing summary, narrative segments, tool usage, and failure analysis.
- `PromptFix`: Structured suggestion for prompt modification (analysis, suggested_modification, rationale, confidence_score).

### 3.2 v2.3 Intelligence Models
- `ReasoningPattern`: A pair of `FailurePattern` $\\rightarrow$ `Correction` with associated embeddings for similarity search.
- `ReasoningTest`: A test case consisting of `Input` $\\rightarrow$ `Expected Cognitive Path` $\\rightarrow$ `Expected Output`.
- `PruningReport`: Analysis of cognitive bloat, identifying redundant steps and suggesting token reductions.
- `FragilityReport`: Summary of failure modes triggered by adversarial inputs.

### 3.3 Storage Schema (v2.3)
- **Traces**: High-level metadata (`id`, `agent_id`, `session_id`, `start_time`, `end_time`, `metadata`, `status`).
- **Logs**: Individual entries (`id`, `trace_id`, `timestamp`, `level`, `message`, `raw_payload`, `step_index`).
- **Narratives**: Synthesized segments (`id`, `trace_id`, `step_range`, `content`, `timestamp`).
- **PatternVault**: Store of proven fixes (`id`, `failure_embedding`, `failure_description`, `correction_prompt`, `project_id`, `success_rate`).

## 4. Component Specifications

### 4.1 Log Parser & Stream Handler
- **Parser**: Reads static files and deserializes them into `RawLogEntry` objects.
- **Stream Handler**: Provides an SDK (LangChain/CrewAI callbacks) to stream logs directly to the storage layer in real-time.

### 4.2 Storage Layer (`src/storage.py`)
- **Responsibility**: Manages the SQLite database and embedding storage.
- **Key APIs**: `save_trace()`, `append_log()`, `save_narrative()`, `get_trace_logs()`, `save_pattern()`, `query_patterns()`.

### 4.3 Narrative Engine (`src/engine.py`)
- **Responsibility**: 
  - **Batch Mode**: Processes a full trace to generate a report.
  - **Live Mode**: Processes sliding windows of logs to update a rolling narrative.
- **Interface**: `synthesize_narrative(trace: ProcessedTrace) -> ExecutionReport`.

### 4.4 Correction Engine (`src/correction_engine.py`)
- **Responsibility**: Implements the "Fix-It" logic. It uses a Meta-Prompt to analyze detected reasoning failures (Loops, Contradictions) and suggests precise system prompt modifications.
- **Interface**: `suggest_fix(system_prompt, trace, failure_type) -> PromptFix`.

### 4.5 Pruning Engine (`src/pruning_engine.py`)
- **Responsibility**: Detects "Cognitive Bloat" (circular reasoning, redundancy) and suggests prompt optimizations to reduce token usage.
- **Interface**: `analyze_efficiency(trace: ProcessedTrace) -> PruningReport`.

### 4.6 Pattern Vault (`src/pattern_vault.py`)
- **Responsibility**: Manages the library of failure-correction pairs. Uses embeddings to recommend fixes based on current trace failures.
- **Interface**: `extract_pattern(trace, fix) -> ReasoningPattern`, `recommend_fix(trace) -> List[ReasoningPattern]`.

### 4.7 CRI Runner (`src/reasoning_tests.py`)
- **Responsibility**: Executes reasoning unit tests and validates the cognitive path against expectations.
- **Interface**: `run_tests(prompt, test_suite) -> TestResult`.

### 4.8 Adversarial Synthesis (`src/adversarial_synthesis.py`)
- **Responsibility**: Generates synthetic stress tests to probe for reasoning fragility.
- **Interface**: `generate_stress_tests(prompt) -> List[TestInput]`.

### 4.9 Live Whisper (`src/live.py`)
- **Responsibility**: Tailing logs (via file or DB) and triggering the Narrative Engine upon "Key Decision Points" (KDPs).
- **UI**: Uses `rich` for a split-screen CLI dashboard.

## 5. Deployment & Stack
- **Language**: Python 3.11+
- **Persistence**: SQLite (Embedded)
- **Embeddings**: Sentence-Transformers or OpenAI embeddings
- **LLM Interface**: LiteLLM (supporting OpenAI, Anthropic, etc.)
- **UI**: Rich (CLI)
- **Dependency Management**: `uv`
