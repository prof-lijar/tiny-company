# v2 Beta Success Metrics & KPI Tracking Dashboard

This document defines the quantitative and qualitative metrics used to evaluate the success of the TraceWhisper v2 Beta. These metrics are designed to validate the core hypotheses outlined in the `docs/v2-beta-test-plan.md`.

## 1. Core Success KPIs

We categorize our success metrics into four dimensions: Activation, Engagement, Technical Performance, and Perceived Value.

### 1.1 Activation (The "First Mile")
*Goal: Ensure the SDK is frictionless and the "Aha!" moment is reached quickly.*

| KPI | Definition | Target | Why it Matters |
| :--- | :--- | :--- | :--- |
| **Activation Rate** | % of invited beta users who successfully complete "Mission C" (Zero-Config Start). | $\ge 80\%$ | Validates the "JSON Tax" removal and SDK simplicity. |
| **Time-to-First-Narrative (TTFN)** | Median time from SDK installation to the first successful Live Whisper stream. | $< 5$ minutes | Measures the reality of the "zero-config" promise. |
| **Onboarding Completion** | % of users who complete the onboarding sequence without requesting support. | $\ge 70\%$ | Indicates the quality of the documentation and SDK UX. |

### 1.2 Engagement (Feature Adoption)
*Goal: Confirm that the new v2 features are actually being used to solve problems.*

| KPI | Definition | Target | Why it Matters |
| :--- | :--- | :--- | :--- |
| **Live Whisper Adoption** | % of active users who invoke `tw live` at least once per day. | $\ge 60\%$ | Validates the value of real-time narratives over static logs. |
| **Compare Utility Rate** | % of users who use `tw compare` at least 3 times per week. | $\ge 40\%$ | Validates the value of divergence detection for prompt engineering. |
| **Session Depth** | Average number of traces analyzed per user session. | $\ge 5$ | Indicates whether the tool is integrated into the daily dev loop. |

### 1.3 Technical Performance (Stability)
*Goal: Ensure the local-first architecture is performant and reliable.*

| KPI | Definition | Target | Why it Matters |
| :--- | :--- | :--- | :--- |
| **P95 Narrative Latency** | Time from log-write to narrative-update in the Live Whisper stream. | $< 2$ seconds | High latency breaks the "real-time" feeling of Live Whisper. |
| **Crash-Free Session Rate** | % of sessions that do not encounter a critical SQLite or LLM synthesis error. | $\ge 98\%$ | Stability is a prerequisite for trust in a developer tool. |
| **SQLite Query Perf** | Median time to retrieve a trace comparison for 100+ step runs. | $< 500\text{ms}$ | Ensures the tool remains snappy as traces grow in size. |

### 1.4 Perceived Value (The "North Star")
*Goal: Quantify the reduction in developer frustration.*

| KPI | Definition | Target | Why it Matters |
| :--- | :--- | :--- | :--- |
| **Perceived Value Score** | Average 1-5 rating on "How much did this reduce your frustration?" | $\ge 4.0$ | The ultimate measure of product-market fit for v2. |
| **Divergence Accuracy** | % of `tw compare` results marked as "Accurate" by the user. | $\ge 90\%$ | Confirms the synthesis engine is providing truth, not hallucinations. |
| **The "Aha!" Rate** | % of users who can articulate a specific moment where TW provided value raw logs couldn't. | $\ge 70\%$ | Qualitative proof of the "Semantic Gap" being closed. |

---

## 2. KPI Tracking Dashboard Specification

Since this is a Beta, we will implement a "Lean Dashboard" combining automated telemetry and manual feedback collection.

### View 1: The Health Cockpit (Executive Summary)
*   **Visuals:** Three large "Gauge" charts.
*   **Metrics:** Activation Rate, Crash-Free Rate, Average Perceived Value.
*   **Purpose:** Immediate "Go/No-Go" signal for the GA release.

### View 2: Feature Adoption Heatmap (Usage)
*   **Visuals:** Stacked bar chart (Daily).
*   **Metrics:** Count of `tw live` calls vs. `tw compare` calls.
*   **Purpose:** Identify which feature is the primary driver of value.

### View 3: Performance Trend (Stability)
*   **Visuals:** Line chart (Time-series).
*   **Metrics:** P95 Latency and Error Count.
*   **Purpose:** Monitor regressions as the CTO integrates v2 components.

### View 4: The Voice of the Beta (Qualitative)
*   **Visuals:** Categorized list/table.
*   **Metrics:** "Aha!" moments, Friction points, and Feature requests.
*   **Purpose:** Direct input for the final polish before GA.

## 3. Data Collection Mechanism

1.  **Telemetry (Automated):** The SDK will optionally send anonymized usage heartbeats (Feature ID, Timestamp, Latency, Error Code) to a central Beta Collector API.
2.  **In-App Prompts (Triggered):** After a user completes a "Mission" (e.g., uses `tw compare` for the first time), a CLI prompt will ask: *"Did this help you find the error faster? (1-5)"*.
3.  **Exit Survey (Manual):** A comprehensive survey sent via email at the end of the Beta period to capture the "Aha!" moments and overall satisfaction.
