# v2 Beta Feedback Loop & Monitoring Framework

This document establishes the systematic process for capturing user experience and validating product hypotheses for the TraceWhisper v2 Beta (Cohort 1).

## 1. Feedback Collection Mechanism

To capture both high-signal qualitative insights and low-friction quantitative data, we use a multi-channel approach.

### 1.1 Feedback Channels
| Channel | Purpose | Frequency | Owner |
| :--- | :--- | :--- | :--- |
| **CLI Contextual Prompts** | Immediate reaction to specific features (e.g., `tw compare`). | Event-triggered | Product/Eng |
| **Beta Discord Channel** | Real-time troubleshooting, "watercooler" feedback, and bug reports. | Continuous | Product/CTO |
| **Weekly Pulse Survey** | Structured sentiment tracking and friction identification. | Weekly (Friday) | Product |
| **End-of-Beta Exit Interview** | Deep dive into the "Aha!" moment and value proposition. | Once per user | Product |

### 1.2 Key Feedback Questions
**The "Aha!" Moment (Qualitative):**
- "Describe the exact moment you realized TraceWhisper v2 provided an insight that raw logs didn't."
- "On a scale of 1-5, how much did this reduce your frustration when debugging a loop?"

**The Friction Points (Activation):**
- "Where did you spend the most time during the initial setup?"
- "Was there any part of the 'Golden Path' (Install $\rightarrow$ Init $\rightarrow$ Live) that felt unintuitive?"

**Feature Value (Utility):**
- "Does the `tw compare` output accurately reflect the difference in agent behavior?"
- "What is the one feature missing that would make this a 'must-have' in your daily workflow?"

---

## 2. Monitoring Dashboard Specification

We will track specific telemetry events to measure the "Golden Path" and calculate the core KPIs defined in `docs/v2-beta-metrics.md`.

### 2.1 Telemetry Event Schema
Each event sent to the Beta Collector API should include: `user_id`, `timestamp`, `event_name`, and `metadata` (e.g., `latency_ms`, `error_code`).

| Event Name | Trigger Point | Metric Derived |
| :--- | :--- | :--- |
| `sdk_init_success` | `tracewhisper.init()` called successfully. | Activation Rate |
| `first_log_streamed` | First log entry written to local SQLite. | Integration Success |
| `cli_live_start` | User executes `tw live`. | Live Whisper Adoption |
| `first_narrative_rendered`| First narrative block appears in the CLI. | **TTFN (Time-to-First-Narrative)** |
| `cli_compare_start` | User executes `tw compare`. | Compare Utility Rate |
| `cli_compare_complete` | Comparison result is displayed to user. | Feature Completion |
| `system_error` | Any uncaught exception in SDK or CLI. | Crash-Free Session Rate |

### 2.2 Dashboard Views
- **The Activation Funnel:** A conversion chart showing: `Install` $\rightarrow$ `Init` $\rightarrow$ `First Log` $\rightarrow$ `First Narrative`.
- **TTFN Distribution:** A histogram of time elapsed between `sdk_init_success` and `first_narrative_rendered`.
- **Feature Heatmap:** Daily count of `cli_live_start` vs `cli_compare_start` per user.

---

## 3. Success Criteria Validation Checklist

This checklist is used during the Beta review to determine if the v2 Beta has met its goals for General Availability (GA).

### 3.1 Activation & Onboarding
- [ ] **Activation Rate:** $\ge 80\%$ of Cohort 1 reached the first narrative.
- [ ] **TTFN:** Median time from installation to first narrative is $< 5$ minutes.
- [ ] **Onboarding Friction:** No single step in the "Golden Path" has a drop-off rate $> 20\%$.

### 3.2 Engagement & Value
- [ ] **Live Whisper Adoption:** $\ge 60\%$ of users use `tw live` daily.
- [ ] **Compare Utility:** $\ge 40\%$ of users use `tw compare` at least 3x per week.
- [ ] **Perceived Value:** Average rating for "Frustration Reduction" is $\ge 4.0/5.0$.
- [ ] **Aha! Rate:** $\ge 70\%$ of users can describe a specific "Aha!" moment.

### 3.3 Technical Stability
- [ ] **Stability:** Crash-free session rate is $\ge 98\%$.
- [ ] **Latency:** P95 narrative latency is $< 2$ seconds.
- [ ] **Accuracy:** $\ge 90\%$ of `tw compare` results are marked as "Accurate" by users.

---
**Reference Docs:**
- `docs/v2-onboarding-flow.md`
- `docs/v2-beta-metrics.md`
