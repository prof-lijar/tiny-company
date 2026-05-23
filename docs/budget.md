# Project Budget: TOPIK Learning Assistant

This document outlines the estimated infrastructure and operating costs for the TOPIK Learning Assistant web app. All figures are based on real market data as of May 2026.

## 1. Infrastructure Cost Breakdown

### Hosting & Frontend
- **Provider**: Vercel
- **Plan**: Pro Plan
- **Fixed Cost**: $20/month (includes 1 seat and $20 usage credit)
- **Variable Costs**: 
    - Bandwidth: 1 TB included, then $0.15 per GB
    - Edge Requests: 10M included
- **Estimated Monthly**: $20.00

### Database & Backend
- **Provider**: Supabase
- **Plan**: Pro Plan
- **Fixed Cost**: $25/month (includes $10 compute credit)
- **Included**: 8 GB database size, 100k MAUs, 250 GB egress
- **Variable Costs**: $0.125 per GB over 8 GB
- **Estimated Monthly**: $25.00

### Authentication
- **Provider**: Clerk (or Supabase Auth)
- **Plan**: Hobby / Pro
- **Cost**: Free up to 50,000 Monthly Retained Users (MRUs)
- **Overage**: ~$0.02 per user per month after 50k
- **Estimated Monthly**: $0.00 (until 50k users)

### AI API (Writing Feedback)
- **Provider**: OpenAI
- **Model**: GPT-5.4 mini (or equivalent efficiency model)
- **Estimated Cost per Evaluation**: 
    - Input: ~2,000 tokens
    - Output: ~500 tokens
    - Estimated cost: ~$0.01 - $0.03 per evaluation
- **Estimated Monthly**: Variable based on usage (see projections)

### Other Operating Costs
- **Domain**: ~$12.00 / year ($\approx$ $1.00 / month)
- **Email (Transactional)**: Resend
    - Free tier: Included (up to limits)
    - Pro tier: $20/month (for higher volumes)
- **Analytics**: Vercel Analytics (Free tier)

---

## 2. Cost Projections by User Scale

| Component | 100 Users | 1,000 Users | 10,000 Users |
| :--- | :--- | :--- | :--- |
| **Hosting (Vercel)** | $0.00 (Hobby) | $20.00 (Pro) | $20.00 |
| **Database (Supabase)** | $0.00 (Free) | $25.00 (Pro) | $25.00 |
| **Auth (Clerk)** | $0.00 | $0.00 | $0.00 |
| **Email (Resend)** | $0.00 | $0.00 | $20.00 |
| **AI API (1 eval/user/mo)** | $3.00 | $30.00 | $300.00 |
| **Domain** | $1.00 | $1.00 | $1.00 |
| **Total Monthly** | **$4.00** | **$76.00** | **$366.00** |

*Note: 100 users assume Hobby tier for Vercel. 1k+ users assume Pro tier for professional reliability and commercial use.*

---

## 3. AI API Cost Analysis

The "AI Writing Feedback" feature is the primary cost driver at scale.

- **Conservative Estimate**: $0.03 per evaluation.
- **Usage Assumption**: Each Pro user performs 10 evaluations per month.
- **Cost per Pro User**: $0.30 / month.
- **Margin Impact**: With a subscription price of $12/month, the AI cost represents only ~2.5% of the revenue per paid user, making the model highly scalable.

## 4. Financial Risks
- **Token Inflation**: If prompt engineering requires significantly larger contexts, AI costs could triple.
- **Bandwidth Spikes**: High-resolution assets or high traffic could lead to Vercel bandwidth overages.
- **Database Growth**: If user-generated content (writing samples) grows rapidly, Supabase storage costs will increase beyond the 8GB limit.
