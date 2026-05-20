# Tech Stack: TraceWhisper

## Overview
TraceWhisper is designed as a lightweight, high-performance CLI tool. The primary goal is to provide a seamless "pipe" from raw logs to human-readable narratives.

## Technology Choices

### 1. Language: Python 3.11+
- **Rationale:** Python is the industry standard for AI/LLM tooling. It has the best ecosystem for log parsing, LLM orchestration, and CLI development.

### 2. CLI Framework: Typer
- **Rationale:** Built on top of Click, Typer provides great type hinting and automatic help generation, making the CLI intuitive for developers.

### 3. LLM Orchestration: LiteLLM
- **Rationale:** LiteLLM allows the tool to be provider-agnostic. Users can switch between OpenAI, Anthropic, or local models (via Ollama) using a unified API format.

### 4. Data Validation & Modeling: Pydantic
- **Rationale:** Essential for ensuring that the ingested JSON logs and the structured output from the LLM adhere to a strict schema, preventing runtime errors during narrative synthesis.

### 5. Template Engine: Jinja2
- **Rationale:** Decouples the narrative content from the presentation. Jinja2 makes it easy to support multiple export formats (Markdown, HTML) without rewriting the logic.

### 6. Log Parsing: Standard Library `json` & `re`
- **Rationale:** For the initial version, standard libraries are sufficient and keep dependencies minimal.

## Summary Table
| Component | Technology | Rationale |
| :--- | :--- | :--- |
| Runtime | Python 3.11 | Ecosystem & AI libraries |
| CLI | Typer | Developer experience & type safety |
| LLM Interface | LiteLLM | Provider agnostic (GPT-4, Claude, etc.) |
| Schema | Pydantic | Robust data validation |
| Reporting | Jinja2 | Flexible output templating |
