# TOPIK Learning Assistant — Product Vision

## Mission

Democratize TOPIK preparation by providing an affordable, comprehensive, web-based study
platform with AI-powered features that no competitor offers.

## The Problem

Learners preparing for the TOPIK (Test of Proficiency in Korean) face:

1. **Writing feedback is nonexistent** — the writing section is the #1 struggle for TOPIK II
   test-takers, yet no app provides meaningful writing practice with feedback
2. **No IBT simulation** — TOPIK is moving to Internet-Based Testing but no prep tool
   simulates the computer-based test experience
3. **Mobile-only apps** — the market leader (Migii TOPIK) has no web version, forcing
   learners to study on small screens when they prefer laptops for serious study
4. **Fragmented resources** — learners cobble together 3-5 different tools (vocabulary apps,
   grammar sites, YouTube videos, past papers) to cover all test sections
5. **TOPIK II is underserved** — most apps focus on TOPIK I (beginner), leaving intermediate
   and advanced learners without adequate preparation tools

## The Product

A web-based TOPIK preparation platform that provides:

- **Vocabulary Builder** with spaced repetition (SRS), organized by TOPIK level
- **Grammar Lessons** with clear explanations, examples, and practice exercises
- **Reading Comprehension** practice with TOPIK-format passages and questions
- **Writing Practice** with AI-powered feedback on essays and paragraphs
- **Listening Comprehension** practice with audio and TOPIK-format questions
- **Mock Test Simulator** that mirrors the IBT test experience
- **Progress Dashboard** tracking performance across all sections

## Target Market

- **Primary**: TOPIK II test-takers (levels 3-6) — intermediate to advanced learners
- **Secondary**: TOPIK I test-takers (levels 1-2) — beginners
- 200,000+ test-takers annually, growing 15-20% year-over-year
- Global audience: Korea, Japan, China, Southeast Asia, Europe, Americas

## Competitive Landscape

| Competitor | Price | Strengths | Weaknesses |
|-----------|-------|-----------|------------|
| Migii TOPIK | $26/6mo | 40 mock exams, structured | Mobile-only, no writing, no web |
| thinkbig TOPIK | $50+/mo | AI-powered, personalized | Expensive, targets institutions |
| TOPIK Guide | Free | Past papers, grammar guides | No interactivity, no practice tools |
| Duolingo/LingoDeer | $7-14/mo | Great UX, gamification | Too basic for TOPIK prep |

## Our Advantage

1. **AI Writing Feedback** — the killer feature nobody else has
2. **Web-First** — study on your laptop with a full-screen experience
3. **All-in-One** — vocabulary, grammar, reading, writing, listening, mock tests
4. **IBT Simulation** — practice the actual computer-based test format
5. **Affordable** — $8-15/month vs competitors' $26-50+

## Tech Stack

- **Framework**: Next.js (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Database**: TBD (Vercel Postgres or Supabase)
- **AI**: OpenAI API or equivalent for writing feedback

## Business Model

- **Free Tier**: Limited daily practice (5 vocabulary cards, 1 grammar lesson, 1 reading passage)
- **Pro Tier** ($8-15/month): Unlimited practice, AI writing feedback, mock tests, progress analytics
- **Annual Plan**: ~20% discount on monthly price
