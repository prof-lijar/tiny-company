# Privacy Policy

**Last Updated: May 21, 2026**

Tiny Company ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your data when you use TraceWhisper and its associated services.

## 1. Data We Collect

### 1.1 Technical Data
We collect technical information necessary for the operation of the software, including:
- Account information (email, username).
- System metadata (OS, version, environment variables).
- Usage telemetry (feature activation, error rates).

### 1.2 Product-Specific Data (v2.2 - v3.0)
To power the "Fix-It" engine, the Reasoning IDE, and the v3.0 Self-Healing Orchestrator, we process:
- **Execution Traces:** Sequences of function calls and logs.
- **Reasoning Chains:** The intermediate steps taken by the AI to reach a conclusion.
- **Prompts and Responses:** The inputs provided to the system and the resulting outputs.
- **Healing Proposals:** Data related to the autonomous synthesis of corrective prompts and routing changes.

### 1.3 Telemetry for 'Cost-per-Correction'
As part of our efficiency optimization, we collect metrics related to the **Cost-per-Correction**. This includes:
- The number of iterations required to fix a bug.
- The token usage associated with each correction attempt.
- The delta between the initial failed trace and the final successful trace.
This data is used strictly for performance benchmarking and product improvement.

## 2. How We Use Your Data

### 2.1 Service Provision
We use your data to provide the core functionality of TraceWhisper, including the ability to analyze and fix reasoning errors and the autonomous synthesis of "Healing Proposals" in v3.0.

### 2.2 The Gold Standard Registry
With your explicit consent (via the Beta Participation Agreement), we use *anonymized* versions of successful reasoning paths to build the **Gold Standard Registry**. This allows the system to suggest "perfect" paths for common tasks to other users.

### 2.3 Product Improvement
We use telemetry data to identify common failure patterns and optimize the "Fix-It" engine's success rate.

### 2.4 Auditability and the Legal Ledger
To ensure compliance and forensic traceability, v3.0 implements a **Legal Ledger**. We collect and store immutable logs of:
- The trigger for an autonomous synthesis event.
- The synthesis logic used to propose a fix.
- The identity of the human operator who approved the fix.
- The timestamp of deployment.
This data is stored specifically for audit and compliance purposes.

## 3. Data Anonymization and Security

### 3.1 Anonymization Process
Before any data is used for the Gold Standard Registry or shared for benchmarking, it undergoes a strict anonymization process:
- **PII Removal:** Removal of names, emails, and physical addresses.
- **Secret Scrubbing:** Automatic detection and removal of API keys, passwords, and tokens.
- **Logic Masking:** Masking of proprietary business logic that is not essential to the reasoning pattern.

### 3.2 Zero-Leakage Synthesis
Our autonomous synthesis engines are designed for **Zero-Leakage**. We ensure that PII (Personally Identifiable Information) or proprietary data from one user's traces is never used to synthesize fixes or prompts for another user.

### 3.3 Security
We implement industry-standard encryption for data at rest and in transit.

## 4. Third-Party Processors and Privacy-Aware Routing

### 4.1 LLM Providers
TraceWhisper integrates with third-party Large Language Model (LLM) providers. Your prompts and traces are sent to these providers for processing. We ensure that our providers adhere to strict data processing agreements.

### 4.2 Privacy-Aware Routing (v3.0)
In v3.0, the Intelligent Model Router employs **Privacy-Aware Routing**. The system will only route your data to LLM providers that have been explicitly whitelisted by your organization in your Compliance Settings. Routing is contingent upon the existence of a valid Data Processing Agreement (DPA) between your organization and the target provider.

## 5. GDPR and User Rights
For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR):
- **Right to Access:** You may request a copy of the data we hold about you.
- **Right to Rectification:** You may request the correction of inaccurate data.
- **Right to Erasure:** You may request the deletion of your personal data.
- **Right to Object:** You may object to the processing of your data for the Gold Standard Registry.

## 6. Changes to This Policy
We may update this Privacy Policy from time to time. We will notify users of significant changes via email or an in-app notification.

## 7. Contact
For any privacy-related inquiries, please contact: `legal@tinycompany.ai`
