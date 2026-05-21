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


## 5. v2.5 The Autonomous Bridge Wireframes

### 5.1 Auto-SOP Proposal View (`tw propose-sop <agent_id>`)
The interface for promoting a discovered reasoning pattern to a Golden Path.

```text
+-----------------------------------------------------------------------+
| PROPOSED GOLDEN PATH: [Customer-Support-Bot] | Confidence: 94%         |
+-----------------------------------------------------------------------+
| [Cluster Map]                                      [Validation]       |
|    (.)  (.) <--- Successful Traces                   Adherence: 94%   |
|  (.)  (.)  (.)                                       Coverage: 88%    |
|    \  |  /                                                           |
|     [Proposed Path]                                                   |
+-----------------------------------------------------------------------+
| PROPOSED MILESTONES:                                                  |
| 1. [ ] Verify User Identity (KDP_01)                                  |
| 2. [ ] Classify Intent: Refund vs. Tech Support (KDP_02)              |
| 3. [ ] Check Knowledge Base for Policy (KDP_03)                       |
| 4. [ ] Synthesize Response with Empathy (KDP_04)                      |
+-----------------------------------------------------------------------+
| [ Cancel ]                                     [ PROMOTE TO PRODUCTION ]|
+-----------------------------------------------------------------------+
```

### 5.2 Production Drift Dashboard (`tw monitor`)
Real-time monitoring of logic stability across the agent fleet.

```text
+-----------------------------------------------------------------------+
| PRODUCTION LOGIC HEALTH                                               |
+-----------------------------------------------------------------------+
| AGENT NAME             | STABILITY | DRIFT | STATUS       | ACTION    |
|-----------------------|------------|-------|--------------|-----------|
| Research-Bot-01       | [|||||  ]  | +2%   | STABLE       | View      |
| Support-Bot-Alpha     | [||     ]  | -15%  | DRIFTING     | ANALYZE    |
| Legal-Review-Bot      | [|      ]  | -40%  | CRITICAL     | FIX NOW   |
+-----------------------------------------------------------------------+
| DETAIL: [Support-Bot-Alpha]                                           |
| Golden Path:  A -> B -> C -> D                                        |
| Actual Path:  A -> B -> X -> D  <-- Divergence at Step C               |
| Result: Correct (Silent Failure)                                      |
+-----------------------------------------------------------------------+
| [ Trigger Shadow APO ]                                [ View Traces ] |
+-----------------------------------------------------------------------+
```

### 5.3 Logic Porter Report (`tw port <source_model> <target_model>`)
Comparison and validation of reasoning IP translation between models.

```text
+-----------------------------------------------------------------------+
| LOGIC PORTER: GPT-4  --->  CLAUDE 3.5                                 |
+-----------------------------------------------------------------------+
| COGNITIVE PATH: [Verify] -> [Filter] -> [Synthesize]                   |
| COMPATIBILITY SCORE: 82% [Good]                                       |
+-----------------------------------------------------------------------+
| VERIFICATION BRIDGE:                                                 |
| Test Case | Source Path | Target Path | Result    | Note              |
|----------|-------------|-------------|-----------|-------------------|
| TC_01    | Adherent    | Adherent    | PASS      | Exact Match       |
| TC_02    | Adherent    | Divergent   | FAIL      | Missed Step 2      |
| TC_03    | Adherent    | Adherent    | PASS      | Logic Preserved    |
+-----------------------------------------------------------------------+
| [ Re-Optimize Prompt ]                        [ DEPLOY TO PRODUCTION ]|
+-----------------------------------------------------------------------+
```

## 6. v3.0 Self-Healing Orchestrator Wireframes

### 6.1 Healing Proposal Notification (The Trigger)
This is a compact alert card that appears in the Strategic Health Map or as a system notification.

```text
+-----------------------------------------------------------------------+
| [!] HEALING PROPOSAL PENDING                                          |
+-----------------------------------------------------------------------+
| Agent: Research-Bot-04                                                |
| Issue: Logic Drift: Milestone 3 (Compliance Check)                    |
| Confidence: [####################--] 94% Verified                     |
|                                                                       |
| [ REVIEW PROPOSAL ] <--- (Cyber Teal Pulsing)                         |
+-----------------------------------------------------------------------+
```

### 6.2 Healing Proposal Detail View (The Workspace)
The main interface for the Strategic Overseer to review and deploy a fix.

```text
+-----------------------------------------------------------------------+
| HP-1024: Healing Proposal for [Research-Bot-04]      [ STATUS: PENDING ] |
+-----------------------------------------------------------------------+
| TIMELINE: Detected (12m ago) -> Synthesized (8m ago) -> Verified (5m ago) |
+-----------------------------------------------------------------------+
| SECTION 1: THE DRIFT (Reasoning Path Divergence)                       |
|                                                                       |
| [ GOLDEN PATH ]                      [ DRIFTED PATH ]                  |
| 1. Init Request                      1. Init Request                   |
| 2. Parse Intent                      2. Parse Intent                   |
| 3. Compliance Check  <-- [SKEWED] --> 3. [ SKIP ]                      |
| 4. Execute Search                    4. Execute Search                 |
| 5. Synthesize Result                 5. Synthesize Result (FAIL)       |
|                                                                       |
| DIAGNOSIS: Agent bypassed the 'Compliance Check' milestone, leading to |
| a constraint violation in the final synthesis.                        |
+-----------------------------------------------------------------------+
| SECTION 2: THE FIX (Prompt Diff)                                      |
|                                                                       |
| [ CURRENT PROMPT SEGMENT ]           [ PROPOSED HEALED SEGMENT ]       |
| "After parsing intent, proceed       "After parsing intent, FIRST      |
| to search and synthesize the         verify the compliance token.      |
| result based on the query."          IF invalid, STOP and alert.       |
|                                      THEN proceed to search..." <--- [NEW] |
|                                                                       |
| RATIONALE: Added explicit verification gate to prevent milestone skip. |
+-----------------------------------------------------------------------+
| SECTION 3: THE PROOF (Shadow Verification)                             |
|                                                                       |
| TEST CASE       | BASELINE | HEALED | STATUS                          |
|-----------------|----------|--------|----------------------------------|
| TC-01: Standard | PASS     | PASS   | [OK]                            |
| TC-02: Edge Case| FAIL     | PASS   | [FIXED] <--- (+12% PAR Gain)     |
| TC-03: Constraint| PASS    | PASS   | [OK]                            |
|                                                                       |
| OVERALL STABILITY: [####################--] 94% Success Rate           |
+-----------------------------------------------------------------------+
|                                                                       |
| [ REJECT ]       [ MODIFY PROMPT ]       [ APPROVE & DEPLOY ] <--- (!!) |
+-----------------------------------------------------------------------+
```
