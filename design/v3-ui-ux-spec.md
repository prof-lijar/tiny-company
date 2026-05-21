# UI/UX Specification: TraceWhisper v3.0 \\u2014 The Self-Healing Orchestrator

## 1. Design Vision: The Strategic Command Center
TraceWhisper v3.0 transitions from a forensic tool (finding what broke) to a **Strategic Command Center** (managing how the system heals). The UI is designed to minimize cognitive load by presenting *proposals* rather than *problems*.

### Core Metaphor: The Living Circuit
The interface treats AI reasoning paths as dynamic circuits. When a "break" (drift) occurs, the system doesn't just alert the user; it visually demonstrates the "rerouting" and "repair" process in real-time.

---

## 2. Visual Language & Identity (v3.0 Extension)

### 2.1 Color Palette Extension
Building on the v2.5 "Autonomous Bridge" palette, v3.0 introduces colors for the "Strategic" layer.

| Color | Hex | Role | Meaning |
| :--- | :--- | :--- | :--- |
| **Obsidian** | `#0F172A` | Primary Background | Depth and technical focus |
| **Signal Blue** | `#38BDF8` | Primary Accent | Intelligence and clarity |
| **Healing Emerald** | `#10B981` | Healed Path / Success | Verified resolution |
| **Drift Amber** | `#F59E0B` | Active Drift / Diagnosis | System is currently healing |
| **Critical Crimson** | `#EF4444` | Human Intervention Req. | Self-healing failed; manual fix needed |
| **Circuit Silver** | `#94A3B8` | Path Connectors | The structure of the reasoning flow |

### 2.2 Typography (Consistency)
- **Narrative:** *Inter* (Clean, professional)
- **Technical/Data:** *JetBrains Mono* (Precise, developer-centric)

---

## 3. High-Fidelity Screen Specifications

### 3.1 The Strategic Dashboard (The "Health Map")
The entry point for v3.0. It provides a systemic view of the entire agent fleet.

**Key Components:**
- **Reasoning Health Map:** A grid of agents. 
  - *State: Stable* $\\rightarrow$ Solid Signal Blue border.
  - *State: Healing* $\\rightarrow$ Pulsing Drift Amber glow.
  - *State: Critical* $\\rightarrow$ Solid Critical Crimson border.
- **Autonomous Queue:** A real-time feed of background operations.
  - Format: `[Agent Name] | [Operation: Diagnosis/Synthesis/Verification] | [Progress Bar]`
- **MTTR Widget:** A large-format metric showing "Mean Time To Repair."

**Wireframe (ASCII):**
```text
+---------------------------------------------------------------------------+
| [ TW v3.0 ]  Dashboard  |  Architecture Designer  |  Model Routing  | Admin |
+---------------------------------------------------------------------------+
|                                                                           |
|  SYSTEM HEALTH MAP                                   MTTR: 4.2m [v]        |
|  +-----------+  +-----------+  +-----------+  +-----------+               |
|  | [Agent A] |  | [Agent B] |  | [Agent C] |  | [Agent D] |               |
|  |   STABLE  |  |  HEALING  |  |  CRITICAL  |  |   STABLE  |               |
|  |   (Blue)  |  |  (Amber)  |  |   (Red)    |  |   (Blue)  |               |
|  +-----------+  +-----------+  +-----------+  +-----------+               |
|                                                                           |
|  AUTONOMOUS QUEUE                                                         |
|  +---------------------------------------------------------------------+  |
|  | Agent: Research-Bot | Diagnosing Drift in 'Source Val' | [||||--] 60% |  |
|  | Agent: Legal-Bot    | Verifying Synthesis for 'GDPR'    | [||||||] 100%|  |
|  | Agent: Synthesis-Bot| Optimizing Path for 'Summary'     | [|-----] 20% |  |
|  +---------------------------------------------------------------------+  |
|                                                                           |
+---------------------------------------------------------------------------+
```

### 3.2 The Healing Stream & Reasoning Diff
When a user clicks a "Critical" agent or a "Healing" proposal, they enter the Repair View.

**Key Components:**
- **The Repair Stream:** A vertical timeline of the self-healing loop:
  - $\\text{Detection} \\rightarrow \\text{Diagnosis} \\rightarrow \\text{Synthesis} \\rightarrow \\text{Verification} \\rightarrow \\text{Proposal}$.
