# UI/UX Refinements: v2.1 'Frictionless' Experience

This document specifies the visual and interaction refinements for the v2.1 update, focusing on reducing the "Integration Gap" and enhancing the "Debug-First" workflow.

## 1. Frictionless Entry: The "First-Value" Flow

The goal is to lead the user from `pip install` to their first "Aha!" moment (the first synthesized narrative) with zero cognitive load.

### 1.1 The "Welcome & Setup" Sequence
When a user first runs `tw live` after installation, they are greeted with a streamlined onboarding sequence.

```text
+--------------------------------------------------------------------------+
|  Welcome to TraceWhisper v2.1                                            |
|  ----------------------------------------------------------------------  |
|  [✓] SDK Installed                                                       |
|  [ ] Framework Integrated (LangChain / CrewAI / AutoGen)                  |
|  [ ] First Trace Captured                                                |
|                                                                          |
|  Quick Start: Use a Recipe to get started in < 60s                        |
|  Run: 'tw setup --recipe [framework]'                                     |
+--------------------------------------------------------------------------+
```

### 1.2 The "Aha!" Moment: Success Confirmation
Once the first trace is successfully captured and synthesized, the CLI provides a high-visibility confirmation to reinforce the value.

```text
+--------------------------------------------------------------------------+
|  ✨ SUCCESS: First Narrative Captured!                                    |
|  ----------------------------------------------------------------------  |
|  TraceWhisper is now listening to your agent.                            |
|  We've distilled your raw logs into a forensic narrative.                |
|                                                                          |
|  Insight: Your agent is currently in a [RESEARCH] phase.                  |
|  View the live stream: 'tw live'                                         |
|                                                                          |
|  [ Ready to optimize? Try 'tw fix' when you spot a loop ]                |
+--------------------------------------------------------------------------+
```

---

## 2. 'Debug-First' Tuning Interface

The "Debug-First" philosophy posits that the fastest way to improve an agent is to fix the reasoning logic immediately upon detection of a failure.

### 2.1 Contextual Mini-Guides (Tooltips)
When the `tw live` stream detects a reasoning anomaly (Loop, Contradiction, Pivot), a subtle "Guide" is appended to the narrative.

**Example: Loop Detection**
```text
14:05:10 - [LOOP] Agent is repeatedly searching for "AI Agents".
            └─ 💡 DEBUG-FIRST TIP: 
               Reasoning loops often occur when the system prompt 
               lacks a "termination condition" for failed searches.
               
               Quick Fix: Run 'tw fix --point 14:05:10' to generate 
               a prompt improvement.
```

**Example: Contradiction Detection**
```text
14:06:22 - [CONTRADICTION] Agent claims "X is true" but previously 
            stated "X is false" at 14:02:01.
            └─ 💡 DEBUG-FIRST TIP: 
               Contradictions suggest a "context drift" or a conflict 
               between the system prompt and the retrieved data.
               
               Quick Fix: Use 'tw compare' to see where the logic diverged.
```

---

## 3. Marketing Asset Specs: "Integration Recipes"

To support the v2.1 campaign, we need visual representations of the "Recipes." Since we are a CLI tool, these assets should be designed as "Technical Recipe Cards."

### 3.1 The "Recipe Card" Concept
Each card represents a framework (LangChain, CrewAI, AutoGen) and should follow these specs:

- **Header:** Framework Logo + "Integration Recipe"
- **Complexity Score:** "Low" (represented by a green checkmark)
- **Time to Value:** "< 60 Seconds"
- **The "Magic Line":** A snippet of the wrapper code (e.g., `with TraceWhisper(agent):`)
- **Outcome:** A small ASCII representation of the "Before" (JSON logs) $\rightarrow$ "After" (Narrative stream).

**Visual Mockup (ASCII):**
```text
+---------------------------------------+
| [ LangChain ]   Integration Recipe    |
|---------------------------------------|
| Effort: Low (✓) | Time: < 60s         |
|                                       |
| Code:                                 |
|   tw_wrap(my_langchain_agent)         |
|                                       |
| Result:                               |
|   { "json": "noise..." } -> [Narrative]|
+---------------------------------------+
```

## 4. UI Interaction Patterns

| Event | Trigger | Visual Response | Goal |
| :--- | :--- | :--- | :--- |
| First Run | `tw live` (new install) | Welcome Checklist | Orient user |
| First Trace | `sdk_initialized` | Success Banner | Affirm value |
| Anomaly | `[LOOP]` / `[PIVOT]` | Contextual Guide | Drive to `tw fix` |
| Integration | `tw setup --recipe` | Progress Bar $\rightarrow$ Success | Reduce friction |
