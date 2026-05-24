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
        - Instruct AI to look for \"overused TOPIK templates\" (e.g., overly rigid introductory phrases like \"\uac1c\uba85\uac1c\uba85... \u2014 \uc740 \ubc14\ub77c\uba70...\").
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
    - [Issue #510] Fix TypeScript type errors.

#### 7. Grammar Lessons [BUILT]
- **Files**: `product/src/app/grammar/page.tsx`, `product/src/app/grammar/[level]/page.tsx`, `product/src/lib/data/grammar.ts`
- **Improvements needed** (from QA):
    - [Issue #509] Fix critical build failure due to type error in `/grammar/page.tsx`.
    - [Issue #510] Fix TypeScript type errors.

#### 8. Reading Comprehension Practice [BUILT]
- **Files**: `product/src/app/reading/page.tsx`, `product/src/lib/data/reading.ts`

### P1 \u2014 Fast Follow

#### 9. Writing Practice with AI Feedback [BUILT]
- **Files**: `product/src/app/writing/page.tsx`, `product/src/app/api/writing-feedback/route.ts`
- **Note**: Now includes 2026 Anti-Template logic.

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

#### 15. AI-Powered Weakness Analysis [BUILT]
- **Files**: `product/src/app/api/analyze-weaknesses/route.ts`, `product/src/components/dashboard/WeaknessReport.tsx`

#### 16. Dynamic Study Plan [BUILT]
- **Files**: `product/src/app/api/study-plan/route.ts`, `product/src/components/dashboard/DailyPlan.tsx`

#### 17. Writing Speed Trainer [BUILT]
- **Goal**: Help users improve Korean typing speed for the IBT exam.
- **Files**: `product/src/app/writing/typing-trainer/page.tsx`
- **Resolved**: [Issue #450] Fixed setState in effect in TypingTrainer.tsx.

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

#### 19. Content Library Expansion [IN PROGRESS]
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
        - Structure: Categorized by Level -> Theme -> Word/Meaning/Example.
- **Implementation**:
    - Update `product/src/lib/data/` files.
    - Split JSON files if they exceed 5MB (e.g., `reading-set-1.ts`, `reading-set-2.ts`).
    - **Migration**: Migrate static content to Supabase for scalability (Issue #496).
- **Acceptance Criteria**:
    - Users can select from at least 20 different mock tests.
    - Every passage type in the Content Guide is represented.
    - Writing prompts cover a diverse range of researched social/academic topics.
- **Files affected**: `product/src/lib/data/mock-tests.ts`, `product/src/lib/data/listening.ts`, `product/src/lib/data/reading.ts`, `product/src/lib/data/vocabulary.ts`.
- **Current Progress**:
    - Vocabulary expanded to 222+ words.
    - Listening expanded to 20 passages.
    - Reading expanded to 25 passages including Literature type.
    - Writing samples expanded to cover more prompts and levels.

#### 20. Writing Comparative Analysis [BUILT]
- **Goal**: Allow users to compare their essays against high-scoring (Level 6) model answers.
- **Files**: `product/src/app/writing/compare/page.tsx`, `product/src/app/api/writing-compare/route.ts`
- **Resolved**: [Issue #497, #498, #504] Build failures and syntax errors resolved.

#### 21. Writing Sample Library [BUILT]
- **Goal**: Provide a searchable repository of model essays for different levels and topics.
- **Files**: `product/src/app/writing/samples/page.tsx`

#### 22. Essay Outliner [BUILT]
- **Goal**: AI-powered tool to help users structure their thoughts before writing the full essay.
- **Files**: `product/src/app/api/writing-outliner/route.ts` (Frontend integrated into Writing page).

#### 23. Audio-Text Sync [IN PROGRESS]
- **Goal**: Highlight the transcript in real-time as the audio plays in Listening modules.
- **Priority**: P2
- **Detailed Requirements**:
    - **Data Structure**:
        - The `ListeningPassage` type must be updated to include a `transcript` array:
          ```typescript
          type TranscriptLine = {
            startTime: number; // seconds
            endTime: number; // seconds
            text: string;
          };
          ```
    - **UI/UX Implementation**:
        - Create a new component `product/src/components/listening/Transcript.tsx` to render the transcript.
        - Integrate `Transcript.tsx` into `product/src/app/listening/page.tsx`.
        - Use a `requestAnimationFrame` loop or the `onTimeUpdate` event of the HTML5 Audio element to track `currentTime`.
        - Apply a highlight class (e.g., `bg-yellow-100 text-indigo-900 font-semibold`) to the line where `currentTime >= startTime && currentTime < endTime`.
    - **Interactivity**:
        - Clicking on any line in the transcript should seek the audio player to that line's `startTime`.
    - **Compatibility**:
        - Must function correctly when \"2026 Mode\" (1.1x speed) is enabled.
- **Acceptance Criteria**:
    - Text highlighting is visually synchronized with the audio (tolerance: \u00b10.5s).
    - Clicking a transcript line jumps the audio to the correct timestamp.
    - Highlighting persists across the entire length of the audio file.
- **Files affected**: `product/src/app/listening/page.tsx`, `product/src/components/listening/Transcript.tsx`, `product/src/lib/data/listening.ts`.
- **Current Progress**: Assigned to CTO (Issue #505).

#### 24. Unified Design System [IN PROGRESS]
- **Goal**: Implement a consistent UI framework across all pages to eliminate visual discrepancies.
- **Priority**: P2
- **Detailed Requirements**:
    - **Audit Phase**:
        - Review all main pages: `dashboard`, `grammar`, `listening`, `mock-test`, `reading`, `vocabulary`, `writing`.
        - Identify all custom Tailwind implementations that deviate from `design/component-spec.md`.
    - **Implementation Phase**:
        - **Shared Component Library**: Create/update a set of reusable UI components in `product/src/components/ui/` that encapsulate the styles defined in `design/component-spec.md`.
            - `Button.tsx` (Variants: Primary, Secondary, Outline, Danger, Ghost)
            - `Card.tsx` (Types: Feature, Study, Flashcard, Quiz)
            - `Input.tsx` (Text, Select, Textarea with consistent focus/error states)
        - **Refactor**: Replace all one-off Tailwind classes in pages with these shared components.
        - **Typography**: Ensure `Noto Sans KR` is applied consistently to all Korean text.
    - **Consistency Check**:
        - Verify that spacing (padding/margins) and color palettes are uniform across the entire application.
- **Acceptance Criteria**:
    - 100% of UI components align with the specifications in `design/component-spec.md`.
    - No \"one-off\" custom styles for core components (buttons, inputs, cards).
- **Files affected**: `product/src/components/ui/`, all main page files in `product/src/app/`.
- **Current Progress**: Core UI components (`Button`, `Card`, `Modal`) created. Refactor of pages pending.

#### 25. Performance Optimization [IN PROGRESS]
- **Goal**: Reduce load times and improve scrolling performance for large content sets (Vocabulary, Reading).
- **Priority**: P2
- **Detailed Requirements**:
    - **Lazy Loading**:
        - Use `next/dynamic` or dynamic `import()` for importing large data files in `product/src/lib/data/` to prevent blocking the main thread on initial page load.
    - **List Virtualization**:
        - Implement `react-virtuoso` for the Vocabulary Builder and Reading lists.
        - This ensures only the visible items in the viewport are rendered, preventing DOM overload.
        - Must support dynamic item heights (since vocabulary examples and reading passages vary in length).
    - **Supabase Integration (Post-Migration)**:
        - Once Issue #496 (Supabase Migration) is complete, replace large JSON imports with targeted Supabase queries.
        - Implement server-side pagination (limit/offset) to fetch data in chunks.
- **Acceptance Criteria**:
    - Initial page load time for Vocabulary and Reading pages is reduced.
    - Scrolling is smooth (60fps) regardless of the number of items in the list.
    - Memory usage remains stable during navigation.
- **Files affected**: `product/src/app/vocabulary/page.tsx`, `product/src/app/reading/page.tsx`, `product/src/lib/data/`.
- **Current Progress**: Assigned to CTO (Issue #506).

#### 26. TOPIK Speaking Simulator [READY FOR DEV]
- **Goal**: Implement a high-fidelity simulator for the standalone TOPIK Speaking IBT exam.
- **Priority**: P2
- **Detailed Requirements**:
    - **Simulation Flow**:
        - Implement the 6-task sequence based on official IBT guidelines:
            - Task 1: Simple question (Prep: 20s, Response: 30s)
            - Task 2: Role-play based on images (Prep: 30s, Response: 40s)
            - Task 3: Story based on images (Prep: 40s, Response: 60s)
            - Task 4: Completing a story/dialog (Prep: 40s, Response: 60s)
            - Task 5: Analyzing material (Prep: 70s, Response: 80s)
            - Task 6: Opinion on a topic (Prep: 70s, Response: 80s)
        - Implement a two-phase timer for each task: `Preparation Phase` (read-only) \u2192 `Recording Phase` (recording active).
    - **Technical Implementation**:
        - **Frontend Architecture**:
            - Main Page: `product/src/app/speaking/page.tsx`
            - Recording Component: `product/src/components/speaking/Recorder.tsx` (using Web Audio API)
            - Task Component: `product/src/components/speaking/SpeakingTask.tsx`
            - Feedback Component: `product/src/components/speaking/FeedbackReport.tsx`
            - Data Store: `product/src/lib/data/speaking-prompts.ts`
        - **Audio Capture**: Use MediaRecorder API to capture user responses.
        - **AI Evaluation Pipeline**:
            - Route: `product/src/app/api/speaking-evaluate/route.ts`
            - Logic: Send audio file to STT (Whisper) \u2192 Send transcription to LLM with TOPIK Speaking Rubric \u2192 Return structured evaluation.
        - **Data Structures**:
          ```typescript
          type SpeakingTask = {
            id: string;
            taskNumber: number;
            promptType: 'text' | 'image' | 'audio';
            promptText: string;
            promptImage?: string;
            promptAudio?: string;
            prepTime: number; // seconds
            responseTime: number; // seconds;
          };

          type SpeakingEvaluation = {
            predictedLevel: number;
            scaledScore: number;
            rubric: {
              pronunciation: { score: number; feedback: string };
              fluency: { score: number; feedback: string };
              languageUse: { score: number; feedback: string };
              content: { score: number; feedback: string };
            };
            transcription: string;
            suggestions: string[];
          };
          ```
    - **UI/UX**:
        - Implement states from `docs/ui-ux-spec-speaking.md`:
            - Preparation: `slate-100` bg, static prompt, countdown timer.
            - Recording: `indigo-50` bg, pulsing mic indicator, real-time SVG waveform, `rose-500` timer.
            - Report: Level badge, rubric progress bars, transcription with corrections.
    - **Acceptance Criteria**:
        - User can complete all 6 tasks in sequence.
        - Timer strictly prevents recording during the preparation phase.
        - AI feedback provides a breakdown across the four rubric dimensions.
        - Audio is recorded and sent to the API correctly.
- **Files affected**: `product/src/app/speaking/page.tsx`, `product/src/app/api/speaking-evaluate/route.ts`, `product/src/components/speaking/Recorder.tsx`, `product/src/components/speaking/SpeakingTask.tsx`, `product/src/components/speaking/FeedbackReport.tsx`, `product/src/lib/data/speaking-prompts.ts`.
- **Current Progress**: Assigned to CTO (Issue #517).

#### 27. TOPIK Placement Test [PENDING]
- **Goal**: Provide an initial assessment to determine the user's current TOPIK level and generate a tailored study path.
- **Priority**: P2
- **Detailed Requirements**:
    - **Test Structure**:
        - A condensed version of the TOPIK II exam.
        - 10 Listening questions (sampling Levels 3-6).
        - 10 Reading questions (sampling Levels 3-4 and 5-6).
        - A short writing prompt (optional/AI-evaluated).
    - **Scoring Logic**:
        - Dynamic difficulty: If a user answers Level 3 questions correctly, serve Level 4.
        - Map total score to TOPIK levels (e.g., 0-40: Level 2 or below, 41-70: Level 3, etc.).
    - **Integration**:
        - Result feeds directly into the `Dynamic Study Plan` logic.
        - Redirect user to the Dashboard with their predicted level and a \"Start Learning\" button.
- **Acceptance Criteria**:
    - User can complete the placement test in < 30 minutes.
    - The predicted level aligns with the user's actual ability (within 1 level).
    - The study plan is automatically updated based on the result.
- **Files affected**: `product/src/app/placement-test/page.tsx`, `product/src/app/api/placement-test/route.ts`.

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
