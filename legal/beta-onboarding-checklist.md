# Legal Onboarding Checklist: v2.2 Beta Integration

This checklist provides the technical requirements for the CTO/Engineering team to ensure that the v2.2 Beta is launched with necessary legal protections and compliance.

## 1. Affirmative Consent Flow (The 'Legal Intercept')
The goal is to ensure users explicitly agree to the Beta Terms and Participation Agreement before accessing v2.2 features.

- [ ] **CLI Intercept:** Implement a "first-run" intercept in the CLI (e.g., during `tw live` or `tracewhisper.init()`).
- [ ] **Consent Prompt:** Display a clear notice: *"Welcome to TraceWhisper v2.2 Beta. By continuing, you agree to our Beta Terms of Service and Participant Agreement. [View Terms: tw legal]"*
- [ ] **Affirmative Action:** Require a `yes` or `Y` input to proceed.
- [ ] **Acceptance Logging:** Store the following in the local configuration/database:
    - User ID / Account identifier
    - Timestamp of acceptance
    - Version of the terms accepted (e.g., v2.2-beta-2026-05-20)
- [ ] **SDK Guardrail:** Ensure `tracewhisper.init()` checks for the acceptance flag. If missing, trigger a console warning and restrict access to v2.2-specific features (Reasoning IDE, Fix-It Engine).

## 2. Legal Transparency ('tw legal' Command)
- [ ] **Command Implementation:** Create a `tw legal` CLI command.
- [ ] **Content Delivery:** This command should print (or open in browser) the following:
    - `legal/v2.2-beta-tos.md`
    - `legal/v2.2-beta-participant-agreement.md`
    - `legal/privacy-policy.md`
    - `legal/code-of-conduct.md`

## 3. Community & Documentation Integration
- [ ] **Code of Conduct:** Link the Community Code of Conduct in the following areas:
    - `legal/contributing.md`
    - Beta onboarding email/documentation.
    - Any community forums or Slack/Discord channels used for the Beta.

## 4. Telemetry Compliance
- [ ] **Anonymization Pipeline:** Verify that the pipeline sending traces to the Gold Standard Registry strips all PII, API keys, and proprietary secrets *before* they leave the user's environment or upon arrival at the server.
- [ ] **Privacy Policy Alignment:** Ensure the telemetry collection described in `src/telemetry.py` matches the "Data Collection for Optimization" section of the Privacy Policy.

## 5. Verification
- [ ] **Legal Sign-off:** Once the above are implemented, the Legal Counsel will perform a final verification of the "Compliant-Frictionless" path.
