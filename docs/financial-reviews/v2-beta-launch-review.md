# v2 Beta Launch Financial Review
**Date:** 2026-05-20
**Status:** On Track
**Reviewer:** [Finance]

## 1. Actuals vs. Budget Analysis
We have compared the actual costs incurred during the initial rollout of the v2 Beta (Cohort 1) against the projections in `docs/v2-beta-budget.md`.

| Category | Budgeted (Monthly) | Actual (Est. Monthly) | Variance | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **LLM APIs (Sponsored)** | $250.00 | $210.00 | -$40.00 | Higher than expected BYOK (Bring Your Own Key) adoption. |
| **Domain/DNS** | $1.00 | $1.00 | $0.00 | Fixed cost. |
| **Hosting/Infra** | $0.00 | $0.00 | $0.00 | Vercel/GitHub Pages free tiers holding. |
| **Total** | **$251.00** | **$211.00** | **-$40.00** | **Under Budget** |

**Analysis:** The shift to **Local-First architecture** has successfully eliminated cloud database costs. The primary cost driver remains LLM APIs for sponsored users, but the "BYOK" trend is reducing our financial exposure.

## 2. Runway Assessment
- **Current Monthly Burn:** ~$211.00
- **Revenue Generation:** Initial "Managed API" sign-ups are pending, but Cohort 1 feedback indicates high willingness to pay for the "Managed" experience.
- **Runway Impact:** At the current burn rate, the company can operate for several years on minimal seed capital. The financial risk is extremely low.

## 3. Resource Optimization & Recommendations
- **Model Routing:** We have successfully routed 90% of traffic to `gpt-4o-mini`. We should continue to push for this ratio to keep costs linear.
- **API Proxying:** To prevent cost spikes, we recommend implementing a "hard cap" on the company proxy for sponsored users.
- **Monetization Trigger:** As soon as the Beta Cohort 1 reaches "Aha!" moment (as defined in `docs/v2-onboarding-flow.md`), we should trigger the "Managed API" payment gateway to move toward cash-flow neutrality.

## 4. Conclusion
The v2 Beta is financially lean. The transition from infrastructure-heavy to API-variable costs has worked in our favor. We are clear to proceed with the full Beta rollout.
