# Financial Projections

This document provides a detailed 12-month financial outlook for the TOPIK Learning Assistant, projecting Monthly Recurring Revenue (MRR), operating expenses, and net profit across three growth scenarios.

## 1. Key Assumptions

### Revenue Assumptions
- **Pro Tier Price**: $9.99 / month (blended ARPU: $8.50 to account for annual discounts).
- **Conversion Rate**: The percentage of free users who upgrade to Pro.
- **User Growth**: Monthly growth in the total user base.

### Cost Assumptions
- **Fixed Costs**: ~$90/month (Vercel Pro, Supabase Pro, Clerk, Resend, Domain).
- **Variable Costs**: AI API costs (Text + Audio) estimated at $0.07 per active Pro user per month.
- **Marketing**: $0 (Assuming organic growth via SEO and community sharing for the first 12 months).

---

## 2. Growth Scenarios

### Scenario A: Conservative (Slow Growth)
- **Conversion Rate**: 2%
- **User Acquisition**: 500 new users / month
- **Focus**: Slow organic discovery, high friction in onboarding.

### Scenario B: Moderate (Target)
- **Conversion Rate**: 5%
- **User Acquisition**: 2,000 new users / month
- **Focus**: Effective SEO, positive word-of-mouth in TOPIK communities.

### Scenario C: Aggressive (Viral)
- **Conversion Rate**: 10%
- **User Acquisition**: 5,000 new users / month
- **Focus**: Viral growth, high demand for AI writing and speaking feedback.

---

## 3. 12-Month Projection Table (Moderate Scenario)

| Month | Total Users | Paid Users (5%) | MRR ($8.50 ARPU) | OpEx (Fixed + Var) | Monthly Profit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **M1** | 2,000 | 100 | $850 | $97 | **$753** |
| **M2** | 4,000 | 200 | $1,700 | $104 | **$1,596** |
| **M3** | 6,000 | 300 | $2,550 | $111 | **$2,439** |
| **M4** | 8,000 | 400 | $3,400 | $118 | **$3,282** |
| **M5** | 10,000 | 500 | $4,250 | $125 | **$4,125** |
| **M6** | 12,000 | 600 | $132 | **$4,968** |
| **M7** | 14,000 | 700 | $5,950 | $139 | **$5,811** |
| **M8** | 16,000 | 800 | $6,800 | $146 | **$6,654** |
| **M9** | 18,000 | 900 | $7,650 | $153 | **$7,497** |
| **M10** | 20,000 | 1,000 | $8,500 | $160 | **$8,340** |
| **M11** | 22,000 | 1,100 | $9,350 | $167 | **$9,183** |
| **M12** | 24,000 | 1,200 | $10,200 | $174 | **$10,026** |

---

## 4. Profitability & Milestones

### Break-Even Analysis
- **Fixed Costs**: $90/month.
- **Paid Users needed to break even**: $\approx 11$ users.
- **Estimated Time to Break-Even**: Month 1 (under all scenarios).

### Runway & Funding
Since the project has extremely low overhead and a high-margin digital product, it is **self-sustaining from the first 20 paid users**. No external funding is required for infrastructure.

### Scaling Triggers
We will move from the \"Moderate\" to a \"Scale\" budget when:
1. **MAU > 100,000**: Will trigger Clerk and Supabase overages.
2. **Database Size > 8GB**: Will require Supabase compute upgrades.
3. **Traffic > 1M requests/mo**: May require Vercel Enterprise or advanced caching strategies.

## 5. Summary of Risks
- **Churn**: If monthly churn exceeds 20%, the growth in MRR will flatten.
- **Acquisition Cost**: If we move from organic to paid ads, the \"Profit\" column will decrease significantly.
- **API Pricing**: A sudden increase in OpenAI token or Whisper costs could impact margins, though current pricing makes this unlikely.
