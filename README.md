# TraceWhisper v2.3: The Intelligence Layer

TraceWhisper has evolved from a simple log monitoring tool into a **Reasoning Intelligence Layer**. While v2.1 focused on "Debug-First Observability," v2.3 moves from observing failures to proactively preventing them and optimizing cognitive efficiency.

## Core v2.3 Capabilities

### 1. The Pattern Vault (Cross-Project Knowledge)
Enable "write-once, fix-everywhere" for reasoning. 
- **Pattern Extraction**: Automatically captures failure-correction pairs from verified fixes.
- **Recommendation Engine**: Suggests proven fixes for new traces based on historical similarity across projects.

### 2. Continuous Reasoning Integration (CRI)
Reasoning stability is now a first-class citizen in the CI/CD pipeline.
- **Reasoning Unit Tests**: Define expected cognitive paths (not just outputs) to prevent "lucky" passes.
- **Hard Gates**: `tw verify-all` integrated into CI/CD to block regressions in reasoning logic.

### 3. Cognitive Pruning Engine
Reduce latency and cost by eliminating "Cognitive Bloat."
- **Bloat Detection**: Identifies circular reasoning and redundant steps.
- **Efficiency Scoring**: Provides a ratio of actual vs. minimum required steps, suggesting prompt modifications to save tokens.

### 4. Adversarial Reasoning Synthesis
Proactive red-teaming for prompts.
- **Synthetic Stress Tests**: Generates adversarial inputs designed to trigger known failure modes.
- **Fragility Reporting**: Pinpoints specific weak points in prompt logic before they hit production.

## Technical Architecture
For detailed technical specifications, see `docs/v2.3-spec.md` and `docs/technical-architecture.md`.

## Quick Start
```bash
# Install the SDK
pip install tracewhisper-sdk

# Initialize and start tracing
tw init
tw live

# Run reasoning verification (v2.3)
tw verify-all
```
