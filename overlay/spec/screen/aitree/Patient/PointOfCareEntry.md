Following the Moqui-AI Blueprint Strategy and the recursive data model we established for AiTree, this blueprint defines the high-speed data entry screen. This screen is the primary interface for a "Clinical Session," where multiple vitals are recorded and automatically threaded into a meeting discussion.

PointOfCareEntry
Instructions for AI: When reading this blueprint to generate Moqui XML:

Use <form-single> for the primary data entry.

Ensure all PHI-related fields (Notes, Qualitative values) are mapped to encrypted entity fields.

Implement a multi-entity "commit" service in the transition section to handle both the AgendaMessage and PatientObservation creation.

Description
The PointOfCareEntry screen is a specialized interface for clinicians to record vitals and observations during a "Round" or "Huddle." Every entry is automatically encapsulated as a threaded reply to an existing AgendaMessage.

Architecture Pattern:

PatientMedicalRoot (Parent) -> PointOfCareEntry (Child)

web-settings
require-authentication: true

standalone: false

parameter
name: patientPartyId, type: id, required: true

name: parentMessageId, type: id, required: true (The Huddle Topic this observation belongs to)

actions
<set field="observationGroupId" from="java.util.UUID.randomUUID().toString()"/>
<entity-find-one entity-name="mantle.party.Person" value-field="patient">
<field-map field-name="partyId" from="patientPartyId"/>
</entity-find-one>

widgets
<screen-layout>
<screen-header>
<label text="Record Vitals: ${patient?.firstName} ${patient?.lastName}" type="h5"/>
</screen-header>
<screen-content>
<form-single name="ObservationEntryForm" transition="createClinicalSession">
<field name="patientPartyId"><default-field><hidden/></default-field></field>
<field name="parentMessageId"><default-field><hidden/></default-field></field>
<field name="observationGroupId"><default-field><hidden/></default-field></field>

        <field-group title="Standard Vitals">
            <field name="sysBP" title="Systolic BP"><default-field><text-line size="5"/></default-field></field>
            <field name="diaBP" title="Diastolic BP"><default-field><text-line size="5"/></default-field></field>
            <field name="heartRate" title="Pulse (bpm)"><default-field><text-line size="5"/></default-field></field>
            <field name="temp" title="Temp (°F)"><default-field><text-line size="5"/></default-field></field>
        </field-group>

        <field-group title="Narrative Context (Encrypted)">
            <field name="clinicalNote" title="Observation Note">
                <default-field><text-area rows="3" cols="60"/></default-field>
            </field>
        </field-group>

        <field name="submitButton">
            <default-field title="Save to Huddle"><submit/></default-field>
        </field>
    </form-single>
</screen-content>
</screen-layout>

transition
createClinicalSession:

Logic: Calls a service that:

Creates a new AgendaMessage as a reply to parentMessageId.

Creates PatientObservation records for each non-empty vital field.

Links all observations to the new agendaMessageId.

Success Response: Redirects to ClinicalDashboard.

Vue and Quasar Integration
screen-events
onMounted: Focus the sysBP field for rapid tablet entry.

pinia-store-interactions
aiTreeStore: Fetches the current activeAgendaContainerId to ensure the entry is logged in the correct context.

Quality Assurance
test-plan
[ ] Data Integrity: Verify that saving the form creates exactly one AgendaMessage and multiple PatientObservation records.

[ ] HIPAA Compliance: Intercept the DB commit to ensure clinicalNote is stored as ciphertext.

[ ] Session Grouping: Ensure all vitals from one form submission share the same observationGroupId.

Implementation Checklist
[ ] Create the Java/Groovy service nursinghome.medical.MedicalServices.create#ClinicalSession.

[ ] Ensure the screen is accessible from the "Active Huddle" interface via a subscreen link.

[ ] Add field validation for numeric vitals to prevent bad data entry.