# AgendaContainerSelectPage (ACSP)

## Description
The ACSP page allows users to manage which AgendaContainer screens appear in the split panels managed by the parent, ActiveScreens. 

It consists of two main layout components:
1. **Search Form (`acsp_query`)**: A filtering interface to find AgendaContainer records based on metadata and content. The form includes a submit button and a transition to perform the query. 
2. **Results List (`acsp_results_list`)**: A dual-purpose list display. 
   - By default (when the "active" filter is enabled), it displays only the containers currently active in the split screen panels.
   - When a search is executed, it displays matching records.
   - Each entry in the list includes a toggle icon to add or remove that container from the split-screen view.
   - When a record is added to or removed from the active screen list, the parent split-screen layout is updated dynamically.

## web-settings
No content available

## parameter
No content available

## always-actions
No content available

## pre-actions
No content available

## condition
No content available

## actions
No content available

## subscreens
No content available

## transition
No content available

## transition-include
No content available

## widgets
<screen-accordion>
    <!-- Section 1: Search Form -->
    <form-query name="acsp_query" list-form="acsp_results_list">
        <!-- Include standard AgendaContainer filters: category, type, date range, name, shortName, and status. -->
        <!-- Add dynamic attribute value filtering based on AgendaAttribute type selection. -->
        <!-- Add full-text search capability against AgendaMessageContent description. -->
    </form-query>

    <!-- Section 2: results Display -->
    <form-list name="acsp_results_list">
        <!-- Implement a status toggle (active/inactive/all) in the list header to filter the display. -->
        <!-- Columns: Display standard naming and metadata fields. -->
        <!-- Visibility Action: Provide a toggle icon/link that triggers split-screen visibility changes in the parent. -->
        <!-- Logic: If 'active' status is toggled, only show containers associated with current split-screen sessions. -->
    </form-list>

</screen-accordion>

## fail-widgets
No content available

## macro-template
No content available

## Vue and Quasar Integration

### screen-events
- Event to notify parent of visibility toggle (hide/show container).

### prop-fields
- The list of currently active container IDs in the parent split screen.

### computed-fields
- The filtered list of containers based on search results and the active/all status toggle.

### watched-fields
- The active status filter state to refresh the list content dynamically.

### methods
- Handlers for the visibility toggle action.
- Logic to manage the active meeting list vs query results.

### custom-data-fields
- Search parameter state.
- Status toggle state (defaults to 'active').

### pinia-store-interactions
- Interacts with the `aiTreeStore` to manage container states and screen splitting logic.

## Quality Assurance

### test-plan
No content available

### test-result
No content available
