# Operating Budget: TraceWhisper (v2.4 $\rightarrow$ v3.0 Transition)

## Overview
Tiny Company is operating as a bootstrapped AI startup. Our primary financial goal is to maintain a low-burn rate while scaling. We have evolved from a governance tool (v2.4) to an active optimization platform (v2.5) and are now moving toward an **Autonomous Reasoning OS (v3.0)**.

v3.0 introduces "Self-Healing" capabilities, which shift our cost profile from passive monitoring to active synthesis and verification.

## Assumptions
- **Team:** All founders/contributors are working for equity; no salaries are paid.
- **Infrastructure:** Heavy reliance on serverless and local-first storage, with managed expansion for Enterprise multi-tenancy and v3.0 autonomous loops.
- **Development:** Use of free-tier CI/CD and project management tools, with targeted budget for SOC2 compliance audits.

## Technical Infrastructure Costs

### 1. LLM API Consumption
This remains our primary variable cost.

**v2.4 & v2.5 Impact:**
- **APO & Logic Porter:** High-reasoning model usage for translation and optimization.
- **Production Telemetry:** API costs for sampling production traces.
- **Mitigation:** Credit-based model ensures high gross margins (75-90%) per operation.

**v3.0 "Self-Healing" Impact:**
- **Autonomous Remediation:** The "Healing Cycle" (Detection $\rightarrow$ Diagnosis $\rightarrow$ Synthesis $\rightarrow$ Verification) is highly compute-intensive.
- **Synthesis API:** Requires Frontier models (GPT-4o, Claude 3.5) for corrective prompt synthesis.
- **Verification API:** Requires high-volume regression testing against Golden Paths.
- **Mitigation:** Implementation of "Healing Quotas" and "Complexity Caps" to prevent compute runaway.

**Estimated Spend by Phase:**
- **Dev/R&D Phase:** ~$100 - $7,600/month (v3.0 R&D is significantly more expensive than v2.x).
- **Beta Phase:** ~$300 - $15,000/month.
- **Production Phase:** Variable, scaled to 15-25% of MRR, offset by v3.0 Autonomy pricing.

### 2. Hosting & Compute
- **CLI Tool:** $0 (Distributed via PyPI/GitHub).
- **Documentation/Landing Page:** $0 (GitHub Pages / Vercel Free Tier).
- **v2.5/v3.0 Infrastructure:** 
    - **Async Processing:** Message queues (Redis/SQS) for background optimization and healing tasks. Est: $100 - $500/month.
    - **Telemetry & Shadow Env:** Scalable storage for traces and isolated containers for Shadow Verification (v3.0). Est: $500 - $2,000/month.

### 3. Data Storage & Governance
- **Core Logs:** $0 (Local SQLite).
- **v2.3 Pattern Vault:** ~$25 - $100/month (Managed Vector DB).
- **v2.4/v3.0 Enterprise Infrastructure:**
    - **Multi-tenancy:** Shift to schema/DB-per-tenant. Est: $100 - $1,500/month.
    - **Audit Logging:** Immutable storage for compliance. Est: $50 - $500/month.

## Estimated Monthly Costs (Lifecycle)

| Item | Dev/R&D (Est.) | v2.4/2.5 Production (Est.) | v3.0 Build/Beta (Est.) | v3.0 Production (Est.) | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Domain Name** | $1.00 | $1.00 | $1.00 | $1.00 | Annual registration |
| **Hosting/Compute** | $0.00 | $600 - $1,500 | $1,000 - $3,000 | $2,000 - $5,000 | Includes Shadow Env |
| **LLM APIs** | $100 - $300 | Variable | $4,000 - $8,000 | Variable | Offset by Autonomy Credits |
| **Database/Vault** | $0.00 | $500 - $1,500 | $500 - $2,000 | $1,000 - $3,000 | Isolated DBs for Enterprise |
| **Compliance/Audit** | $0.00 | $200 - $500 | $200 - $500 | $500 - $1,000 | Immutable audit logs |
| **Other Tools** | $0.00 | $500 | $500 | $1,000 | Marketing/SOC2 tools |
| **Total (Fixed/Base)** | **$101 - $301** | **$1,801 - $4,001 + APIs** | **$5,801 - $13,001** | **$4,501 - $10,001 + APIs** | |

## Cost Management Strategy

### 1. "Local-First" Base
We keep the bulk of the data local. Only high-value "Patterns" and "Governance Policies" are synced to the central Vault.

### 2. Tiered API Routing
- **Analysis/Pruning/Diagnosis:** GPT-4o-mini / Llama 3.
- **Fix-It/APO/Synthesis:** GPT-4o / Claude 3.5 Sonnet.
- **Verification:** Local execution or mid-tier models.

### 3. Value-Based Cost Offset (v2.5 & v3.0)
We use a **Platform + Credit** model. The most expensive compute features (Logic Porter, Self-Healing Cycles) are directly subsidized by the customers using them.

### 4. Hard Spending Caps & Circuit Breakers
- **Dev/R&D Cap:** $8,000/month for v3.0 build phase.
- **Production OpEx Cap:** Total OpEx capped at 20% of MRR.
- **v3.0 Circuit Breaker:** Hard-coded cycle limits (max 10 iterations) per fix to prevent infinite loop spend.

## Financial Risks
- **Telemetry Cost Explosion:** High production traffic could spike costs if sampling is not strictly enforced.
- **Infinite Loop Spend (v3.0):** Autonomous healing could enter recursive loops, burning credits rapidly.
- **APO Margin Erosion:** Frontier model price spikes could reduce the margin on Credit sales.
- **Mitigation:** Hard-coded sampling caps (max 10%) and dynamic credit pricing based on model tiers.

## 4. Non-Infrastructure Operating Expenses (OpEx)
Fixed costs to support the Enterprise and Autonomy transition.

| Category | Purpose | Estimated Monthly Cost | Notes |
| :--- | :--- | :--- | :--- |
| **Compliance & Legal** | SOC2 Readiness, Enterprise Contracts | $1,000 - $5,000 | Spikes during audit windows |
| **Enterprise Sales/Mktg** | Lead Gen, LinkedIn Sales Nav, Events | $500 - $3,000 | Scales with acquisition targets |
| **Administrative** | Tooling, Bookkeeping | $200 - $500 | Fixed |

**Total Non-Infra OpEx:** Estimated **$1,700 - $8,500 / month**.
