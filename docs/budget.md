# Operating Budget: TraceWhisper (v2 Aligned)

## Overview
Tiny Company is operating as a bootstrapped AI startup. Our primary financial goal is to maintain a low-burn rate while scaling v2. We have transitioned from a centralized architecture to a **Local-First (SQLite)** model, which significantly reduces infrastructure costs but increases variable API consumption for real-time synthesis.

## Assumptions
- **Team:** All founders/contributors are working for equity; no salaries are paid.
- **Infrastructure:** Heavy reliance on serverless, static hosting, and local-first storage.
- **Development:** Use of free-tier CI/CD and project management tools.
- **Scaling:** Costs are tiered based on the development phase (Dev $\rightarrow$ Beta $\rightarrow$ Scaling).

## Technical Infrastructure Costs

### 1. LLM API Consumption (The "Whisper" Engine)
This is our primary variable cost. We use a tiered routing strategy to optimize spend.
- **Tier 1 (Filtering):** GPT-4o-mini / Claude Haiku (Low cost, high volume).
- **Tier 2 (Synthesis):** GPT-4o / Claude 3.5 Sonnet (Higher cost, low volume).

**Estimated Spend by Phase:**
- **Dev Phase (Current):** ~$60 - $100/month (Testing Live Whisper logic).
- **Beta Phase:** ~$250/month (Sponsoring a subset of beta users).
- **Scaling Phase:** ~$800 - $2,500/month (Offset by Pro/Enterprise revenue).

### 2. Hosting & Compute
- **CLI Tool:** $0 (Distributed via PyPI/GitHub).
- **Documentation/Landing Page:** $0 (GitHub Pages / Vercel Free Tier).
- **Compute:** $0 (Offloaded to client machines via Local-First architecture).

### 3. Data Storage
- **Core Logs:** $0 (Local SQLite).
- **Metadata/Demo:** $0 (Supabase Free Tier).

## Estimated Monthly Costs (v2 Lifecycle)

| Item | Dev Phase (Est.) | Beta Phase (Est.) | Scaling Phase (Est.) | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Domain Name** | $1.00 | $1.00 | $1.00 | Annual registration (~$12/year) |
| **Hosting** | $0.00 | $0.00 | $200 - $400 | Shift to paid tiers during scaling |
| **LLM APIs** | $60 - $100 | $250.00 | $800 - $2,500 | Variable based on usage/sponsorship |
| **Database** | $0.00 | $0.00 | $50 - $100 | Paid tiers for cloud sync/metadata |
| **Other Tools** | $0.00 | $0.00 | $300 | Marketing/Acquisition tools |
| **Total** | **$61 - $101** | **$251.00** | **$1,351 - $3,301** | |

## Cost Management Strategy

### 1. "Local-First" Cost Avoidance
By utilizing SQLite and client-side processing, we have eliminated the need for expensive managed database clusters and backend compute for the core product.

### 2. Tiered API Routing
To prevent "API blow-up" during Live Whisper streaming:
- All streams are filtered by a "Noise Filter" (Mini model).
- Flagship models are only invoked for "Key Decision Points" (KDPs).

### 3. Hard Spending Caps
- **Dev/Beta Cap:** A hard limit of **$100/month** is set on development API keys.
- **Beta Sponsorship Cap:** Total company-sponsored API spend for Beta is capped at **$250/month**.

## Financial Risks
- **Rapid Beta Adoption:** If sponsored users exceed 200, API costs will spike.
- **Mitigation:** Transition to "Bring Your Own Key" (BYOK) exclusively if the $250 cap is breached.
- **API Pricing Volatility:** Changes in token pricing for flagship models.
- **Mitigation:** Maintain model-agnostic routing to switch between OpenAI and Anthropic based on cost/performance.
