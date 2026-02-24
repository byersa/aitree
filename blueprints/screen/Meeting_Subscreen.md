# Meeting Subscreen Blueprints

## Overview
This document defines the architecture and UI requirements for the "Meetings" subscreen within the Staff Meeting App (SMA).

## Current Requirements
*(Extracted from the original Staff Meeting Requirements)*

### SMA Meetings page
A top-level `subscreens-menu`/`tabs` page, keyed by available abstract meeting templates. The top subscreens-menu should be a dropdown menu with all of the AgendaContainer entities of containerTypeEnumId = "AitContainerAbstract". "Meeting.xml" is the file that must render the "Meetings" menu tab. Meeting.xml must render a screen <screen-layout> layout just as aiTree.xml, including the <subscreens-active> element which will call its only subscreen, MeetingInstances.xml.


- Each tab contains another `subscreens-menu`/`tabs` page containing all the "active" meetings of that meeting template type, keyed by scheduled date of occurrence.
- Each instance meeting is rendered by its own rendering component, mostly rendering the `<discussion-tree>` screen macro.

### Scheduled Topic Calendar (STC)
A screen showing upcoming meetings.

---

## Detailed Implementation Notes (User Input Required)
*Please write your detailed instructions, macro requirements (like `discussion-tree`, `discussion-detail`, `discussion-message`, etc.), and how the Meeting subscreen is going to work below.*

