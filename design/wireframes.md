# Wireframes: TraceWhisper v2

These wireframes represent the CLI-based interface of TraceWhisper. Since the product is a developer tool, the "screens" are terminal views.

## 1. Live Whisper Dashboard (`tw live`)
The primary real-time observability view.

```text
+-----------------------------------------------------------------------+
| TRACEWHISPER LIVE | Agent: [AgentName] | Status: [RUNNING/PAUSED]      |
+-------------------------------------------+---------------------------+
| [ NARRATIVE STREAM ]                      | [ RAW LOG STREAM ]         |
|                                           |                           |
| 14:01:02 - Agent begins research on       | 14:01:02 [INFO] Initializing|
| "Autonomous AI Startups".                  | agent_session_id: 8821     |
|                                           |                           |
| 14:01:15 - [PIVOT] User request was too    | 14:01:15 [DEBUG] Call:     |
| broad. Agent narrowing scope to           | search_tool(q="AI start...")|
| "AI Agents in 2026".                       | 14:01:16 [DEBUG] Response:  |
|                                           | { "results": [ ... ], }    |
|                                           |                           |
| 14:01:40 - [LOOP] Agent is repeatedly     | 14:01:40 [WARN] Loop detect:|
| searching for the same term.              | repeat_query: "AI Agents"   |
| Suggestion: Adjust search parameters.     | 14:01:41 [INFO] Call:      |
|                                           | search_tool(q="AI Agents") |
|                                           |                           |
|                                           |                           |
+-------------------------------------------+---------------------------+
| [P]ause | [S]top | [C]hat | [F]ix | [H]elp | Log: /logs/session_8821.log|
+-----------------------------------------------------------------------+
```

## 2. Trace Comparison View (`tw compare <A> <B>`)
Side-by-side analysis of two different execution paths.

```text
+-----------------------------------------------------------------------+
| TRACE COMPARISON | Trace A: [ID_1] vs Trace B: [ID_2]                  |
+-----------------------------------------------------------------------+
| METRICS: | Steps: A(42) < B(115) | Tokens: A(12k) < B(35k) | Time: A < B|
+-------------------------------------------+---------------------------+
| TRACE A (Optimized)                        | TRACE B (Loopy)            |
|                                           |                           |
| 00:01 - Start Research                    | 00:01 - Start Research     |
| 00:05 - Found key source A                | 00:05 - Found key source A |
|                                           |                           |
| ----------------- DIVERGENCE POINT ----------------------------------- |
|                                           |                           |
| 00:10 - Synthesizes result                | 00:10 - Tries to re-verify  |
| 00:12 - Finalizes report                  | 00:15 - Search loop starts  |
|                                           | 00:20 - Search loop cont.   |
|                                           | 00:25 - Search loop cont.   |
|                                           | 00:30 - Finally synthesizes|
|                                           |                           |
+-------------------------------------------+---------------------------+
| [V]iew Raw Logs | [E]xport Comparison | [Q]uery Divergence             |
+-----------------------------------------------------------------------+
```

## 3. "The Fixer" Prompt Proposal (`tw fix <point>`)
The interface for turning a failure into a prompt improvement.

```text
+-----------------------------------------------------------------------+
| THE FIXER: Prompt Optimization Proposal                                |
+-----------------------------------------------------------------------+
| DETECTED ISSUE: Reasoning Loop                                        |
| Evidence: Agent repeated "search_tool" 4 times with identical queries. |
|                                                                       |
| [ CURRENT SYSTEM PROMPT ]                                             |
| "You are a research assistant. Find information and summarize it."    |
|                                                                       |
| [ PROPOSED IMPROVEMENT ]                                              |
| "You are a research assistant. Find information and summarize it.     |
|  IF a search query returns no new information twice, STOP the loop    |
|  and pivot your search terms or ask for clarification." <--- [NEW]     |
|                                                                       |
+-----------------------------------------------------------------------+
| [A]pply Change | [R]efine Suggestion | [C]ancel                        |
+-----------------------------------------------------------------------+
```

## 4. Interactive Trace-Chat (`/` in live or `tw chat <id>`)
A forensic chat interface to query a specific trace.

```text
+-----------------------------------------------------------------------+
| FORENSIC CHAT | Trace: [ID_1]                                         |
+-----------------------------------------------------------------------+
| User: Why did the agent pivot at 14:01:15?                             |
|                                                                       |
| Whisper: The agent found that the initial query "Autonomous AI        |
| Startups" returned 5,000+ results, which exceeded its processing      |
| window. It pivoted to "AI Agents in 2026" to increase precision.       |
|                                                                       |
| Evidence:                                                             |
| -> Log Line 412: search_api(q="Autonomous AI Startups") -> 5k results  |
| -> Log Line 415: "Too many results. Narrowing scope..."                |
|                                                                       |
+-----------------------------------------------------------------------+
| Query: _                                                               |
+-----------------------------------------------------------------------+
```
