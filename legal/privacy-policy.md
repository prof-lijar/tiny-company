# Privacy Policy for TraceWhisper

**Last Updated:** 2026-05-20

TraceWhisper is committed to protecting your privacy. This Privacy Policy explains how data is handled when using the TraceWhisper software.

## 1. Data Collection and Processing
TraceWhisper is designed as a developer tool. The way data is processed depends on how you deploy and use the tool:

### 1.1 Local Processing
By default, TraceWhisper is designed to operate locally. When run locally:
- **No data is sent to our servers.** We do not host a central server that collects your logs or reports.
- Your logs, configuration files, and generated reports remain on your local machine or within your own controlled infrastructure.

### 1.2 Third-Party LLM Providers
To synthesize narratives, TraceWhisper requires access to a Large Language Model (LLM). 
- **API Usage:** If you configure TraceWhisper to use a third-party API (e.g., OpenAI, Anthropic, Google), your log data (or chunks of it) will be sent to that provider for processing.
- **Data Handling:** The processing of your data by these third parties is governed by their respective privacy policies and data processing agreements. We encourage users to review the privacy terms of their chosen LLM provider.

## 2. Types of Data Processed
TraceWhisper processes:
- **Log Data:** The raw execution logs of AI agents that you provide to the tool.
- **Configuration Data:** API keys and settings you provide to enable the tool's functionality.

## 3. Your Rights (GDPR Compliance)
Depending on your jurisdiction (e.g., if you are in the EU), you have certain rights under the General Data Protection Regulation (GDPR):
- **Right to Access/Erasure:** Since TraceWhisper operates locally, you have you have full control over your data. You can delete your logs and reports at any time from your own system.
- **Data Minimization:** TraceWhisper is designed to process only the data you explicitly provide to the tool for the purpose of narrative synthesis.

## 4. Data Security
As a local tool, the security of the data processed by TraceWhisper depends on the security of the environment in which it is run. We recommend:
- Securing your API keys using environment variables or secure vault systems.
- **Local Storage Encryption:** We recommend that you use disk encryption for any environment where sensitive logs are processed.
- Ensuring your local storage is access-controlled.

## 5. Changes to this Policy
We may update this Privacy Policy from time to time. Any changes will be reflected by the "Last Updated" date at the top of this page
## 6. Contact
For questions regarding this Privacy Policy, please refer to the project's maintainers via the official repository.
