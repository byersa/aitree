# Combined Meetings Screen Blueprint

## Overview
This document defines the architecture and UI requirements for the combined "Meetings" screen. It merges the functionality of `ManageAgendaContainers.xml` and `AgendaContainerSelectPage.xml` into a single, comprehensive management and selection interface, optimized for both desktop and mobile by avoiding modal dialogs.

## User Review Required
> [!IMPORTANT]
> - **Inline Editing**: Modal dialogs are replaced by a switchable "Search/Edit" panel in the header/top-section.
> - **Instance Generation**: Searching for "Instance" meetings requires a target date. If the record doesn't exist for that date, it must be auto-generated.
> - **Batch Actions**: The `<form-list>` supports multi-selection via checkboxes and a `<menu-dropdown>` for batch actions.

## Screen Layout
- **Upper Panel (Switchable)**:
    - **Mode: Search**: Displays `<form-query>` to filter containers.
    - **Mode: Create/Edit**: Displays `<form-single>` to create or modify an `AgendaContainer`.
- **Lower Panel**:
    - **Action Menu**: `<menu-dropdown>` for batch operations.
    - **Results List**: `<form-list>` to display results with selection capabilities.

## Parameters
- `isEditing`: Boolean (Defines state of the upper panel).
- `agendaContainerId`: String (ID of the container being edited).
- `containerCategoryEnumId`: String (Abstract, Repository, Instance).
- `targetDate`: Date (Required for Instance generation/selection).

## Actions
- **Data Fetch**: 
    - Use `<entity-find entity-name="aitree.meeting.AgendaContainer" list="containerList">` with `<search-form-inputs/>`.
    - **Logic for Instance Generation**: If `containerCategoryEnumId == 'Instance'` and a `targetDate` is provided, find or create the `AgendaContainer` for that date before returning the list.

## Transitions
### toggleEditMode
- **Description**: Switches the upper panel between Search and Edit modes.
### saveContainer
- **Description**: Saves the `AgendaContainer` and returns to Search mode.
### selectForDisplay
- **Description**: Redirects selected instance meetings to `MeetingAgendaSplit.xml`.

## Widgets

### Upper Panel (Search/Edit Toggle)
- **Container**: `<container-panel id="SearchEditPanel">`
    - **If `!isEditing`**:
        - `<form-query name="MeetingSearch" list-form="MeetingList">`
            - `containerCategoryEnumId`: Drop-down.
            - `name`: Text (contains).
            - `targetDate`: Date picker (Visible when Category is "Instance").
            - `submit`: Button "Search".
            - `create`: Button "New Container" (triggers `toggleEditMode` with `isEditing=true`).
    - **If `isEditing`**:
        - `<form-single name="EditContainer" transition="saveContainer">`
            - `agendaContainerId`: Hidden.
            - `name`: Text.
            - `shortName`: Text.
            - `containerTypeEnumId`: Drop-down.
            - `cancel`: Button (triggers `toggleEditMode` with `isEditing=false`).
            - `submit`: Button "Save".

### Lower Panel
- **Batch Actions**: `<menu-dropdown text="Actions">`
    - `Select for Display`: Action to transition to `MeetingAgendaSplit.xml` with selected IDs.
    
- **Results List**: `<form-list name="MeetingList" list="containerList" multi-select="true">`
    - `_select`: Checkbox.
    - `name`: Display.
    - `containerTypeEnumId`: Display-entity.
    - `statusId`: Display-entity.
    - `edit`: Button/Icon (triggers `toggleEditMode` with `isEditing=true` and `agendaContainerId`).

## Quality Assurance
1. **Toggle Test**: click "New Container", verify Search form is replaced by Edit form.
2. **Inline Edit**: Edit a record, save, verify it remains on the same screen and updates the list.
3. **Mobile Flow**: Ensure no popups appear during the entire CRUD and selection process.


