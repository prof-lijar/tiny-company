# Budget & Infrastructure Costs

This document outlines the estimated costs for hosting, database, and AI services for the TOPIK Learning Assistant.

## 1. Cost Tiers

### Tier 1: MVP / Hobby (Free)
Ideal for initial development and alpha testing with < 100 users.

| Service | Provider | Monthly Cost | Notes |
| :--- | :--- | :--- | :--- |
| **Hosting** | Vercel (Hobby) | $0 | Free for non-commercial use |
| **Database** | Supabase (Free) | $0 | 500MB DB, 5GB Bandwidth |
| **Auth** | NextAuth.js / Clerk | $0 | Free tier |
| **Email** | Resend (Free) | $0 | Limited transactional emails |
| **Domain** | Namecheap/etc. | ~$1 | ~$12/year amortized |
| **AI API** | OpenAI (Mini) | Variable | Pay-as-you-go (est. $1-5/mo) |
| **Total** | | **~$1 - $6 / mo** | |

### Tier 2: Production / Scaled (Pro)
Required for commercialization and growth (100 - 10K users).

| Service | Provider | Monthly Cost | Notes |
| :--- | :--- | :--- | :--- |
| **Hosting** | Vercel (Pro) | $20 | Per member seat |
| **Database** | Supabase (Pro) | $25 | Base fee, includes 8GB DB |
| **Auth** | Clerk (Pro) | $25 | For > 10K MAU (otherwise $0) |
| **Email** | Resend (Pro) | $20 | For higher volume |
| **Domain** | Namecheap/etc. | ~$1 | ~$12/year amortized |
| **AI API** | OpenAI (Mini) | Variable | Based on user activity |
| **Total Base** | | **~$91 / mo** | Excluding AI variable costs |

---

## 2. Infrastructure Projections

### Cost per User Scale
Estimates assume a mix of free and paid users.

| User Count | Hosting/DB Base | AI API Cost (Est) | Total Monthly | Cost per User |
| :--- | :--- | :--- | :--- | :--- |
| **100** | $20 - $50 | $5 - $10 | **$25 - $60** | $0.25 - $0.60 |
| **1,000** | $60 - $90 | $30 - $60 | **$90 - $150** | $0.09 - $0.15 |
| **10,000** | $100 - $200 | $300 - $600 | **$400 - $800** | $0.04 - $0.08 |

---

## 3. AI API Cost Analysis (OpenAI GPT-4o-mini/equivalent)

AI costs are primarily driven by the **AI Writing Feedback** feature.

**Assumptions per Evaluation:**
- Input: 1,000 tokens (User text + prompt + rubric)
- Output: 500 tokens (Detailed feedback + corrections)
- Model: `gpt-4o-mini` (approx. $0.15/1M input, $0.60/1M output)

**Cost per Evaluation:**
- Input: $0.00015
- Output: $0.00030
- **Total: ~$0.00045 per evaluation**

**Monthly Cost per Pro User:**
- If user performs 20 evaluations/month: **$0.009 / user**
- Even at 100 evaluations/month: **$0.045 / user**

*Conclusion: AI costs are negligible compared to fixed infrastructure costs, allowing for aggressive AI feature offering in the Pro tier.*

## 4. Risk Factors
- **Database Egress**: Supabase charges $0.09/GB after 250GB. High asset usage could increase this.
- **Vercel Functions**: High compute usage for complex AI orchestrations may trigger Vercel overages.
- **MAU Spikes**: Rapid growth in free users could push Auth (Clerk) into paid tiers before revenue catches up.
