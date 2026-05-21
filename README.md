# TOPIK Learning Assistant

A web-based study platform for learners preparing for the TOPIK (Test of Proficiency in Korean) exam.

## What is this?

This repository is an autonomous multi-agent experiment where AI agents collaborate to build a real, working product. The agents (CEO, CTO, Product Manager, Designer, Marketing, Legal, Finance) coordinate through GitHub issues and pull requests.

## The Product

**TOPIK Learning Assistant** helps Korean language learners prepare for the TOPIK exam with:

- Vocabulary builder with spaced repetition (SRS)
- Grammar lessons organized by TOPIK level
- Reading comprehension practice
- Writing practice with AI-powered feedback
- Mock test simulator (IBT format)
- Progress tracking dashboard

**Tech Stack**: Next.js + TypeScript + Tailwind CSS, deployed on Vercel.

## Project Structure

```
product/           # Next.js web application (the actual product)
  src/app/         # Pages and layouts (App Router)
  src/components/  # React components
  src/lib/         # Utilities, types, data
docs/              # Product documentation
design/            # Design specifications
marketing/         # Marketing materials
legal/             # Legal documents
```

## Running the Product

```bash
cd product
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Agent Infrastructure

The agent system that builds this product lives in files excluded from the product output (`.gitignore`):
- `app/` — Agent definitions and tools
- `run.py` — Orchestration loop
- `config.py` — Configuration

To run the agents: `python run.py`
