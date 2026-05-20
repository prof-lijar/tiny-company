# Wireframes: TraceWhisper v2

These ASCII wireframes serve as the blueprint for the v2 interface implementations.

## 1. Live Whisper CLI View
This is the real-time observability dashboard.

```text
+----------------------------------------------------------------------------+
| TraceWhisper v2 | LIVE STREAM | Source: agent_logs.json | Status: RUNNING   |
+----------------------------------------------------------------------------+
| [ NARRATIVE ]                                                              |
|                                                                            |
| Agent is currently attempting to resolve the user's request for "Q3 Sales"  |
| by querying the internal DB.                                               |
|                                                                            |
| [KDP] Agent decided to switch from 'Global Search' to 'Region-Specific'    |
| because the global query returned too many results (>100).                 |
|                                                                            |
| [ANALYZING...]                                                             |
+----------------------------------------------------------------------------+
| [ RAW LOG STREAM ]                                                         |
| 14:02:01 [INFO] Call: get_sales_data(region="All") -> returns [142 items]  |
| 14:02:02 [DEBUG] Thought: Too many results. Filtering by region.           |
| 14:02:03 [INFO] Call: get_sales_data(region="North_America") -> returns...  |
| 14:02:04 [INFO] Call: get_sales_data(region="EMEA") -> returns...           |
+----------------------------------------------------------------------------+
| [Ctrl+C] Pause | [Ctrl+R] Reset | [Ctrl+Q] Quit                            |
+----------------------------------------------------------------------------+
```

## 2. Trace Comparison Report (A/B Test)
Side-by-side comparison of two execution paths.

```text
+----------------------------------------------------------------------------+
| COMPARISON REPORT: Trace A (v1 Prompt) vs Trace B (v2 Prompt)               |
+----------------------------------------------------------------------------+
| METRICS | Trace A | Trace B | Delta    | Winner |
|---------|---------|---------|----------|--------|
| Steps   | 24      | 12      | -50%     | Trace B|
| Tokens  | 12k     | 7k      | -41%     | Trace B|
| Outcome | Failure | Success | +1       | Trace B|
+----------------------------------------------------------------------------+
|                                                                            |
| [ TRACE A: Journey ]             | [ TRACE B: Journey ]                    |
|                                  |                                         |
| 1. Started search for "X"        | 1. Started search for "X"               |
| 2. Attempted Tool A              | 2. Attempted Tool B                      |
| 3. Tool A failed                 | 3. Tool B succeeded                      |
|                                  |                                         |
| <--- DIVERGENCE POINT: Step 2 --->| <--- DIVERGENCE POINT: Step 2 --->      |
|                                  |                                         |
| 4. Retried Tool A                | 4. Synthesized answer                    |
| 5. Entered Recursive Loop        | 5. Finished                               |
| 6. [FAILURE] Timeout             | 6. [SUCCESS]                               |
|                                  |                                         |
+----------------------------------------------------------------------------+
```

## 3. Prompt Optimization UI ("The Fixer")
Transitioning from failure analysis to a prompt fix.

```text
+----------------------------------------------------------------------------+
| PROMPT OPTIMIZER: Root Cause -> Fix                                         |
+----------------------------------------------------------------------------+
| ROOT CAUSE: Tool Hallucination at Step 14                                   |
| Evidence: Agent called `get_user_email()` with a non-existent parameter     |
|           `user_id_v2` instead of `user_id`.                                |
+----------------------------------------------------------------------------+
| PROPOSED CHANGE:                                                           |
|                                                                            |
| [ BEFORE ]                                   [ AFTER ]                     |
| "You are a helpful assistant."               "You are a helpful assistant.  |
|                                              Ensure you use only the        |
|                                              exact parameter names defined  |
|                                              in the tool specifications.    |
|                                              Do NOT invent new parameters." |
|                                                                            |
+----------------------------------------------------------------------------+
| [ Apply Change to Prompt ] [ Export to Config ] [ Dismiss ]                |
+----------------------------------------------------------------------------+
```

## 4. Interactive Trace-Chat
Forensic analysis of a specific trace.

```text
+----------------------------------------------------------------------------+
| TRACE FORENSICS | Trace ID: 8821-X                                         |
+----------------------------------------------------------------------------+
| [ TRACE VIEW ]                      | [ FORENSIC CHAT ]                    |
|                                     |                                      |
| Step 1: User Greeting                | User: Why did the agent fail at      |
| Step 2: Tool Call (Search)          |       Step 14?                        |
| Step 3: Tool Result (Empty)         |                                      |
| ...                                 | AI: The agent failed because it       |
| Step 14: Tool Call (Error) <---[S]  |     attempted to use the 'Email' tool |
| Step 15: Exit                       |     without first retrieving the      |
|                                     |     User ID from the 'Profile' tool.  |
|                                     |     See [S] Step 14.                 |
|                                     |                                      |
|                                     | User: [ Type your question... ]      |
+----------------------------------------------------------------------------+
```
