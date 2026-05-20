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


## 5. v2.3 Intelligence Layer Wireframes

### 5.1 The Cognitive Diff (CRI) (`tw verify-all`)
The interface for identifying exactly where reasoning deviated from the expected path in a unit test.

```text
+---------------------------------------------------------------------------+
| VERIFICATION FAILURE: Test Case #42 (Edge Case: Recursive Loop)            |
+---------------------------------------------------------------------------+
| EXPECTED COGNITIVE PATH:                                                  |
| [OK] Step 1: Parse User Intent                                            |
| [OK] Step 2: Validate Constraints                                         |
| [OK] Step 3: Execute Primary Search                                        |
| [OK] Step 4: Synthesize Answer                                            |
|                                                                           |
| ACTUAL COGNITIVE PATH:                                                    |
| [OK] Step 1: Parse User Intent                                            |
| [OK] Step 2: Validate Constraints                                         |
| [!!] Step 3: Execute Primary Search <--- DIVERGENCE POINT                  |
| [!!] Step 4: Re-validate Constraints (Loop Detected)                      |
| [!!] Step 5: Execute Primary Search (Repeat)                              |
+---------------------------------------------------------------------------+
| Recommendation: tighten the "Constraint Validation" prompt block.         |
+---------------------------------------------------------------------------+
| [F]ix Prompt | [V]iew Raw Logs | [I]gnore | [R]erun Test                   |
+---------------------------------------------------------------------------+
```

### 5.2 Pruning Report (`tw prune <id>`)
Visualizing "Cognitive Bloat" and the potential for token savings.

```text
+---------------------------------------------------------------------------+
| COGNITIVE PRUNING ANALYSIS: Trace #882                                     |
+---------------------------------------------------------------------------+
| EFFICIENCY SCORE: 64% | POTENTIAL SAVINGS: 1,240 Tokens                    |
+---------------------------------------------------------------------------+
| [ORIGINAL TRACE]                      | [PRUNED TRACE]                     |
| Step 1: Initial Thought               | Step 1: Initial Thought            |
| Step 2: Reasoning A                   | Step 2: Reasoning A                |
| Step 3: Reasoning A (Repeat) [BLOAT]  | (Step Removed)                     |
| Step 4: Reasoning A (Repeat) [BLOAT]  | (Step Removed)                     |
| Step 5: Final Conclusion              | Step 3: Final Conclusion           |
+---------------------------------------------------------------------------+
| Suggestion: "Avoid repeating the verification step after Step 2."          |
+---------------------------------------------------------------------------+
| [A]pply Pruning Suggestion | [E]xport Report | [C]ancel                    |
+---------------------------------------------------------------------------+
```

### 5.3 IDE Integration (VS Code Extension)
A conceptual representation of the split-pane view.

```text
+---------------------------+-----------------------------------------------+
| PROMPT FILE (left)        | NARRATIVE TRACE (right)                        |
+---------------------------+-----------------------------------------------+
| 1 | You are a research    | 10:02:01 - Agent decided to search for        |
| 2 | assistant. Find info  | \"quantum computing\" but found too many      |
| 3 | and summarize it.     | results.                                      |
| 4 |                        |                                              |
| 5 | IF a search query     | 10:02:15 - [LOOP] Agent is repeatedly         |
| 6 | returns no new info   | searching for the same term.                   |
| 7 | twice, STOP the loop  | <--- [LINKED TO LINE 5-7]                      |
| 8 | and pivot.            |                                              |
| 9 |                        | [!] Suggestion: Use Pattern Vault Fix #12     |
| 10|                        | [ Apply Fix ] <--- (Clickable Button)         |
+---------------------------+-----------------------------------------------+
| [Save] [Commit]           | [Live View] [Forensic View] [Prune]            |
+---------------------------+-----------------------------------------------+
```

### 5.4 Pattern Vault Insight (Integrated in "The Fixer")
How cross-project knowledge is presented during the fix flow.

```text
+---------------------------------------------------------------------------+
| THE FIXER: Prompt Optimization Proposal                                   |
+---------------------------------------------------------------------------+
| DETECTED ISSUE: Reasoning Loop                                            |
|                                                                           |
| [ VAULT INSIGHT ] <--- (Vault Purple)                                      |
| Similar failure found in project 'Finance-Bot-v2'.                         |
| Proven Fix: "Added a counter to the search loop to force a pivot after 3   |
| iterations."                                                               |
|                                                                           |
| [ PROPOSED IMPROVEMENT ]                                                  |
| \"You are a research assistant...                                         |
|  IF search returns no new info 3 times, STOP and pivot.\" <--- [VAULT-FIX] |
+---------------------------------------------------------------------------+
| [A]pply Vault Fix | [R]efine Manually | [C]ancel                           |
+---------------------------------------------------------------------------+
```
