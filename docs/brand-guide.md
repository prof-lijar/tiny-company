# Brand Guidelines: TraceWhisper

## 1. Brand Essence
TraceWhisper is the bridge between the chaotic internal monologue of an AI agent and human understanding. The brand represents **Clarity from Chaos**.

### Brand Promise
\"Turning the noise of agent logs into the signal of human insight.\"

### Tone of Voice
- **Precise:** We deal with technical traces; accuracy is paramount.
- **Calming:** We reduce the anxiety of debugging complex agent loops.
- **Transparent:** Our product is about observability; our communication should be open and clear.
- **Authoritative yet Accessible:** We are the experts in agent reasoning, but we make that expertise available to everyone.

---

## 2. Visual Identity

### Name Rationale
- **Trace:** The raw data, the path taken, the technical evidence.
- **Whisper:** The act of filtering out the noise, the distilled essence, the clear communication.

### Logo Concept (Visual Direction)
The logo should evoke the transition from \"noise\" to \"signal.\"
- **Symbol:** A series of fragmented, chaotic lines on the left that converge into a single, clean, horizontal line or a stylized \"speech bubble\" on the right.
- **Metaphor:** A prism that takes in white noise and outputs a clear beam of light.

### Color Palette
The palette is designed to feel like a modern IDE—dark, focused, and high-contrast where it matters.

| Color | Hex | Role | Psychology |
| :--- | :--- | :--- | :--- |
| **Obsidian** | `#0F172A` | Primary Background | Depth, stability, technical focus |
| **Signal Blue** | `#38BDF8` | Primary Accent | Clarity, trust, intelligence |
| **Noise Gray** | `#64748B` | Secondary Text/UI | The \"background noise\" to be filtered |
| **Insight Green** | `#4ADE80` | Success/Positive Signal | Health, resolution, \"Aha!\" moments |
| **Alert Amber** | `#FBBF24` | Warning/Friction | Attention, potential loop, bottleneck |
| **Pure White** | `#F8FAFC` | Primary Text | Maximum readability |

### Typography
We use a pairing of a clean Sans-Serif for narratives and a high-legibility Monospace for technical data.

- **Primary Typeface (Narrative):** *Inter* or *Roboto*
  - Use for: Summaries, reports, UI labels.
  - Characteristics: Clean, neutral, highly readable.
- **Secondary Typeface (Technical):** *JetBrains Mono* or *Fira Code*
  - Use for: Log snippets, tool calls, raw traces.
  - Characteristics: Precise, technical, developer-friendly.

---

## 3. v2.2 'Correction Preview' Beta Visual Language

The v2.2 update introduces the "Reasoning IDE" and the "Fix-It" engine. The visual language for this phase focuses on the **Correction Loop**.

### Visual Metaphors for Correction
- **The Breaking Point:** Represented by **Alert Amber** with a high-contrast marker. It is the "moment of failure" that anchors the diagnostic process.
- **The Correction Bridge:** A visual link (e.g., `+---[ CORRECTION ]--->`) in **Insight Green** that connects a failed reasoning path to a successful one.
- **The Delta View:** A side-by-side comparison where the "Before" (failed) state is muted in **Noise Gray** and the "After" (corrected) state is highlighted in **Pure White**, with specific prompt improvements explicitly called out in **Insight Green**.

### Beta Interaction Cues
- **Pulsing Alerts:** In `tw live` mode, a detected Reasoning Loop should pulse in **Alert Amber** to draw immediate attention.
- **Success Glow:** When a "Fix-It" correction is verified in the preview, the resulting trace should be framed with a subtle **Insight Green** border.

---

## 4. Design Principles
- **Signal over Noise:** If a piece of information doesn't help the user reach a conclusion, it is hidden or deemphasized.
- **Narrative First:** The story of the agent's journey is the primary interface; the raw data is the supporting evidence.
- **Technical Elegance:** The UI should feel like a high-end developer tool—efficient, keyboard-centric, and devoid of unnecessary ornamentation.
- **Accessibility:** Contrast ratios must meet WCAG AA standards to ensure observability for all users.

---

## 5. v2.3 'Intelligence Layer' Visual Language

The v2.3 update transforms TraceWhisper from a diagnostic tool into an intelligence layer. The visual language shifts from **Correction** to **Optimization and Wisdom**.

### New Visual Tokens
To support the Intelligence Layer, we introduce two new high-significance colors:

| Color | Hex | Role | Psychology |
| :--- | :--- | :--- | :--- |
| **Vault Purple** | `#A855F7` | Knowledge/Intelligence | Wisdom, organizational memory, premium insight |
| **Bloat Fog** | `#94A3B8` | Redundancy/Waste | Muted, redundant, "noise" to be pruned |

### Visual Metaphors for Intelligence
- **The Pattern Vault:** Represented by **Vault Purple**. It is treated as a "Library of Truth." When a Vault Insight is presented, it should feel like a prestigious suggestion—a proven solution from the organizational memory.
- **Cognitive Bloat:** Represented by **Bloat Fog**. Bloat is visualized as a "fog" or "grey-out" effect. Redundant reasoning steps are not just marked; they are visually diminished (strikethrough, muted opacity) to emphasize that they are waste.
- **The Gold Standard:** In CRI (Cognitive Reasoning Integrity), the "Expected Path" is the Gold Standard. It is rendered in **Insight Green** or **Pure White**, while the "Actual Path" is compared against it, with the **Divergence Point** flashing in **Alert Amber**.

### v2.3 Interaction Cues
- **The Vault Pulse:** When the system detects a pattern that exists in the Vault, a subtle purple glow or badge appears near the failure point, signaling that a "Proven Fix" is available.
- **Pruning Transition:** The transition from a "Bloated" trace to a "Pruned" trace should be a visual "clearing of the fog," where the Fog Grey elements vanish to reveal a lean, efficient path.
- **IDE Bridge:** The link between the prompt and the trace is a "Tether." Clicking a trace segment should "pull" the prompt editor to the exact line responsible, creating a physical sense of connection between cause and effect.
