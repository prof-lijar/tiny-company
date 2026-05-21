# TOPIK Learning Assistant — MVP Product Specification

## Overview

A web-based TOPIK (Test of Proficiency in Korean) preparation platform built with Next.js, TypeScript, and Tailwind CSS. All product code lives in the `product/` directory.

## Feature Priorities

### P0 — MVP (Build First)

#### 1. Landing Page
- **File**: `product/src/app/page.tsx`
- **User Story**: As a prospective user, I want to understand the value proposition and pricing of the platform so that I can decide to start studying.
- **Acceptance Criteria**:
    - Hero section clearly states "The Ultimate AI-Powered TOPIK II Prep Platform".
    - Feature section highlights Vocabulary (SRS), Grammar, Reading, Writing (AI), and Mock Tests.
    - Pricing table compares Free vs Pro tiers (refer to `docs/vision.md`).
    - Call-to-action (CTA) buttons lead to the study sections.
    - Responsive design (Desktop optimized, Mobile friendly).

#### 2. Vocabulary Builder with SRS
- **Files**: `product/src/app/vocabulary/page.tsx`, `product/src/lib/srs.ts`, `product/src/lib/data/vocabulary.ts`
- **User Story**: As a learner, I want to study vocabulary filtered by TOPIK level using a spaced-repetition system so that I can memorize words efficiently.
- **Acceptance Criteria**:
    - User can filter words by TOPIK level (3, 4, 5, 6).
    - Flashcard interface:
        - Front: Korean word + Audio simulation (text-to-speech).
        - Back: English meaning + Example sentence in Korean + English translation.
    - SRS Interaction: User marks word as "Easy", "Good", or "Hard", which updates the `next_review_date` in the database.
    - Progress bar showing percentage of words mastered in the current level.

#### 3. Grammar Lessons
- **Files**: `product/src/app/grammar/page.tsx`, `product/src/app/grammar/[level]/page.tsx`, `product/src/lib/data/grammar.ts`
- **User Story**: As a learner, I want to study grammar patterns organized by level so that I can build a strong foundation for the writing and reading sections.
- **Acceptance Criteria**:
    - Grammar index page lists levels 3-6.
    - Level page lists all grammar patterns for that level.
    - Lesson page includes:
        - The grammar pattern (e.g., -기 때문에).
        - Clear explanation of meaning and usage.
        - 3+ example sentences with translations.
        - "Usage Note" section for common pitfalls or formality levels.

#### 4. Reading Comprehension Practice
- **Files**: `product/src/app/reading/page.tsx`, `product/src/lib/data/reading.ts`
- **User Story**: As a learner, I want to practice with TOPIK-style passages and questions so that I can improve my reading speed and accuracy.
- **Acceptance Criteria**:
    - List of practice passages categorized by type (Ads, News, Essays) and level.
    - Reading interface:
        - passage text on one side, questions on the other.
        - Multiple choice options (4 choices).
    - Immediate feedback: Correct/Incorrect indicator after submitting.
    - Detailed explanation for the correct answer.

### P1 — Fast Follow

#### 5. Writing Practice with AI Feedback
- **Files**: `product/src/app/writing/page.tsx`, `product/src/app/api/writing-feedback/route.ts`
- **User Story**: As a learner, I want AI-powered feedback on my writing tasks so that I can identify and fix my grammatical and structural errors.
- **Acceptance Criteria**:
    - Prompts for Tasks 51, 52, 53, and 54 (as defined in `docs/topik-content-guide.md`).
    - Text area with character count (crucial for TOPIK).
    - AI Feedback provides:
        - Corrected version of the text.
        - Analysis of grammar and vocabulary usage.
        - Estimated TOPIK score based on official criteria.

#### 6. Mock Test Simulator
- **Files**: `product/src/app/mock-test/page.tsx`, `product/src/app/mock-test/[section]/page.tsx`
- **User Story**: As a learner, I want to take a full-length timed mock test in an IBT environment so that I can simulate the real exam experience.
- **Acceptance Criteria**:
    - Timer that counts down for each section (Listening, Writing, Reading).
    - Interface mirrors the IBT (Internet-Based Test) layout.
    - Automatic submission when time expires.
    - Scoring summary with a breakdown of performance per section.

#### 7. Listening Practice
- **Files**: `product/src/app/listening/page.tsx`, `product/src/lib/data/listening.ts`
- **User Story**: As a learner, I want to practice listening comprehension with audio clips and TOPIK-style questions.
- **Acceptance Criteria**:
    - Audio player with play/pause/replay.
    - Questions presented after the audio (or during, depending on the task).
    - Ability to read transcripts after completing the exercise.

### P2 — Growth Features

#### 8. User Authentication
- Sign up / sign in with email/Google.
- User profile with target TOPIK level.

#### 9. Progress Dashboard
- **Files**: `product/src/app/dashboard/page.tsx`
- Visualizations of vocabulary mastery, grammar completed, and reading score trends.
- Study streak counter.

#### 10. Subscription Billing
- Stripe integration for Pro tier.
- Paywall for AI Writing Feedback and Mock Tests.

## User Flows

### 1. Vocabulary Study Flow
`Landing Page` $\rightarrow$ `Vocabulary Page` $\rightarrow$ `Select Level (3-6)` $\rightarrow$ `Flashcard Front` $\rightarrow$ `Flip Card` $\rightarrow$ `Rate Difficulty (Easy/Hard)` $\rightarrow$ `Next Card` $\rightarrow$ `Session Summary`.

### 2. Grammar Lesson Flow
`Landing Page` $\rightarrow$ `Grammar Page` $\rightarrow$ `Select Level` $\rightarrow$ `Select Pattern` $\rightarrow$ `Read Explanation & Examples` $\rightarrow$ `Mark as Completed` $\rightarrow$ `Return to Level List`.

### 3. Reading Practice Flow
`Landing Page` $\rightarrow$ `Reading Page` $\rightarrow$ `Select Passage` $\rightarrow$ `Read Text` $\rightarrow$ `Select Multiple Choice Answers` $\rightarrow$ `Submit` $\rightarrow$ `Review Explanations` $\rightarrow$ `Return to List`.

## Data Model (Conceptual)

```
User
  - id, email, name, created_at
  - subscription_tier (free/pro)
  - study_streak, total_study_time

VocabularyWord
  - id, korean, english, example_sentence, level (3-6)
  - part_of_speech, pronunciation

UserVocabularyProgress
  - user_id, word_id
  - ease_factor, interval, next_review_date
  - review_count, correct_count

GrammarLesson
  - id, level, title, pattern, explanation
  - examples[], usage_notes

ReadingPassage
  - id, level, title, content_korean
  - questions[]: { question, options[], correct_answer, explanation }

WritingPrompt
  - id, level, type (short_paragraph/essay)
  - prompt_text, word_limit, scoring_criteria
```

## UI/UX Requirements

- **Typography**: Noto Sans KR for Korean text to ensure readability.
- **Layout**: Clean, distraction-free "Study Mode".
- **Accessibility**: High contrast and clear visual cues for correct/incorrect answers.
- **Responsiveness**: Desktop-first design (for serious study) but fully responsive for mobile review.

## Content Guidelines

- All TOPIK practice content must be ORIGINAL — do not reproduce actual TOPIK questions.
- Label content as "TOPIK-style practice" throughout the app.
- Vocabulary and grammar must align with the levels defined in `docs/topik-content-guide.md`.
