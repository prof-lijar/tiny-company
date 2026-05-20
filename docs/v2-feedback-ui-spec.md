# UI/UX Specification: v2 Beta Feedback Interface

## 1. Introduction
The v2 Beta Feedback Interface is designed to capture high-fidelity user feedback directly from the developer's workflow. The goal is to minimize friction, ensuring that developers can report bugs or suggest improvements at the exact moment they encounter them, without leaving their terminal environment.

## 2. Design Goals
- **Zero Friction:** Feedback should be triggerable in seconds.
- **Context-Aware:** Automatically capture environment data (version, OS, trace ID) to reduce manual input.
- **Consistent Identity:** Adhere to the "Precision-Secure" vibe: clean, dark-themed, and professional.
- **Signal-Oriented:** Focus on the most impactful data points rather than exhaustive surveys.

## 3. User Journey
The feedback flow follows a linear, three-step path:

**Trigger** $\rightarrow$ **Feedback Form** $\rightarrow$ **Confirmation**

### 3.1 Trigger Points
- **Explicit:** The user runs the command `tw feedback`.
- **Implicit:** After a `tw analyze` or `tw compare` operation, a subtle prompt appears: 
  `💡 Was this analysis helpful? (y/n)`. If 'n', the feedback flow is triggered.

### 3.2 Feedback Form (The Collection)
The form is presented as a series of interactive CLI prompts using a guided selection menu.

### 3.3 Confirmation
A concise confirmation message that acknowledges the receipt of feedback and provides a tracking reference.

## 4. Interface Specifications (CLI)

### 4.1 Visual Style
- **Colors:** 
    - Primary Text: Whisper White
    - Highlights/Selection: Signal Violet
    - Alerts/Errors: Deep Space (background) with high-contrast accents.
- **Typography:** JetBrains Mono (for all CLI output).

### 4.2 Wireframes (ASCII)

#### Screen 1: Feedback Type Selection
The user is asked to categorize their feedback.

```text
──────────────────────────────────────────────────────────────────────
  TRACEWHISPER FEEDBACK LOOP v2
──────────────────────────────────────────────────────────────────────
  What would you like to share with us?
  
  ( ) 🐛 Bug Report          - Something is broken
  ( ) 💡 Feature Request     - I want TraceWhisper to do X
  ( ) 💬 General Feedback    - Thoughts on the experience
  ( ) ❌ Cancel              - Go back to terminal
──────────────────────────────────────────────────────────────────────
  Selection: [ 💡 Feature Request ]
```

#### Screen 2: Detailed Input
Depending on the selection, the prompt changes. For a Feature Request:

```text
──────────────────────────────────────────────────────────────────────
  FEATURE REQUEST: THE SIGNAL
──────────────────────────────────────────────────────────────────────
  Describe the capability you're missing:
  > I want to be able to export the narrative as a PDF for stakeholders.
  
  How would this change your workflow?
  > It would save me 20 minutes of copy-pasting into documents.
  
  Impact Level:
  [ Low ]  [ Medium ]  [ ★ High ]
──────────────────────────────────────────────────────────────────────
```

#### Screen 3: Confirmation
The final state after submission.

```text
──────────────────────────────────────────────────────────────────────
  ✓ FEEDBACK SUBMITTED
──────────────────────────────────────────────────────────────────────
  Thank you for helping us refine the signal.
  
  Reference ID: TW-BETA-8842
  Status: Sent to Product Team
  
  Return to terminal...
──────────────────────────────────────────────────────────────────────
```

## 5. Data Collection Requirements
To ensure the feedback is actionable, the interface must silently attach the following metadata to the submission:
- **Version:** Current TraceWhisper version (e.g., v2.0.1-beta).
- **Environment:** OS, Python version, and Shell.
- **Context:** If triggered from a specific trace, the `trace_id` and the last 10 lines of the narrative.
- **Timestamp:** UTC timestamp of the report.

## 6. UX Considerations
- **Non-Blocking:** The feedback process must not interfere with the agent's execution or the user's active session.
- **Progressive Disclosure:** Only ask for the "Impact Level" if the user has provided a description.
- **Accessibility:** Ensure all prompts are readable by screen readers and follow standard CLI keyboard navigation (Arrows + Enter).
