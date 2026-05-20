# v2 Metrics Tracking Plan: The 'Aha! Moment'

This document defines the specific event triggers and tracking requirements to measure the 'Aha! Moment' for Beta Cohort 1 users. 

## 1. Defining the 'Aha! Moment'

For TraceWhisper v2, the **'Aha! Moment'** is defined as:
> *The point at which a user discovers a critical insight through a synthesized narrative or trace comparison that would have required significant manual log auditing to find otherwise.*

We distinguish between **Technical Activation** (the tool works) and **Value Activation** (the 'Aha!' moment).

## 2. Event Trigger Mapping

To measure the journey from installation to the 'Aha! Moment', we will track the following events.

### 2.1 Activation Path (The First Mile)
These events track if the user is successfully using the tool.

| Event Name | Trigger Condition | Data to Capture | Goal |
| :--- | :--- | :--- | :--- |
| `sdk_initialized` | First successful execution of the SDK in a project. | `user_id`, `os`, `sdk_version` | Measure baseline adoption. |
| `mission_c_complete` | User successfully starts a stream with zero-config. | `time_since_init` | Measure "First Mile" friction. |
| `first_stream_started` | First time `tw live` is invoked. | `timestamp` | Measure Time-to-First-Narrative (TTFN). |
| `first_narrative_received` | First time a synthesized narrative is printed to the CLI. | `narrative_length`, `latency` | Technical activation. |

### 2.2 Value Path (The 'Aha!' Moment)
These events track when the user derives actual value from the synthesis.

| Event Name | Trigger Condition | Data to Capture | Goal |
| :--- | :--- | :--- | :--- |
| `compare_executed` | User runs `tw compare`. | `trace_count`, `duration` | Measure feature adoption. |
| `divergence_found` | `tw compare` identifies a semantic divergence. | `divergence_type` | Potential 'Aha!' trigger. |
| `user_feedback_positive` | User responds "Yes/Positive" to an in-app prompt: *"Did this help you find the error faster?"* | `feature_id` (`live` vs `compare`), `score` | **Confirmed 'Aha!' Moment.** |
| `manual_aha_report` | User submits a qualitative comment about a specific win. | `comment_text`, `context` | Qualitative validation. |

## 3. The 'Aha!' Conversion Funnel

We will measure the conversion rate through the following funnel:
`SDK Init` $\rightarrow$ `First Narrative` $\rightarrow$ `Divergence Found` $\rightarrow$ `Positive Feedback (Aha!)`

**Success Metric:** $\ge 70\%$ of Beta Cohort 1 users should reach the `user_feedback_positive` state within their first 7 days of use.

## 4. Coordination Requirements for CTO/Engineering

To implement this plan, the following telemetry hooks are required in the SDK:

1. **Event Emitter:** A lightweight `telemetry.log_event(event_name, properties)` method that sends data to the Beta Collector API.
2. **Specific Hooks:**
    - Call `sdk_initialized` in the main entry point.
    - Call `first_narrative_received` upon the first successful LLM synthesis return.
    - Call `divergence_found` when the comparison engine detects a difference.
3. **In-App Prompt Trigger:** 
    - Trigger a CLI prompt for `user_feedback_positive` after the first `divergence_found` event or after the 5th `first_narrative_received` event.
    - Example prompt: *"Quick check: Did this narrative save you from digging through raw logs? (y/n)"*

## 5. Analysis Plan

- **Cohort Analysis:** Compare 'Aha!' rates between users who followed the onboarding guide vs. those who didn't.
- **Latency Correlation:** Analyze if high P95 narrative latency correlates with a lower 'Aha!' rate (i.e., does slowness kill the magic?).
- **Feature Contribution:** Determine if `tw live` or `tw compare` is the primary driver of the 'Aha!' moment.
