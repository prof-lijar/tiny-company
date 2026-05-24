# TOPIK Placement Test - Detailed Implementation Specification

## Overview
The TOPIK Placement Test is a diagnostic tool designed to assess a new user's Korean proficiency level (Levels 2-6) and automatically configure their personalized study path.

## 1. Test Structure & Content
The test is a condensed version of the TOPIK II exam, designed to be completed in under 30 minutes.

### A. Listening Section (10 Questions)
- **Format**: Multiple choice.
- **Difficulty Distribution**:
    - Questions 1-3: Level 3 (Basic-Intermediate)
    - Questions 4-6: Level 4 (Intermediate)
    - Questions 7-10: Level 5-6 (Advanced)
- **Technical**: Uses the same audio player component as the Listening Practice module.

### B. Reading Section (10 Questions)
- **Format**: Multiple choice.
- **Difficulty Distribution**:
    - Questions 1-3: Level 3
    - Questions 4-6: Level 4
    - Questions 7-10: Level 5-6
- **Technical**: Uses the same passage-and-question layout as the Reading Practice module.

### C. Writing Section (Optional/Single Prompt)
- **Format**: Short essay (Task 53 style).
- **Evaluation**: AI-powered evaluation via `product/src/app/api/writing-feedback/route.ts`.
- **Weight**: Used as a tie-breaker or to confirm the level predicted by Listening/Reading.

## 2. Adaptive Scoring Logic
The system uses a simplified adaptive logic to refine the level prediction.

### Scoring Algorithm
1. **Raw Score**: Total correct answers across Listening and Reading (0-20).
2. **Weighting**: Questions 7-10 carry more weight for Level 5/6 determination.
3. **Level Mapping**:
    - **0 - 40% (0-8 correct)**: Predicted Level 2 or below $\rightarrow$ Start at Basic Path.
    - **41 - 60% (9-12 correct)**: Predicted Level 3 $\rightarrow$ Start at Intermediate Path.
    - **61 - 80% (13-16 correct)**: Predicted Level 4 $\rightarrow$ Start at Upper-Intermediate Path.
    - **81 - 100% (17-20 correct)**: Predicted Level 5/6 $\rightarrow$ Start at Advanced Path.

## 3. Database Schema (Supabase)
No mock data. The following tables must be implemented:

### `placement_tests` Table
- `id`: uuid (primary key)
- `user_id`: uuid (references auth.users)
- `total_score`: int
- `predicted_level`: int
- `completed_at`: timestamp with time zone

### `placement_test_responses` Table
- `id`: uuid (primary key)
- `test_id`: uuid (references placement_tests)
- `question_id`: text
- `selected_option`: int
- `is_correct`: boolean

## 4. Integration with Study Plan
Upon completion:
1. The `predicted_level` is saved to the user's profile.
2. The `Dynamic Study Plan` logic (`product/src/app/api/study-plan/route.ts`) is triggered to generate a plan starting from that level.
3. User is redirected to the Dashboard with a "Placement Complete" notification and a link to their new study plan.

## 5. User Interface (UI/UX)
- **Entry Point**: Landing page "Start Free Assessment" button or Dashboard onboarding.
- **Interface**: `product/src/app/placement-test/page.tsx`.
- **Experience**: 
    - Progress bar showing completion percentage.
    - "Review" step before final submission.
    - Immediate "Result" screen showing the predicted level and a "Start Learning" CTA.
