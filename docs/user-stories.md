# TOPIK Learning Assistant — User Stories

This document contains detailed user stories for the TOPIK Learning Assistant, providing a clear understanding of user needs and the criteria for successful implementation.

## 1. Vocabulary Builder (SRS)

### US-1: Level-Based Vocabulary Filtering
**As a** TOPIK II learner,
**I want to** filter vocabulary lists by my target level (3, 4, 5, or 6),
**so that** I don't waste time on words that are too easy or too advanced for my current stage.

**Acceptance Criteria:**
- User can select a level from a dropdown or tab menu.
- The list of words updates instantly to show only words associated with that level.
- The system indicates how many words total are available for the selected level.

### US-2: SRS Flashcard Interaction
**As a** learner,
**I want to** use a flashcard interface where I can see the word first and then reveal the meaning,
**so that** I can actively test my recall rather than just passively reading.

**Acceptance Criteria:**
- Card front displays the Korean word and a "Reveal" button.
- Card back displays the English meaning, an example sentence in Korean, and the English translation.
- A "Play Audio" button is available to hear the pronunciation via TTS.

### US-3: Spaced Repetition Rating
**As a** learner,
**I want to** rate the difficulty of a word after reviewing it (Easy, Good, Hard),
**so that** the system can schedule the next review based on my mastery.

**Acceptance Criteria:**
- Three rating buttons are visible after the card is flipped.
- Clicking a button triggers the SRS algorithm to update the `next_review_date`.
- "Easy" pushes the word further into the future; "Hard" schedules it for sooner.

---

## 2. Grammar Lessons

### US-4: Structured Grammar Index
**As a** learner,
**I want to** see a categorized list of grammar patterns organized by TOPIK level,
**so that** I can follow a logical learning path.

**Acceptance Criteria:**
- Index page groups grammar by Level 3, 4, 5, and 6.
- Each grammar pattern is listed as a clickable link to its detailed lesson.
- Visual indicators show which lessons have been "completed".

### US-5: Comprehensive Grammar Lessons
**As a** learner,
**I want to** read detailed explanations of grammar patterns with multiple examples,
**so that** I can understand the nuance and correct usage in different contexts.

**Acceptance Criteria:**
- Lesson page includes: Meaning, Usage Rules, and at least 3 Example Sentences.
- Examples include both the Korean sentence and its English translation.
- A "Usage Note" section highlights common mistakes or formality levels (e.g., Written vs. Spoken).

---

## 3. Reading Comprehension

### US-6: TOPIK-Style Reading Practice
**As a** learner,
**I want to** practice with reading passages that mirror the actual TOPIK II format,
**so that** I can build the stamina and skill needed for the real exam.

**Acceptance Criteria:**
- Interface provides a split-screen view: Passage on the left, Questions on the right.
- Supports multiple-choice questions with 4 options.
- Passage types include Ads, News, and Essays.

### US-7: Reading Performance Feedback
**As a** learner,
**I want to** receive immediate feedback and a detailed explanation for each answer,
**so that** I can learn from my mistakes immediately.

**Acceptance Criteria:**
- After submitting, correct answers are highlighted in green and incorrect in red.
- A "Why this is correct" explanation is provided for every question.
- User can see their total score for the passage (e.g., 3/5).

---

## 4. Writing Practice (AI)

### US-8: AI-Powered Writing Feedback
**As a** learner,
**I want to** submit my essays for AI review and receive corrections on grammar and style,
**so that** I can improve my writing without needing a human tutor.

**Acceptance Criteria:**
- User can select a task type (Task 51-54).
- AI provides a "Corrected Version" of the submitted text.
- AI provides specific feedback on: Vocabulary choice, Grammatical accuracy, and Cohesion.

### US-9: Character Count Tracking
**As a** learner,
**I want to** see a real-time character count as I write my essay,
**so that** I can ensure I stay within the strict TOPIK limits (e.g., 600-700 characters for Task 54).

**Acceptance Criteria:**
- A counter is visible at the bottom of the text area.
- The counter turns red if the user exceeds the maximum limit.
- The counter indicates how many characters are left to reach the minimum requirement.

---

## 5. Mock Test Simulation

### US-10: Timed IBT Simulation
**As a** learner,
**I want to** take a full mock test with a countdown timer that matches the real IBT experience,
**so that** I can practice time management.

**Acceptance Criteria:**
- A global timer is visible for each section (Listening, Writing, Reading).
- The system automatically submits the test when the timer reaches zero.
- User cannot navigate back to previous sections once a section is submitted.

### US-11: Mock Test Scoring Report
**As a** learner,
**I want to** receive a score breakdown by section after completing a mock test,
**so that** I know exactly which areas need more focus.

**Acceptance Criteria:**
- Report shows: Total Score, Listening Score, Reading Score, and Writing Score.
- The report suggests a target TOPIK level (3, 4, 5, or 6) based on the total score.
