# AI Pronunciation & Intonation Trainer - Technical Specification

## Overview
The Pronunciation & Intonation Trainer is a specialized tool for TOPIK Speaking IBT preparation. It allows users to compare their spoken Korean pitch and rhythm against native speakers using visual pitch contours (F0).

## 1. User Experience Flow
1. **Phrase Selection**: User selects a phrase categorized by level (L3-L6).
2. **Reference Listening**: User plays a native speaker's audio clip.
3. **User Recording**: User records their attempt via the browser microphone.
4. **Visual Comparison**: The system generates two pitch contours (lines) on a graph:
    - **Blue Line**: Native speaker's pitch.
    - **Red Line**: User's pitch.
5. **AI Feedback**: The system analyzes the difference and provides 1-3 specific tips (e.g., "The end of the sentence should rise more for this question").
6. **Iteration**: User can re-record to attempt to match the native contour.

## 2. Technical Architecture

### A. Frontend (React + Web Audio API)
- **Audio Capture**: Use `MediaRecorder` API to capture user audio.
- **Visualization**: Use a Canvas-based or SVG-based chart (e.g., `recharts` or a custom canvas implementation) to plot the pitch over time.
- **Pitch Extraction**: 
    - Use the `pitchfinder` library to extract the fundamental frequency (F0) from the audio buffer in real-time or post-recording.
    - Algorithm: `AMDF` (Average Magnitude Difference Function) or `YIN` provided by `pitchfinder`.

### B. Pitch Alignment (Dynamic Time Warping - DTW)
Since users speak at different speeds than native speakers, a simple time-based overlay is insufficient.
- **Implementation**: Implement a basic DTW algorithm to align the user's pitch sequence with the native sequence.
- **Logic**: DTW finds the optimal non-linear alignment between two sequences, allowing the "red line" to stretch or compress to match the "blue line" for accurate comparison.

### C. AI Feedback Loop
- **Endpoint**: `/api/speaking-analyze-pitch`
- **Input**: 
    - User's transcription (from STT).
    - Pitch variance data (calculated from DTW distance).
    - Target phrase.
- **Prompt**:
    - "Act as a professional Korean speech coach. The user is practicing TOPIK Speaking. Their pitch variance is [X] and they missed the intonation on [specific word]. Provide one actionable tip to improve the naturalness of this phrase."

## 3. File Structure & Implementation Plan

### Files to Create:
- `product/src/app/speaking/pronunciation-trainer/page.tsx`: Main page with phrase list and recording interface.
- `product/src/components/speaking/PitchVisualizer.tsx`: The chart component that handles the DTW alignment and rendering of the two pitch lines.
- `product/src/app/api/speaking-analyze-pitch/route.ts`: AI feedback endpoint.
- `product/src/lib/audio-utils.ts`: Utility functions for pitch detection (integrating `pitchfinder`) and the DTW alignment logic.

## 4. Content Requirements
The trainer must include at least 20 phrases per level (L3-L6), focusing on common intonation pitfalls:
- **L3**: Polite question endings (`-요?`), basic statement intonation.
- **L4**: Contrastive focus (emphasizing specific words in a sentence).
- **L5**: Formal presentation style, professional rhythm.
- **L6**: Nuanced academic discourse, complex sentence pitch flow.

## 5. Acceptance Criteria
- [ ] User can record audio and see their pitch contour plotted on a graph.
- [ ] The native speaker's pitch is overlaid on the same graph.
- [ ] The two lines are aligned using DTW (not just based on raw time).
- [ ] AI provides a specific, actionable tip based on the recording.
- [ ] The interface supports phrases for Levels 3, 4, 5, and 6.
