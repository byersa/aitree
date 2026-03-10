# Edit Agenda Container Dialog

> **Instructions for AI**: When reading this blueprint to generate Moqui XML:
> - Prefer using standard UI widgets (`<form-single>`).
> - Use `<form-single>` for the main record editing.
> - Ensure dropdowns are used for Enumeration and Status fields.

## web-settings
No content available

## parameter
- `agendaContainerId`: The ID of the AgendaContainer to edit. If null, a new one will be created.

## always-actions
No content available

## pre-actions
No content available

## condition
No content available

## actions
- If `agendaContainerId` is present, perform an `<entity-find-one entity-name="aitree.meeting.AgendaContainer" value-field="agendaContainer"/>`.

## subscreens
No content available

## transition
### storeAgendaContainer
- **Description**: Creates or updates an AgendaContainer record.
- **Actions**: Use `<service-call name="create#aitree.meeting.AgendaContainer" in-map="context" out-map="context"/>` if creating, or `<service-call name="update#aitree.meeting.AgendaContainer" in-map="context"/>` if updating. Alternatively, use a single `store` service or custom logic.
- **Response**: `type="success" url=".."` (return to the list).

## transition-include
No content available

## widgets
- **Edit Container Form**: A `<form-single>` named `EditAgendaContainer` with `map="agendaContainer"`:
  - `agendaContainerId`: Hidden field if updating, or omit if auto-generated.
  - `name`: Text line, required.
  - `shortName`: Text line.
  - `containerCategoryEnumId`: Dropdown fetching from `moqui.basic.Enumeration` where `enumTypeId == 'AgendaContainerCategory'`.
  - `containerTypeEnumId`: Dropdown fetching from `moqui.basic.Enumeration` where `enumTypeId == 'AgendaContainerType'`.
  - `statusId`: Dropdown fetching from `moqui.basic.StatusItem` where `statusTypeId == 'AgendaContainerStatus'`.
  - `orgId`: Dropdown or picklist for `mantle.party.Organization`.
  - `fromDate`: Date-time picker.
  - `thruDate`: Date-time picker.
  - `submitButton`: Submit button labeled "Save".

## fail-widgets
No content available

## macro-template
No content available

## Vue and Quasar Integration

### screen-events
No content available

### computed-fields
No content available

### watched-fields
No content available

### methods
No content available

### custom-data-fields
No content available

### pinia-store-interactions
No content available

## Quality Assurance

### test-plan
1. Open the dialog for a new record: Verify all fields are empty.
2. Open the dialog for an existing record: Verify fields are populated with entity data.
3. Update a field and save: Verify the change is persisted in the database.
4. Attempt to save without a name: Verify validation error.

### test-result
No content available