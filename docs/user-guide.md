# User Guide: TraceWhisper

Welcome to **TraceWhisper**, the reasoning governance platform that turns chaotic AI agent logs into clear, human-readable narratives and ensures cognitive stability at scale.

This guide is divided into two sections: **Developer Basics** (for individual debugging) and **Enterprise Governance** (for managing production agent fleets).

---

## Part 1: Developer Basics (The Reasoning IDE)

### 1. Installation
Ensure you have the project dependencies installed:
```bash
pip install -r requirements.txt
# or
uv sync
```

### 2. Basic Usage: Narrative Parsing
The `parse` command turns raw JSON logs into a human-readable story.
```bash
python src/main.py parse path/to/your_log.json --output report.md
```
- **Concise Mode:** `--verbosity concise` (Focuses on Key Decision Points).
- **Detailed Mode:** `--verbosity detailed` (Default; full cognitive journey).

### 3. The Verification Loop (v2.2+)
TraceWhisper allows you to fix a reasoning bug and verify it immediately without manual guesswork.
1. **Identify the Breaking Point:** Use a Narrative Report to find where the agent diverged.
2. **Apply a Fix:** Update your system prompt.
3. **Verify:** Use the verification loop to re-run the trace and compare the new path against the old one.

### 4. Continuous Reasoning Integration (CRI) (v2.3+)
Treat reasoning as code. Use `.tw-test` files to define expected reasoning milestones.
- **`tw verify-all`**: Runs all reasoning tests. If the agent achieves the right answer but uses the wrong path, the test fails.

---

## Part 2: Enterprise Governance (v2.4 & v2.5)

For organizations scaling 100+ agents, TraceWhisper moves from a debugging tool to a governance layer.

### 1. Organizational Golden Paths (v2.4)
A **Golden Path** is a verified, approved sequence of reasoning steps (Standard Operating Procedure) that an agent *must* follow to ensure safety and reliability.
- **Implementation:** Defined in YAML, these paths specify mandatory Key Decision Points (KDPs).
- **Enforcement:** Any trace that deviates from the Golden Path is flagged as non-compliant, even if the final answer is correct.

### 2. Production Drift Detection (v2.5)
TraceWhisper monitors live production telemetry to detect when an agent's "cognitive habits" change.

#### Logic Drift vs. Output Error
It is critical to distinguish between these two types of failures:
- **Output Error (The Symptom):** The agent provides a wrong answer. This is a lagging indicator; by the time this happens, the user is already impacted.
- **Logic Drift (The Cause):** The agent provides the *correct* answer, but the reasoning path has diverged from the Golden Path. This is a **leading indicator**. It suggests that the agent is "getting lucky" or has become unstable, and a catastrophic failure is imminent.

**Monitoring:** Use the Production Dashboard to track the **Path Adherence Rate (PAR)**. A drop in PAR triggers a Logic Drift alert.

### 3. The Autonomous Bridge (v2.5)
To reduce the manual overhead of governance, v2.5 introduces autonomous tools:
- **Auto-SOP:** Instead of writing Golden Paths by hand, the system analyzes thousands of successful production traces and *proposes* a Golden Path based on the most common successful trajectories.
- **Logic Porter:** Allows you to migrate a verified reasoning pattern from one model (e.g., GPT-4) to another (e.g., Claude 3.5) by translating the cognitive intent into a model-specific system prompt.

---

## Appendix: Preparing Your Logs
TraceWhisper requires logs in the **Reference Format**:
- `trace_id`: Unique identifier.
- `events`: A sequence of `thought` $\rightarrow$ `action` $\rightarrow$ `observation` $\rightarrow$ `final_response`.

For the full schema, see `docs/log-format-spec.md`.
