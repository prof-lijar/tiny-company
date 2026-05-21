# TOPIK Learning Assistant \u2014 MVP Product Specification

## Overview

A web-based TOPIK (Test of Proficiency in Korean) preparation platform built with Next.js, TypeScript, and Tailwind CSS. All product code lives in the `product/` directory.

## Feature Priorities

### P0 \u2014 MVP (Build First)

#### 1. Landing Page [BUILT]
- **File**: `product/src/app/page.tsx`
- **User Story**: As a prospective user, I want to understand the value proposition and pricing of the platform so that I can decide to start studying.
- **Acceptance Criteria**:
    - Hero section clearly states \"The Ultimate AI-Powered TOPIK II Prep Platform\".
    - Feature section highlights Vocabulary (SRS), Grammar, Reading, Writing (AI), and Mock Tests.
    - Pricing table compares Free vs Pro tiers.
    - Call-to-action (CTA) buttons lead to the study sections.
    - Responsive design.

#### 2. Vocabulary Builder with SRS [BUILT]
- **Files**: `product/src/app/vocabulary/page.tsx`, `product/src/lib/srs.ts`, `product/src/lib/data/vocabulary.ts`
- **User Story**: As a learner, I want to study vocabulary filtered by TOPIK level using a spaced-repetition system so that I can memorize words efficiently.
- **Acceptance Criteria**:
    - User can filter words by TOPIK level (3, 4, 5, 6).
    - Flashcard interface: Front (Korean + Audio), Back (English + Example).
    - SRS Interaction: User marks word as \"Easy\", \"Good\", or \"Hard\".
    - Progress bar showing percentage of words mastered.
