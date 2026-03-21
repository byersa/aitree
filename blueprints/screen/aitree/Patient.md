# Patient Medical Records Subcomponent

> **Status:** Strategic Blueprint for Agent-Ready Clinical Dashboard
> **Component:** `nursinghome.medical`
> **Integration:** Tied to `aitree` AgendaMessages

## 1. Executive Summary
The Medical Records (MR) subcomponent is designed as a high-fidelity, agent-ready clinical dashboard. It follows the **"AI as Orchestrator"** pattern to bridge the gap between collaborative clinical discussion (AiTree Messages) and structured data points (Patient Observations).

## 2. Architecture Pattern: Master-Detail-Timeline
The subcomponent hierarchy is anchored by a central navigation hub that provides patient context across all clinical activities.

- **PatientMedicalRoot (Parent):** The primary navigation and context hub using a `<subscreens-menu/>`.
- **ClinicalDashboard (Child):** Real-time summary of latest vitals and active huddle topics.
- **ObservationHistory (Child):** Longitudinal list of all measurements (BP, Pulse, etc.) using `<form-query>`.
- **TrendAnalysis (Child):** Visual analytical tool for tracking metrics over time using `<bp-chart>`.
- **PointOfCareEntry (Child):** Specialized high-speed entry screen for recording sessions during clinical rounds.

## 3. Screen Specifications

### A. ClinicalDashboard.xml
**Purpose:** Provide a "Quick Look" at a patient's current status for staff.
- **Top Widgets:** `<screen-layout>` with "Vitals Sparklines" (mini-charts) for 24-hour trends.
- **AiTree Integration:** A `<form-list>` displaying `AgendaMessages` with attached `PatientObservations` to provide narrative context to the numbers.
- **State Management:** Uses `aiTreeStore` to track the "Selected Patient."

### B. ObservationHistory.xml
**Purpose:** A searchable, filterable repository of all structured data points.
- **Widgets:** `<form-query>` followed by a `<form-list>` acting on the `PatientObservation` entity.
- **Key Columns:** `observationDate`, `observationTypeEnumId`, `valueQuantity`, and "Entry Context" (linking to the original `AgendaContainer`).
- **HIPAA:** `valueString` and `clinicalNote` fields are encrypted and only decrypted for authorized roles.

### C. PointOfCareEntry.xml
**Purpose:** High-speed data entry for clinical "Rounds."
- **Widgets:** Tablet-optimized `<form-single>` that generates inputs dynamically based on `observationTypeEnumId`.
- **The Session Bridge:** Form submission triggers a service that creates a new `AgendaMessage` (reply) and attaches observations via a shared `observationGroupId`.
- **Transition:** `createClinicalSession` handles the atomic multi-entity commit.

### D. TrendAnalysis.xml
**Purpose:** Visual identification of clinical decline or improvement.
- **Widgets:** `<bp-chart>` (line type) showing `valueQuantity` over `observationDate`.
- **Reactivity:** Filterable by `observationTypeEnumId` to toggle between BP, Heart Rate, etc.

## 4. WebMCP & Agent Integration Strategy
To enable **"Zero-Day Agent Readiness,"** the following tools are exposed via WebMCP:

| Tool Name | Description |
| :--- | :--- |
| **`getPatientSummary(patientId)`** | Returns JSON-LD summary of last 3 vitals and active huddle topics. |
| **`flagAbnormalVitals()`** | Monitors logs and highlights values outside standard ranges (e.g., BP > 140/90). |
| **`draftObservationNote(text)`** | Allows AI to draft `clinicalNote` PHI into the entry form for nurse review. |

## 5. Domain Rules & Compliance
- **App Identity:** "Nursing Home Management System".
- **HIPAA Enforcement:** All PHI fields (Notes, `valueString`) MUST have `encrypt="true"`. Sensitive entities MUST have `enable-audit-log="true"`.
- **Data Modeling:** Extends `mantle.party.Party` for patient identity and links observations to `aitree.meeting.AgendaMessage`.