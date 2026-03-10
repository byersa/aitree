# Manage Agenda Containers

## web-settings
No content available

## parameter
- `name`: String (Search)
- `fromDate`: Date
- `thruDate`: Date

## always-actions
No content available

## pre-actions
No content available

## condition
No content available

## actions
- **Data Fetch**: Use `<entity-find entity-name="aitree.meeting.AgendaContainer" list="containerList">` with `<search-form-inputs default-order-by="name"/>` to retrieve container records.

## subscreens
No content available

## transition
### EditAgendaContainerDialog
- **Description**: Opens a dynamic dialog for creating or editing an AgendaContainer.
- **Actions**: No content available (dialog content is driven by the target screen).

## transition-include
No content available

## widgets
- **Search Form**: Use `<form-query>` with fields:
  - `name`: search-form-inputs compatible field with label "Search Name" and `operator="begins"`.
  - `containerCategoryEnumId`: `type="drop-down"` with label "Category" and `enum-type-id="AgendaContainerCategory"`.
  - `containerTypeEnumId`: `type="drop-down"` with label "Type" and `enum-type-id="AgendaContainerType"`.
  - `fromDate`: date field with label "From Date".
  - `thruDate`: date field with label "To Date".
- **Agenda Container List**: Use `<form-list>`:
  - Set `list="containerList"` on the `form-list`.
  - Display columns: `agendaContainerId`, `name`, `shortName`, `containerTypeEnumId`, `statusId`.
  - Add an "Edit" action column: A `<field>` with a `<dynamic-dialog>` button for each row. 
    - Button text: "Edit"
    - Icon: "edit"
    - Transition: "EditAgendaContainerDialog"
    - Parameters: Pass `agendaContainerId`.

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
1. Verify the screen loads with title "Manage Agenda Containers".
2. Ensure "Create Container" button opens a dialog.
3. Verify the list displays records from `aitree.meeting.AgendaContainer`.
4. Ensure "Edit" button for each row opens the dialog with the correct ID.

### test-result
No content available
