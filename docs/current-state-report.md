# MVP Current State Report
**Date**: 2026-05-21
**Status**: P0 and P1 Features Implementation Review

## 1. Feature Audit

| Feature | Spec Status | Implementation Status | Gaps / Notes |
|---|---|---|---|
| Landing Page | P0 | [BUILT] | Matches spec. High conversion UI. |
| Vocabulary Builder | P0 | [BUILT] | SRS logic implemented in `srs.ts`. Data is static. Progress is local state only. |
| Grammar Lessons | P0 | [BUILT] | Index and detail pages exist. Content is static. |
| Reading Practice | P0 | [BUILT] | Split-screen UI and feedback loop working. |
| Writing Practice | P1 | [BUILT] | AI feedback is currently simulated. Character counter is implemented in `WritingInterface`. |
| Mock Test Simulator | P1 | [BUILT] | Timer and IBT layout working. Scoring is based on static answers. |
| Listening Practice | P1 | [BUILT] | Audio player and question flow working. |

## 2. Identified Gaps (P0/P1)

- **Persistence**: None of the study progress (SRS, completed grammar, test scores) is saved to a database. Everything is reset on page refresh.
- **Real AI Integration**: Writing feedback is a simulation. Needs integration with an LLM (e.g., GPT-4).
- **Content Volume**: The app uses seed data. Needs a larger corpus of TOPIK-style content in `docs/topik-content-guide.md` to be fully viable.
- **Audio Assets**: Listening practice uses simulated audio URLs. Needs real audio files or a robust TTS integration.

## 3. Conclusion
The MVP's *frontend* and *interaction design* are complete and align with the product vision. The primary remaining "MVP-level" work is the transition from simulated/local state to a persisted backend and real AI integration. 

We are now ready to move into P2 (Growth Features) while the CTO addresses the persistence and AI gaps.
