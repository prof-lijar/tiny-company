# TraceWhisper Wireframes

This document provides ASCII wireframes for the core user interfaces of TraceWhisper. These serve as the blueprint for implementation in the CLI and future GUI.

## 1. The Execution Report (Post-Mortem)
`tw analyze <trace_id>`

```text
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ TRACE REPORT: TW-99281                               [ STATUS: FAILED ❌ ] │
│ Duration: 42s | Tokens: 12.4k | Model: GPT-4o | User: dev_alpha          │
└──────────────────────────────────────────────────────────────────────────────────────┘

EXECUTIVE SUMMARY
The agent attempted to retrieve the Q3 revenue for "Acme Corp" but entered 
a recursive loop searching for a non-existent "Investor Relations" page 
on the corporate site. It failed to pivot to the SEC filings.

────────────────────────────────────────────────────────────────────────────────────────
THE WHISPER (Timeline)
────────────────────────────────────────────────────────────────────────────────────────

[00:02] 🎯 INITIAL GOAL
Narrative: Agent starts by identifying the target entity and required data.
Evidence: [Line 12: "Searching for Acme Corp Q3 Revenue"]

[00:15] 🔍 STRATEGY SHIFT
Narrative: After failing to find a direct PDF, the agent decides to browse 
the corporate website navigation.
Evidence: [Line 45: "Navigating to /about-us/investors"]

[00:30] ⚠️ DIVERGENCE POINT
Narrative: The agent encounters a 404 on the investors page. Instead of 
searching via Google for "Acme Corp SEC filings", it retries the same 
URL with different capitalization.
Evidence: [Line 88: "GET /About-Us/Investors"] -> 404

[00:42] 🛑 TERMINATION
Narrative: Max iterations reached. The agent failed to find the data.
Evidence: [Line 110: "Error: Max iterations exceeded"]

────────────────────────────────────────────────────────────────────────────────────────
FAILURE ANALYSIS
The failure occurred at [00:30]. The agent exhibited "tunnel vision" 
on the corporate domain. 

Suggested Fix: Update system prompt to include "If corporate investor 
pages are missing, immediately pivot to SEC EDGAR search."
────────────────────────────────────────────────────────────────────────────────────────
```

## 2. The Live Dashboard
`tw live`

```text
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ LIVE WHISPER: Monitoring Agent [Project-X]                      [ ACTIVE ]│
└──────────────────────────────────────────────────────────────────────────────────────┘

CURRENT NARRATIVE (The Signal)
────────────────────────────────────────────────────────────────────────────────────────
The agent is currently parsing the API documentation for "Stripe-v3". 
It has successfully identified the 'PaymentIntent' object and is now 
looking for the specific error codes related to 'card_declined'.
────────────────────────────────────────────────────────────────────────────────────────

RAW LOG STREAM (The Noise)
────────────────────────────────────────────────────────────────────────────────────────
14:22:01 [INFO] Calling tool: web_browser(url="https://stripe.com/docs/api")
14:22:03 [DEBUG] Received 200 OK. Page length: 45kb.
14:22:05 [INFO] Parsing content...
14:22:06 [DEBUG] Found match: "PaymentIntent"
14:22:08 [INFO] Searching for "card_declined"...
14:22:10 [DEBUG] Found match: "Error codes: card_declined, expired_card"
────────────────────────────────────────────────────────────────────────────────────────
[CTRL+P] Pause | [CTRL+C] Stop | [CTRL+S] Save Trace
```

## 3. Trace Comparison (A/B Test)
`tw compare <trace_a> <trace_b>`

```text
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ COMPARISON REPORT: Trace A (Baseline) vs Trace B (Prompt-Optimized)       │
└──────────────────────────────────────────────────────────────────────────────────────┘

METRICS
────────────────────────────────────────────────────────────────────────────────────────
Metric          | Trace A          | Trace B          | Delta
────────────────|------------------|------------------|------------------
Steps           | 45               | 12               | -73% 🚀
Tokens          | 22.1k            | 4.2k             | -81% 🚀
Outcome         | Failed ❌         | Success ✅       | IMPROVED
────────────────────────────────────────────────────────────────────────────────────────

DIVERGENCE POINT
The traces diverge at Step 4:

Trace A:
Narrative: The agent decides to browse the entire site map.
Evidence: [Line 12: "GET /sitemap.xml"]

Trace B:
Narrative: The agent uses the optimized prompt to search SEC filings directly.
Evidence: [Line 12: "GET sec.gov/search?q=AcmeCorp"]

CONCLUSION: Trace B is significantly more efficient and successful.
```
