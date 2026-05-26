# Page Layout Specifications: TOPIK Flow

This document defines the structural layout for each page of the TOPIK Flow application using Tailwind CSS grid and flexbox patterns. These layouts ensure consistency and responsiveness across the platform.

## 1. Global Layout Shell
All internal pages (except Landing and Auth) use the Global Shell.

**Structure:**
- **Container**: `min-h-screen bg-slate-50 flex`
- **Sidebar**: `w-64 bg-white border-r border-slate-200 hidden md:flex flex-col sticky top-0 h-screen`
- **Main Content Area**: `flex-1 flex flex-col overflow-hidden`
- **Header**: `h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10`
- **Page Wrapper**: `flex-1 overflow-y-auto p-8`
- **Content Container**: `max-w-6xl mx-auto w-full`

---

## 2. Landing Page Layout
Designed for conversion and clarity.

**Structure:**
- **Hero Section**: `relative py-20 px-6 text-center max-w-4xl mx-auto`
  - Layout: `flex flex-col items-center gap-8`
- **Feature Grid**: `grid grid-cols-1 md:grid-cols-3 gap-8 py-20 px-6 max-w-6xl mx-auto`
  - Item: `flex flex-col items-start text-left p-6`
- **Pricing Section**: `py-20 px-6 bg-slate-100`
  - Grid: `grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto`
- **CTA Footer**: `py-20 px-6 text-center bg-indigo-600 text-white`

---

## 3. Dashboard Layout
The "Command Center" for the learner.

**Structure:**
- **Top Stats Row**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8`
  - Item: `p-6 bg-white rounded-xl border border-slate-200 shadow-sm`
- **Main Grid**: `grid grid-cols-1 lg:grid-cols-3 gap-8`
  - **Left Column (2/3)**: `lg:col-span-2 space-y-8`
    - **Performance Chart**: `p-6 bg-white rounded-xl border border-slate-200 shadow-sm h-[400px]`
    - **Recent Activity**: `p-6 bg-white rounded-xl border border-slate-200 shadow-sm`
  - **Right Column (1/3)**: `space-y-8`
    - **Daily Goal Widget**: `p-6 bg-indigo-600 text-white rounded-xl shadow-lg`
    - **Next Step Card**: `p-6 bg-white rounded-xl border border-slate-200 shadow-sm`

---

## 4. Learning Module Layout (Vocab, Grammar, Reading, Listening)
A focused environment for studying.

**Structure:**
- **Layout**: `grid grid-cols-1 lg:grid-cols-12 gap-8`
- **Navigation Panel (Left - 3/12)**: `lg:col-span-3 space-y-4`
  - Item: `p-3 rounded-lg transition-colors cursor-pointer hover:bg-slate-100` (Active: `bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600`)
- **Study Area (Right - 9/12)**: `lg:col-span-9`
  - **Content Header**: `mb-6 flex items-center justify-between`
  - **Main Card**: `bg-white rounded-2xl border border-slate-200 shadow-sm p-8`
  - **Footer Controls**: `mt-8 flex items-center justify-between`

---

## 5. Writing Practice Layout
Split-view for drafting and feedback.

**Structure:**
- **Top Section**: `mb-8 p-6 bg-white rounded-xl border border-slate-200` (Prompt and Instructions)
- **Workspace**: `grid grid-cols-1 lg:grid-cols-2 gap-8 items-start`
  - **Editor Column**: `flex flex-col gap-4`
    - Textarea: `w-full h-[500px] p-6 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500`
    - Toolbar: `flex justify-between items-center` (Word count, Submit button)
  - **Feedback Column**: `p-6 bg-slate-50 rounded-xl border border-slate-200 min-h-[500px]`
    - State (Empty): `flex flex-col items-center justify-center text-slate-400`
    - State (Result): `space-y-6` (Score, AI Feedback, Model Answer)

---

## 6. Mock Test Simulator Layout (IBT Fidelity)
High-fidelity simulation of the official test.

**Structure:**
- **Exam Header**: `h-14 bg-slate-800 text-white flex items-center justify-between px-6 sticky top-0 z-20`
  - Timer: `font-mono text-xl font-bold text-amber-400`
  - Section: `text-sm uppercase tracking-widest`
- **Main Exam Area**: `flex h-[calc(100vh-56px)] overflow-hidden`
  - **Question Panel (Left - 75%)**: `flex-1 overflow-y-auto p-8 bg-white`
    - Content: `max-w-3xl mx-auto space-y-8`
  - **Navigation Panel (Right - 25%)**: `w-80 bg-slate-100 border-l border-slate-300 p-6 flex flex-col`
    - Question Grid: `grid grid-cols-5 gap-2 mb-8` (Numbered squares)
    - Legend: `text-xs space-y-2` (Answered, Marked, Unanswered)
    - Action: `mt-auto w-full py-3 bg-rose-600 text-white rounded-lg font-bold` (Submit Test)

---

## 7. Auth Layout (Login/Signup)
Centered, minimalist focus.

**Structure:**
- **Wrapper**: `min-h-screen flex items-center justify-center bg-slate-50 p-6`
- **Card**: `w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8`
  - Header: `text-center mb-8`
  - Form: `space-y-4`
  - Footer: `text-center mt-6 text-sm text-slate-600`
