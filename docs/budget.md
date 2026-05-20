# Bootstrapped Budget Model (First 6 Months)

## Overview
Tiny Company is operating as a bootstrapped AI startup. Our primary financial goal is to maintain a near-zero burn rate while building the MVP. We will leverage free tiers, open-source software, and pay-as-you-go models to minimize risk.

## Assumptions
- **Team:** All founders/contributors are working for equity; no salaries are paid.
- **Infrastructure:** Heavy reliance on serverless and static hosting.
- **Development:** Use of free-tier CI/CD and project management tools.
- **Scaling:** Costs are estimated for a small development team (1-3 people) and initial alpha testers.

## Estimated Costs (6-Month Projection)

| Item | Monthly Cost (Est.) | 6-Month Total | Notes |
| :--- | :--- | :--- | :--- |
| **Domain Name** | $1.00 | $12.00 | Annual registration (~$12/year) |
| **Hosting** | $0.00 | $0.00 | Vercel / Cloudflare / GitHub Pages (Free Tiers) |
| **LLM APIs** | $30.00 | $180.00 | OpenAI/Anthropic pay-as-you-go for dev/testing |
| **Database** | $0.00 | $0.00 | Supabase / MongoDB Atlas / PlanetScale (Free Tiers) |
| **CI/CD** | $0.00 | $0.00 | GitHub Actions (Free for public repos) |
| **Project Mgmt** | $0.00 | $0.00 | GitHub Issues / Trello (Free Tiers) |
| **Communication** | $0.00 | $0.00 | Discord / Slack (Free Tiers) |
| **Total** | **$31.00** | **$192.00** | |

## Cost Management Strategy

### 1. "Free-First" Architecture
- Prioritize tools with generous free tiers (e.g., Supabase for DB, Vercel for Frontend).
- Use static site generation (SSG) to eliminate server costs.

### 2. API Budget Caps
- Set hard limits on LLM API accounts to prevent unexpected overages.
- Utilize smaller, more efficient models (e.g., GPT-4o-mini, Claude Haiku) for routine tasks and only use flagship models for complex reasoning.

### 3. Open Source Preference
- Use open-source libraries and self-hosted options if they can be run on free-tier cloud instances.

### 4. Monitoring
- Monthly review of API usage and cloud billing.
- Immediate pivot to alternative providers if free tiers are exhausted or pricing changes.

## Financial Risks
- **API Scaling:** If the product gains rapid traction, API costs will scale linearly with users. We will need a monetization strategy (Freemium/Sponsorships) before this happens.
- **Domain Renewal:** Small but necessary annual cost.
- **Tooling Migration:** Moving from free to paid tiers as the team grows.
