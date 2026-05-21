# Service Level Agreement (SLA) for TraceWhisper Enterprise

**Last Updated: May 21, 2026**

This Service Level Agreement ("SLA") is incorporated into the TraceWhisper Terms of Service and applies specifically to customers on the TraceWhisper Enterprise plan.

## 1. Service Availability Commitment
Tiny Company commits to a **Service Availability of 99.9%** during any given calendar month.

### 1.1 Definition of Availability
"Availability" is defined as the ability of the TraceWhisper API and Web Interface to successfully process requests. 

### 1.2 Exclusions
The Availability commitment does not apply to:
- Scheduled maintenance windows (notified at least 48 hours in advance).
- Force Majeure events.
- Issues caused by the customer's own infrastructure, Identity Provider (IdP), or third-party integrations.
- Misuse of the platform resulting in account suspension.

## 2. Service Credits
In the event that the Service Availability falls below the 99.9% threshold in a calendar month, the customer may be eligible for a Service Credit.

| Monthly Availability | Service Credit (% of Monthly Fee) |
| :--- | :--- |
| < 99.9% but $\ge$ 99.0% | 10% |
| < 99.0% but $\ge$ 95.0% | 25% |
| < 95.0% | 50% |

### 2.1 Requesting Credits
To receive a Service Credit, the customer must submit a request to support@tinycompany.ai within 30 days of the month in which the unavailability occurred.

## 3. Support Response Times
Enterprise customers receive priority support with the following target response times:

| Severity Level | Definition | Target Response Time |
| :--- | :--- | :--- |
| **S1 - Critical** | Complete service outage or critical data loss. | 4 Hours |
| **S2 - High** | Major feature failure with no workaround. | 12 Hours |
| **S3 - Medium** | Partial feature failure or performance degradation. | 2 Business Days |
| **S4 - Low** | General inquiries, cosmetic bugs, or feature requests. | 5 Business Days |

## 4. Customer Obligations
To maintain the benefits of this SLA, the customer agrees to:
- Designate a primary technical contact for communication.
- Provide detailed logs and reproduction steps when reporting S1 or S2 issues.
- Maintain their own internal RBAC and security policies.

## 5. Limitation
The total amount of Service Credits provided in any single month shall not exceed 50% of the monthly subscription fee.
