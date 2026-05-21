# Privacy Policy

**Last Updated: May 21, 2026**

Tiny Company ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy describes how we handle data when you use TraceWhisper, including the Reasoning IDE, the "Fix-It" Correction Engine, and the v2.3 Intelligence Layer.

## 1. Data Collection

### 1.1 Technical Data
We collect basic technical information necessary for the software to function, including:
- System metadata (OS, version, hardware identifiers).
- Usage telemetry (feature activation, error rates, performance metrics).

### 1.2 Reasoning and Prompt Data
TraceWhisper processes "Reasoning Traces"—the logs of an AI agent's thoughts, tool calls, and observations—and the system prompts associated with them.
- **Local Processing:** By default, Reasoning Traces are processed and stored locally on your machine.
- **Analysis Data:** When using the "Fix-It" engine or Intelligence Layer, specific segments of traces and prompts are processed to generate corrections or patterns.

### 1.3 The Pattern Vault (Cross-Project Intelligence)
The v2.3 Intelligence Layer utilizes a "Pattern Vault" to enable cross-project reasoning improvements. The nature of this vault depends on your subscription tier:
- **Pro Tier (Personal Vault):** Users on the Pro tier have a Personal Pattern Vault. Patterns are extracted and stored to benefit the individual user's projects.
- **Enterprise Tier (Managed Vault):** Enterprise customers have a Managed Pattern Vault, allowing for shared intelligence across an entire organization.
- **Tenant Isolation:** All patterns extracted into the Vault are strictly isolated by Organization (Tenant). Data from one organization is never used to provide suggestions to another organization.
- **Anonymization:** Before any pattern is stored in the Vault, it undergoes an anonymization pipeline to strip project-specific variables, secrets, and PII.
- **Community Sharing:** Sharing patterns across different organizations is strictly opt-in.

### 1.4 IDE and CI/CD Integration
- **IDE Extension:** The TraceWhisper VS Code extension transmits prompt and trace data to the backend to enable side-by-side visualization and direct patching.
- **Continuous Reasoning Integration (CRI):** When integrated into CI/CD pipelines (e.g., GitHub Actions), reasoning traces are processed by the runner. We ensure that these traces are not persistently stored on the CI provider's infrastructure beyond the build duration.

### 1.5 User-Provided Data
We collect any data you explicitly provide to us, such as your email address for account registration, support requests, or Beta program participation.

## 2. Data Usage
We use the collected data to:
- Provide and maintain the TraceWhisper service.
- Analyze system performance and identify bugs.
- **Product Improvement:** We use anonymized, aggregated telemetry to improve our narrative synthesis and log parsing engines.

## 3. Data Sharing and Third Parties

### 3.1 LLM Providers
To provide the "Fix-It" correction and Intelligence Layer features, TraceWhisper integrates with third-party Large Language Model (LLM) providers. 
- **Data Transfer:** Relevant trace segments and prompts are sent to the LLM provider.
- **Provider Policies:** Your data is processed in accordance with their respective privacy policies.

## 4. GDPR Compliance
For users in the European Economic Area (EEA), we adhere to the general principles of the General Data Protection Regulation (GDPR):
- **Right to Access, Erasure, and Rectification:** You may request a copy, deletion, or correction of your personal data.
- **Lawful Basis:** We process data based on the necessity to provide the service (Contract) and, where applicable, your explicit consent.

## 5. Data Security
We implement reasonable technical and organizational measures to protect your data. Because TraceWhisper is primarily a local-first tool, the security of the local storage is the responsibility of the user.

## 6. Changes to This Policy
We may update this Privacy Policy from time to time. We will notify users of significant changes via email or an in-app notification.

## 7. Contact
For any privacy-related inquiries, please contact `legal@tinycompany.ai`.
