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
