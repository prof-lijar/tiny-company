# Operating Budget: TraceWhisper (v2.4 Enterprise Scale-Up Aligned)

## Overview
Tiny Company is operating as a bootstrapped AI startup. Our primary financial goal is to maintain a low-burn rate while scaling. We have transitioned from a centralized architecture to a **Local-First (SQLite)** model for v2.2 and a **Hybrid Architecture** for v2.3.

With **v2.4 (Enterprise Scale-Up)**, we are shifting from a productivity tool to an **Enterprise Reasoning Governance Platform**. This requires a strategic increase in infrastructure investment to support multi-tenancy, organizational isolation, and autonomous optimization (APO).

## Assumptions
- **Team:** All founders/contributors are working for equity; no salaries are paid.
- **Infrastructure:** Heavy reliance on serverless and local-first storage, with a managed expansion into Enterprise-grade database and identity services for v2.4.
- **Development:** Use of free-tier CI/CD and project management tools, with targeted budget for SOC2 compliance audits.

## Technical Infrastructure Costs

### 1. LLM API Consumption
This remains our primary variable cost. 

**v2.3 "Intelligence Layer" Impact:**
- **CRI (Continuous Reasoning Integration):** Increased API load due to `tw verify-all` in CI/CD.
- **Adversarial Synthesis:** High-reasoning model usage for red-teaming.

**v2.4 "Enterprise Scale-Up" Impact:**
- **Autonomous Prompt Optimization (APO):** The most compute-intensive feature. APO runs massive loops of "Generate $\rightarrow$ Test $\rightarrow$ Select" to optimize prompts.
- **Mitigation:** APO costs are offset by usage-based fees in the Enterprise Organization tier.

**Estimated Spend by Phase:**
- **Dev/R&D Phase:** ~$100 - $300/month.
- **Beta Phase (v2.2.2/v2.3):** ~$300 - $7,000/month (Scaling with MAU).
- **v2.4 Enterprise Phase:** Variable, scaled to 15-20% of MRR, with specific APO credits.

### 2. Hosting & Compute
- **CLI Tool:** $0 (Distributed via PyPI/GitHub).
- **Documentation/Landing Page:** $0 (GitHub Pages / Vercel Free Tier).
- **Compute:** $0 (Offloaded to client machines), with small overhead for APO orchestrators.

### 3. Data Storage & Governance
- **Core Logs:** $0 (Local SQLite).
- **v2.3 Pattern Vault:** ~$25 - $100/month (Managed Vector DB).
- **v2.4 Enterprise Infrastructure:**
    - **Multi-tenancy:** Shift to schema-per-tenant or DB-per-tenant for isolation. 
        - *Implementation:* ~$100 - $300/month.
        - *Scale-Up:* ~$500 - $1,500/month.
    - **Audit Logging:** Immutable storage for compliance.
        - *Implementation:* ~$50 - $100/month.
        - *Scale-Up:* ~$200 - $500/month.
    - **IdP Integration:** SAML/OIDC managed services.
        - *Implementation:* ~$0 - $50/month.
        - *Scale-Up:* ~$100 - $300/month.

## Estimated Monthly Costs (Lifecycle)

| Item | Dev/R&D (Est.) | v2.3 Scaling (Est.) | v2.4 Implementation (Est.) | v2.4 Scale-Up (Est.) | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Domain Name** | $1.00 | $1.00 | $1.00 | $1.00 | Annual registration (~$12/year) |
| **Hosting/Compute** | $0.00 | $200 - $400 | $200 - $500 | $400 - $1,000 | Multi-tenant orchestrators |
| **LLM APIs** | $100 - $300 | $2,000 - $7,000 | Variable | Variable | Includes APO & CRI |
| **Database (Vault/Iso)** | $0.00 | $50 - $200 | $100 - $300 | $500 - $1,500 | Shift to isolated DBs |
| **Compliance/Audit** | $0.00 | $0.00 | $50 - $100 | $200 - $500 | Immutable audit logs |
| **Other Tools** | $0.00 | $300 | $300 | $500 | Marketing/SOC2 tools |
| **Total (Fixed/Base)** | **$101 - $301** | **$2,551 - $7,901** | **$651 - $1,201 + APIs** | **$1,601 - $3,501 + APIs** | |

## Cost Management Strategy

### 1. "Local-First" Base
We keep the bulk of the data (traces) local. Only high-value "Patterns" and "Governance Policies" are synced to the central Vault, minimizing database costs.

### 2. Tiered API Routing
- **Analysis/Pruning:** GPT-4o-mini.
- **Fix-It/APO/Adversarial:** GPT-4o / Claude 3.5 Sonnet.
- **Verification:** Local execution.

### 3. Value-Based Cost Offset (v2.4)
Unlike previous versions, v2.4 includes **Usage Fees** for APO and **Base Fees** for Organization tiers. This ensures that our most expensive compute features are directly subsidized by the customers using them.

### 4. Hard Spending Caps
- **Dev/R&D Cap:** $300/month.
- **v2.4 Scaling Cap:** Total OpEx capped at 20% of MRR.

## Financial Risks
- **APO Margin Erosion:** If APO compute costs exceed our per-run fee.
- **Vault Scalability:** Exponential growth in patterns increasing embedding costs.
- **Compliance Overhead:** SOC2 certification costs exceeding initial estimates.
- **Mitigation:** Implement strict per-user/project quotas and a "Credit" system for APO.

## 4. Non-Infrastructure Operating Expenses (OpEx)
While technical infrastructure is kept lean, v2.4 introduces non-technical fixed costs to support the Enterprise transition. These are tracked separately from the technical budget.

| Category | Purpose | Estimated Monthly Cost | Notes |
| :--- | :--- | :--- | :--- |
| **Compliance & Legal** | SOC2 Readiness, Enterprise Contracts | $1,000 - $5,000 | Spikes during audit windows |
| **Enterprise Sales/Mktg** | Lead Gen, LinkedIn Sales Nav, Events | $500 - $3,000 | Scales with acquisition targets |
| **Administrative** | Tooling, Bookkeeping | $200 - $500 | Fixed |

**Total Non-Infra OpEx:** Estimated **$1,700 - $8,500 / month**, scaling as the Enterprise pipeline matures. This explains the variance between the Technical Infrastructure budget and the overall Company Financial Projections.
