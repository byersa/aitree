# Meeting Subscreen Blueprints

## Overview
This document defines the architecture and UI requirements for the "Meetings" subscreen within the Staff Meeting App (SMA).

## Current Requirements

The Meetings.xml page shall consist of a header and content section using the screen-layout, screen-header, screen-content and bp-tabbar screen macros. The menu items found within the bp-tabbar should be those that correspond to the subscreen .md files under the Meetings directory. Those .md files will give detailed instructions about the manner in which their menu item is constructed.
---

## Detailed Implementation Notes
The `Meetings.xml` must not contain nested `subscreens-menu` items in its header. Instead, the `screen-header` must include a `bp-tabbar` containing exactly two tabs:
1. `ManageAgendaContainers` (text: "Manage Containers", icon: "settings") -> **Use location="component://aitree/screen/aitree/Meetings/ManageAgendaContainers.xml"**
2. `ActiveScreens` (text: "Active Meetings", icon: "play_arrow") -> **Use location="component://aitree/screen/aitree/Meetings/ActiveScreens.xml"**

The `screen-content` must simply contain `<subscreens-active/>` to dynamically load whichever tab the user clicks. The component must also define a `<subscreens>` block referencing the XML files for the two subscreen tabs using exactly the location paths provided above.