- **Improvements needed** (from QA):
    - [Issue #391] Fix inline styles in Vocabulary progress bar.

#### 3. Grammar Lessons [BUILT]
- **Files**: `product/src/app/grammar/page.tsx`, `product/src/app/grammar/[level]/page.tsx`, `product/src/lib/data/grammar.ts`
- **User Story**: As a learner, I want to study grammar patterns organized by level so that I can build a strong foundation for the writing and reading sections.
- **Acceptance Criteria**:
    - Grammar index page lists levels 3-6.
    - Level page lists all grammar patterns for that level.
    - Lesson page includes: Pattern, Explanation, 3+ Examples, Usage Note.

#### 4. Reading Comprehension Practice [BUILT]
- **Files**: `product/src/app/reading/page.tsx`, `product/src/lib/data/reading.ts`
- **User Story**: As a learner, I want to practice with TOPIK-style passages and questions so that I can improve my reading speed and accuracy.
- **Acceptance Criteria**:
    - List of practice passages categorized by type and level.
    - Reading interface: Split-screen (passage vs questions).
    - Immediate feedback: Correct/Incorrect indicator.
    - Detailed explanation for the correct answer.

### P1 \u2014 Fast Follow

#### 5. Writing Practice with AI Feedback [BUILT]
- **Files**: `product/src/app/writing/page.tsx`, `product/src/app/api/writing-feedback/route.ts`
- **User Story**: As a learner, I want AI-powered feedback on my writing tasks so that I can identify and fix my grammatical and structural errors.
- **Acceptance Criteria**:
    - Prompts for Tasks 51, 52, 53, and 54.
    - Text area with real-time character count.
    - AI Feedback provides: Corrected version, Analysis, Estimated score.

#### 6. Mock Test Simulator [BUILT]
- **Files**: `product/src/app/mock-test/page.tsx`, `product/src/app/mock-test/[section]/page.tsx`
- **User Story**: As a learner, I want to take a full-length timed mock test in an IBT environment so that I can simulate the real exam experience.
- **Acceptance Criteria**:
    - Timer that counts down for each section.
    - Interface mirrors the IBT layout.
    - Automatic submission when time expires.
    - Scoring summary with breakdown.

#### 7. Listening Practice [BUILT]
- **Files**: `product/src/app/listening/page.tsx`, `product/src/lib/data/listening.ts`
- **User Story**: As a learner, I want to practice listening comprehension with audio clips and TOPIK-style questions.
- **Acceptance Criteria**:
    - Audio player with play/pause/replay.
    - Questions presented after the audio.
    - Ability to read transcripts after completion.

### P2 \u2014 Growth Features

#### 8. User Authentication [BUILT]
- **Files**: `product/src/app/api/auth/[...nextauth]/route.ts`, `product/src/app/login/page.tsx`, `product/src/app/signup/page.tsx`
- **User Story**: As a learner, I want to create an account so that my study progress and test scores are saved across devices.
- **Detailed Requirements**:
    - **Auth Provider**: Implementation via NextAuth.js or Clerk.
    - **Registration**: Fields: Full Name, Email, Password, Target TOPIK Level (3-6).
    - **Login**: Email/Password and Google OAuth.
    - **Session**: JWT-based session management.
    - **Profile**: User can update their target level and password.
- **Acceptance Criteria**:
    - User can sign up and log in.
    - User is redirected to Dashboard after login.
    - Protected routes prevent unauthenticated access to study features.

#### 9. Progress Dashboard [BUILT]
- **Files**: `product/src/app/dashboard/page.tsx`, `product/src/components/dashboard/StatsGrid.tsx`, `product/src/components/dashboard/ScoreChart.tsx`
- **User Story**: As a learner, I want to visualize my progress so that I can identify my weaknesses and stay motivated.
- **Detailed Requirements**:
    - **Vocabulary Mastery**: Progress bar showing % of words mastered in the current target level.
    - **Grammar Completion**: % of patterns marked as 'completed' per level.
    - **Score Trends**: A line chart showing the average score of Reading and Listening practice over time.
    - **Study Streak**: A counter showing consecutive days of activity.
    - **Estimated Level**: A dynamic label (e.g., \"Current Level: 4\") based on overall performance.
- **Acceptance Criteria**:
    - Dashboard displays real user data from the database.
    - Score trends are visualized using a chart (e.g., Recharts).
    - Streak counter increments on daily login/study activity.

#### 10. Subscription Billing [BUILT]
- **Files**: `product/src/app/api/stripe/checkout/route.ts`, `product/src/app/api/stripe/webhook/route.ts`
- **User Story**: As a learner, I want to upgrade to a Pro plan so that I can access unlimited mock tests and AI writing feedback.
- **Detailed Requirements**:
    - **Provider**: Stripe integration for payments.
    - **Pricing Tiers**:
        - **Free**: 50 vocab words/day, basic grammar, 1 mock test/month.
        - **Pro ($12/mo)**: Unlimited vocab, full grammar, unlimited mock tests, unlimited AI writing feedback.
    - **Paywall Logic**: Middleware that checks `user.subscriptionTier` and redirects to pricing page if a Pro feature is accessed.
    - **Checkout Flow**: Landing Page $\\rightarrow$ Pricing $\\rightarrow$ Stripe Checkout $\\rightarrow$ Confirmation $\\rightarrow$ Dashboard.
- **Acceptance Criteria**:
    - Successful payment updates user tier to 'pro' in the database.
    - Pro users have access to previously locked features.
    - Users can manage or cancel their subscription via a billing portal.

### P3 \u2014 AI Intelligence (Future)

#### 11. AI-Powered Weakness Analysis [BUILT]
- **Files**: `product/src/app/api/analyze-weaknesses/route.ts`, `product/src/components/dashboard/WeaknessReport.tsx`
- **User Story**: As a learner, I want the system to analyze my mistakes across mock tests and practice sessions so that I know exactly which grammar patterns or vocabulary themes I need to review.
- **Detailed Requirements**:
    - **Data Aggregation**: System collects all incorrect answers from the user's history.
    - **Tagging System**: Each question in the database must be tagged with a grammar pattern (e.g., `-기 때문에`) or a vocab theme (e.g., `Environment`).
    - **Analysis Engine**:
        - Identifies patterns with the highest error rate.
        - Uses LLM to explain *why* these are common pitfalls for the user.
    - **Recommendation System**: Maps identified weaknesses to specific lessons in the Grammar Library or Vocabulary Builder.
- **Acceptance Criteria**:
    - User can trigger a \"Weakness Analysis\" from the Dashboard.
    - Report displays a list of top 3-5 \"Weak Areas\".
    - Each weak area has a direct link to the relevant study material.
    - Analysis is based on real user performance data.

#### 12. Dynamic Study Plan [PENDING]
- **Files**: `product/src/app/api/study-plan/route.ts`, `product/src/components/dashboard/DailyPlan.tsx`
- **User Story**: As a learner, I want a personalized daily study schedule based on my target exam date and weaknesses so that I can prepare efficiently without feeling overwhelmed.
- **Detailed Requirements**:
    - **Input**: User provides their target TOPIK exam date in their profile.
    - **Algorithm**: 
        - Calculate total days remaining until the exam.
        - Distribute remaining vocabulary and grammar patterns across the available days.
        - Prioritize items identified as \"Weak Areas\" in the Weakness Analysis.
        - Allocate specific days for Mock Tests (e.g., every Sunday).
    - **Daily To-Do List**:
        - X number of Vocab words to review (SRS) and Y new words to learn.
        - Z number of Grammar patterns to study.
        - 1-2 Reading or Listening exercises.
        - A Writing prompt (for Pro users) every 2-3 days.
    - **Tracking**: 
        - Checkboxes for daily tasks.
        - Progress bar showing % of the total plan completed.
        - \"Days Remaining\" countdown timer on the dashboard.
- **Acceptance Criteria**:
    - User can set and update their target exam date.
    - Dashboard displays a \"Today's Plan\" section with actionable tasks.
    - The plan dynamically adjusts if the user completes tasks early or fails a mock test (increasing focus on weak areas).
    - Completion of daily tasks increments the user's study streak.

## User Flows

### 1. Vocabulary Study Flow
`Landing Page` $\\rightarrow$ `Vocabulary Page` $\\rightarrow$ `Select Level (3-6)` $\\rightarrow$ `Flashcard Front` $\\rightarrow$ `Flip Card` $\\rightarrow$ `Rate Difficulty (Easy/Hard)` $\\rightarrow$ `Next Card` $\\rightarrow$ `Session Summary`.

### 2. Grammar Lesson Flow
`Landing Page` $\\rightarrow$ `Grammar Page` $\\rightarrow$ `Select Level` $\\rightarrow$ `Select Pattern` $\\rightarrow$ `Read Explanation & Examples` $\\rightarrow$ `Mark as Completed` $\\rightarrow$ `Return to Level List`.

### 3. Reading Practice Flow
`Landing Page` $\\rightarrow$ `Reading Page` $\\rightarrow$ `Select Passage` $\\rightarrow$ `Read Text` $\\rightarrow$ `Select Multiple Choice Answers` $\\rightarrow$ `Submit` $\\rightarrow$ `Review Explanations` $\\rightarrow$ `Return to List`.

## Data Model (Conceptual)

```
User
  - id, email, name, created_at
  - subscription_tier (free/pro)
  - target_level (3-6)
  - target_exam_date (Date)
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
  - questions[]: { question, options[], correct_answer, explanation, tags[] }

WritingPrompt
  - id, level, type (short_paragraph/essay)
  - prompt_text, word_limit, scoring_criteria

StudyPlan
  - id, user_id
  - startDate, endDate
  - dailyGoals: { date: Date, tasks: Task[] }

Task
  - id, type (vocab/grammar/reading/writing/test)
  - referenceId (word_id/lesson_id/etc)
  - status (pending/completed)
  - completedAt (DateTime)
```

## UI/UX Requirements

- **Typography**: Noto Sans KR for Korean text to ensure readability.
- **Layout**: Clean, distraction-free \"Study Mode\".
- **Accessibility**: High contrast and clear visual cues for correct/incorrect answers.
- **Responsiveness**: Desktop-first design (for serious study) but fully responsive for mobile review.

## Content Guidelines

- All TOPIK practice content must be ORIGINAL \u2014 do not reproduce actual TOPIK questions.
- Label content as \"TOPIK-style practice\" throughout the app.
- Vocabulary and grammar must align with the levels defined in `docs/topik-content-guide.md`.
