# Privacy Policy for TraceWhisper

**Last Updated:** 2026-05-20
**Status:** Finalized / Approved by Legal

TraceWhisper is committed to protecting your privacy. This Privacy Policy explains how data is handled when using the TraceWhisper software.

## 1. Data Collection and Processing
TraceWhisper is designed as a developer tool. The way data is processed depends on how you deploy and use the tool.

### 1.1 Local Processing and "Frictionless Entry"
TraceWhisper is built for local-first operation. In alignment with our "Frictionless Entry" philosophy:
- **No Centralized Collection:** By default, TraceWhisper does not send your logs, trace data, or reasoning narratives to Tiny Company servers.
- **Local Storage:** Your logs, configuration files, and generated "Logic Audit Reports" remain on your local machine or within your own controlled infrastructure.
- **Installation Telemetry:** We do not collect telemetry on installation or usage patterns unless explicitly opted-in via a separate configuration.

### 1.2 Third-Party LLM Providers and "Debug-First" Analysis
To enable "Debug-First" tuning and forensic narrative synthesis (including the detection of reasoning loops, contradictions, and hallucinations), TraceWhisper requires access to a Large Language Model (LLM).
- **API Usage:** If you configure TraceWhisper to use a third-party API (e.g., OpenAI, Anthropic, Google), your log data (or chunks of it) will be sent to that provider for processing.
- **Forensic Analysis:** The "forensic" analysis is performed by the LLM provider based on the prompts provided by TraceWhisper. Tiny Company does not see or store the data sent to these providers.
- **Data Handling:** The processing of your data by these third parties is governed by their respective privacy policies and data processing agreements. We encourage users to review the privacy terms of their chosen LLM provider.

## 2. Types of Data Processed
TraceWhisper processes:
- **Log Data:** The raw execution logs of AI agents that you are providing to the tool.
- **Configuration Data:** API keys and settings you provide to enable the tool's functionality.

## 3. Your Rights (GDPR Compliance)
Depending on your jurisdiction (e.g., if you are in the EU), you have certain rights under the General Data Protection Regulation (GDPR):
- **Right to Access/Erasure:** Since TraceWhisper operates locally, you have full control over your data. You have the right to delete your logs and reports at any time from your own system.
- **Data Minimization:** TraceWhisper is designed to process only the data you explicitly provide to the tool for the purpose of narrative synthesis.

## 4. Data Security
As a local tool, the security of the data processed by TraceWhisper depends on the security of the environment in which it is run.
- **API Key Security:** We recommend securing your API keys using environment variables or secure vault systems.
- **Local Storage Encryption:** We recommend that you use disk encryption for any environment where sensitive logs are processed.
- **Access Control:** Ensuring your local storage is access-controlled.

## 5. Changes to this Policy
We may update this Privacy Policy from time to time. Any changes will be reflected by the "Last Updated" date at the top of this page.

## 6. Contact
For questions regarding this Privacy Policy, please refer to the project's maintainers via the official repository.
