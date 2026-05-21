# TraceWhisper Core Engine

TraceWhisper is a high-fidelity observability tool designed to transform raw AI agent logs into clear, human-readable execution narratives. In version 2.4, it has transitioned into an **Enterprise Reasoning Governance Platform**, enabling organizations to standardize, share, and govern reasoning patterns across multiple teams.

## 🚀 Features

### Observability & Narrative (Core)
- **Noise Reduction**: Automatically filters out heartbeats, pings, and system chatter.
- **Narrative Synthesis**: Converts technical traces into a cohesive story.
- **KDP Identification**: Highlights critical moments where the agent made a pivotal choice.

### Enterprise Governance & Scale (v2.4)
- **Multi-tenancy & Isolation**: Logical data separation at the organizational and team level, ensuring strict corporate data boundaries.
- **Role-Based Access Control (RBAC)**: Granular permission system (`Org Admin`, `Team Lead`, `Engineer`, `Auditor`) for managing vault access and governance.
- **Hierarchical Pattern Vaults**: A structured knowledge base (`Global` $\\rightarrow$ `Dept` $\\rightarrow$ `Team` $\\rightarrow$ `Private`) allowing "write-once, fix-everywhere" reasoning across the enterprise.
- **Reasoning Governance**: Foundation for "Golden Paths" and compliance scanning to ensure agents follow predictable and safe cognitive processes.

### Intelligence Layer (v2.3)
- **The Pattern Vault**: A cross-project knowledge base that stores "Failure $\\rightarrow$ Correction" pairs.
- **Cognitive Pruning Engine**: Detects "Cognitive Bloat" and suggests prompt optimizations to reduce token cost and latency.
- **Adversarial Synthesis**: Proactively generates stress tests to find fragility in prompt logic before deployment.
- **Verification Loop**: A closed-loop system for verifying fixes and extracting patterns into the Vault.

## 🏗 Project Structure

- `src/main.py`: CLI entry point.
- `src/engine.py`: Core narrative synthesis logic.
- `src/pattern_vault.py`: Logic for extracting and recommending reasoning patterns with hierarchical support.
- `src/enterprise_core.py`: RBAC and Enterprise context management.
- `src/pruning_engine.py`: Logic for detecting and suggesting reductions in cognitive bloat.
- `src/adversarial_synthesis.py`: Red-teaming agent for prompt stress-testing.
- `src/verification_loop.py`: Integration for verifying fixes and closing the loop.
- `src/storage.py`: Persistence layer for traces, patterns, and organizational metadata.
- `src/telemetry.py`: Structured logging and performance tracking.

## 📦 Installation

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

## 🛠 Usage

### Generate a Narrative Report
```bash
python src/main.py parse path/to/your_logs.json --output report.md
```

### Enterprise Tools
The v2.4 enterprise features are integrated into the storage and vault layers. Use the `EnterpriseContext` and `RBACManager` in `src/enterprise_core.py` to manage organizational access.

## 📐 Architecture

TraceWhisper operates as an augmented pipeline:

1. **Ingestion**: `Log Parser` $\\rightarrow$ `Trace Filter`.
2. **Analysis**: `Narrative Engine` $\\rightarrow$ `Cognitive Pruning Engine`.
3. **Knowledge Loop**: `Pattern Vault` (Query) $\\rightarrow$ `Verification Loop` (Fix) $\\rightarrow$ `Pattern Vault` (Save).
4. **Stress Testing**: `Adversarial Synthesis` $\\rightarrow$ `Fragility Report`.
5. **Governance (v2.4)**: `RBAC` $\\rightarrow$ `Hierarchical Vaults` $\\rightarrow$ `Multi-tenant Storage`.

## 🧪 Testing

Run the test suite to ensure stability:
```bash
pytest tests/
```
For v2.4 Enterprise Core tests:
```bash
pytest tests/test_enterprise_core.py
```
For v2.3 specific integration tests:
```bash
pytest tests/test_v23_integration.py
```

## 📊 Production Monitoring & Telemetry

The system uses structured JSON logging via `src/telemetry.py` to track:
- **Performance**: Execution duration of synthesis, pruning, and vault queries.
- **Errors**: Detailed tracking for API failures and parsing errors.
- **Volume**: Token counts and step counts per trace.
