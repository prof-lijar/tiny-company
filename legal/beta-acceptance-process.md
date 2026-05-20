# Beta Acceptance Process: Implementation Guide

This document outlines the required legal intercept for the TraceWhisper v2.2 Beta to ensure affirmative consent is captured from users.

## 1. The CLI Intercept (User Flow)

When a user runs `tw live` or `tracewhisper.init()` for the first time, the system must intercept the flow before any v2 functionality is enabled.

### A. The Prompt
The CLI should display the following text:

> **Welcome to TraceWhisper v2 Beta.**
> 
> By continuing, you agree to our **Beta Testing Agreement**, **Terms of Service**, and **Privacy Policy**.
> 
> You can view these documents by running: `tw legal`
> 
> **Do you agree to these terms? (y/n)**

### B. Affirmative Action
- If the user enters `y` or `Y`: The system records the acceptance and proceeds to the application.
- If the user enters `n` or `N` (or any other key): The system must terminate the process with a message: *"Agreement to the Beta Terms is required to use TraceWhisper v2. Please run 'tw legal' to review the terms and try again."*

## 2. Technical Implementation Requirements

### A. Persistence (Audit Trail)
The system must store the following metadata upon acceptance:
- `accepted_version`: (e.g., "1.0")
- `acceptance_timestamp`: ISO 8601 timestamp
- `user_id`: Unique identifier for the installation/user

This should be stored in the local configuration file or the SQLite state store.

### B. The `tw legal` Command
A new CLI command `tw legal` must be implemented. It should print the full text of:
1. `legal/beta-agreement.md`
2. `legal/terms-of-service.md` (once merged)
3. `legal/privacy-policy.md` (once merged)

### C. SDK Guardrail
The `tracewhisper.init()` method in the SDK should check for the acceptance flag. If missing, it should emit a warning:
`⚠️ Legal terms not accepted. Please run 'tw live' in your terminal to accept the Beta Agreement and enable full v2 functionality.`

## 3. Compliance Mapping
| Requirement | Implementation |
| :--- | :--- |
| Affirmative Consent | `(y/n)` prompt in CLI |
| Beta Agreement Display | `tw legal` command |
| Audit Trail | Local storage of timestamp and version |
| GDPR Consent | Explicit agreement to Privacy Policy via prompt |
