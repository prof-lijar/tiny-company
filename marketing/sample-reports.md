# TraceWhisper Sample Reports: "Before vs. After"

This document provides concrete examples of how TraceWhisper transforms raw agent logs (The Noise) into narrative reports (The Signal). These examples should be used for landing page visuals, social media posts, and investor decks.

---

## Example 1: The Infinite Loop (The "Stuck" Agent)
**Scenario:** An agent is tasked with finding a specific value in a database, but the query fails. The agent enters a loop, retrying the same failing query with slightly different but ultimately incorrect parameters.

### 🔴 THE NOISE (Raw Log Extract)
```json
[
  {"timestamp": "10:00:01", "level": "INFO", "event": "thought", "content": "I need to find the user's subscription status. I will use the `db_query` tool."},
  {"timestamp": "10:00:02", "level": "INFO", "event": "tool_call", "tool": "db_query", "args": {"query": "SELECT status FROM users WHERE id='u123'"}},
  {"timestamp": "10:00:03", "level": "ERROR", "event": "tool_output", "content": "Error: Column 'status' does not exist in table 'users'."},
  {"timestamp": "10:00:04", "level": "INFO", "event": "thought", "content": "The column 'status' is missing. Maybe it is called 'subscription_status'. Retrying..."},
  {"timestamp": "10:00:05", "level": "INFO", "event": "tool_call", "tool": "db_query", "args": {"query": "SELECT subscription_status FROM users WHERE id='u123'"}},
  {"timestamp": "10:00:06", "level": "ERROR", "event": "tool_output", "content": "Error: Column 'subscription_status' does not exist in table 'users'."},
  {"timestamp": "10:00:07", "level": "INFO", "event": "thought", "content": "Still no luck. Perhaps the column is just 'sub'. Retrying..."},
  {"timestamp": "10:00:08", "level": "INFO", "event": "tool_call", "tool": "db_query", "args": {"query": "SELECT sub FROM users WHERE id='u123'"}},
  {"timestamp": "10:00:09", "level": "ERROR", "event": "tool_output", "content": "Error: Column 'sub' does not exist in table 'users'."},
  {"timestamp": "10:00:10", "level": "INFO", "event": "thought", "content": "I will try one more variation: 'user_status'. Retrying..."},
  {"timestamp": "10:00:11", "level": "INFO", "event": "tool_call", "tool": "db_query", "args": {"query": "SELECT user_status FROM users WHERE id='u123'"}},
  {"timestamp": "10:00:12", "level": "ERROR", "event": "tool_output", "content": "Error: Column 'user_status' does not exist in table 'users'."}
]
```

### 🟢 THE SIGNAL (TraceWhisper Execution Report)
**Executive Summary:** ❌ **FAILED**
**Duration:** 11 seconds | **Steps:** 12

**The Journey:**
The agent attempted to retrieve a user's subscription status from the database. However, it encountered a persistent schema error. Instead of inspecting the table schema, the agent entered a **guess-and-check loop**, attempting four different column name variations (`status`, `subscription_status`, `sub`, `user_status`), all of which failed.

**Failure Analysis:**
The agent failed because it lacked the "self-awareness" to call a `describe_table` tool when the first query failed. It prioritized guessing over discovery.

**Developer Insight:** 💡 *Add a system instruction: "If a database query fails due to a missing column, always call `describe_table` before retrying."*

---

## Example 2: The Successful Pivot (The "Smart" Agent)
**Scenario:** An agent tries to fetch a webpage via an API, but the API is down. The agent recognizes the failure and switches to a secondary search method to find the information.

### 🔴 THE NOISE (Raw Log Extract)
```json
[
  {"timestamp": "11:00:01", "level": "INFO", "event": "thought", "content": "I will fetch the latest pricing from the company website using the `web_api` tool."},
  {"timestamp": "11:00:02", "level": "INFO", "event": "tool_call", "tool": "web_api", "args": {"url": "https://example.com/pricing"}},
  {"timestamp": "11:00:03", "level": "ERROR", "event": "tool_output", "content": "503 Service Unavailable"},
  {"timestamp": "11:00:04", "level": "INFO", "event": "thought", "content": "The primary API is down. I cannot access the site directly. I will try to find a cached version or a third-party mention using `google_search`."},
  {"timestamp": "11:00:05", "level": "INFO", "event": "tool_call", "tool": "google_search", "args": {"query": "example.com pricing 2026"}},
  {"timestamp": "11:00:06", "level": "INFO", "event": "tool_output", "content": "Result 1: 'Example Corp Pricing' found on CachePage.io... Price: $99/mo"},
  {"timestamp": "11:00:07", "level": "INFO", "event": "thought", "content": "I have found the pricing via a cached source. I can now answer the user's request."}
]
```

### 🟢 THE SIGNAL (TraceWhisper Execution Report)
**Executive Summary:** ✅ **SUCCESS**
**Duration:** 6 seconds | **Steps:** 7

**The Journey:**
The agent initially attempted to retrieve pricing data via the `web_api` tool, which returned a `503 Service Unavailable` error. Recognizing the outage, the agent **strategically pivoted** to a `google_search` to find cached information. This secondary approach was successful, allowing the agent to retrieve the required data ($99/mo).

**Key Decision Point:**
At 11:00:04, the agent correctly identified that the API failure was a system outage rather than a request error, triggering the shift to an alternative data source.

**Developer Insight:** 💡 *The agent's fallback logic is working as intended. No prompt changes needed.*

---

## Example 3: The Logic Hallucination (The "Confident" Agent)
**Scenario:** An agent is asked to summarize a document. It reads the document, but fails to find the specific answer. Instead of admitting it, it "hallucinates" a plausible-sounding answer based on general knowledge.

### 🔴 THE NOISE (Raw Log Extract)
```json
[
  {"timestamp": "12:00:01", "level": "INFO", "event": "thought", "content": "I will read the provided PDF to find the company's Q3 revenue."},
  {"timestamp": "12:00:02", "level": "INFO", "event": "tool_call", "tool": "read_pdf", "args": {"file": "q3_report.pdf"}},
  {"timestamp": "12:00:03", "level": "INFO", "event": "tool_output", "content": "...[5 pages of text without mentioning revenue]..."},
  {"timestamp": "12:00:04", "level": "INFO", "event": "thought", "content": "The document doesn't explicitly state the revenue, but based on the growth trends mentioned in page 2, I can infer the revenue is approximately $5M."},
  {"timestamp": "12:00:05", "level": "INFO", "event": "final_answer", "content": "The company's Q3 revenue was approximately $5 million."}
]
```

### 🟢 THE SIGNAL (TraceWhisper Execution Report)
**Executive Summary:** ⚠️ **HALLUCINATION DETECTED**
**Duration:** 4 seconds | **Steps:** 5

**The Journey:**
The agent read the `q3_report.pdf` to find the Q3 revenue. The tool output confirms that the revenue figure was **absent** from the text. Despite this, the agent proceeded to "infer" a value of $5M based on unrelated growth trends, presenting this as a factual answer.

**Failure Analysis:**
The agent failed to adhere to the "grounding" requirement. It filled a data gap with a hallucination rather than reporting that the information was missing.

**Developer Insight:** 💡 *Critical: Strengthen the system prompt to forbid inference. Add: "If the answer is not explicitly stated in the source text, you MUST state that the information is unavailable."*
