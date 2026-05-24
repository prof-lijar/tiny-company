# Unified Design System Implementation Guide

## Overview
To eliminate visual inconsistency across the TOPIK Learning Assistant, we are implementing a Unified Design System. This guide provides the CTO with a step-by-step plan to refactor the UI.

## 1. The Source of Truth
All components must adhere to the specifications in `design/component-spec.md`. 
- **Primary Color**: Indigo-600 / Indigo-900
- **Secondary Color**: Slate-600 / Slate-900
- **Accent Color**: Rose-500 (for errors/critical timers)
- **Typography**: `Noto Sans KR` for all Korean text, `Inter` for English/UI.

## 2. Audit & Mapping
The following pages must be audited for custom Tailwind classes that should be replaced by shared components:

| Page | Priority | Key Elements to Refactor |
|---|---|---|
| `dashboard` | High | Stats cards, Chart containers, Navigation links |
| `vocabulary` | High | Flashcard, Level buttons, SRS rating buttons |
| `grammar` | Medium | Lesson cards, Level filters |
| `reading` | High | Passage containers, Question options, Timer |
| `listening` | High | Audio player, Transcript lines, Question options |
| `mock-test` | High | IBT layout, Question palette, Submission modal |
| `writing` | High | Text editors, Feedback reports, Outliner |
| `landing` | Low | Hero buttons, Pricing cards |

## 3. Core Component Library (`product/src/components/ui/`)
The CTO should ensure the following components are fully implemented and used exclusively:

### A. `Button.tsx`
- **Variants**: `primary`, `secondary`, `outline`, `danger`, `ghost`
- **Sizes**: `sm`, `md`, `lg`
- **States**: `loading`, `disabled`

### B. `Card.tsx`
- **Types**: 
    - `Feature`: For landing page.
    - `Study`: For lesson/vocabulary items.
    - `Flashcard`: Specialized for the Vocabulary builder.
    - `Quiz`: For question/answer pairs.

### C. `Input.tsx`
- **Types**: `Text`, `Select`, `Textarea`
- **Requirements**: Consistent focus ring (`ring-indigo-500`), error state (`border-rose-500`).

### D. `Modal.tsx`
- **Requirements**: Backdrop blur, centered positioning, consistent transition animations.

## 4. Implementation Workflow
1. **Component Hardening**: Update `product/src/components/ui/` to match `design/component-spec.md` exactly.
2. **Page-by-Page Refactor**:
    - Start with the `dashboard` and `vocabulary` pages.
    - Search for `className=\"...\"` that duplicates styles of the shared components.
    - Replace with `<Button variant=\"...\" />`, etc.
3. **Global CSS Cleanup**: Remove redundant utility classes from `product/src/app/globals.css` that are now handled by the design system.
4. **Typography Audit**: Ensure `font-family: 'Noto Sans KR'` is applied to all Korean text elements.

## 5. Acceptance Criteria
- No "one-off" custom styles for core UI elements (buttons, inputs, cards) in any page.
- Visual consistency across all pages (same padding, margins, and color shades).
- All components are fully responsive.
- The application feels like a single, cohesive product rather than a collection of separate modules.
