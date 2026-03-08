# Staff Meeting App (SMA) - UI Architecture

## Single Page Architecture (SPA)
The app will be structured as a Single Page Application (SPA).

### Header
- **Logo/Title**: "home page" image and title on the upper left.
- **Horizontal Menu** (Individual menu buttons for each subscreen, do not use `<subscreens-menu>`): 
  - "Home"
  - "People & Orgs"
  - "Medical Records"
  - "Meetings"
- **Notifications Section**: Area for user notifications.
- **Account/Sign In**: Section for user account management and authentication.

## Page Definitions

### SMA Home page
The Home page will contain static information. (Contents to be described in its own md file later).

### SMA People & Orgs page
A page for querying and managing personnel. It will contain standard Moqui Party, Person, and Organization screens with a `subscreens-menu` and `subscreens-tabs` artifacts for each.

### SMA Medical Records page
Allows for entry, retrieval, and general management of patient medical records. 
**Requirement**: Must adhere to all HIPAA requirements, including encryption.

### SMA Meetings page
A top-level screen utilizing a `bp-tabbar`. It provides horizontal tab navigation between its subscreens:
- "ManageAgendaContainers" (Management of abstract and repo meetings)
- "ActiveScreens" (Creation and listing of instance meetings)
*Note: The main Header menu should render 'Meetings' as a standard `<menu-item>`, not a `<menu-dropdown>`.*

### Scheduled Topic Calendar (STC)
A screen showing upcoming meetings.
