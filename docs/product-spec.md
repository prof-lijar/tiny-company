# TOPIK Learning Assistant — MVP Product Specification

## Overview
A web-based TOPIK (Test of Proficiency in Korean) preparation platform built with Next.js, TypeScript, and Tailwind CSS. All product code lives in the `product/` directory.

## Feature Priorities

### P0 — CRITICAL: 2026 Format Alignment [BUILT]
**Goal**: Update all simulators and content to match the 2026 TOPIK overhaul to prevent user failure.

#### 1. 2026 Mock Test Engine Update [BUILT]
- **Requirements**:
    - Update Listening section: 60 questions.
    - Update Reading section: 40 questions.
    - Update Timer: Increase total test time by 10 minutes.
    - Update Scoring Logic: Implement new thresholds (Level 4: 140, Level 5: 170).
- **Files affected**: `product/src/app/mock-test/page.tsx`, `product/src/lib/data/mock-tests.ts`.
- **Resolved**: [Issue #422] Timer now uses total/section-specific time.

#### 2. High-Speed Listening Module [BUILT]
- **Goal**: Implement actual 1.1x speed playback for 2026-style practice.
- **Detailed Requirements**:
    - **Technical Implementation**: Use the `playbackRate` property of the HTML5 Audio API.
    - **Logic**: Set `audio.playbackRate = 1.1` upon loading the audio object.
    - **User Interface**: 
        - Add a "2026 Mode" toggle in the listening interface.
        - When enabled, audio plays at 1.1x.
        - Display a badge: "2026 Speed (1.1x)".
    - **Content**: 
        - Update `product/src/lib/data/listening.ts` to include 60-question sets instead of 50.
        - Ensure audio files are mapped correctly to these new question sets.
- **Acceptance Criteria**:
    - Audio playback is measurably faster than 1.0x.
    - Pitch remains natural (standard browser behavior).
    - Toggle correctly switches between 1.0x and 1.1x.
- **Files affected**: `product/src/app/listening/page.tsx`, `product/src/lib/data/listening.ts`.

#### 3. Anti-Template Writing Feedback [BUILT]
- **Goal**: Update AI prompt to detect and penalize formulaic/memorized essay templates.
- **Detailed Requirements**:
    - **Prompt Engineering**: Update the system prompt in `product/src/app/api/writing-feedback/route.ts`.
    - **Detection Logic**: 
        - Instruct AI to look for "overused TOPIK templates" (e.g., overly rigid introductory phrases like "개드개개... 은 바라에...").
        - Penalize "memorized" structures that don't specifically address the prompt's nuances.
    - **Feedback Output**:
        - Explicitly label "Template Usage" in the feedback report.
        - Suggest "Natural Alternatives" to replace formulaic phrases.
        - Rate "Structural Variety" on a scale of 1-5.
- **Acceptance Criteria**:
    - AI identifies and flags common TOPIK templates.
    - Feedback provides specific suggestions for more natural phrasing.
- **Files affected**: `product/src/app/api/writing-feedback/route.ts`.

#### 4. Reading Speed Training [BUILT]
- **Requirements**:
    - Adjust reading practice timers to reflect the tighter 2026 window.
- **Files affected**: `product/src/app/reading/page.tsx`.
- **Resolved**: [Issue #420] Lint errors and runtime issues in Reading page timers fixed.

---

### P0 — MVP (Build First)

#### 5. Landing Page [BUILT]
- **File**: `product/src/app/page.tsx`
- **Acceptance Criteria**: Hero section, Feature section, Pricing table, Responsive design.

#### 6. Vocabulary Builder with SRS [BUILT]
- **Files**: `product/src/app/vocabulary/page.tsx`, `product/src/lib/srs.ts`, `product/src/lib/data/vocabulary.ts`
- **Improvements needed** (from QA):
    - [Issue #391] Fix inline styles in Vocabulary progress bar.
    - [Issue #431] Fix lint errors in Vocabulary API.

#### 7. Grammar Lessons [BUILT]
- **Files**: `product/src/app/grammar/page.tsx`, `product/src/app/grammar/[level]/page.tsx`, `product/src/lib/data/grammar.ts`

#### 8. Reading Comprehension Practice [BUILT]
- **Files**: `product/src/app/reading/page.tsx`, `product/src/lib/data/reading.ts`
- **Resolved**: [Issue #420] Lint errors and runtime issues fixed.

### P1 — Fast Follow

#### 9. Writing Practice with AI Feedback [BUILT]
- **Files**: `product/src/app/writing/page.tsx`, `product/src/app/api/writing-feedback/route.ts`
- **Resolved**: [Issue #421] Removed unused variables.
- **Note**: Now includes 2026 Anti-Template logic.

#### 10. Mock Test Simulator [BUILT]
- **Files**: `product/src/app/mock-test/page.tsx`, `product/src/app/mock-test/[section]/page.tsx`
- **Note**: Now superseded by P0 "2026 Format Alignment".

#### 11. Listening Practice [BUILT]
- **Files**: `product/src/app/listening/page.tsx`, `product/src/lib/data/listening.ts`
- **Improvements needed** (from QA):
    - [Issue #431] Fix lint errors in ListeningPlayer.

### P2 — Growth Features

#### 12. User Authentication [BUILT]
- **Files**: `product/src/app/api/auth/[...nextauth]/route.ts`, `product/src/app/login/page.tsx`, `product/src/app/signup/page.tsx`

#### 13. Progress Dashboard [BUILT]
- **Files**: `product/src/app/dashboard/page.tsx`, `product/src/components/dashboard/StatsGrid.tsx`, `product/src/components/dashboard/ScoreChart.tsx`

#### 14. Subscription Billing [BUILT]
- **Files**: `product/src/app/api/stripe/checkout/route.ts`, `product/src/app/api/stripe/webhook/route.ts`

### P3 — AI Intelligence (Future)

#### 15. AI-Powered Weakness Analysis [BUILT]
- **Files**: `product/src/app/api/analyze-weaknesses/route.ts`, `product/src/components/dashboard/WeaknessReport.tsx`

#### 16. Dynamic Study Plan [BUILT]
- **Files**: `product/src/app/api/study-plan/route.ts`, `product/src/components/dashboard/DailyPlan.tsx`
- **Resolved**: [Issue #407] "Update Date" button logic fixed.

## User Flows
(Unchanged)

## Data Model (Conceptual)
(Unchanged)

## UI/UX Requirements
- **Typography**: Noto Sans KR.
- **Layout**: Clean, distraction-free "Study Mode".
- **Responsiveness**: Desktop-first (IBT focus).

## Content Guidelines
- All TOPIK practice content must be ORIGINAL.
- Label content as "TOPIK-style practice".
- Align with 2026 Reform specs in `docs/topik-content-guide.md`.
