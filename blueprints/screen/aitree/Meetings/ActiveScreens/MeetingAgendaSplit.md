# MeetingAgendaSplit

## Description
A screen that contains the screen-split widget for displaying multiple MainInstancePage instances.

This screen is referenced by ActiveScreens as a subscreen. It uses screen-split in dynamic mode to:
- Display a list of active AgendaContainer IDs from the Pinia store
- Load one MainInstancePage component for each active container
- Show a fail message when no containers are selected

**Architecture Pattern:**
- This screen is loaded as a subscreen of ActiveScreens
- The screen-split widget uses dynamic mode (list + component attributes)
- Each panel in the split shows one MainInstancePage instance
- The list of active container IDs comes from aiTreeStore Pinia store

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
No content available - this screen uses dynamic component loading via screen-split

## transition
No content available

## transition-include
No content available

## widgets
```xml
<screen-split name="as_screen_split" model="30" horizontal="false"
              list="activeContainerIds" component="MainInstance"
              fail-message="No active containers selected. Use the Select Containers menu to add containers."/>
```

**Widget Notes:**
- `name="as_screen_split"` - Identifier for testing and debugging
- `model="30"` - Initial splitter position (30% for first panel, but in dynamic mode this affects all panels equally)
- `horizontal="false"` - Horizontal layout with left/right panels (not top/bottom)
- `list="activeContainerIds"` - Pinia store expression that returns array of container IDs
- `component="MainInstance"` - Screen name to load for each ID (resolves to MainInstancePage.xml)
- `fail-message` - Displayed when activeContainerIds is empty

**Dynamic Mode Behavior:**
- screen-split detects the `list` attribute and enters dynamic mode
- For each ID in the list, creates a panel with m-dynamic-container
- Each panel loads: `MainInstance?agendaContainerId={id}`
- Panels are resizable with drag handles between them
- If list is empty, shows fail-message

## fail-widgets
No content available

## macro-template
No content available

## Vue and Quasar Integration

### screen-events
No content available

### computed-fields
- `activeContainerIds` - Computed from aiTreeStore.getters.activeContainerIds

### watched-fields
No content available

### methods
No content available

### custom-data-fields
No content available

### pinia-store-interactions
- **aiTreeStore** - Reads `activeContainerIds` getter which returns array of currently active container IDs
- When containers are added/removed in AgendaContainerSelectPage, the store updates and screen-split re-renders

## Quality Assurance

### test-plan
1. Verify screen-split renders with correct initial model position
2. Verify empty list shows fail-message
3. Verify single container creates one panel
4. Verify multiple containers create multiple resizable panels
5. Verify each panel loads MainInstancePage with correct agendaContainerId parameter

### test-result
No content available
