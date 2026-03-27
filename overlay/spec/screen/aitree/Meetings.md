# Meetings Screen Hub

## Overview
This screen serves as the primary router and hub for all meeting-related functionality. It provides a tabbed navigation interface using the `<subscreens-menu>` macro to switch between administrative management and operational views.

## Screen Structure
- **Top Navigation**: `<subscreens-menu type="tabs">`
- **Main View**: `<subscreens-active>` (Dynamic area where the subscreen components render)

## Registered Subscreens

### 1. Manage Meetings
- **Target**: `ManageMeetings.md`
- **Label**: Manage
- **Function**: Comprehensive CRUD and search functionality for `AgendaContainer` records (Abstracts, Repositories, and Instances).

### 2. Active Meetings
- **Target**: `ActiveScreens.md`
- **Label**: Active
- **Function**: Redirects to or displays the active split-screen meeting orchestration views.

## Widget Definition
```xml
<screen xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://moqui.org/xsd/xml-screen-2.1.xsd">
    <subscreens-menu type="tabs"/>
    <subscreens-active/>
</screen>
```
