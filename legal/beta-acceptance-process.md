# Beta Testing Agreement Acceptance Process

**Version:** 1.0
**Status:** Required for v2 Beta Launch

To ensure that the Beta Testing Agreement is legally binding and enforceable, the following "Click-wrap" acceptance process must be implemented in the v2 onboarding flow.

## 1. Acceptance Flow (The "Click-wrap" Mechanism)

The following sequence must be strictly followed before a user is granted access to v2 Beta features (e.g., Live Whisper, Trace Comparison):

1.  **Interception:** When a user attempts to enable "v2 Beta" or logs in for the first time after being invited to the Beta cohort, they must be presented with a dedicated **Beta Agreement Screen**.
2.  **Presentation:** 
    - The full text of the `legal/beta-agreement.md` must be displayed in a scrollable text area.
    - The text must be readable and not hidden behind a link alone (the user should not have to leave the flow to read the agreement).
3.  **Affirmative Action:**
    - A mandatory checkbox must be provided with the text: *"I have read and agree to the terms of the TraceWhisper v2 Beta Testing Agreement."*
    - The "Continue" or "Accept" button must remain **disabled** until the checkbox is explicitly checked.
4.  **Confirmation:** Upon clicking "Accept", the user is granted access to the Beta features.

## 2. Legal Record Keeping (Audit Trail)

The system must record the acceptance event in the database to provide an audit trail in case of disputes. The following data points must be captured:

- **User ID:** Unique identifier of the Beta Tester.
- **Timestamp:** Exact date and time of acceptance (UTC).
- **Agreement Version:** The version date of the agreement accepted (e.g., "2026-05-20").
- **Acceptance Method:** "Click-wrap / Electronic Acceptance".

## 3. Integration with Terms of Service

The onboarding flow should also remind the user that these terms supplement the general **Terms of Service**, as specified in Section 3 of the updated Terms of Service.

## 4. Failure to Accept

If a user declines the agreement or closes the screen without accepting, they must be restricted to v1 (Stable) features only. No v2 telemetry or functionality should be activated for that user.
