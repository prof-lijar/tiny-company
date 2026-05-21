# TOPIK Learning Assistant \u2014 MVP Product Specification

## Overview
A web-based TOPIK (Test of Proficiency in Korean) preparation platform built with Next.js, TypeScript, and Tailwind CSS. All product code lives in the `product/` directory.

## Feature Priorities

### P0 \u2014 CRITICAL: 2026 Format Alignment [BUILT]
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
        - Add a \"2026 Mode\" toggle in the listening interface.
        - When enabled, audio plays at 1.1x.
        - Display a badge: \"2026 Speed (1.1x)\".
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
        - Instruct AI to look for \"overused TOPIK templates\" (e.g., overly rigid introductory phrases like \"\uac1c\uba85\uac1c\uba85... \uc740 \ubc14\ub77c\uc73c\ub85c...\").
        - Penalize \"memorized\" structures that don't specifically address the prompt's nuances.
    - **Feedback Output**:
        - Explicitly label \"Template Usage\" in the feedback report.
        - Suggest \"Natural Alternatives\" to replace formulaic phrases.
        - Rate \"Structural Variety\" on a scale of 1-5.
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

### P0 \u2014 MVP (Build First)

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

### P1 \u2014 Fast Follow

#### 9. Writing Practice with AI Feedback [BUILT]
- **Files**: `product/src/app/writing/page.tsx`, `product/src/app/api/writing-feedback/route.ts`
- **Resolved**: [Issue #421] Removed unused variables.
- **Note**: Now includes 2026 Anti-Template logic.

#### 10. Mock Test Simulator [BUILT]
- **Files**: `product/src/app/mock-test/page.tsx`, `product/src/app/mock-test/[section]/page.tsx`
- **Note**: Now superseded by P0 \"2026 Format Alignment\".

#### 11. Listening Practice [BUILT]
- **Files**: `product/src/app/listening/page.tsx`, `product/src/lib/data/listening.ts`
- **Improvements needed** (from QA):
    - [Issue #431] Fix lint errors in ListeningPlayer.

### P2 \u2014 Growth Features

#### 12. User Authentication [BUILT]
- **Files**: `product/src/app/api/auth/[...nextauth]/route.ts`, `product/src/app/login/page.tsx`, `product/src/app/signup/page.tsx`

#### 13. Progress Dashboard [BUILT]
- **Files**: `product/src/app/dashboard/page.tsx`, `product/src/components/dashboard/StatsGrid.tsx`, `product/src/components/dashboard/ScoreChart.tsx`

#### 14. Subscription Billing [BUILT]
- **Files**: `product/src/app/api/stripe/checkout/route.ts`, `product/src/app/api/stripe/webhook/route.ts`

### P3 \u2014 AI Intelligence (Future)

#### 15. AI-Powered Weakness Analysis [BUILT]
- **Files**: `product/src/app/api/analyze-weaknesses/route.ts`, `product/src/components/dashboard/WeaknessReport.tsx`

#### 16. Dynamic Study Plan [BUILT]
- **Files**: `product/src/app/api/study-plan/route.ts`, `product/src/components/dashboard/DailyPlan.tsx`
- **Resolved**: [Issue #407] \"Update Date\" button logic fixed.

#### 17. Writing Speed Trainer [NEEDS IMPROVEMENT]
- **Goal**: Help users improve Korean typing speed for the IBT exam.
- **Files**: `product/src/app/writing/typing-trainer/page.tsx`
- **Improvements needed** (from QA):
    - [Issue #440] Fix lint errors in Writing Speed Trainer.
    - [Issue #450] Fix setState in effect in TypingTrainer.tsx.

#### 18. Strict IBT Simulation Mode [BUILT]
- **Goal**: Provide a high-fidelity \"Exam Mode\" that eliminates all study aids and mimics the official IBT interface.
- **Detailed Requirements**:
    - **UI Constraints**: 
        - Disable all tooltips, hints, and translations.
        - Remove SRS-related progress markers.
        - Implement a strict, non-pausable timer.
        - Layout: a split-screen or fixed-pane view mirroring the official IBT (Question pane vs. Answer pane).
    - **Functional Constraints**:
        - Prevent navigation back to the dashboard during the test.
        - Results are hidden until the final \"Submit\" is clicked for the entire test.
        - Implement a \"Submit\" confirmation modal to prevent accidental early submission.
    - **Technical Implementation**:
        - Implemented as a high-level state toggle in `product/src/app/mock-test/page.tsx`.
        - Includes a Question Palette for quick navigation.
- **Acceptance Criteria**:
    - User cannot access any helpful UI elements during the session.
    - Timer continues to run regardless of user activity.
    - Interface visually aligns with IBT standards (no annotations, plain text editor).
- **Files affected**: `product/src/app/mock-test/page.tsx`.

#### 19. Content Library Expansion [PENDING]
- **Goal**: Expand practice materials to provide enough variety for full preparation (50+ sets).
- **Detailed Requirements**:
    - **Listening**: 
        - Target: 20+ unique sets.
        - Format: 60 questions per set.
        - Content: Must include high-speed (1.1x) audio files.
    - **Reading**: 
        - Target: 20+ unique sets.
        - Format: 40 questions per set.
        - Distribution: Each set MUST contain:
            - 1-2 Short Ads/Notices (Level 3-4)
            - 1-2 Short Essays/Blogs (Level 3-4)
            - 1-2 News Articles (Level 4-5)
            - 1 Academic/Opinion Piece (Level 5-6)
            - 1 Literature/Column Piece (Level 5-6)
    - **Writing**: 
        - Target: 30+ unique prompts for Task 54.
        - Focus: High-probability 2026 themes (AI, Ethics, Environment, Education).
    - **Vocabulary**: 
        - Target: ~12,000 words (Levels 3-6).
        - Structure: Categorized by Level $\\rightarrow$ Theme $\\rightarrow$ Word/Meaning/Example.
- **Implementation**:
    - Update `product/src/lib/data/` files.
    - Split JSON files if they exceed 5MB (e.g., `reading-set-1.ts`, `reading-set-2.ts`).
- **Acceptance Criteria**:
    - Users can select from at least 20 different mock tests.
    - Every passage type in the Content Guide is represented.
    - Writing prompts cover a diverse range of researched social/academic topics.
- **Files affected**: `product/src/lib/data/mock-tests.ts`, `product/src/lib/data/listening.ts`, `product/src/lib/data/reading.ts`, `product/src/lib/data/vocabulary.ts`.
- **Improvements needed** (from QA):
    - [Issue #459] Vocabulary database insufficient: only 20 words present.
    - [Issue #458] Listening content library insufficient: missing passages and questions.
    - [Issue #457] Reading content library insufficient: missing questions and Literature type.

## User Flows
(Unchanged)

## Data Model (Conceptual)
(Unchanged)

## UI/UX Requirements
- **Typography**: Noto Sans KR.
- **Layout**: Clean, distraction-free \"Study Mode\".
- **Responsiveness**: Desktop-first (IBT focus).

## Content Guidelines
- All TOPIK practice content must be ORIGINAL.
- Label content as \"TOPIK-style practice\".
- Align with 2026 Reform specs in `docs/topik-content-guide.md`.
