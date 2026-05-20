# Case Study: Debugging the Recursive Research Loop

**Goal:** Demonstrate how TraceWhisper v2 identifies a specific architectural failure (Recursive Search) that is invisible in raw logs.
**Target Audience:** Agent Architects, AI Engineers.
**Format:** Long-form post (LinkedIn/Blog) with visual callouts.

---

## The Scenario: The "Infinite Source" Bug
**The Agent:** A Research Agent designed to find three distinct, high-authority sources for a given query.
**The Failure:** The agent finds one great source, but then spends the next 20 steps "searching" for others, only to repeatedly return to the first source, convinced it's the only one that exists.

### 🔴 THE NOISE: The Raw Log Experience
The developer sees a 50-step trace. 
- Step 1: `search_web` -> returns Source A.
- Step 2: `thought` -> "I have Source A. Now I need Source B."
- Step 3: `search_web` -> returns Source A.
- Step 4: `thought` -> "I still need Source B. I will try a different query."
- Step 5: `search_web` -> returns Source A.
- ... (repeat 15 times) ...

**The Developer's Frustration:** "Why is it doing this? The search tool is working. The prompt says 'find three different sources'. Is the LLM ignoring the constraint? Is the search tool returning the same result because the query is too narrow? I have to read every single search query to see if they are actually different."

### 🟢 THE SIGNAL: The TraceWhisper v2 Narrative
**Executive Summary:** ⚠️ **RECURSIVE LOOP DETECTED**
**Root Cause:** Information Gain Collapse.

**The Narrative:**
The agent successfully retrieved Source A. However, it entered a **Reasoning Loop** at Step 3. Although the agent changed the search query slightly in each iteration, the underlying search tool continued to return Source A as the top result. 

**The "Aha!" Moment:**
The agent failed to recognize that it was receiving the same information. It treated each "new" search as a fresh attempt, failing to compare the *content* of the result with its existing knowledge base. It was trapped in a loop of **High Confidence / Zero Progress**.

**The Fix (The Fixer's Suggestion):**
*Modify the system prompt to include a 'Diversity Check': "After every tool call, compare the new information with existing sources. If the information is redundant, explicitly pivot the search strategy (e.g., change the domain or the language of the query) rather than slightly tweaking the keywords."*

---

## Key Takeaways for the Reader
1. **Logs show the action; Narratives show the failure mode.**
2. **Recursive loops are often 'silent' in logs** because every individual step looks "correct" (the tool returned a result, the agent thought about it).
3. **TraceWhisper v2 identifies the *pattern* of failure**, not just the error.

**CTA:** Stop guessing why your agent is looping. Join the v2 Beta and get the Narrative. [Link]
