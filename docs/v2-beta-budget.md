# v2 Beta Operating Budget

## 1. Architectural Cost Analysis: Local-First vs. Centralized
The transition to a **Local-First architecture (SQLite)** fundamentally shifts our cost profile from infrastructure-heavy to API-heavy.

| Component | Previous Model (Centralized) | v2 Model (Local-First) | Financial Impact |
| :--- | :--- | :--- | :--- |
| **Database** | Cloud DB (e.g., Supabase/MongoDB) | Local SQLite | **Reduction:** Near-zero cloud storage costs for core logs. |
| **Data Transfer** | High (Logs streamed to server) | Low (Only narratives/metadata) | **Reduction:** Lower bandwidth costs and lower latency. |
| **Compute** | Server-side processing | Client-side processing | **Reduction:** Offloads compute to user's machine. |
| **API Usage** | Batch processing (Periodic) | Live Whisper (Streaming/Real-time) | **Increase:** Higher frequency of LLM calls for real-time synthesis. |

**Summary:** We have traded "Fixed Infrastructure Costs" for "Variable API Costs." This is ideal for a bootstrapped startup as it keeps the burn rate proportional to actual usage.

---

## 2. Estimated Beta Monthly Burn
We assume a Beta period of 3-6 months with a target of ~1,000 beta testers. 

### Assumptions
- **User API Keys:** 80% of Beta users provide their own API keys.
- **Company Sponsored:** 20% of Beta users (strategic partners/power users) are provided API access via a company proxy.
- **Usage:** Average of 10 narrative reports per sponsored user per month.
- **Model Mix:** 90% GPT-4o-mini (Filtering/Chunking), 10% GPT-4o (Final Synthesis).

### Monthly Cost Breakdown
| Item | Calculation | Estimated Cost | Notes |
| :--- | :--- | :--- | :--- |
| **LLM APIs (Sponsored)** | 200 users * 10 reports * avg. cost | $250.00 | Estimated $1.25 per user/mo |
| **Domain/DNS** | Annual fee / 12 | $1.00 | Fixed cost |
| **Hosting (Docs/Landing)** | Vercel/GitHub Pages Free Tier | $0.00 | Free |
| **Beta Management Tools** | GitHub Issues / Discord | $0.00 | Free |
| **Total Monthly Burn** | | **$251.00** | |

---

## 3. Cost per Beta User
To understand the viability of the "Managed API" revenue stream, we track the cost per user.

- **Infrastructure Cost per User:** ~$0.00 (due to Local-First).
- **API Cost per User (Sponsorship):** ~$1.25 / month.
- **Total Cost per User:** **~$1.25 / month**.

*Note: This is the cost to the company. For users providing their own keys, the cost to the company is $0.*

---

## 4. Scaling Thresholds & Triggers
We will monitor the following thresholds to trigger budget adjustments or monetization acceleration:

| Metric | Threshold | Action |
| :--- | :--- | :--- |
| **Sponsored User Count** | > 500 users | Implement strict API quotas or move to "Bring Your Own Key" (BYOK) exclusively. |
| **Monthly API Spend** | > $500 / month | Accelerate launch of "Managed API" (Strategy B) to generate offsetting revenue. |
| **Cloud Storage (Metadata)** | > 5GB (Free Tier limit) | Evaluate Supabase paid tier ($25/mo) or optimize metadata pruning. |
| **MAU (Monthly Active Users)** | > 2,000 users | Trigger a review of the Pro Dashboard (SaaS) timeline to capture value. |

---

## 5. Alignment with Revenue Model
This budget supports the **Conservative Growth Model** in `docs/revenue-growth-model.md`:
- The low burn rate ($250/mo) allows us to remain in the "v2 Beta / Bridge" phase (Months 4-6) without requiring external funding.
- The "Cost per User" of $1.25 confirms that the proposed "Managed API" pricing ($20 for 100 reports) provides a healthy margin, as 100 reports would cost the company approximately $12.50 in API fees, leaving a ~37% gross margin.
