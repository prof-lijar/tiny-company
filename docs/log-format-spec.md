# Log Format Specification: TraceWhisper

To ensure consistent parsing and narrative synthesis, TraceWhisper expects logs to follow a structured format. While the tool aims to support multiple frameworks, the following JSON schema is the "Reference Format."

## 1. Top-Level Structure
A log file should be a JSON object containing metadata about the trace and a chronological list of events.

```json
{
  "trace_id": "string (uuid)",
  "agent_id": "string",
  "session_start": "timestamp (ISO 8601)",
  "session_end": "timestamp (ISO 8601)",
  "metadata": {
    "model": "string (e.g., gpt-4o)",
    "goal": "string (the original prompt given to the agent)",
    "environment": "string (e.g., production, staging, local)"
  },
  "events": [
    { "event_type": "...", ... }
  ]
}
```

## 2. Event Types
The `events` array consists of different event types that represent the agent's internal loop.

### 2.1 `thought`
Represents the agent's internal reasoning process.
- `timestamp`: ISO 8601
- `content`: The raw text of the agent's thought process.
- `token_count`: Integer (optional)

### 2.2 `action`
Represents a tool call initiated by the agent.
- `timestamp`: ISO 8601
- `tool_name`: The name of the tool being called.
- `arguments`: JSON object containing the arguments passed to the tool.
- `thought_reference`: ID of the thought that led to this action (optional).

### 2.3 `observation`
Represents the result returned by the tool.
- `timestamp`: ISO 8601
- `tool_name`: The name of the tool that provided the result.
- `output`: The raw output/return value of the tool.
- `status`: "success" | "error"
- `error_message`: String (only if status is "error").

### 2.4 `final_response`
The final output provided by the agent to the user.
- `timestamp`: ISO 8601
- `content`: The final answer.
- `status`: "success" | "failure"

## 3. Reference Example
Below is a complete example of a trace that TraceWhisper would process.

```json
{
  "trace_id": "tw-98765",
  "agent_id": "research-bot-01",
  "session_start": "2026-05-20T10:00:00Z",
  "session_end": "2026-05-20T10:02:15Z",
  "metadata": {
    "model": "gpt-4o",
    "goal": "Find the current stock price of NVDA and compare it to its 52-week high.",
    "environment": "production"
  },
  "events": [
    {
      "event_type": "thought",
      "timestamp": "2026-05-20T10:00:01Z",
      "content": "I need to find the current price of NVDA. I will start by using the 'get_stock_price' tool."
    },
    {
      "event_type": "action",
      "timestamp": "2026-05-20T10:00:02Z",
      "tool_name": "get_stock_price",
      "arguments": { "symbol": "NVDA" }
    },
    {
      "event_type": "observation",
      "timestamp": "2026-05-20T10:00:03Z",
      "tool_name": "get_stock_price",
      "output": { "price": 950.00, "currency": "USD" },
      "status": "success"
    },
    {
      "event_type": "thought",
      "timestamp": "2026-05-20T10:00:04Z",
      "content": "I have the current price (950.00). Now I need the 52-week high. I'll use 'get_stock_stats'."
    },
    {
      "event_type": "action",
      "timestamp": "2026-05-20T10:00:05Z",
      "tool_name": "get_stock_stats",
      "arguments": { "symbol": "NVDA" }
    },
    {
      "event_type": "observation",
      "timestamp": "2026-05-20T10:00:06Z",
      "tool_name": "get_stock_stats",
      "output": { "52_week_high": 975.00, "52_week_low": 400.00 },
      "status": "success"
    },
    {
      "event_type": "thought",
      "timestamp": "2026-05-20T10:00:07Z",
      "content": "The current price is 950.00 and the 52-week high is 975.00. I can now calculate the difference and provide the final answer."
    },
    {
      "event_type": "final_response",
      "timestamp": "2026-05-20T10:00:08Z",
      "content": "The current price of NVDA is $950.00, which is $25.00 below its 52-week high of $975.00.",
      "status": "success"
    }
  ]
}
```
