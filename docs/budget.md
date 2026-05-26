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
| **AI API** | OpenAI (Mini/Whisper) | Variable | Pay-as-you-go (est. $1-10/mo) |
| **Total** | | **~$1 - $11 / mo** | |

### Tier 2: Production / Scaled (Pro)
Required for commercialization and growth (100 - 10K users).

| Service | Provider | Monthly Cost | Notes |
| :--- | :--- | :--- | :--- |
| **Hosting** | Vercel (Pro) | $20 | Per member seat |
| **Database** | Supabase (Pro) | $25 | Base fee, includes 8GB DB |
| **Auth** | Clerk (Pro) | $25 | For > 10K MAU (otherwise $0) |
| **Email** | Resend (Pro) | $20 | For higher volume |
| **Domain** | Namecheap/etc. | ~$1 | ~$12/year amortized |
| **AI API** | OpenAI (Mini/Whisper) | Variable | Based on user activity |
| **Total Base** | | **~$91 / mo** | Excluding AI variable costs |

---

## 2. Infrastructure Projections

### Cost per User Scale
Estimates assume a mix of free and paid users.

| User Count | Hosting/DB Base | AI API Cost (Est) | Total Monthly | Cost per User |
| :--- | :--- | :--- | :--- | :--- |
| **100** | $20 - $50 | $5 - $15 | **$25 - $65** | $0.25 - $0.65 |
| **1,000** | $60 - $90 | $30 - $80 | **$90 - $170** | $0.09 - $0.17 |
| **10,000** | $100 - $200 | $300 - $700 | **$400 - $900** | $0.04 - $0.09 |

---

## 3. AI API Cost Analysis

AI costs are driven by **Writing Feedback** and **Speaking/Pronunciation Analysis**.

### Text Analysis (GPT-4o-mini)
**Assumptions per Evaluation:**
- Input: 1,000 tokens | Output: 500 tokens
- Model: `gpt-4o-mini` ($\approx$ $0.15/1M input, $0.60/1M output)
- **Total: $\approx$ $0.00045 per evaluation**

### Audio Analysis (OpenAI Whisper)
**Assumptions per Recording:**
- Average recording length: 30 seconds
- Model: `whisper-1` ($0.006 / minute)
- **Total: $\approx$ $0.003 per recording**

**Monthly Cost per Pro User:**
- 20 Writing Evaluations: $0.009 / month
- 20 Speaking Recordings: $0.060 / month
- **Combined AI Cost: $\approx$ $0.07 / user / month**

*Conclusion: Even with the addition of audio features, AI costs remain negligible compared to fixed infrastructure costs.*

## 4. Risk Factors
- **Database Egress**: Supabase charges $0.09/GB after 250GB. High asset usage could increase this.
- **Vercel Functions**: High compute usage for complex AI orchestrations may trigger Vercel overages.
- **MAU Spikes**: Rapid growth in free users could push Auth (Clerk) into paid tiers before revenue catches up.
- **Audio Storage**: Storing user recordings for pronunciation history could increase Supabase Storage costs.
