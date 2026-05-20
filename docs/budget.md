# Operating Budget: TraceWhisper (v2.2 Aligned)

## Overview
Tiny Company is operating as a bootstrapped AI startup. Our primary financial goal is to maintain a low-burn rate while scaling v2. We have transitioned from a centralized architecture to a **Local-First (SQLite)** model, which significantly reduces infrastructure costs but increases variable API consumption for real-time synthesis and the new v2.2 "Correction Suite."

## Assumptions
- **Team:** All founders/contributors are working for equity; no salaries are paid.
- **Infrastructure:** Heavy reliance on serverless, static hosting, and local-first storage.
- **Development:** Use of free-tier CI/CD and project management tools.
- **Scaling:** Costs are tiered based on the development phase (Dev $\\rightarrow$ Beta $\\rightarrow$ Scaling).

## Technical Infrastructure Costs

### 1. LLM API Consumption (The "Whisper" & "Correction" Engines)
This is our primary variable cost. We use a tiered routing strategy to optimize spend.

**v2.2 "Correction Suite" Impact:**
The introduction of the "Fix-It" button and "CI/CD Guardrails" increases token consumption per user event, as these features require iterative reasoning (analyzing a trace $\\rightarrow$ proposing a fix $\\rightarrow$ validating the fix).

**Estimated Spend by Phase:**
- **Dev/R&D Phase (Current):** ~$100 - $300/month. (Increased from v2.1 to account for v2.2 Meta-Prompt tuning and iterative reasoning tests).
- **Beta Phase:** ~$300 - $600/month. (Sponsoring a subset of beta users for the Correction Suite).
- **Scaling Phase:** ~$1,500 - $5,000/month. (Offset by Pro and Enterprise subscription revenue).

### 2. Hosting & Compute
- **CLI Tool:** $0 (Distributed via PyPI/GitHub).
- **Documentation/Landing Page:** $0 (GitHub Pages / Vercel Free Tier).
- **Compute:** $0 (Offloaded to client machines via Local-First architecture).

### 3. Data Storage
- **Core Logs:** $0 (Local SQLite).
- **Metadata/Demo:** $0 (Supabase Free Tier).

## Estimated Monthly Costs (v2.2 Lifecycle)

| Item | Dev/R&D Phase (Est.) | Beta Phase (Est.) | Scaling Phase (Est.) | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Domain Name** | $1.00 | $1.00 | $1.00 | Annual registration (~$12/year) |
| **Hosting** | $0.00 | $0.00 | $200 - $400 | Shift to paid tiers during scaling |
| **LLM APIs** | $100 - $300 | $300 - $600 | $1,500 - $5,000 | Variable; includes v2.2 Correction costs |
| **Database** | $0.00 | $0.00 | $50 - $100 | Paid tiers for cloud sync/metadata |
| **Other Tools** | $0.00 | $0.00 | $300 | Marketing/Acquisition tools |
| **Total** | **$101 - $301** | **$301 - $601** | **$2,051 - $5,801** | |

## Cost Management Strategy

### 1. "Local-First" Cost Avoidance
By utilizing SQLite and client-side processing, we have eliminated the need for expensive managed database clusters and backend compute for the core product.

### 2. Tiered API Routing (v2.2 Optimized)
To prevent "API blow-up" during Correction loops:
- **Analysis Phase:** Uses GPT-4o-mini to identify the error pattern.
- **Suggestion Phase:** Uses GPT-4o/Claude 3.5 Sonnet only for the final "Fix-It" prompt generation.
- **Validation Phase:** Uses local-first execution to avoid cloud costs.

### 3. Hard Spending Caps
- **Dev/R&D Cap:** A hard limit of **$300/month** is set on development API keys.
- **Beta Sponsorship Cap:** Total company-sponsored API spend for Beta is capped at **$600/month**.

## Financial Risks
- **Complexity of v2.2 Reasoning:** If the "Fix-It" logic requires more iterations than expected, API costs will spike.
- **Mitigation:** Implement strict per-user quotas for "Fix-It" requests in the Beta phase.
- **API Pricing Volatility:** Changes in token pricing for flagship models.
- **Mitigation:** Maintain model-agnostic routing to switch between OpenAI and Anthropic based on cost/performance.
