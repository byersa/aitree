# Blueprint: Master SPA Architecture

**Goal**: Replicate the successful Single Page Application (SPA) master screen structure used in the `huddle` component for the new `aitree` component.

## 1. The Wrapper Screen (`AitreeWrapper.xml`)
This is the root entry point that intercepts the browser request, loads the necessary Vue/Quasar libraries, and hands off rendering to the client-side SPA.

### Key Requirements for `AitreeWrapper.xml`:
- **Theme**: Must set `screen-theme-type-enum-id="STT_INTERNAL_QUASAR2"`.
- **Pre-actions**: Instead of hardcoding `<script>` tags for Vue/Quasar, simply inject the centralized `moqui-ai` theme boilerplate that handles all auth checks and library loading:
  ```xml
  <pre-actions>
      <render-mode>
          <text type="html" location="component://moqui-ai/template/spa/Quasar2Wrapper.qvt2.ftl"/>
      </render-mode>
  </pre-actions>
  ```
- **Subscreens**: Must point to the Main SPA Screen (`aitree.xml`) as the `default-item`.
- **Render Mode**: Must inject `component://webroot/screen/includes/WebrootVue.qvt2.ftl` inside `<widgets><render-mode><text type="html"...` to trigger the actual Vue application mount.

## 2. The Main SPA Screen (`aitree.xml`)
This screen defines the persistent layout (Header, Drawer, Content) that wraps all other routes.

### Key Requirements for `aitree.xml`:
- **Namespace**: Use `xsi:noNamespaceSchemaLocation="component://moqui-ai/xsd/moqui-ai-screen.xsl"`.
- **Global Templates**: Inject `globals.qvt2.ftl` (if using session tokens/custom global config) via `<render-mode>`.
- **App Container**: 
  - Wrap the UI in `<container id="apps-root">`.
  - Use `<screen-layout view="hHh lpR fFf">`.
- **Header Structure**:
  - Implement `<screen-header>` and `<screen-toolbar>`.
  - Include the requested App Title ("Staff Meeting") and Logo.
  - Include the `<subscreens-menu>` macro to automatically render the horizontal navigation tabs based on child screens.
- **Content Area**:
  - Implement `<screen-content>` wrapping exactly one `<subscreens-active/>` tag. (The `moqui-ai` content negotiation hook will ensure this renders the `<m-subscreens-active>` Vue router-view).
- **Subscreen Items**: Define the high-level routes here:
  - `Home` (`Home.xml`)
  - `PeopleOrgs` (`PeopleOrgs.xml`)
  - `MedicalRecords` (`MedicalRecords.xml`)
  - `Meetings` (`Meetings.xml`)

## 3. Sub-Screens (e.g., `Home.xml`, `Meetings.xml`)
These are injected into the `<subscreens-active/>` area.
- Keep them clean and purely focused on business logic and layout.
- For meetings, rely on standard form macros or the custom `<discussion-tree>` tag (as defined in `Discussion_Macros.md`), injecting custom Vue components via `script src` inside `<render-mode>` text blocks only when strictly necessary.
