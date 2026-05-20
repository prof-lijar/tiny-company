# TraceWhisper

TraceWhisper is a high-fidelity observability tool designed to transform raw, noisy AI agent logs into clear, human-readable execution narratives. By filtering out system noise and synthesizing key decision points, TraceWhisper allows developers to understand *why* an agent took a specific path, not just *what* it did.

## 🚀 Features

- **Noise Reduction**: Automatically filters out heartbeats, pings, and system chatter.
- **Narrative Synthesis**: Uses LLMs to convert technical traces into a cohesive story.
- **Key Decision Point (KDP) Identification**: Highlights the critical moments where the agent made a pivotal choice.
- **Tool Usage Tracking**: Summarizes tool calls, inputs, and outcomes for easy auditing.
- **Flexible Parsing**: Supports both JSONL (JSON Lines) and structured plain-text logs.

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
   # Edit .env with your actual API keys
   export $(grep -v '^#' .env | xargs)
   ```

## 🛠 Usage

### Generate a Narrative Report
Run the `parse` command to process a log file.

**Basic Usage (Console Output):**
```bash
python src/main.py parse path/to/your_logs.json
```

**Save to Markdown File:**
```bash
python src/main.py parse path/to/your_logs.json --output report.md
```

### Example Log Format (JSONL)
TraceWhisper expects logs in JSON Lines format:
```json
{"timestamp": "2026-05-20T12:00:00Z", "trace_id": "tr-123", "level": "INFO", "component": "Thought", "content": "I need to check the weather in Tokyo.", "metadata": {}}
{"timestamp": "2026-05-20T12:00:01Z", "trace_id": "tr-123", "level": "INFO", "component": "Action", "content": "get_weather(city='Tokyo')", "metadata": {}}
```

## 📐 Architecture

TraceWhisper operates as a linear pipeline:

1. **Log Parser**: Ingests raw files and validates them into `RawLogEntry` models.
2. **Trace Filter**: Removes noise based on configurable patterns and groups entries by `trace_id`.
3. **Narrative Engine**: Sends the cleaned trace to an LLM with a specialized prompt to synthesize the "journey".
4. **Report Generator**: Formats the synthesis into a professional Markdown report.

## 🧪 Testing

Run the test suite to ensure stability:
```bash
pytest tests/
```

## 📈 Production Monitoring & Telemetry

TraceWhisper includes a built-in telemetry system for production observability.

### Telemetry Implementation
The system uses structured JSON logging to track:
- **Performance**: Execution duration of key components (Parsing, Filtering, LLM Synthesis).
- **Errors**: Detailed error tracking for file I/O, JSON parsing, and LLM API failures.
- **Volume**: Counting of log entries processed per trace.

### Monitoring the Application
By default, telemetry logs are sent to `stdout` as JSON strings. In a production environment, you should:
1. **Redirect stdout** to a log aggregator (e.g., CloudWatch, ELK, or Datadog).
2. **Filter for `level: "ERROR"`** to set up real-time alerting.
3. **Aggregate `duration_seconds`** to monitor LLM latency and parsing performance.

Example telemetry log:
```json
{"timestamp": "2026-05-20T13:00:00Z", "service": "TraceWhisper", "level": "INFO", "event": "llm_synthesis_duration", "data": {"model": "gpt-4o", "duration_seconds": 1.24, "trace_id": "tr-123"}}
```
\n\n## v2.2.2 Verification Loop\n\n### Overview\nAutomates the process of applying a prompt fix and verifying it against a trigger trace and a regression benchmark set.\n\n### Key Components\n- `src/verification_loop.py`: The `VerificationLoopManager` handles the snapshot-apply-verify-rollback cycle.\n- `src/models.py`: Defines `GoldStandard`, `VerificationSet`, and `VerificationResult`.\n- `tests/test_verification_loop.py`: Comprehensive tests for success, failure, and regression scenarios.\n\n### Usage\nRefer to `docs/v2.2.2-verification-loop-guide.md` for detailed operational and integration instructions.\n\n