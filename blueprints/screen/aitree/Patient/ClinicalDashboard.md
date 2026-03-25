ClinicalDashboard
Instructions for AI: When reading this blueprint to generate Moqui XML:

Prefer standard UI widgets (<form-single>, <form-list>).

Use <form-query> macro along with  <form-list> for search/filtering.

Identify parameters mapped in form-query and establish them in parameter sections.

Description
The ClinicalDashboard provides a high-level summary of a patient's recent medical status, combining structured vitals with the narrative context from AiTree meetings.

Architecture Pattern:

PatientMedicalRoot (Parent) -> ClinicalDashboard (Child)

web-settings
require-authentication: true

standalone: false

parameter
name: patientPartyId, type: id, required: true

actions
<entity-find entity-name="nursinghome.medical.PatientObservation" list="recentVitalsList" limit="5">
<econdition field-name="patientPartyId" from="patientPartyId"/>
<order-by field-name="-observationDate"/>
</entity-find>

<entity-find entity-name="aitree.meeting.AgendaMessage" list="clinicalTopicsList">
<econdition field-name="orgId" from="activeOrgId"/>
<order-by field-name="-fromDate"/>
</entity-find>

subscreens
No content available

widgets
<screen-layout>
<screen-header>
<label text="Clinical Summary" type="h5"/>
</screen-header>
<screen-content>
<container-row>
<container-col md="6">
<label text="Recent Vitals" type="h6"/>
<form-list name="VitalsSummaryList" list="recentVitalsList" skip-form="true">
<field name="observationDate"><default-field><display/></default-field></field>
<field name="observationTypeEnumId"><default-field title="Type">
<display-entity entity-name="moqui.basic.Enumeration" key-field-name="enumId"/>
</default-field></field>
<field name="valueQuantity"><default-field title="Value"><display/></default-field></field>
</form-list>
</container-col>
<container-col md="6">
<label text="Recent Clinical Discussions" type="h6"/>
<form-list name="DiscussionList" list="clinicalTopicsList" skip-form="true">
<field name="fromDate"><default-field title="Date"><display/></default-field></field>
<field name="agendaMessageId"><default-field title="Topic">
<dynamic-dialog title="View Discussion" transition="ViewMessageDetails"/>
</default-field></field>
</form-list>
</container-col>
</container-row>
</screen-content>
</screen-layout>

transition
ViewMessageDetails: Transition to the AgendaMessage detail view within the aitree component.

Vue and Quasar Integration
pinia-store-interactions
aiTreeStore: Reads currentPatientId to reactively update the dashboard when the user switches patients in the sidebar.

medicalStore: Calls fetchRecentObservations(patientId) on screen mount.

Quality Assurance
test-plan
[ ] Verify that the recentVitalsList correctly filters by the patientPartyId passed in the parameters.

[ ] Ensure the valueString fields (if added) are properly decrypted for users with MEDICAL_ADMIN permissions.

[ ] Confirm the "View Discussion" button correctly navigates to the associated AiTree thread.

Implementation Checklist
[ ] Define the ViewMessageDetails transition target.

[ ] Add the nursinghome.medical package entities to the generation context.

[ ] Verify Quasar row/col layout responsiveness for mobile tablet use.