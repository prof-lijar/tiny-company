# TraceWhisper Core

TraceWhisper is a CLI tool that converts raw AI agent logs into a structured, human-readable narrative.

## Installation

```bash
pip install typer pydantic litellm
```

## Usage

### Basic Usage
Parse a log file and output the report to the console:
```bash
python src/main.py parse logs.json
```

### Save to File
Save the narrative report to a Markdown file:
```bash
python src/main.py parse logs.json --output report.md
```

### Configuration
The tool uses `litellm` for LLM synthesis. Ensure you have the required API keys in your environment:
```bash
export OPENAI_API_KEY='your-key'
# or
export ANTHROPIC_API_KEY='your-key'
```

## Architecture
The tool follows a simple pipeline:
`Log Parser` $\rightarrow$ `Trace Filter` $\rightarrow$ `Narrative Engine` $\rightarrow$ `Report Generator`.
