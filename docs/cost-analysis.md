# Cost Analysis & Tool Comparison

This document analyzes the financial trade-offs for critical infrastructure decisions for the TOPIK Learning Assistant.

## 1. Database: Build vs. Buy (Managed vs. Self-Hosted)

We evaluate managed Postgres providers against self-hosting on a VPS.

| Option | Initial Cost | Scaling Cost | Maintenance | Risk |
| :--- | :--- | :--- | :--- | :--- |
| **Self-Hosted (VPS)** | Low ($5-10/mo) | Manual | High (Backups, OS) | Data loss, Downtime |
| **Vercel Postgres** | Low (Free $\to$ $25) | Medium | Low (Integrated) | Vendor lock-in |
| **Supabase** | Low (Free $\to$ $25) | Medium | Low (Managed) | Usage overages |
| **PlanetScale** | Medium (Free $\to$ $39) | High | Low (Serverless) | Complexity (Vitess) |

**Decision: Supabase.**
*Reasoning*: Supabase provides not just the database, but also Auth and Storage in one bundle. The "Pro" plan ($25) is a sweet spot that eliminates the risk of project pausing found in the free tier, while remaining affordable.

---

## 2. AI Engine: API vs. Self-Hosted LLM

The core value of the app is AI writing feedback.

### Option A: Managed API (OpenAI `gpt-4o-mini`)
- **Cost**: Pay-as-you-go ($\approx$ $0.00045 per evaluation).
- **Pros**: Zero maintenance, state-of-the-art quality, instant scaling.
- **Cons**: Variable cost (though low), dependency on OpenAI.

### Option B: Self-Hosted LLM (e.g., Llama 3 on GPU VPS)
- **Cost**: Fixed monthly cost ($\approx$ $50 - $200/mo for a GPU instance).
- **Pros**: Fixed cost regardless of volume, full data privacy.
- **Cons**: High maintenance, lower quality than GPT-4o, paying for idle time.

**Decision: Managed API (OpenAI).**
*Reasoning*: At our current scale, the cost of a GPU instance far exceeds the API costs. Even with 10,000 users performing 20 evaluations/month, the API cost is only $\approx$ $90/mo, whereas a dedicated GPU would be a higher fixed cost with significantly more operational overhead.

---

## 3. Authentication: NextAuth.js vs. Clerk

| Feature | NextAuth.js | Clerk |
| :--- | :--- | :--- |
| **Cost** | $0 (Open Source) | Free $\to$ $25/mo |
| **Implementation** | Manual (DB schema, logic) | Plug-and-play (Hosted UI) |
| **Maintenance** | High (Updating providers) | Low (Managed service) |
| **User Experience** | Custom | Polished, professional |

**Decision: Clerk (with fallback to NextAuth).**
*Reasoning*: For a lean team, the speed of implementation and professional UI provided by Clerk outweighs the cost once we move past the free tier. It allows the team to focus on educational content rather than auth plumbing.

---

## 4. Email Delivery: Resend vs. SendGrid

| Provider | Free Tier | Paid Tier | Developer Experience |
| :--- | :--- | :--- | :--- |
| **Resend** | Generous | $20/mo | Excellent (Next.js native) |
| **SendGrid** | Limited | Variable | Complex/Legacy |

**Decision: Resend.**
*Reasoning*: Resend is built for the modern Next.js stack and offers a superior developer experience with a pricing model that aligns well with our early-stage growth.

## Summary of Tooling Costs (Pro Tier)

| Tool | Decision | Monthly Est. |
| :--- | :--- | :--- |
| **Hosting** | Vercel | $20 |
| **Database/Auth** | Supabase | $25 |
| **Auth (Advanced)** | Clerk | $25 |
| **Email** | Resend | $20 |
| **AI** | OpenAI | Variable (Low) |
| **Total** | | **~$90 / mo** |
