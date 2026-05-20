# v2 Beta Test Plan: "The Observability Validation"

## 1. Introduction
The v2 Beta is designed to validate that the "Minimum Viable Beta" (MVB) features actually solve the core pain points identified in the v1 feedback analysis. The focus is not just on "does it work," but "does it significantly reduce the time to fix agent reasoning errors."

## 2. Beta Objectives
- **Validate "Live Whisper":** Confirm that real-time narratives allow developers to kill failing runs faster.
- **Validate "SDK Integration":** Confirm that the "JSON Tax" is eliminated and onboarding is $< 2$ minutes.
- **Validate "Trace Comparison":** Confirm that the divergence detection is accurate and useful for prompt engineering.
- **Stress Test Local Storage:** Ensure the SQLite backend handles large traces without performance degradation.

## 3. Target Beta Cohorts
We will recruit 20-30 testers from the v2 Waitlist, segmented into three personas:
1. **The Prompt Engineer (10 users):** Focus on `tw compare` and iterative prompt tuning.
2. **The Agent Architect (10 users):** Focus on `Live Whisper` and architectural loop detection.
3. **The Tool Developer (10 users):** Focus on the SDK integration and tool-call accuracy.

## 4. Key Test Scenarios
Beta testers will be asked to perform the following "Missions":

### Mission A: The Loop Break (Live Whisper)
- **Scenario:** Run an agent known to enter a logic loop (e.g., searching for the same term repeatedly).
- **Goal:** Use the Live Whisper stream to identify the loop and terminate the process *before* the agent reaches its max-step limit.
- **Success Metric:** Time from start to termination vs. v1 (manual log analysis).

### Mission B: The Prompt Pivot (Trace Comparison)
- **Scenario:** Take a failing prompt (A) and a corrected prompt (B) for the same complex task.
- **Goal:** Use `tw compare` to pinpoint exactly where the reasoning diverged and verify that Prompt B avoided the pitfall of Prompt A.
- **Success Metric:** User's ability to identify the divergence point without looking at raw logs.

### Mission C: The Zero-Config Start (SDK Integration)
- **Scenario:** Integrate TraceWhisper into a fresh LangChain or CrewAI project.
- **Goal:** Reach the first "Live Whisper" narrative using only the provided SDK documentation.
- **Success Metric:** Time-to-first-narrative (Target: $< 2$ minutes).

## 5. Feedback & Data Collection
To support Issue #47 (Design v2 Beta Feedback Interface), the following data points must be captured:

### 5.1 Quantitative Data (Telemetry)
- **Feature Frequency:** Number of times `tw compare` and `tw live` are invoked.
- **Latency:** Time from log-write to narrative-update (captured via internal timestamps).
- **Crash Rate:** Number of SQLite errors or LLM synthesis timeouts.

### 5.2 Qualitative Data (User Input)
- **Perceived Value:** For each mission, a 1-5 scale on "How much did this reduce my frustration?"
- **The "Aha!" Moment:** An open-text field: "What was the exact moment this tool provided a value that raw logs couldn't?"
- **Friction Points:** "Where did the tool feel clunky or confusing?"

## 6. Exit Criteria (Beta $\rightarrow$ GA)
The Beta is considered successful and ready for General Availability when:
1. **Onboarding Velocity:** $\ge 80\%$ of testers complete Mission C in $< 5$ minutes.
2. **Divergence Accuracy:** $\ge 90\%$ of testers agree that the `tw compare` divergence point matches their manual analysis.
3. **Stability:** Zero critical crashes in the SQLite storage layer across all cohorts.
4. **Value Validation:** Average "Perceived Value" score for Live Whisper is $\ge 4/5$.
