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
A top-level `subscreens-menu`/`tabs` page, keyed by available abstract meeting templates. 
- Each tab contains another `subscreens-menu`/`tabs` page containing all the "active" meetings of that meeting template type, keyed by scheduled date of occurrence.
- Each instance meeting is rendered by its own rendering component, mostly rendering the `<discussion-tree>` screen macro.

### Scheduled Topic Calendar (STC)
A screen showing upcoming meetings.