- **The Reasoning Diff:** A side-by-side comparison of the cognitive path.
  - **Left (Drifted):** The failed path, muted in Noise Gray, with the failure point highlighted in Critical Crimson.
  - **Right (Healed):** The proposed path, highlighted in Healing Emerald.
- **Stability Gain Metric:** e.g., "+14% Adherence to Golden Path."

**Wireframe (ASCII):**
```text
+---------------------------------------------------------------------------+
| < Back to Dashboard | REPAIR SESSION: Research-Bot | Milestone: 'Source Val'|
+---------------------------------------------------------------------------+
|                                                                           |
|  REPAIR STREAM                      REASONING DIFF                         |
|  ( ) Detection [10:01]               DRIFTED PATH         HEALED PATH      |
|  ( ) Diagnosis [10:02]               [Step 1]            [Step 1]         |
|  ( ) Synthesis [10:05]               [Step 2]            [Step 2]         |
|  ( ) Verification [10:08]           [ FAIL ] <--- DIFF -> [ FIXED ]       |
|  (*) PROPOSAL [10:10]                (Logic Drift)        (Synth-Fix)     |
|                                                                           |
|                                     STABILITY GAIN: +12% [!]               |
|                                                                           |
|  +---------------------------------------------------------------------+  |
|  | [ REJECT PROPOSAL ]                       [ APPROVE & DEPLOY FIX ]   |  |
|  +---------------------------------------------------------------------+  |
+---------------------------------------------------------------------------+
```

### 3.3 The Visual Architecture Designer (Cognitive Lego Set)
A low-code canvas for designing and optimizing reasoning flows.

**Key Components:**
- **The Canvas:** Infinite grid for placing and connecting blocks.
- **Reasoning Blocks:**
  - *Standard Block:* Simple operation (e.g., "Web Search").
  - *Smart Block:* Model-agnostic operation (e.g., "Synthesis").
- **Routing Toggles:**
  - `Pinned`: Fixed to a specific model (e.g., GPT-4o).
  - `Auto-Route`: Orchestrator chooses the best model based on current load/cost.
- **Simulation Mode:** Run a "ghost" trace through the design to check for potential drift points.

**Wireframe (ASCII):**
```text
+---------------------------------------------------------------------------+
| [ File ] [ Save ] [ Deploy ]                   Canvas: Main_Orchestrator   |
+---------------------------------------------------------------------------+
|                                                                           |
|    +----------------+          +------------------+                       |
|    | Input Trigger  | -------> |  Search Block    |                       |
|    | (Event: User)  |          | [ Model: Llama 3 ]|                       |
|    +----------------+          +------------------+                       |
|                                         |                                 |
|                                         v                                 |
|    +----------------+          +------------------+                       |
|    | Final Output   | <------- | Synthesis Block  |                       |
|    | [ Model: GPT-4o]|         | [ Model: AUTO ]  |                       |
|    +----------------+          +------------------+                       |
|                                                                           |
|  [ + Add Block ]  [ + Add Model ]  [ Run Simulation ]  [ View Health Map ] |
+---------------------------------------------------------------------------+
```

### 3.4 Model Routing Visualization (Traffic Flow Map)
A systemic view of how tokens and requests are moving across the model fleet.

**Key Components:**
- **Model Nodes:** Circular nodes representing models (Llama 3, GPT-4o, Claude 3.5).
- **Flow Lines:** Thickness represents volume. Color represents cost/latency.
- **Efficiency Overlay:** A heat-map showing where the system is "over-spending" (high cost, low complexity tasks).

---

## 4. v3.0 Component Library Updates

### 4.1 New Components
- **`HealingCard`**: A high-contrast card used for proposals, featuring the Diff view and action buttons.
- **`HealthNode`**: A square tile with a dynamic border (Blue/Amber/Red) and pulsing animations.
- **`LogicBlock`**: A draggable canvas element with a dropdown for model selection and a status indicator.
- **`RepairTimeline`**: A vertical stepper that animates as the self-healing loop progresses.

### 4.2 Interaction Patterns
- **The "Approval" Flow**: System detects drift $\\rightarrow$ Background healing $\\rightarrow$ User receives notification $\\rightarrow$ User reviews Diff $\\rightarrow$ One-click deployment.
- **The "Simulation" Flow**: User modifies Architecture $\\rightarrow$ Clicks "Run Simulation" $\\rightarrow$ System highlights potential "Drift Points" in Amber.
