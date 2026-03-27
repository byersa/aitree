# ActiveScreens

## Description
A screen that lets the user select from "instance" AgendaContainers to edit by MainInstancePage.

ActiveScreens operates as a split screen manager modeled after the Quasar q-splitter component.
The contents of the split panels will be instances of the MainInstancePage.
MainInstancePage screens are activated and deactivated by information passed up from the AgendaContainerSelectPage.

**Architecture Pattern:**
- ActiveScreens is the parent navigation screen with a header menu
- MeetingAgendaSplit is a child screen that contains the actual screen-split widget
- AgendaContainerSelectPage allows users to select which containers appear in the split view
- MainInstancePage is dynamically loaded once per active container

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
- **SelectPage** → AgendaContainerSelectPage.xml (for selecting active containers)
- **MeetingAgendaSplit** → MeetingAgendaSplit.xml (contains screen-split with dynamic MainInstancePage instances)

## transition
No content available

## transition-include
No content available

## widgets
```xml
<screen-layout id="ActiveScreensLayout">
    <screen-header id="ActiveScreensHeader">
        <label text="Active Screens Manager" type="h5"/>
        <menu-item name="SelectPage" text="Select Containers" icon="select_all"/>
        <subscreens-menu/>
    </screen-header>
    <screen-content id="ActiveScreensContent">
        <subscreens-active/>
    </screen-content>
</screen-layout>
```

**Widget Notes:**
- The `<menu-item>` triggers navigation to the SelectPage subscreen
- The `<subscreens-menu/>` renders tabs/buttons for all subscreens with menu-include="true"
- The `<subscreens-active/>` displays whichever subscreen is currently selected

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
No content available

### test-result
No content available

---

## Blueprint Authoring Notes

**Lessons learned from implementing this screen:**

### Required Subscreen Structure
When a screen uses `<subscreens-menu/>` for navigation:
1. **List ALL subscreens** in the `## subscreens` section with their target file paths
2. **Specify which subscreen contains widgets** vs which are navigation targets
3. **Consider `menu-include="false"`** for subscreens that shouldn't appear in the menu

### Menu-Item Configuration
The `<menu-item>` element should specify:
- `name` - References a subscreen-item name for navigation
- `text` - Display label (or use `menu-title` from subscreen-item)
- `icon` - Quasar icon name (e.g., `select_all`, `groups`, `dashboard`)
- `transition` - Optional: explicit transition name (defaults to subscreen navigation)

### Screen-Split Usage Patterns
**Dynamic Mode** (list-driven component loading):
```xml
<screen-split list="activeContainerIds" component="MainInstance" 
              fail-message="No items selected"/>
```
- `list` - Pinia store expression returning array of IDs
- `component` - Screen name to load for each ID (resolves to {component}Page.xml)
- Each panel loads: `{component}?agendaContainerId={id}`

**Static Mode** (inline widget distribution):
```xml
<screen-split model="30" horizontal="false">
    <container>Left panel content</container>
    <form-single>Right panel content</form-single>
</screen-split>
```
- Children distributed to before/after panels
- First child → before, remaining → after

### Common Pitfalls to Avoid
1. **Don't put screen-split directly in parent** if you need subscreens-menu navigation
2. **Do create intermediate screen** (like MeetingAgendaSplit) for complex widgets
3. **Specify menu-include attribute** on subscreens-item to control menu visibility
4. **Document Pinia store dependencies** - what getters/setters are used

### Related Blueprints
- `MeetingAgendaSplit.md` - Contains screen-split widget implementation
- `AgendaContainerSelectPage.md` - User interface for selecting active containers
- `MainInstancePage.md` - Dynamic instance display (loaded by screen-split)

### Implementation Checklist
- [ ] Define all subscreens with location paths
- [ ] Specify menu-include for each subscreens-item
- [ ] Document Pinia store interactions (aiTreeStore.activeContainerIds)
- [ ] Define transition for adding/removing containers from active list
- [ ] Specify screen-split attributes (model, horizontal, list, component)
- [ ] Define fail-message for empty list state
