# UI/UX Specification: TOPIK Learning Assistant

## 1. Introduction
This document defines the user experience and interface standards for the TOPIK Learning Assistant. The goal is to create a "low-friction" learning environment that minimizes cognitive load and maximizes focus on Korean language acquisition.

## 2. Core Design Principles
- **Education-First**: Learning progress must be omnipresent. Users should always know their current level, their progress within a module, and their path to the next milestone.
- **Cognitive Load Reduction**: Avoid cluttered interfaces. Use generous whitespace, clear typography, and a limited color palette to prevent "study fatigue."
- **Korean-Centric Typography**: 
  - Primary Font: `Noto Sans KR` for all Korean text.
  - Secondary Font: `Inter` for English UI elements.
  - Ensure line-height is increased for Korean characters to improve readability.
- **Immediate Feedback Loop**: Every interaction (answering a question, recording audio) must provide immediate visual and/or auditory feedback.
- **IBT Fidelity**: The Mock Test simulator must mirror the official Internet-Based Testing (IBT) interface as closely as possible to reduce test-day anxiety.

## 3. User Flows

### 3.1 Vocabulary Study Flow (SRS)
1. **Entry**: User selects a TOPIK level (I or II) $\rightarrow$ Selects a word set.
2. **Presentation**: A flashcard appears with the Korean word.
3. **Recall**: User attempts to recall the meaning $\rightarrow$ Clicks "Show Answer."
4. **Evaluation**: User rates their recall difficulty: `Again` | `Hard` | `Good` | `Easy`.
5. **Progression**: The SRS algorithm schedules the next appearance based on this rating.
6. **Completion**: A progress bar fills up as the daily quota is met.

### 3.2 Grammar Lesson Flow
1. **Discovery**: User browses grammar points by level or category.
2. **Instruction**: A clean, structured page with:
   - Grammar point (in bold Korean).
   - English meaning.
   - Detailed explanation.
   - 3-5 example sentences with audio.
3. **Practice**: A short quiz (fill-in-the-blank or multiple choice).
4. **Validation**: Immediate "Correct/Incorrect" feedback with a brief explanation for the wrong choice.

### 3.3 Writing Practice Flow (AI Loop)
1. **Prompt**: User is presented with a TOPIK writing prompt (e.g., Essay 54).
2. **Drafting**: User types their response in a distraction-free editor with a word counter.
3. **Submission**: User submits for AI analysis.
4. **Feedback**: The system displays a split-view:
   - **Left**: User's original text with highlighted errors.
   - **Right**: AI Feedback (Score, Template Detection, Grammar corrections, Model Answer).
5. **Iteration**: User can edit their essay based on feedback and resubmit.

### 3.4 Mock Test Simulation (IBT)
1. **Setup**: User selects the test version (2026 Format) and starts the timer.
2. **Interface**: 
   - Top: Timer and Section indicator.
   - Center: Question text and audio controls (for Listening).
   - Bottom: Answer input (Multiple choice or Text).
3. **Navigation**: A "Question Map" allows users to jump between questions and mark "Unanswered" ones.
4. **Completion**: Final submission $\rightarrow$ Immediate score calculation and level estimation.

## 4. Page Layouts

### 4.1 Global Shell
- **Sidebar**: Navigation (Dashboard, Vocab, Grammar, Reading, Listening, Writing, Mock Tests, Settings).
- **Header**: Current module title, User profile, Daily streak counter.
- **Main Content Area**: Centered layout with a maximum width of `max-w-6xl` to prevent eye strain on ultra-wide monitors.

### 4.2 Dashboard (The "Command Center")
- **Top Row**: Key stats (Words learned, Grammar mastered, Average Mock score).
- **Center Left**: "Daily Goal" progress ring.
- **Center Right**: "Recommended Next Step" (e.g., "You have 20 words due for review").
- **Bottom**: Recent performance chart (Line graph showing score trends).

### 4.3 Learning Module Layout
- **Left Column (30%)**: Navigation/List of items (e.g., list of grammar points in a level).
- **Right Column (70%)**: The active learning area (The lesson or the practice exercise).

## 5. Component Hierarchy & UI Patterns

### 5.1 Feedback Indicators
- **Success**: `bg-emerald-50 text-emerald-700 border-emerald-500` (with check icon).
- **Error**: `bg-rose-50 text-rose-700 border-rose-500` (with alert icon).
- **Warning**: `bg-amber-50 text-amber-700 border-amber-500`.

### 5.2 Interaction Patterns
- **SRS Buttons**: Four distinct buttons with subtle color shifts to represent difficulty.
- **Option Selectors**: Large, clickable cards that change border color to `indigo-600` when selected.
- **Progress Bars**: Slim, high-contrast bars (`bg-slate-200` track, `bg-indigo-600` fill).

## 6. Responsive Strategy
- **Desktop (Primary)**: Full sidebar, split-view layouts, complex data tables. Optimized for "Deep Work" sessions.
- **Tablet**: Collapsible sidebar, adjusted grid columns.
- **Mobile**: Bottom navigation bar, single-column layouts. Optimized for "Micro-learning" (Vocab review, quick grammar checks).

## 7. Accessibility (a11y)
- **Language**: All Korean text containers must use `lang="ko"`.
- **Contrast**: All text must maintain a minimum contrast ratio of 4.5:1 against its background.
- **Keyboard Nav**: All interactive elements must be reachable via `Tab` and have visible `:focus-visible` rings.
- **Screen Readers**: Use `aria-label` for icon-only buttons (e.g., "Play audio").
