# TraceWhisper Enterprise Service Level Agreement (SLA)

**Effective Date:** May 21, 2026
**Version:** 2.4.0

This Service Level Agreement ("SLA") defines the availability and support commitments for TraceWhisper Enterprise. This SLA is incorporated by reference into the Enterprise Terms of Service.

## 1. Service Availability Commitment
TraceWhisper commits to a **99.9% Uptime** for the Enterprise Reasoning Governance Platform and the Centralized Vault API.

### 1.1 Uptime Calculation
Uptime is calculated monthly per organization.
`Uptime % = (Total Minutes in Month - Downtime) / Total Minutes in Month * 100`

### 1.2 Exclusions
Downtime does not include:
- **Scheduled Maintenance:** Maintenance windows announced 48 hours in advance.
- **Downtime caused by Customer's** own infrastructure, IdP, or third-party Git provider.
- **Downtime caused by** failures in the underlying LLM providers (e.g., OpenAI, Anthropic) if the platform is configured to use them.
- **Force Majeure** events.

## 2. Support Response Times
TraceWhisper provides tiered support for Enterprise customers.

| Severity Level | Definition | Response Time Objective | Resolution Objective |
| :--- | :--- | :--- | :--- |
| **P0 - Critical** | Platform is completely unavailable or a critical security vulnerability is discovered. | < 1 hour | 4 hours |
| **P1 - High** | Major functionality is significantly impaired (e.g., APO engine is failing for all users). | < 4 hours | 12 hours |
| **s2 - Medium** | Partial functionality loss or a specific bug that doesn't prevent work. | < 12 hours | 3 business days |
| **P3 - Low** | Feature requests, general questions, or minor UI bugs. | < 24 hours | Next planned release |

## 3. Service Credits
If TraceWhisper fails to meet the 99.9% Uptime commitment, the Customer is entitled to the **Service Credits** described below.

### 3.1 Credit Calculation
Service Credits are applied as a percentage of the monthly subscription fee:
- **< 99.9% but $\ge$ 99.0%:** 10% credit of the monthly fee.
- **< 99.0% but $\ge$ 98.0%:** 25% credit of the monthly fee.
- **< 98.0%:** 50% credit of the monthly fee.

### 3.2 Requesting Credits
To receive a Service Credit, the Customer must request it within 30 days of the end of the month in which the downtime occurred.

## 4. Support Channels
Enterprise customers have access to the following channels:
- **Dedicated Account Manager:** For strategic and high-level governance.
- **Priority Email Support:** Priority queue for all Enterprise requests.
- **Priority Slack/Discord Community:** Access to the özel Enterprise-only channel.
- **Technical Account Engineer (TAE):** Technical guidance on implementing "Golden Paths" and APO.

## 5. Termination for Chronic Failure
In the event that uptime falls below 95% for any three consecutive months, the Customer may terminate the agreement with immediate effect and without penalty.
