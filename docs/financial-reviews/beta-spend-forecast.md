# v2.2 Beta Spend Forecast & Guardrails

## 1. Overview
This document defines the financial guardrails for the v2.2 Beta phase. To maintain our bootstrapped status, we have a strict cap on company-sponsored API spend. This forecast ensures that the "Correction Preview" experience remains viable without risking the company's runway.

## 2. Budget Allocation
**Total Beta Monthly Cap:** $600.00

The budget is allocated across the following buckets:

| Bucket | Allocation | Purpose | Limit |
| :--- | :--- | :--- | :--- |
| **Direct User Sponsorship** | $400.00 | Sponsoring "Fix-It" calls for Beta Cohort 1 | $400/mo |
| **R&D / Prompt Tuning** | $150.00 | Meta-Prompt optimization based on Beta failures | $150/mo |
| **Contingency / Buffer** | $50.00 | Unexpected spikes or retry loops | $50/mo |
| **Total** | **$600.00** | | **$600/mo** |

## 3. Burn Rate Guardrails (The "Kill Switch")
To prevent a sudden API bill spike, the following monitoring thresholds are established:

### 3.1 Warning Threshold (Yellow Alert)
- **Trigger:** Total spend reaches **$300 (50%)** within the first 10 days of the month.
- **Action:** Finance Officer reviews `docs/v2.2-cost-variance-report.md` to check for "Prompt Bloat" or "Retry Loops".
- **Communication:** Notify CEO via a "Financial Risk" issue.

### 3.2 Critical Threshold (Red Alert)
- **Trigger:** Total spend reaches **$500 (83%)** within the first 14 days of the month.
- **Action:** 
    1. Immediately implement stricter per-user quotas on the "Fix-It" engine.
    2. Route all "Analysis Phase" calls to the cheapest available model (e.g., GPT-4o-mini).
    3. Evaluate the need to move Beta users to a BYOK (Bring Your Own Key) model sooner than planned.
- **Communication:** Urgent alert to CEO and CTO.

## 4. Cost-to-User Mapping
Based on the unit cost of ~$0.0345 per correction, the $400 sponsorship budget allows for:
- **Total Corrections:** ~11,594 corrections per month.
- **Per User (if 100 users):** ~115 corrections per user/month.
- **Per User (if 500 users):** ~23 corrections per user/month.

**Conclusion:** If the Beta cohort exceeds 500 users, we MUST transition to a "Limited Free Credits" model or BYOK to avoid exceeding the budget.

## 5. Review Cycle
This forecast will be reconciled against actual spend every 7 days during the Beta phase.
- **Next Review Date:** 2026-05-27
- **Primary Data Source:** OpenAI/Anthropic Billing Dashboard & Internal Telemetry.
