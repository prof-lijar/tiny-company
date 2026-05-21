# TraceWhisper Core Engine

TraceWhisper is a high-fidelity observability tool designed to transform raw AI agent logs into clear, human-readable execution narratives. In version 2.3, it has evolved into an **Intelligence Layer** that not only observes but optimizes and secures agent reasoning.

## 🚀 Features

### Observability & Narrative (Core)
- **Noise Reduction**: Automatically filters out heartbeats, pings, and system chatter.
- **Narrative Synthesis**: Converts technical traces into a cohesive story.
- **KDP Identification**: Highlights critical moments where the agent made a pivotal choice.

### Intelligence Layer (v2.3)
- **The Pattern Vault**: A cross-project knowledge base that stores "Failure $\rightarrow$ Correction" pairs, enabling "write-once, fix-everywhere" reasoning.
- **Cognitive Pruning Engine**: Detects "Cognitive Bloat" (circular reasoning, redundant steps) and suggests prompt optimizations to reduce token cost and latency.
- **Adversarial Synthesis**: Proactively generates stress tests to find fragility in prompt logic before deployment.
- **Verification Loop**: A closed-loop system for verifying fixes and extracting patterns into the Vault.

## 📦 Project Structure

- `src/main.py`: CLI entry point.
- `src/engine.py`: Core narrative synthesis logic.
- `src/pattern_vault.py`: Logic for extracting and recommending reasoning patterns.
- `src/pruning_engine.py`: Logic for detecting and suggesting reductions in cognitive bloat.
- `src/adversarial_synthesis.py`: Red-teaming agent for prompt stress-testing.
- `src/verification_loop.py`: Integration for verifying fixes and closing the loop.
- `src/storage.py`: Persistence layer for traces and patterns.
- `src/telemetry.py`: Structured logging and performance tracking.

## 🛠 Installation

### Prerequisites
- Python 3.9+
- An OpenAI API Key (or other LLM provider supported by `litellm`)

### Setup
1. Clone the repository and navigate to the project root.
2. Install dependencies:
   ```bash
   pip install typer pydantic litellm
   ```
3. Set up your environment variables:
   ```bash
   cp .env.example .env
   export $(grep -v '^#' .env | xargs)
   ```

## 📖 Usage

### Generate a Narrative Report
```bash
python src/main.py parse path/to/your_logs.json --output report.md
```

### Intelligence Layer Tools
The v2.3 features are integrated into the main pipeline and can be invoked via the `main.py` interface or directly as modules in the SDK.

## 🏗 Architecture

TraceWhisper operates as an augmented pipeline:

1. **Ingestion**: `Log Parser` $\rightarrow$ `Trace Filter`.
2. **Analysis**: `Narrative Engine` $\rightarrow$ `Cognitive Pruning Engine`.
3. **Knowledge Loop**: `Pattern Vault` (Query) $\rightarrow$ `Verification Loop` (Fix) $\rightarrow$ `Pattern Vault` (Save).
4. **Stress Testing**: `Adversarial Synthesis` $\rightarrow$ `Fragility Report`.

## 🧪 Testing

Run the test suite to ensure stability:
```bash
pytest tests/
```
For v2.3 specific integration tests:
```bash
pytest tests/test_v23_integration.py
```

## 📈 Production Monitoring & Telemetry

The system uses structured JSON logging via `src/telemetry.py` to track:
- **Performance**: Execution duration of synthesis, pruning, and vault queries.
- **Errors**: Detailed tracking for API failures and parsing errors.
- **Volume**: Token counts and step counts per trace.
