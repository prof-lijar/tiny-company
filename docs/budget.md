# Operating Budget: TraceWhisper (v2.2 & v2.3 Aligned)

## Overview
Tiny Company is operating as a bootstrapped AI startup. Our primary financial goal is to maintain a low-burn rate while scaling. We have transitioned from a centralized architecture to a **Local-First (SQLite)** model for v2.2, which significantly reduces infrastructure costs. 

As we move toward **v2.3 (The Intelligence Layer)**, we are shifting to a **Hybrid Architecture**: maintaining local-first for traces while introducing a centralized **Pattern Vault** for cross-project reasoning knowledge.

## Assumptions
- **Team:** All founders/contributors are working for equity; no salaries are paid.
- **Infrastructure:** Heavy reliance on serverless, static hosting, and local-first storage, with a targeted expansion into managed database services for v2.3.
- **Development:** Use of free-tier CI/CD and project management tools.

## Technical Infrastructure Costs

### 1. LLM API Consumption
This remains our primary variable cost. 

**v2.2 "Correction Suite" Impact:**
Iterative reasoning (Analysis $\rightarrow$ Fix $\rightarrow$ Validation) increases token consumption.

**v2.3 "Intelligence Layer" Impact:**
- **CRI (Continuous Reasoning Integration):** Increased API load due to `tw verify-all` in CI/CD pipelines.
- **Adversarial Synthesis:** High-reasoning model usage for red-teaming prompts.
- **Cognitive Pruning:** (Positive Impact) Reduction in long-term token spend by eliminating cognitive bloat.

**Estimated Spend by Phase:**
- **Dev/R&D Phase (Current):** ~$100 - $300/month.
- **Beta Phase (v2.2.2):** ~$300 - $600/month.
- **Scaling/v2.3 Phase:** ~$2,000 - $7,000/month. (Offset by Pro/Enterprise revenue).

### 2. Hosting & Compute
- **CLI Tool:** $0 (Distributed via PyPI/GitHub).
- **Documentation/Landing Page:** $0 (GitHub Pages / Vercel Free Tier).
- **Compute:** $0 (Offloaded to client machines).

### 3. Data Storage (The Hybrid Shift)
- **Core Logs:** $0 (Local SQLite).
- **v2.3 Pattern Vault:** ~$25 - $100/month. Transitioning from Supabase Free Tier to a paid tier to support embedding-based clustering and cross-project sharing.

## Estimated Monthly Costs (v2.2 $\rightarrow$ v2.3 Lifecycle)

| Item | Dev/R&D Phase (Est.) | Beta Phase (Est.) | v2.3 Scaling Phase (Est.) | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Domain Name** | $1.00 | $1.00 | $1.00 | Annual registration (~$12/year) |
| **Hosting** | $0.00 | $0.00 | $200 - $400 | Shift to paid tiers during scaling |
| **LLM APIs** | $100 - $300 | $300 - $600 | $2,000 - $7,000 | Includes CRI and Adversarial Synthesis |
| **Database (Vault)** | $0.00 | $0.00 | $50 - $200 | Transition to managed DB for Pattern Vault |
| **Other Tools** | $0.00 | $0.00 | $300 | Marketing/Acquisition tools |
| **Total** | **$101 - $301** | **$301 - $601** | **$2,551 - $7,901** | |

## Cost Management Strategy

### 1. "Local-First" Base
We keep the bulk of the data (traces) local. Only high-value "Patterns" are synced to the central Vault, minimizing database costs.

### 2. Tiered API Routing (v2.3 Optimized)
- **Analysis/Pruning:** GPT-4o-mini.
- **Fix-It/Adversarial Synthesis:** GPT-4o / Claude 3.5 Sonnet.
- **Verification:** Local execution.

### 3. Hard Spending Caps
- **Dev/R&D Cap:** $300/month.
- **Beta Sponsorship Cap:** $600/month.
- **v2.3 Scaling Cap:** Tied to 20% of Monthly Recurring Revenue (MRR).

## Financial Risks
- **Vault Scalability:** If the Pattern Vault grows exponentially, embedding costs and DB storage may spike.
- **CI/CD API Load:** `tw verify-all` could lead to massive API spikes if not rate-limited per project.
- **Mitigation:** Implement strict per-user and per-project quotas for CI/CD verification and adversarial synthesis.
