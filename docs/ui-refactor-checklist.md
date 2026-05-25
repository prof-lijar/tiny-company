# UI Refactor Checklist: Unified Design System

This checklist provides a detailed mapping of required UI changes to align the application with the Unified Design System defined in `design/component-spec.md` and `docs/design-system-impl.md`.

**Related Issue:** Closes #530 (Implementation of Unified Design System Refactor)

## 🎨 Global Brand Alignment
- [ ] **Color Swap**: Replace all instances of `blue-600` (and its shades like `blue-500`, `blue-100`) with `indigo-600` (and `indigo-500`, `indigo-100`) across the entire codebase.
- [ ] **Typography**: Ensure `font-['Noto_Sans_KR']` is applied to all Korean text elements.
- [ ] **Spacing Audit**: Verify that all pages use consistent padding (`p-4`, `p-6`, `p-8`) and margins (`mb-4`, `mb-6`, `mb-10`) as per the layout specs.

## 📄 Page-Specific Refactors

### 1. Landing Page (`product/src/app/page.tsx`)
- [ ] **Hero Section**: Update `text-blue-600` $\rightarrow$ `text-indigo-600`.
- [ ] **Decorative Elements**: Update `bg-blue-400` $\rightarrow$ `bg-indigo-400`.
- [ ] **CTA Section**: Update `bg-blue-600` $\rightarrow$ `bg-indigo-600`.
- [ ] **Pricing Cards**: Replace custom `border-blue-600 ring-blue-600` with `border-indigo-600 ring-indigo-600`.
- [ ] **Component Audit**: Ensure all `Button` and `Card` components are using the variants specified in `design/component-spec.md`.

### 2. Dashboard (`product/src/app/dashboard/page.tsx`)
- [ ] **Stat Cards**: Update `text-blue-600` and `bg-blue-50` $\rightarrow$ `text-indigo-600` and `bg-indigo-50`.
- [ ] **Progress Bars**: Update `bg-blue-600` $\rightarrow$ `bg-indigo-600`.
- [ ] **Score Progression Chart**: Update bar colors `bg-blue-500` $\rightarrow$ `bg-indigo-500` and `group-hover:bg-blue-600` $\rightarrow$ `group-hover:bg-indigo-600`.
- [ ] **Recent Activity**: Ensure the activity timeline icons/dots align with the `indigo` palette.

### 3. Vocabulary Builder (`product/src/app/vocabulary/page.tsx`)
- [ ] **Progress Bar**: Update `bg-blue-600` $\rightarrow$ `bg-indigo-600`.
- [ ] **Level Selection**: Verify `Button` components use `variant="primary"` and `variant="outline"` correctly.
- [ ] **SRS Rating Buttons**: Ensure the "Again", "Hard", "Good", "Easy" buttons use the `Button` component with the `outline` variant.

### 4. Reading Practice (`product/src/app/reading/page.tsx`)
- [ ] **Passage Cards**: Replace custom `div` containers (`border rounded-xl p-6...`) with the `Card` component (Study Card variant).
- [ ] **Timer & Badges**: Update `bg-blue-100 text-blue-700` $\rightarrow$ `bg-indigo-100 text-indigo-700`.
- [ ] **Passage Section**: Update `bg-blue-50 border-blue-100 text-blue-800` $\rightarrow$ `bg-indigo-50 border-indigo-100 text-indigo-800`.
- [ ] **Option Selection**: Update `border-blue-500 bg-blue-50 text-blue-700` $\rightarrow$ `border-indigo-500 bg-indigo-50 text-indigo-700`.
- [ ] **Submit Button**: Replace custom `button` with `<Button variant="primary" className="w-full py-4">`.
- [ ] **Back Button**: Replace custom `button` with `<Button variant="ghost">`.
- [ ] **Result Box**: Update `border-blue-500` and `text-blue-600` $\rightarrow$ `border-indigo-500` and `text-indigo-600`.

## 🛠️ Core Component Hardening
- [ ] **`Button.tsx`**: Ensure all variants (`primary`, `secondary`, `outline`, `danger`, `ghost`) perfectly match the Tailwind classes in `design/component-spec.md`.
- [ ] **`Card.tsx`**: Implement the specific types (`Feature`, `Study`, `Flashcard`, `Quiz`) as defined in the spec.
- [ ] **`Input.tsx`**: Ensure focus rings use `ring-indigo-500` and error states use `border-rose-500`.

## 🔍 Final Audit
- [ ] Run a search for `blue-` across the project to ensure no remnants remain.
- [ ] Test responsiveness on mobile and desktop for all refactored pages.
- [ ] Verify that `Noto Sans KR` is rendering correctly for all Korean content.
