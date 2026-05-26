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
- **Files affected**: `product/src/app/listening/page.tsx`, `product/src/lib/data/listening.ts`.

#### 3. Anti-Template Writing Feedback [BUILT]
- **Goal**: Update AI prompt to detect and penalize formulaic/memorized essay templates.
- **Detailed Requirements**:
    - **Prompt Engineering**: Update the system prompt in `product/src/app/api/writing-feedback/route.ts`.
    - **Detection Logic**: Instruct AI to look for \"overused TOPIK templates\".
    - **Feedback Output**: Explicitly label \"Template Usage\" in the feedback report.
- **Files affected**: `product/src/app/api/writing-feedback/route.ts`.

#### 4. Reading Speed Training [BUILT]
- **Requirements**: Adjust reading practice timers to reflect the tighter 2026 window.
- **Files affected**: `product/src/app/reading/page.tsx`.

---

### P0 \u2014 MVP (Build First)

#### 5. Landing Page [BUILT]
- **File**: `product/src/app/page.tsx`

#### 6. Vocabulary Builder with SRS [NEEDS IMPROVEMENT]
- **Files**: `product/src/app/vocabulary/page.tsx`, `product/src/lib/srs.ts`, `product/src/lib/data/vocabulary.ts`
- **Improvements needed**:
    - [Issue #529] General linting and 'any' type removal.

#### 7. Grammar Lessons [NEEDS IMPROVEMENT]
- **Files**: `product/src/app/grammar/page.tsx`, `product/src/app/grammar/[level]/page.tsx`, `product/src/lib/data/grammar.ts`
- **Improvements needed**:
    - [Issue #529] General linting and 'any' type removal.

#### 8. Reading Comprehension Practice [BUILT]
- **Files**: `product/src/app/reading/page.tsx`, `product/src/lib/data/reading.ts`

### P1 \u2014 Fast Follow

#### 9. Writing Practice with AI Feedback [NEEDS IMPROVEMENT]
- **Files**: `product/src/app/writing/page.tsx`, `product/src/app/api/writing-feedback/route.ts`
- **Improvements needed**:
    - [Issue #524] Replace mock implementation with real AI prompt (see `docs/ai-prompt-specs.md`).

#### 10. Mock Test Simulator [BUILT]
- **Files**: `product/src/app/mock-test/page.tsx`, `product/src/app/mock-test/[section]/page.tsx`

#### 11. Listening Practice [BUILT]
- **Files**: `product/src/app/listening/page.tsx`, `product/src/lib/data/listening.ts`

### P2 \u2014 Growth Features

#### 12. User Authentication [BUILT]
- **Files**: `product/src/app/api/auth/[...nextauth]/route.ts`, `product/src/app/login/page.tsx`, `product/src/app/signup/page.tsx`

#### 13. Progress Dashboard [BUILT]
- **Files**: `product/src/app/dashboard/page.tsx`, `product/src/components/dashboard/StatsGrid.tsx`, `product/src/components/dashboard/ScoreChart.tsx`

#### 14. Subscription Billing [BUILT]
- **Files**: `product/src/app/api/stripe/checkout/route.ts`, `product/src/app/api/stripe/webhook/route.ts`

### P3 \u2014 AI Intelligence (Future)

#### 15. AI-Powered Weakness Analysis [NEEDS IMPROVEMENT]
- **Files**: `product/src/app/api/analyze-weaknesses/route.ts`, `product/src/components/dashboard/WeaknessReport.tsx`
- **Improvements needed**:
    - [Issue #527] Replace mock implementation with real AI prompt (see `docs/ai-prompt-specs.md`).

#### 16. Dynamic Study Plan [BUILT]
- **Files**: `product/src/app/api/study-plan/route.ts`, `product/src/components/dashboard/DailyPlan.tsx`

#### 17. Writing Speed Trainer [BUILT]
- **Goal**: Help users improve Korean typing speed for the IBT exam.
- **Files**: `product/src/app/writing/typing-trainer/page.tsx`

#### 18. Strict IBT Simulation Mode [BUILT]
- **Goal**: Provide a high-fidelity \"Exam Mode\" that mimics the official IBT interface.
- **Files affected**: `product/src/app/mock-test/page.tsx`.

#### 19. Content Library Expansion [IN PROGRESS]
- **Goal**: Expand practice materials to 50+ sets.
- **Current Progress**: [Issue #496] Migration to Supabase in progress.

#### 20. Writing Comparative Analysis [NEEDS IMPROVEMENT]
- **Goal**: Allow users to compare their essays against Level 6 model answers.
- **Files**: `product/src/app/writing/compare/page.tsx`, `product/src/app/api/writing-compare/route.ts`
- **Improvements needed**:
    - [Issue #525] Replace mock implementation with real AI prompt (see `docs/ai-prompt-specs.md`).

#### 21. Writing Sample Library [BUILT]
- **Files**: `product/src/app/writing/samples/page.tsx`

#### 22. Essay Outliner [NEEDS IMPROVEMENT]
- **Goal**: AI-powered tool to help users structure their thoughts.
- **Files**: `product/src/app/api/writing-outliner/route.ts`
- **Improvements needed**:
    - [Issue #526] Replace mock implementation with real AI prompt (see `docs/ai-prompt-specs.md`).

#### 23. Audio-Text Sync [IN PROGRESS]
- **Goal**: Highlight the transcript in real-time as the audio plays.
- **Current Progress**: [Issue #505] Assigned to CTO.

#### 24. Unified Design System [IN PROGRESS]
- **Goal**: Implement a consistent UI framework across all pages.
- **Current Progress**: [Issue #530] Assigned to CTO.

#### 25. Performance Optimization [IN PROGRESS]
- **Goal**: Reduce load times and improve scrolling for large content sets.
- **Current Progress**: [Issue #506] Assigned to CTO.

#### 26. TOPIK Speaking Simulator [IN PROGRESS]
- **Goal**: Implement a high-fidelity simulator for the standalone TOPIK Speaking IBT exam.
- **Current Progress**: [Issue #517] Assigned to CTO.

#### 27. TOPIK Placement Test [IN PROGRESS]
- **Goal**: Provide an initial assessment to determine the user's current TOPIK level.
- **Current Progress**: [Issue #528] Assigned to CTO.

#### 28. AI Pronunciation & Intonation Trainer [IN PROGRESS]
- **Goal**: Help users master the natural rhythm, pitch, and intonation of Korean speech, specifically for the TOPIK Speaking IBT.
- **User Flow**:
    1. **Select Phrase**: User chooses a phrase from a level-categorized list (L3-L6).
    2. **Reference Audio**: User listens to a native speaker's recording of the phrase.
    3. **Record**: User records their own version of the phrase.
    4. **Visual Analysis**: System overlays the user's pitch contour (F0) against the native reference contour.
    5. **AI Feedback**: AI analyzes the transcription and pitch data to provide specific tips (e.g., \"Your pitch should rise more at the end of this question\").
    6. **Retry**: User can re-record until they reach a target accuracy score.
- **Technical Requirements**:
    - **Frontend**: Web Audio API for recording and basic visualization.
    - **Pitch Detection**: Implementation of a pitch-tracking algorithm using the `pitchfinder` library to extract F0.
    - **Comparison**: Use Dynamic Time Warping (DTW) to align user audio with reference audio for contour comparison.
    - **Feedback API**: Create `/api/speaking-analyze-pitch` to process audio and generate textual feedback via LLM.
- **Files to be created**:
    - `product/src/app/speaking/pronunciation-trainer/page.tsx`
    - `product/src/components/speaking/PitchVisualizer.tsx`
    - `product/src/app/api/speaking-analyze-pitch/route.ts`
    - `product/src/lib/audio-utils.ts` (for pitch extraction logic)
- **Acceptance Criteria**:
    - User can record audio and see a real-time waveform.
    - User can see a pitch contour overlay comparing their voice to a native speaker.
    - AI provides at least one specific actionable tip on intonation per recording.
    - The trainer includes at least 20 phrases per level (L3-L6).
- **Priority**: P3
- **Current Progress**: [Issue #539] Assigned to CTO.

#### 29. 2026 High-Probability Theme Pack [IN PROGRESS]
- **Goal**: Create a specialized set of reading and writing materials focused on the most likely themes for the 2026 exams (AI Ethics, Circular Economy, etc.).
- **Requirements**:
    - **Content**: 10x Reading passages and 10x Writing prompts based on the \"High-Probability Themes\" in `docs/topik-content-guide.md`.
    - **Integration**: Add a \"2026 Trend\" tag to these items in the content library.
    - **User Flow**: Users can filter practice materials by \"2026 Trends\".
- **Priority**: P2
- **Status**: [IN PROGRESS] (Issue #541)
