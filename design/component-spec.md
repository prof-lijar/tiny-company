# Component Specifications: TOPIK Flow

This document defines the visual implementation of UI components using Tailwind CSS classes. These specs ensure consistency across the application.

## 1. Buttons
All buttons should have a consistent height and padding.
**Base Classes:** `px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`

| Variant | Tailwind Classes | Hover/Active State |
| :--- | :--- | :--- |
| **Primary** | `bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500` | `active:scale-95` |
| **Secondary** | `bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400` | `active:scale-95` |
| **Outline** | `border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500` | `active:scale-95` |
| **Danger** | `bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-400` | `active:scale-95` |
| **Ghost** | `text-slate-600 hover:bg-slate-100 hover:text-slate-900` | `active:bg-slate-200` |

**Special States:**
- **Loading:** Replace text with a spinner icon. Maintain variant background colors. Use `cursor-wait`.
- **Disabled:** Use base class `disabled:opacity-50 disabled:cursor-not-allowed`.

## 2. Cards
Cards are the primary containers for content.
**Base Classes:** `bg-white border border-slate-200 rounded-xl shadow-sm transition-shadow duration-200`

| Card Type | Additional Classes | Usage |
| :--- | :--- | :--- |
| **Feature Card** | `p-6 hover:shadow-md` | High-level feature overviews on the landing page |
| **Study Card** | `p-6 border-l-4 border-l-indigo-600` | Grammar points, vocabulary definitions |
| **Flashcard** | `p-8 text-center min-h-[300px] flex flex-col justify-center items-center cursor-pointer hover:border-indigo-300` | Active recall practice (flip animation) |
| **Quiz Card** | `p-6 space-y-4` | Question and answer options container |

## 3. Form Inputs
Inputs should be clean and provide clear feedback.
**Base Classes:** `w-full px-3 py-2 border rounded-lg transition-colors duration-200 outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed`

| Element | Default State | Focus State | Error State |
| :--- | :--- | :--- | :--- |
| **Text Input** | `border-slate-300 text-slate-900 placeholder:text-slate-400` | `border-indigo-600 ring-indigo-500` | `border-rose-500 ring-rose-500 text-rose-900` |
| **Select** | `border-slate-300 bg-white text-slate-900` | `border-indigo-600 ring-indigo-500` | `border-rose-500 ring-rose-500` |
| **Textarea** | `border-slate-300 text-slate-900 resize-none` | `border-indigo-600 ring-indigo-500` | `border-rose-500 ring-rose-500` |

## 4. Navigation
### Header Navigation
- **Container:** `flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-50`
- **Logo Area:** `flex items-center gap-2 text-xl font-bold text-indigo-600`
- **Nav Links:** `text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors`

### Mobile Menu
- **Overlay:** `fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40`
- **Drawer:** `fixed right-0 top-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col gap-4`

## 5. Learning Feedback Elements
Specific colors for immediate feedback during study sessions.

| State | Tailwind Classes | Visual Indicator |
| :--- | :--- | :--- |
| **Correct** | `bg-emerald-50 text-emerald-700 border-emerald-200` | Green background, check icon |
| **Incorrect** | `bg-rose-50 text-rose-700 border-rose-200` | Red background, cross icon |
| **Pending** | `bg-slate-50 text-slate-600 border-slate-200` | Neutral gray |
| **Progress Bar** | `h-2 w-full bg-slate-200 rounded-full overflow-hidden` | Fill with `bg-emerald-500` |

## 6. Typography Utility Classes
For quick application of brand typography:
- **H1:** `text-3xl font-bold tracking-tight text-slate-900`
- **H2:** `text-2xl font-semibold tracking-tight text-slate-900`
- **H3:** `text-xl font-medium text-slate-900`
- **Body:** `text-base leading-relaxed text-slate-600`
- **Caption:** `text-sm text-slate-500`
- **Korean Text:** `font-['Noto_Sans_KR']` (Ensure font is loaded in Next.js)
