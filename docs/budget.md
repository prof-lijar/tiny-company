# Operating Budget: TraceWhisper (v2.4 & v2.5 Transition)

## Overview
Tiny Company is operating as a bootstrapped AI startup. Our primary financial goal is to maintain a low-burn rate while scaling. We have transitioned from a centralized architecture to a **Local-First (SQLite)** model for v2.2 and a **Hybrid Architecture** for v2.3.

With **v2.4 (Enterprise Scale-Up)**, we shifted to an **Enterprise Reasoning Governance Platform**. We are now transitioning to **v2.5 (The Autonomous Bridge)**, which introduces active optimization and cross-model translation.

## Assumptions
- **Team:** All founders/contributors are working for equity; no salaries are paid.
- **Infrastructure:** Heavy reliance on serverless and local-first storage, with managed expansion for Enterprise multi-tenancy and v2.5 telemetry.
- **Development:** Use of free-tier CI/CD and project management tools, with targeted budget for SOC2 compliance audits.

## Technical Infrastructure Costs

### 1. LLM API Consumption
This remains our primary variable cost. 

**v2.4 \"Enterprise Scale-Up\" Impact:**
- **Autonomous Prompt Optimization (APO):** The most compute-intensive feature.
- **Mitigation:** APO costs are offset by usage-based fees (Credits) in the Enterprise tiers.

**v2.5 \"The Autonomous Bridge\" Impact:**
- **Logic Porter & Shadow APO:** High-reasoning model usage for translation and optimization loops.
- **Production Telemetry:** API costs for sampling production traces (default 1%).
- **Mitigation:** All v2.5 compute is tied to the **Credit Model**, ensuring a high gross margin (75-90%) per operation.

**Estimated Spend by Phase:**
- **Dev/R&D Phase:** ~$100 - $300/month.
- **Beta Phase (v2.2.2/v2.3):** ~$300 - $7,000/month.
- **v2.4/v2.5 Production Phase:** Variable, scaled to 15-20% of MRR, with specific Credit-based offsets.

### 2. Hosting & Compute
- **CLI Tool:** $0 (Distributed via PyPI/GitHub).
- **Documentation/Landing Page:** $0 (GitHub Pages / Vercel Free Tier).
- **v2.5 Infrastructure:** 
    - **Async Processing:** Addition of message queues (e.g., Redis/SQS) for background optimization tasks. Est: $50 - $200/month.
    - **Telemetry Storage:** Scalable storage for sampled production traces. Est: $50 - $300/month.

### 3. Data Storage & Governance
- **Core Logs:** $0 (Local SQLite).
- **v2.3 Pattern Vault:** ~$25 - $100/month (Managed Vector DB).
- **v2.4 Enterprise Infrastructure:**
    - **Multi-tenancy:** Shift to schema-per-tenant or DB-per-tenant. 
        - *Implementation:* ~$100 - $300/month.
        - *Scale-Up:* ~$500 - $1,500/month.
    - **Audit Logging:** Immutable storage for compliance.
        - *Implementation:* ~$50 - $100/month.
        - *Scale-Up:* ~$200 - $500/month.

## Estimated Monthly Costs (Lifecycle)

| Item | Dev/R&D (Est.) | v2.3 Scaling (Est.) | v2.4 Implementation (Est.) | v2.5 Production (Est.) | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Domain Name** | $1.00 | $1.00 | $1.00 | $1.00 | Annual registration (~$12/year) |
| **Hosting/Compute** | $0.00 | $200 - $400 | $200 - $500 | $600 - $1,500 | Includes v2.5 Async/Telemetry |
| **LLM APIs** | $100 - $300 | $2,000 - $7,000 | Variable | Variable | Offset by v2.5 Credits |
| **Database (Vault/Iso)** | $0.00 | $50 - $200 | $100 - $300 | $500 - $1,500 | Isolated DBs for Enterprise |
| **Compliance/Audit** | $0.00 | $0.00 | $50 - $100 | $200 - $500 | Immutable audit logs |
| **Other Tools** | $0.00 | $300 | $300 | $500 | Marketing/SOC2 tools |
| **Total (Fixed/Base)** | **$101 - $301** | **$2,551 - $7,901** | **$651 - $1,201 + APIs** | **$1,301 - $4,001 + APIs** | |

## Cost Management Strategy

### 1. \"Local-First\" Base
We keep the bulk of the data local. Only high-value \"Patterns\" and \"Governance Policies\" are synced to the central Vault.

### 2. Tiered API Routing
- **Analysis/Pruning:** GPT-4o-mini.
- **Fix-It/APO/Adversarial:** GPT-4o / Claude 3.5 Sonnet.
- **Verification:** Local execution.

### 3. Value-Based Cost Offset (v2.4 & v2.5)
We use a **Platform + Credit** model for v2.5. This ensures that the most expensive compute features (Logic Porter, Shadow APO) are directly subsidized by the customers using them, with a built-in margin buffer.

### 4. Hard Spending Caps
- **Dev/R&D Cap:** $300/month.
- **Production OpEx Cap:** Total OpEx capped at 20% of MRR.

## Financial Risks
- **Telemetry Cost Explosion:** High production traffic could spike costs if sampling is not strictly enforced.
- **APO Margin Erosion:** Frontier model price spikes could reduce the margin on Credit sales.
- **Mitigation:** Hard-coded sampling caps (max 10%) and dynamic credit pricing based on model tiers.

## 4. Non-Infrastructure Operating Expenses (OpEx)
Fixed costs to support the Enterprise transition.

| Category | Purpose | Estimated Monthly Cost | Notes |
| :--- | :--- | :--- | :--- |
| **Compliance & Legal** | SOC2 Readiness, Enterprise Contracts | $1,000 - $5,000 | Spikes during audit windows |
| **Enterprise Sales/Mktg** | Lead Gen, LinkedIn Sales Nav, Events | $500 - $3,000 | Scales with acquisition targets |
| **Administrative** | Tooling, Bookkeeping | $200 - $500 | Fixed |

**Total Non-Infra OpEx:** Estimated **$1,700 - $8,500 / month**.
