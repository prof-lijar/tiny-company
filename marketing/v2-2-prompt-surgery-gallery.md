# v2.2 'Correction Preview' Prompt Surgery Gallery

**Objective:** Provide concrete, "before-and-after" evidence of the Fix-It button's efficacy. These examples will be used in the Beta onboarding, social media clips, and the full v2.2 landing page.

---

## Case 1: The "Infinite Search" Loop
**Scenario:** An agent is tasked with finding a specific detail in a large document. It finds a partial match, fails to confirm it, and searches for the same term repeatedly.

**❌ The Failure (The Loop):**
- *Step 12:* "Searching for 'Q3 Revenue' in Section 4..."
- *Step 13:* "No definitive match found. Searching for 'Q3 Revenue' in Section 4..."
- *Step 14:* "No definitive match found. Searching for 'Q3 Revenue' in Section 4..."

**🪄 The Fix-It Suggestion:**
**Rationale:** The agent is stuck in a keyword-matching loop because it doesn't realize that 'Financial Results' is the header containing the 'Q3 Revenue' data. It lacks a "broaden search" fallback.
**Suggested Prompt Adjustment:** 
*"If a specific keyword search fails twice in the same section, expand the search to include synonyms or check the nearest section headers for related terminology before repeating the same query."*

**✅ The Result:**
The agent identifies 'Financial Results' as the header, finds the revenue data in Step 14, and terminates the loop.

---

## Case 2: The "Contradictory Constraint" Spiral
**Scenario:** An agent is told to be "extremely concise" but also to "provide a detailed step-by-step justification" for every action.

**❌ The Failure (The Spiral):**
- *Step 5:* "I will now provide a detailed justification... [Writes 3 paragraphs]... Wait, I must be concise. [Deletes everything]... I will now provide a detailed justification... [Writes 3 paragraphs]..."

**🪄 The Fix-It Suggestion:**
**Rationale:** The agent is experiencing a cognitive clash between two mutually exclusive constraints: 'Extremely Concise' vs 'Detailed Justification'.
**Suggested Prompt Adjustment:**
*"Prioritize brevity in the final output, but maintain a detailed internal monologue for justifications. Your external response should be a summary, while your reasoning trace remains comprehensive."*

**✅ The Result:**
The agent separates the *internal* reasoning (detailed) from the *external* response (concise), eliminating the deletion/rewrite loop.

---

## Case 3: The "Tool-Output Denial" Loop
**Scenario:** An agent calls a tool, receives a valid answer, but then decides the answer is "insufficient" and calls the same tool with the same parameters.

**❌ The Failure (The Loop):**
- *Step 8:* Call `get_weather(city="London")` $\rightarrow$ Result: "15°C, Cloudy"
- *Step 9:* "The result is too simple. I need more detail. Call `get_weather(city="London")`"
- *Step 10:* Result: "15°C, Cloudy" $\rightarrow$ "Still too simple. Call `get_weather(city="London")`"

**🪄 The Fix-It Suggestion:**
**Rationale:** The agent has an unrealistic expectation of the tool's output format and is attempting to 'force' more detail from a static API.
**Suggested Prompt Adjustment:**
*"Accept the output of the `get_weather` tool as the definitive state. If more detail is required, use the `get_forecast` tool instead of repeating the basic weather query."*

**✅ The Result:**
The agent accepts the 15°C result or pivots to the correct tool (`get_forecast`), breaking the loop.

---

## Usage Guidelines for Marketing:
- **Social Media:** Create "Swipe" carousels: Slide 1 (The Loop) $\rightarrow$ Slide 2 (The Magic Wand) $\rightarrow$ Slide 3 (The Fix).
- **Beta Onboarding:** Use these as "Expected Behaviors" so users know what a "good" fix looks like.
- **Landing Page:** Use these as "Real-World Examples" in the "Surgical Prompt Correction" section.
