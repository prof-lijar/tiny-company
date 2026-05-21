# Brand Guidelines: TOPIK Learning Assistant

## 1. Product Identity
**Proposed Name:** TOPIK Flow
**Tagline:** Master Korean, One Step at a Time.
**Core Value Proposition:** A streamlined, low-friction environment for TOPIK exam preparation that reduces cognitive load and maximizes retention through clear visual progress.

## 2. Visual Identity

### Color Palette
We use a calming, education-focused palette based on Tailwind CSS colors.

| Role | Tailwind Color | Hex (Approx) | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `indigo-600` | `#4f46e5` | Main actions, primary branding, active states |
| **Secondary** | `slate-100` | `#f1f5f9` | Section backgrounds, subtle dividers |
| **Accent** | `amber-400` | `#fbbf24` | Achievements, streaks, highlights, badges |
| **Success** | `emerald-500` | `#10b981` | Correct answers, completed lessons, progress bars |
| **Warning** | `amber-500` | `#f59e0b` | Cautionary alerts, "almost there" states |
| **Error** | `rose-500` | `#f43f5e` | Incorrect answers, critical errors, danger zones |
| **Text Primary**| `slate-900` | `#0f172a` | Headings, primary body text |
| **Text Secondary**| `slate-600` | `#475569` | Captions, placeholder text, secondary info |

### Typography
To ensure readability for both Korean and English users, we use a clean, modern sans-serif stack.

- **Korean Font:** `Noto Sans KR`
  - *Reason:* Industry standard for web-based Korean content, excellent legibility across weights.
- **English Font:** `Inter`
  - *Reason:* Highly readable UI font that pairs perfectly with Noto Sans KR's geometry.
- **Font Scale:**
  - H1: `text-3xl font-bold tracking-tight`
  - H2: `text-2xl font-semibold tracking-tight`
  - H3: `text-xl font-medium`
  - Body: `text-base leading-relaxed`
  - Small: `text-sm`

### Logo Concept
**Visual Metaphor:** The "Flow" of learning.
- **Icon:** A stylized, minimalist book open at a 45-degree angle, where the page edges form a subtle "T" (for TOPIK). A small, amber-colored spark or arrow curves upward from the book, symbolizing growth and progress.
- **Wordmark:** "TOPIK" in bold `indigo-600` and "Flow" in regular `slate-600` using Inter.

## 3. Tone of Voice
The voice of the application should feel like a supportive, expert tutor.

- **Encouraging:** Instead of "Wrong answer," use "Not quite! Let's try again."
- **Educational:** Provide clear, concise explanations for why an answer is correct.
- **Professional:** Maintain a clean, distraction-free environment that respects the user's time.
- **Clear:** Use simple language and avoid jargon unless it's specific to the TOPIK exam.

## 4. Design Principles
- **Education-First:** Progress is always visible. Users should never wonder "Where am I?" or "How much is left?".
- **Reduced Cognitive Load:** Minimalist interfaces. Use whitespace generously to separate complex grammar points.
- **Accessibility:** Contrast ratios must meet WCAG AA standards. Proper `lang="ko"` attributes for all Korean text blocks.
- **Consistency:** All interactive elements (buttons, inputs) must follow the component spec strictly.
