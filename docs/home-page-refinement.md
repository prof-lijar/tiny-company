# Home Page UX/UI Refinement Spec

## 1. UX Audit Report

### Current State Evaluation
The current landing page follows a standard SaaS pattern (Hero $\\rightarrow$ Features $\\rightarrow$ Pricing $\\rightarrow$ CTA). While functional and responsive, it feels like a template and lacks the "premium" educational feel associated with a specialized TOPIK preparation platform.

### Friction Points & Gaps
- **Brand Misalignment:** The page uses `blue-600` instead of the brand-defined `indigo-600`.
- **Visual Hierarchy:** The Hero section is too centered and static. It lacks a visual anchor (like a product screenshot or a compelling illustration).
- **Feature Presentation:** The feature cards are generic. Emojis are used as icons, which can look amateurish for a "professional" study platform.
- **Conversion Path:** The transition from "Features" to "Pricing" is abrupt. There is no "How it works" section to build trust and explain the methodology (SRS, AI Feedback).
- **Pricing Table:** The distinction between Free and Pro is minimal. The "Pro" plan doesn't feel significantly more valuable visually.
- **Mobile Experience:** While responsive, the mobile view is just a long stack of centered elements. It lacks the "thumb-friendly" optimization for CTAs.

---

## 2. Proposed Design Refinements

### A. Visual Identity & Branding
- **Color Shift:** Replace all instances of `blue-600` with `indigo-600` and `blue-400/purple-400` with `indigo-400/violet-400` to align with the Brand Guide.
- **Typography:** Increase the contrast between headings and body text. Use `tracking-tight` on all major headings.

### B. Hero Section Refinement
- **Layout:** Shift from a purely centered layout to a split layout on desktop (Text left, Visual right).
- **Visual Anchor:** Add a "Mockup" component (a stylized representation of the dashboard or a vocabulary card) to give users a tangible idea of the product.
- **Trust Signal:** Add a small "Trusted by 1,000+ Korean learners" badge above the main H1.
- **Background:** Replace simple blur circles with a subtle grid pattern or a "flowing" gradient that evokes the "TOPIK Flow" brand identity.

### C. Feature Cards Enhancement
- **Styling:** 
  - Add a subtle border-top (4px) using `indigo-600` for each card.
  - Use a soft `indigo-50` background for the icon container.
  - Implement a "lift" effect on hover (`-translate-y-2` and stronger shadow).
- **Content:** Group features into "Study" and "AI Tools" to create a more organized narrative.

### D. "How it Works" Section (New)
- **Purpose:** Bridge the gap between Features and Pricing.
- **Design:** A 3-step horizontal process (Step 1: Assess $\\rightarrow$ Step 2: Study $\\rightarrow$ Step 3: Master).
- **Visual:** Use connecting lines or arrows to guide the eye.

### E. Pricing Table Optimization
- **Pro Plan:** 
  - Add a "MOST POPULAR" badge with a pulsing animation.
  - Use a slight scale increase (`scale-105`) for the Pro card on desktop.
  - Change the background of the Pro card to a very subtle gradient.
- **Feature List:** Use `indigo-500` checkmarks instead of generic green ones.

### F. CTA Section
- **Background:** Use a gradient from `indigo-600` to `violet-700` instead of a flat color.
- **Interactivity:** Add a subtle entrance animation for the CTA text.

---

## 3. Implementation Checklist

- [ ] Update colors to `indigo-600` across the page.
- [ ] Implement a more complex Hero layout (Desktop split).
- [ ] Add the "Trusted by" badge.
- [ ] Refine Feature Card styles (border-top, hover lift).
- [ ] Create and insert the "How it Works" section.
- [ ] Enhance the Pricing table (Pro badge, scale, color).
- [ ] Update the CTA section with a gradient background.
- [ ] Verify responsiveness across Phone, Tablet, and Desktop.
