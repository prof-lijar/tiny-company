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

## 5. v2.5 'The Autonomous Bridge' Visual Language

The v2.5 update marks a transition from **Passive Governance** to **Active Optimization**. The visual language shifts from the "Control Tower" (rigid, authoritative) to the "Autonomous Bridge" (fluid, intelligent).

### Visual Metaphors for Autonomy
- **The Bridge (Flow):** Moving from "walls" (guardrails) to "bridges" (optimal paths). Visuals emphasize flow, streams, and connectivity.
- **The Health Orbit:** A circular, node-based visualization representing the real-time state of all agents, moving away from linear lists to a systemic view.
- **The Ghost Path:** A visual overlay showing the *intended* Golden Path (solid) vs. the *actual* diverging path (dashed), highlighting the "Logic Drift" point.
- **The Translation Bridge:** A visual transition showing the prompt for one model transforming into another, representing "Cognitive Portability."

### v2.5 Expanded Color Palette
To distinguish the autonomous features from the core governance tools, we introduce a "Cognitive" palette.

| Color | Hex (Suggested) | Role | Psychology |
| :--- | :--- | :--- | :--- |
| **Cyber Teal** | `#2DD4BF` | Autonomous Action | Intelligence, fluidity, modernism |
| **Electric Indigo** | `#6366F1` | Cognitive Mapping | Depth, intuition, connectivity |
| **Drift Yellow** | `#FDE047` | Logic Divergence | Caution, "Silent Failure" detection |

### Design Principles for v2.5
- **Curated Approval:** The UI should not ask the user to *configure*, but to *validate*. The system proposes; the human approves.
- **Systemic Observability:** Shift from analyzing single traces to analyzing "Reasoning Health" across the entire agent fleet.
- **Intent over Phrasing:** Visuals should emphasize the *intent* of a reasoning step rather than the specific prompt text.
