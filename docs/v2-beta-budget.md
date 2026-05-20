# v2.2 Beta Operating Budget: The Reasoning IDE

## 1. Architectural Cost Analysis: Local-First vs. Centralized
The transition to a **Local-First architecture (SQLite)** fundamentally shifts our cost profile from infrastructure-heavy to API-heavy. For v2.2, this is critical as the "Correction Suite" (Fix-It) relies on iterative LLM calls.

| Component | Previous Model (Centralized) | v2.2 Model (Local-First) | Financial Impact |
| :--- | :--- | :--- | :--- |
| **Database** | Cloud DB (e.g., Supabase/MongoDB) | Local SQLite | **Reduction:** Near-zero cloud storage costs for core logs. |
| **Data Transfer** | High (Logs streamed to server) | Low (Only narratives/metadata) | **Reduction:** Lower bandwidth costs and lower latency. |
| **Compute** | Server-side processing | Client-side processing | **Reduction:** Offloads compute to user's machine. |
| **API Usage** | Batch processing (Periodic) | Live Correction Loops | **Increase:** Higher frequency of LLM calls for iterative "Fix-Its". |

**Summary:** We have traded "Fixed Infrastructure Costs" for "Variable API Costs." This keeps the burn rate proportional to actual usage and allows us to scale the Beta without increasing fixed overhead.

---

## 2. Estimated Beta Monthly Burn
We are currently in the **Initial Activation Phase (Cohort 1)**. The budget is designed to support a gradual ramp-up of beta testers.

### Assumptions
- **User API Keys:** ~70% of Beta users are expected to provide their own API keys (BYOK).
- **Company Sponsored:** ~30% of Beta users (Strategic Partners/Power Users) are provided API access via a company proxy to remove friction and gather high-quality telemetry.
- **Usage:** Average of 50 "Corrections" per sponsored user per month.
- **Unit Cost:** ~$0.0345 per correction (based on `docs/v2.2-cost-per-correction.md`).
- **Model Mix:** Tiered routing (GPT-4o-mini for analysis, GPT-4o/Claude 3.5 for the final fix).

### Monthly Cost Breakdown (Expected Beta Phase)
| Item | Calculation | Estimated Cost | Notes |
| :--- | :--- | :--- | :--- |
| **LLM APIs (Sponsored)** | 100 users * 50 corrections * $0.0345 | $172.50 | Variable based on actual volume |
| **Domain/DNS** | Annual fee / 12 | $1.00 | Fixed cost (~$12/year) |
| **Hosting (Docs/Landing)** | Vercel/GitHub Pages Free Tier | $0.00 | Free |
| **Beta Management Tools** | GitHub Issues / Discord | $0.00 | Free |
| **Total Monthly Burn** | | **$173.50** | **Target range: $150 - $600** |

---

## 3. Cost per Beta User
To understand the viability of the "Managed API" revenue stream in the Pro tier, we track the cost per user.

- **Infrastructure Cost per User:** ~$0.00 (due to Local-First).
- **API Cost per User (Sponsorship):** ~$1.73 / month (at 50 corrections).
- **Total Cost per User:** **~$1.73 / month**.

*Note: For users providing their own keys, the cost to the company is $0.*

---

## 4. Scaling Thresholds & Triggers
We will monitor the following thresholds to trigger budget adjustments or monetization acceleration:

| Metric | Threshold | Action |
| :--- | :--- | :--- |
| **Sponsored User Count** | > 300 users | Implement strict API quotas or shift to BYOK exclusively. |
| **Monthly API Spend** | > $600 / month | Accelerate launch of "Managed API" (Pro Tier) to generate offsetting revenue. |
| **Cloud Storage (Metadata)** | > 5GB (Free Tier limit) | Evaluate Supabase paid tier ($25/mo) or optimize metadata pruning. |
| **MAU (Monthly Active Users)** | > 500 users | Trigger a review of the conversion funnel to Pro/Enterprise tiers. |

---

## 5. Alignment with Revenue Model
This budget provides the financial runway for the v2.2 Beta to validate the "Correction Suite" value proposition before full commercial launch.
- The low burn rate (~$200 - $600/mo) ensures we can sustain the Beta phase without external funding.
- The "Cost per User" of ~$1.73 confirms that the proposed Pro pricing ($39/mo) provides a massive contribution margin (~95%), validating the pricing strategy in `docs/v2.2-revenue-projection.md`.
