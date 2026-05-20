# TraceWhisper v2 Beta: User Guide

Welcome to the TraceWhisper v2 Beta! This guide is designed to get you from installation to your first "Aha!" moment—seeing your agent's reasoning in real-time—in under 5 minutes.

## 1. The "Golden Path": Your First 5 Minutes

The goal of v2 is to eliminate the "JSON Tax." You no longer need to manually export logs; you just integrate the SDK and watch the narrative unfold.

### Step 1: Installation
Install the TraceWhisper SDK and CLI:
```bash
pip install tracewhisper
```

### Step 2: The One-Line Integration
Add TraceWhisper to your agent script. We support zero-config initialization.

**For Generic Python Agents:**
```python
import tracewhisper
tracewhisper.init()
```

**For LangChain Agents:**
```python
from tracewhisper.integrations.langchain import TraceWhisperCallback

# Add the callback to your agent's callbacks list
agent.run(input="Your query", callbacks=[TraceWhisperCallback()])
```

**For CrewAI Agents:**
```python
from tracewhisper.integrations.crewai import TraceWhisperCrew

# Wrap your crew initialization
crew = TraceWhisperCrew(your_existing_crew)
```

### Step 3: Run Your Agent
Execute your script as usual. TraceWhisper works in the background, streaming logs to a local SQLite database. You won't notice any significant performance degradation.

### Step 4: Launch Live Whisper (The "Aha!" Moment)
While your agent is running (or after it finishes), open a **new terminal** and run:
```bash
tw live
```
**What happens now:** You will see a real-time dashboard. As your agent thinks and acts in the other terminal, TraceWhisper synthesizes those logs into a human-readable narrative. 

**Look for:** "Critical Decision Points" (highlighted in the stream). These are the moments where the agent makes a pivotal choice or enters a loop.

---

## 2. Advanced Analysis: Trace Comparison

One of the most powerful features of v2 is the ability to A/B test your prompts.

### How to Compare Traces
If you have two different runs (e.g., one with Prompt A and one with Prompt B), you can compare them directly:
```bash
tw compare <trace_id_1> <trace_id_2>
```
*(Note: You can find trace IDs by running `tw list`)*

### Interpreting the Comparison Report
The report will highlight the **Point of Divergence**. 
- **The "Where":** The exact step where the agents took different paths.
- **The "Why":** A narrative explanation of how the prompt change influenced the agent's reasoning.
- **The "Winner":** A recommendation based on efficiency (fewer steps) and outcome accuracy.

---

## 3. Troubleshooting

| Issue | Solution |
| :--- | :--- |
| `tw live` shows "Waiting for logs..." | Ensure your agent script has called `tracewhisper.init()` and is currently executing. |
| Narrative is not updating | Check if your `OPENAI_API_KEY` is set in your environment variables, as synthesis requires LLM access. |
| Trace IDs not found | Run `tw list` to see all locally stored traces in the SQLite database. |

---

## 4. Providing Beta Feedback

As a Beta user, your feedback directly shapes the product. We are specifically looking for:
1. **The "Aha!" Moment:** Tell us the exact moment TraceWhisper showed you something raw logs couldn't.
2. **Friction Points:** Where did you get stuck during setup?
3. **Feature Requests:** What is the one thing missing that would make this a "must-have" tool?

**How to share:**
- **Discord:** Post in the `#beta-feedback` channel.
- **CLI:** Respond to the in-app prompts after using `tw compare`.
- **Email:** Reach out directly to the product team.

---
**Reference:** For the full technical specification, see `docs/product-spec-v2.md`.
