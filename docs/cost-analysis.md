# Cost Analysis: TraceWhisper v2

## Overview
This document outlines the financial reasoning behind the technical architecture and tool selection for TraceWhisper v2. Our guiding principle is **"Low-Burn/High-Equity,"** prioritizing tools that are free, open-source, or scale linearly with revenue.

---

## 1. Storage Layer: Local SQLite vs. Managed Cloud DB

**Decision:** **Build with Local SQLite**

| Option | Initial Cost | Scaling Cost | Maintenance | Trade-off |
| :--- | :--- | :--- | :--- | :--- |
| **SQLite (Local)** | $0 | $0 | Low | No native multi-user sync |
| **Supabase (Free Tier)** | $0 | ~$25/mo+ | Medium | Latency, dependency on cloud |
| **Managed Postgres** | ~$15/mo | High | High | Overkill for current stage |

**Financial Justification:**
SQLite eliminates monthly recurring costs and removes the need for a backend server for the core CLI tool. It allows users to keep their data locally (privacy win) and keeps our burn rate at zero for storage. We can introduce a "Cloud Sync" paid feature in the future to monetize the migration to a managed DB.

---

## 2. User Interface: CLI (rich) vs. Web Dashboard

**Decision:** **Build CLI-First (using `rich`)**

| Option | Development Cost | Hosting Cost | User Friction |
| :--- | :--- | :--- | :--- |
| **CLI (`rich`)** | Low | $0 | Low (for devs) |
| **Web App (React/Vercel)** | High | $0 - $20/mo | Medium (requires login) |
| **Desktop App (Electron)** | Very High | $0 | High (installation) |

**Financial Justification:**
A CLI tool targets our primary persona (AI Engineers) with zero hosting overhead. Using the `rich` library allows us to provide a "premium" feel (Live Narrative split-screen) without the cost of maintaining a web frontend and authentication system.

---

## 3. LLM Strategy: Live Whisper Processing

**Decision:** **Tiered Model Routing**

To implement "Live Whisper" without a cost explosion, we utilize a routing strategy:

1. **Noise Filter (GPT-4o-mini / Claude Haiku):**
   - **Role:** Monitors the log stream for "Key Decision Points" (KDPs).
   - **Cost:** Extremely low.
   - **Financial Impact:** Prevents sending every single log line to a flagship model.

2. **Narrative Synthesizer (GPT-4o / Claude 3.5 Sonnet):**
   - **Role:** Triggered only when a KDP is detected to rewrite the narrative.
   - **Cost:** Higher.
   - **Financial Impact:** Limits flagship usage to high-value events, keeping the "Live Whisper" cost within the $60-$100/mo dev budget.

---

## 4. Integration Strategy: SDK vs. Middleware

**Decision:** **Lightweight SDK (Local-First)**

We are building a lightweight SDK for LangChain and CrewAI that writes to local files/SQLite.

- **Build (SDK):** Higher upfront dev time, but $0 operational cost.
- **Buy/Use (Middleware/Observability Platforms):** $0 upfront, but high monthly cost per trace/user.

**Financial Justification:**
By building a local-first SDK, we avoid the "per-trace" tax imposed by commercial observability platforms. This ensures that our product remains viable for the "BYO Key" free tier.

---

## Summary of Cost-Avoidance

| Feature | Avoided Cost | Strategy |
| :--- | :--- | :--- |
| **Database** | ~$25 - $100/mo | Local SQLite |
| **Frontend Hosting** | ~$20 - $50/mo | CLI-first approach |
| **API Overages** | Variable (High) | Tiered Routing (Mini $\rightarrow$ Flagship) |
| **Observability Tax** | Per-trace fee | Local-first SDK |

**Verdict:** The v2 architecture is optimized for maximum utility with minimum recurring expenditure, ensuring a long runway regardless of external funding.
