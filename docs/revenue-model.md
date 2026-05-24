# Revenue Model

This document defines the monetization strategy, pricing structure, and revenue projections for the TOPIK Learning Assistant.

## 1. Pricing Strategy: Freemium Model

The app follows a "Value-First" freemium model, providing essential study tools for free while locking high-value AI features and unlimited practice behind a subscription.

### Free Tier
- **Target**: Casual learners and beginners.
- **Features**:
    - Limited daily vocabulary and grammar practice (e.g., 10 items/day).
    - Access to basic study guides.
    - 1 AI writing evaluation per month.
- **Price**: $0

### Pro Tier
- **Target**: Serious test-takers aiming for certification within 3-6 months.
- **Features**:
    - Unlimited daily practice.
    - Unlimited AI-powered writing feedback and corrections.
    - Full-length mock tests with automated scoring.
    - Spaced Repetition System (SRS) for vocabulary.
    - Detailed progress analytics.
- **Price**: **$9.99 / month** (or **$89.99 / year** — ~25% discount)

---

## 2. Competitor Comparison

| Competitor | Pricing | Monthly Equivalent | Strategy |
| :--- | :--- | :--- | :--- |
| **Migii TOPIK** | $26 / 6 months | ~$4.33 / mo | Low-cost, high-volume |
| **thinkbig** | $50+ / month | $50+ / mo | Premium, enterprise-grade |
| **TOPIK Assistant** | **$9.99 / month** | **$9.99 / mo** | Mid-market, AI-driven value |

*Our positioning: We are more expensive than Migii because we offer active AI feedback (not just static tests), but significantly more affordable than thinkbig.*

---

## 3. Revenue Projections

### Assumptions
- **Target Market**: ~200,000 annual test takers.
- **Conversion Rate**: 5% (Conservative) to 10% (Optimistic).
- **Churn Rate**: 15% monthly.
- **Average Revenue Per Paid User (ARPU)**: $8.50 (blended monthly/annual).

### 12-Month Growth Scenarios (Cumulative Paid Users)

| Month | Conservative (2% Conv) | Moderate (5% Conv) | Aggressive (10% Conv) |
| :--- | :--- | :--- | :--- |
| **Month 3** | 50 users | 200 users | 500 users |
| **Month 6** | 200 users | 800 users | 2,000 users |
| **Month 12** | 1,000 users | 4,000 users | 10,000 users |

### Projected Monthly Revenue (Month 12)

- **Conservative**: 1,000 users * $8.50 = **$8,500 / mo**
- **Moderate**: 4,000 users * $8.50 = **$34,000 / mo**
- **Aggressive**: 10,000 users * $8.50 = **$85,000 / mo**

---

## 4. Break-Even Analysis

### Fixed Monthly Costs (Base Infrastructure)
- Vercel Pro: $20
- Supabase Pro: $25
- Clerk/Resend: ~$45
- **Total Base: ~$90 / month**

### Variable Costs
- AI API costs: ~$0.05 per active Pro user / month (negligible).

### Break-Even Point
To cover basic infrastructure costs:
`$90 / $9.99 ≈ 9 paid users`

**The project reaches break-even with just 10 paid subscribers.**

---

## 5. Financial Risks & Mitigations

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| **Low Conversion** | Low revenue | Implement a 7-day free trial of Pro features to demonstrate AI value. |
| **High Churn** | Unstable MRR | Introduce "Exam-Ready" bundles (3-month fixed price) since TOPIK is seasonal. |
| **API Cost Spike** | Margin erosion | Implement rate limits on AI writing evaluations for Pro users. |
