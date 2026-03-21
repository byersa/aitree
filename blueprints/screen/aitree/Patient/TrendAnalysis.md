TrendAnalysis
Instructions for AI: When reading this blueprint to generate Moqui XML:

Use a <screen-layout> with a specialized <chart-js> or <bp-chart> macro for visualization.

Default to a line chart showing valueQuantity over observationDate.

Ensure the chart is reactive to the observationTypeEnumId selected in the filter.

Description
A visual analytical tool for tracking trends in patient vitals over time, helping clinicians spot patterns that a list view might miss.

Architecture Pattern:

PatientMedicalRoot (Parent) -> TrendAnalysis (Child)

parameter
name: patientPartyId, type: id, required: true

actions
<entity-find entity-name="nursinghome.medical.PatientObservation" list="trendDataList">
<econdition field-name="patientPartyId" from="patientPartyId"/>
<econdition field-name="observationTypeEnumId" from="observationTypeEnumId" default-value="PotVitalsBP"/>
<order-by field-name="observationDate"/>
</entity-find>

widgets
<screen-layout>
<screen-header>
<label text="Vitals Trend Analysis" type="h5"/>
</screen-header>
<screen-content>
<form-query name="TrendFilter" list="trendDataList">
<field name="observationTypeEnumId" title="Select Metric">
<header-field>
<drop-down allow-empty="false">
<entity-options entity-name="moqui.basic.Enumeration">
<econdition field-name="enumTypeId" value="PatientObservationType"/>
</entity-options>
</drop-down>
</header-field>
</field>
</form-query>

    <container-row>
        <container-col md="12">
            <bp-chart type="line" list="trendDataList" 
                      label-field="observationDate" 
                      value-field="valueQuantity" 
                      title="Metric Trend Over Time"/>
        </container-col>
    </container-row>
</screen-content>
</screen-layout>

Vue and Quasar Integration
pinia-store-interactions
medicalStore: Provides the formatted JSON data series for the Chart.js instance.