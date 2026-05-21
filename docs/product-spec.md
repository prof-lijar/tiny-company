# TOPIK Learning Assistant — MVP Product Specification

## Overview

A web-based TOPIK (Test of Proficiency in Korean) preparation platform built with
Next.js, TypeScript, and Tailwind CSS. All product code lives in the `product/` directory.

## Feature Priorities

### P0 — MVP (Build First)

#### 1. Landing Page
- **File**: `product/src/app/page.tsx`
- Hero section with value proposition
- Feature highlights (vocabulary, grammar, reading, writing, mock tests)
- Pricing section (free vs pro tier)
- Call-to-action buttons
- Responsive design, Korean/English bilingual elements

#### 2. Vocabulary Builder with SRS
- **Files**: `product/src/app/vocabulary/page.tsx`, `product/src/lib/srs.ts`, `product/src/lib/data/vocabulary.ts`
- Flashcard interface showing Korean word, meaning, example sentence
- Spaced repetition algorithm (SM-2 or simplified version)
- Filter by TOPIK level (3, 4, 5, 6)
- Track known/unknown words
- Sample data: 30-50 words per level with definitions and example sentences

#### 3. Grammar Lessons
- **Files**: `product/src/app/grammar/page.tsx`, `product/src/app/grammar/[level]/page.tsx`, `product/src/lib/data/grammar.ts`
- Lesson list organized by TOPIK level
- Each lesson: grammar pattern, explanation, 3+ example sentences, usage notes
- Navigation between lessons
- Sample data: 5-10 grammar patterns per level

#### 4. Reading Comprehension Practice
- **Files**: `product/src/app/reading/page.tsx`, `product/src/lib/data/reading.ts`
- TOPIK-format reading passages with multiple choice questions
- Show passage, then 3-5 questions per passage
- Score tracking per session
- Sample data: 3-5 reading passages with questions

### P1 — Fast Follow

#### 5. Writing Practice with AI Feedback
- **Files**: `product/src/app/writing/page.tsx`, `product/src/app/api/writing-feedback/route.ts`
- Writing prompts matching TOPIK II format (short paragraph + essay)
- Text input area with Korean keyboard support
- AI-powered feedback on grammar, vocabulary usage, structure, and TOPIK scoring criteria
- Character/word count display

#### 6. Mock Test Simulator
- **Files**: `product/src/app/mock-test/page.tsx`, `product/src/app/mock-test/[section]/page.tsx`
- Timed test simulation matching TOPIK IBT format
- Sections: Listening, Reading, Writing
- Score calculation matching TOPIK scoring system
- Results summary with section breakdown

#### 7. Listening Practice
- **Files**: `product/src/app/listening/page.tsx`, `product/src/lib/data/listening.ts`
- Audio playback for listening passages
- TOPIK-format questions after each audio clip
- Playback controls (play, pause, replay)

### P2 — Growth Features

#### 8. User Authentication
- Sign up / sign in with email
- User profile with learning preferences
- Save progress across sessions

#### 9. Progress Dashboard
- **Files**: `product/src/app/dashboard/page.tsx`
- Overall progress across all sections
- Daily study streak tracking
- Vocabulary mastery percentage by level
- Weak areas identification

#### 10. Subscription Billing
- Free tier limitations
- Stripe integration for payment
- Pro tier unlocking

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

- Clean, distraction-free study interface
- Korean text rendered with proper fonts (Noto Sans KR)
- Mixed Korean/English content with proper spacing
- Mobile-responsive but optimized for desktop study
- Dark mode support (optional)
- Progress indicators visible on all study pages

## Content Guidelines

- All TOPIK practice content must be ORIGINAL — do not reproduce actual TOPIK questions
- Label content as "TOPIK-style practice" throughout the app
- Vocabulary sourced from standard Korean language learning references
- Grammar patterns should match what appears at each TOPIK level
- Reading passages should match TOPIK format (length, difficulty, question types)
