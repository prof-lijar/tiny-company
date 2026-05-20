# Privacy Policy for TraceWhisper v2.2

**Last Updated: May 20, 2026**

Tiny Company ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the TraceWhisper software and services (the "Service"), including the Reasoning IDE and the Closed-Loop Debugger.

## 1. Data We Collect

### 1.1 User-Provided Data
- **Account Information:** When you authenticate via `tw login`, we collect your email address and basic profile information to manage your account, access, and team sharing permissions.
- **Logs, Traces, and System Prompts:** To provide the Service's core and functionality (synthesis, narratives, and the "Fix-It" engine), TraceWhisper processes the logs, execution traces, and the system prompts of your AI agents. 
    - **Local Processing:** By default, traces and prompts are stored in a local SQLite database on your machine.
    - **Remote Processing:** For narrative generation, automated prompt suggestions (the "Fix-It" button), and regression analysis (CI/CD Guardrails), specific segments of these logs and the corresponding system prompts are streamed to LLM providers via API.
- **Shared Traces:** When you use the "Team Sharing" feature to generate a shareable URL, the specific trace data associated with that URL is uploaded to our secure storage to enable accessibility via the web.

### 1.2 Automatically Collected Data
- **Telemetry Data:** We collect anonymized usage data (e.g., feature usage, error reports, and system performance) to improve the Service.
- **Device Information:** Basic information about your operating system and environment may be collected for compatibility and debugging purposes.

## 2. How We Use Your Data
We use the collected data for the following purposes:
- **Service Delivery:** To generate narratives, identify reasoning loops, perform root cause analysis for the "Fix-It" button, and provide prompt suggestions.
- **Quality Assurance:** To facilitate the CI/CD Reasoning Guardrails by comparing current agent behavior against "Gold Standard" baselines.
- **Account Management:** To authenticate users and manage access.
- **Team Collaboration:** To host and serve shareable logic audit reports via the Team Sharing feature.
- **Product Improvement:** To analyze telemetry and improve the SDK and CLI tools.
- **Communication:** To send important service updates or security notices.

## 3. Data Sharing and Disclosure

### 3.1 LLM Providers
TraceWhisper is a synthesis tool. To generate narratives, "Fix-It" suggestions, and guardrail analysis, your logs, traces, and system prompts are sent to LLM providers (e.g., OpenAI, Anthropic, Google) via API. Your use of the Service is subject to the privacy policies of these third-party providers.

### 3.2 Legal Requirements
We may disclose your information if required to do so by law or in response to valid requests by public authorities.

### 3.3 No Sale of Data
We do not sell, rent, or trade your personal data, agent logs, or system prompts to third parties for marketing purposes.

## 4. GDPR Compliance (For EU/EEA Users)
If you are located in the European Economic Area (EEA), you have the following rights under the General Data Protection Regulation (GDPR):
- **Right of Access:** You can request a copy of the personal data we hold about you.
- **Right to Rectification:** You can request the correction of inaccurate data.
- **Right to Erasure ("Right to be Forgotten"):** You can request the deletion of your account and any shared traces hosted on our servers.
- **Right to Data Portability:** You can request your data in a structured, machine-readable format.
- **Right to Object:** You can object to the processing of your data for certain purposes.

**Legal Basis for Processing:** We process your data based on your consent (when you agree to the Terms of Service) and our legitimate interest in providing and improving the Service.

## 5. Data Retention
- **Account Data:** Retained as long as your account is active.
- **Local Logs/Traces/Prompts:** Managed by the user on their own hardware.
- **Shared Traces:** Retained on our servers until the user deletes the share link or the account is closed.
- **Telemetry:** Anonymized telemetry is retained for a period of 12 months.

## 6. Security
We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security. Users are responsible for ensuring that shared traces and prompts do not contain sensitive secrets (e.g., API keys).

## 7. Changes to This Privacy Policy
We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the "Last Updated" date at the top of this document.

## 8. Contact Us
For any privacy-related inquiries or to exercise your GDPR rights, please contact:
**Privacy Officer**
legal@tinycompany.ai
