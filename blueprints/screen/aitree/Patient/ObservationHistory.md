ObservationHistory
Instructions for AI: When reading this blueprint to generate Moqui XML:

Use the <form-query> macro to provide filtering by observationTypeEnumId and fromDate/thruDate.

The <form-list> should be read-only (skip-form="true") to act as a historical log.

Ensure the clinicalNote and valueString fields are decrypted for users with the MEDICAL_READ permission.

Description
A comprehensive, filterable log of all structured observations and measurements for a specific patient.

Architecture Pattern:

PatientMedicalRoot (Parent) -> ObservationHistory (Child)

web-settings
require-authentication: true

standalone: false

parameter
name: patientPartyId, type: id, required: true

actions
<entity-find entity-name="nursinghome.medical.PatientObservation" list="obsHistoryList">
<econdition field-name="patientPartyId" from="patientPartyId"/>
<econdition field-name="observationTypeEnumId" from="observationTypeEnumId" ignore-if-empty="true"/>
<econdition field-name="observationDate" operator="greater-equals" from="fromDate" ignore-if-empty="true"/>
<econdition field-name="observationDate" operator="less-equals" from="thruDate" ignore-if-empty="true"/>
<order-by field-name="-observationDate"/>
</entity-find>

widgets
<screen-layout>
<screen-header>
<label text="Observation History" type="h5"/>
</screen-header>
<screen-content>
<form-query name="ObservationFilter" list="obsHistoryList">
<field name="observationTypeEnumId" title="Metric Type">
<header-field>
<drop-down allow-empty="true">
<entity-options entity-name="moqui.basic.Enumeration">
<econdition field-name="enumTypeId" value="PatientObservationType"/>
</entity-options>
</drop-down>
</header-field>
</field>
<field name="fromDate" title="From Date"><header-field><date-time/></header-field></field>
<field name="thruDate" title="Thru Date"><header-field><date-time/></header-field></field>
<field name="submitButton"><header-field title="Filter"><submit/></header-field></field>
</form-query>

    <form-list name="ObservationHistoryList" list="obsHistoryList" skip-form="true">
        <field name="observationDate" title="Date/Time"><default-field><display/></default-field></field>
        <field name="observationTypeEnumId" title="Metric">
            <default-field>
                <display-entity entity-name="moqui.basic.Enumeration" key-field-name="enumId"/>
            </default-field>
        </field>
        <field name="valueQuantity" title="Value"><default-field><display/></default-field></field>
        <field name="valueUnitEnumId" title="Unit">
            <default-field>
                <display-entity entity-name="moqui.basic.Enumeration" key-field-name="enumId"/>
            </default-field>
        </field>
        <field name="clinicalNote" title="Clinical Notes">
            <default-field><display/></default-field>
        </field>
        <field name="agendaMessageId" title="Context">
            <default-field>
                <link url="viewMessage" text="View Session" parameter-map="[agendaMessageId:agendaMessageId]"/>
            </default-field>
        </field>
    </form-list>
</screen-content>
</screen-layout>

transition
viewMessage: Redirects to the specific AgendaMessage in the aitree component where this observation was recorded.

Vue and Quasar Integration
pinia-store-interactions
medicalStore: Observes obsHistoryList to update any client-side trend charts if the user toggles filters.

Quality Assurance
test-plan
[ ] Filtering: Ensure the observationTypeEnumId dropdown correctly filters the list without page reload.

[ ] Permissions: Verify that users without MEDICAL_READ cannot see the clinicalNote column.

[ ] Context Link: Validate that clicking "View Session" navigates to the correct AgendaMessage thread.

Implementation Checklist
[ ] Ensure PatientObservationType seed data is loaded.

[ ] Map the viewMessage transition to the aitree message detail screen.

[ ] Verify that -observationDate (descending) is the default sort order.