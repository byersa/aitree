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

### test-plan (MARIA/WebMCP Functional Test)
1. **Navigate**: Use WebMCP to navigate to `/aitree/Meetings/ManageAgendaContainers`.
2. **Verify Screen**: Obtain the MARIA JSON via `moqui-mcp` and verify the `role: "document"` has `name: "ManageAgendaContainers"`.
3. **Verify Search Form**: Ensure a `role: "form"` with `name: "Search"` exists, containing MARIA identifiers for search fields.
4. **Trigger Creation**: Use WebMCP to click the element with `data-maria-id="CreateContainerDialog"`.
5. **Verify Dialog**: Verify the `EditAgendaContainerDialog` screen opens (checked via MARIA JSON).
6. **Enter Data**: Use WebMCP to fill the form in the dialog using `data-maria-id` attributes (e.g., `name`, `shortName`).
7. **Persist**: Click the element with `data-maria-id="submitButton"`.
8. **Verify Database**: Call `moqui_query_entity` for `aitree.meeting.AgendaContainer` to verify the record was created with the test data.
9. **Verify List**: Use `moqui_get_screen_details` or browse the `ManageAgendaContainers` screen again to ensure the new record appears in the `role: "grid"` (AgendaContainerList).
10. **Cleanup**: Delete the test record from the database.

### test-result
No content available
