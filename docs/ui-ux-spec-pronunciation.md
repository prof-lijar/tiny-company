# UI/UX Specification: AI Pronunciation & Intonation Trainer

## 1. Overview
The AI Pronunciation & Intonation Trainer is a specialized learning tool designed to help users master the natural rhythm, pitch, and intonation of Korean speech. Unlike the Speaking Simulator (which mimics a test), the Trainer is a "microscope" for speech, providing granular visual feedback on pitch (F0) contours.

## 2. Design Principles
- **Visual Comparison**: The core value is the "overlay"—seeing the gap between the user's pitch and the native speaker's pitch.
- **Non-Intimidating**: Use soft colors and encouraging feedback to reduce the anxiety of "sounding wrong."
- **Precision-Focused**: High-resolution visualization of audio data, but simplified for a non-linguist.
- **Iterative Loop**: The UI should encourage "Listen $\rightarrow$ Record $\rightarrow$ Compare $\rightarrow$ Adjust $\rightarrow$ Repeat."

## 3. User Task Flow
1. **Phrase Selection**: User browses a library of phrases (categorized by Level L3-L6 and Topic).
2. **Target Listening**: User plays the native reference audio. The pitch contour of the native speaker is visualized in real-time.
3. **Recording**: User records their attempt. Their pitch contour is drawn on the same axis as the reference.
4. **Analysis & Comparison**: The system highlights areas of divergence (e.g., where the user's pitch stayed flat while the native speaker's rose).
5. **AI Coaching**: The user receives a textual tip (e.g., "Your pitch is too low at the end of the question") and a visual marker on the contour.
6. **Refinement**: User retries the recording until the contours align within a target threshold.

---

## 4. Detailed Interface Specifications

### 4.1 The Phrase Browser
- **Layout**: A searchable list or grid of cards.
- **Card Elements**: 
  - Phrase in Korean (`font-noto-sans-kr`, `text-lg`).
  - English translation (`text-slate-500`, `text-sm`).
  - Difficulty Badge (`bg-blue-100 text-blue-700` for L3, `bg-purple-100 text-purple-700` for L6).
  - "Practice" button (`bg-indigo-600 text-white`).

### 4.2 The Trainer Workspace (Core UI)
The workspace is a single-page focused interface divided into three primary zones.

#### Zone A: The Prompt Area (Top)
- **Text Display**: The target phrase displayed prominently in the center.
- **Reference Play Button**: A large, clear button to replay the native audio.
- **Status Badge**: (e.g., "Listening to Native", "Your Turn to Record", "Analyzing...").

#### Zone B: The Pitch Visualization Canvas (Center)
This is the most critical component. A coordinate system where X = Time and Y = Pitch (Frequency).
- **Reference Contour (Native)**: 
  - **Style**: A smooth, thick line.
  - **Color**: `text-indigo-500` or `slate-400`.
  - **Behavior**: Static once played, serving as the "gold standard."
- **User Contour (Attempt)**: 
  - **Style**: A slightly thinner line, potentially dashed or glowing.
  - **Color**: `text-emerald-500`.
  - **Behavior**: Draws in real-time as the user speaks.
- **Divergence Highlights**: 
  - Areas where the user's pitch differs significantly from the reference are highlighted with a subtle `bg-rose-100` vertical band or a red glow.

#### Zone C: The Feedback & Control Panel (Bottom)
- **Recording Control**: 
  - A large "Record" button that transforms into a "Stop/Processing" state.
  - Visual waveform (amplitude) to show the mic is working.
- **AI Coach Card**: 
  - A slide-in panel that appears after recording.
  - **Tip**: "Your intonation is slightly flat. Try raising the pitch at the end of the phrase to sound more like a question."
  - **Accuracy Score**: A percentage or a "Match" rating (e.g., "85% Match").
- **Action Buttons**: "Try Again" (Primary) and "Next Phrase" (Secondary).

---

## 5. Component Specifications (Tailwind)

### 5.1 The Visualization Container
```html
<div class="relative w-full h-64 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
  <!-- Y-Axis Labels (Optional/Simplified) -->
  <div class="absolute left-2 top-2 bottom-2 flex flex-col justify-between text-xs text-slate-400 font-mono">
    <span>High</span>
    <span>Low</span>
  </div>
  
  <!-- The SVG Canvas for Pitch Contours -->
  <svg class="w-full h-full">
    <!-- Native Path: stroke="currentColor" class="text-indigo-400 stroke-2" -->
    <!-- User Path: stroke="currentColor" class="text-emerald-500 stroke-3" -->
  </svg>
</div>
```

### 5.2 The AI Tip Toast
```html
<div class="flex items-start gap-3 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg shadow-sm">
  <div class="text-amber-500">
    <!-- Sparkles or Info Icon -->
  </div>
  <div>
    <p class="text-sm font-medium text-amber-900">Intonation Tip</p>
    <p class="text-sm text-amber-800 leading-relaxed">
      The pitch should rise more sharply on the final syllable.
    </p>
  </div>
</div>
```

---

## 6. UX & Accessibility
- **Real-time Feedback**: The user's line should appear as they speak to provide immediate confirmation of recording.
- **Audio-Visual Sync**: When replaying the reference audio, a vertical "playhead" line should move across the pitch contour.
- **Contrast**: Ensure the `emerald-500` (User) and `indigo-500` (Native) lines are clearly distinguishable.
- **Korean Typography**: Use `font-noto-sans-kr` for the target phrases, ensuring `leading-relaxed` and `tracking-tight` for a modern look.
