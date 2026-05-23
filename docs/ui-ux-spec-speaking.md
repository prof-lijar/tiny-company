# UI/UX Specification: TOPIK Speaking Simulator

## 1. Overview
The TOPIK Speaking Simulator is an IBT (Internet-Based Testing) environment designed to mimic the official Korean language proficiency speaking exam. The goal is to provide a high-fidelity simulation that reduces test-day anxiety by familiarizing users with the strict timing and interface of the actual exam.

## 2. Design Principles
- **Strict & Professional:** Minimalist UI to avoid distractions.
- **High Contrast & Legibility:** Clear distinction between "Preparation" and "Recording" states.
- **Cognitive Load Reduction:** Only essential information is visible at any given time.
- **Feedback-Driven:** Transition from a strict testing environment to a supportive learning environment in the report phase.

## 3. User Task Flow
1. **Task Introduction**: User sees the task number and general instructions.
2. **Preparation Phase**: 
   - User receives the prompt (Image, Audio, or Text).
   - A countdown timer runs.
   - User cannot record.
3. **Recording Phase**:
   - Automatic transition from preparation.
   - Microphone activates.
   - Visual feedback of voice input.
   - Timer counts down to zero.
4. **Submission**: Audio is automatically uploaded/processed.
5. **AI Evaluation Report**: Comprehensive feedback based on the four rubric dimensions.

---

## 4. State Specifications

### 4.1 Preparation Phase (Read-Only)
The interface should feel "static" and focused.
- **Background**: `slate-100` (Secondary).
- **Prompt Area**: A centered white card (`bg-white`) with a subtle shadow.
  - **Task 2 (Image)**: High-resolution image centered, with a short descriptive caption below.
  - **Task 3/4 (Audio + Text)**: Audio player (play button only) and a transcript/prompt text block.
- **Timer**: A prominent countdown timer (e.g., "Preparation Time: 00:45") using `text-slate-600`.
- **Status Indicator**: A label saying "준비 시간" (Preparation Time) in `indigo-600`.

### 4.2 Recording Phase (Active)
The interface shifts to an "active" state to signal the need for speech.
- **Background**: Shifts slightly to a focused state (perhaps a subtle `indigo-50` tint).
- **Mic Indicator**: 
  - A pulsing ring around a microphone icon.
  - **Visual Waveform**: A real-time SVG waveform that reacts to audio input levels (using `emerald-500` for active voice).
- **Timer**: The timer changes color to `rose-500` or `amber-500` to create a sense of urgency.
- **Status Indicator**: A label saying "녹음 중..." (Recording...) in `rose-500`.
- **Controls**: No "Stop" button unless specified by the test rules; the transition is typically automatic.

### 4.3 AI Feedback Report
The transition from "Testing" to "Learning".
- **Overall Score**: A large, centered badge showing the predicted **TOPIK Level (1-6)** using `amber-400`.
- **Rubric Breakdown**: A set of four progress bars or a radar chart.
  - **Dimensions**: Pronunciation (발음), Fluency (유창성), Language Use (언어 사용), Content (내용).
  - **Color**: `emerald-500` for high scores, `amber-500` for mid, `rose-500` for low.
- **Detailed Analysis**:
  - **Transcription**: The AI's transcription of the user's speech.
  - **Corrections**: Highlighted text showing "What you said" vs "Suggested improvement" using `slate-100` and `emerald-100` backgrounds.
- **Action Button**: "Try Again" or "Next Task" using `indigo-600`.

---

## 5. Component Specifications (Tailwind)

### 5.1 The "Exam Card"
```html
<div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
  <!-- Content goes here -->
</div>
```

### 5.2 The Recording Indicator
- **Pulsing Ring**: `animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75`
- **Waveform Container**: `flex items-center gap-1 h-12`
- **Waveform Bar**: `w-1 bg-emerald-500 rounded-full transition-all duration-75` (height varies by volume)

### 5.3 The Timer
- **Preparation**: `text-2xl font-mono font-medium text-slate-600`
- **Recording**: `text-3xl font-mono font-bold text-rose-500`

### 5.4 Feedback Progress Bar
```html
<div class="w-full bg-slate-200 rounded-full h-2.5">
  <div class="bg-emerald-500 h-2.5 rounded-full" style="width: 75%"></div>
</div>
```

---

## 6. Accessibility & UX
- **Keyboard Navigation**: Users should be able to trigger the audio prompt with `Space` or `Enter`.
- **Visual Cues**: The change from Preparation $\rightarrow$ Recording must be accompanied by a clear visual shift (color change) to prevent users from speaking too early.
- **Korean Typography**: 
  - Use `font-noto-sans-kr` for all prompt text.
  - Ensure `leading-relaxed` for readability of complex Korean sentences.
- **Audio Feedback**: A subtle "beep" sound to signal the start and end of the recording phase.
