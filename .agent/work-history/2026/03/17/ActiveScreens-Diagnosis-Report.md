# ActiveScreens Diagnosis Report

**Date:** 2026-03-17  
**Tool Used:** webmcp (HTTP-based diagnosis)

## Problem Statement

ActiveScreens.xml was not rendering correctly:
- `<subscreens-menu>` showed parent-level menu instead of SelectPage/MeetingAgendaSplit
- `<menu-item>` was not visible
- Screen appeared to use parent screen's widgets

## Diagnosis Steps

### 1. Initial Assessment
Used curl to fetch rendered HTML:
```bash
curl -s "http://localhost:8080/aitree/Meetings/ActiveScreens" | grep -i subscreen
```

**Finding:** Only parent-level menu items appeared (Home, PeopleOrgs, etc.)

### 2. Tried Alternative Navigation Pattern
Changed from `<subscreens-menu/>` to `<bp-tabbar>` based on Meetings.xml pattern:
```xml
<bp-tabbar>
    <bp-tab name="SelectPage" text="Select Containers" icon="select_all"/>
    <bp-tab name="MeetingAgendaSplit" text="Meeting View" icon="view_split"/>
</bp-tabbar>
```

**Finding:** bp-tabbar still didn't render

### 3. Checked qjson Render Mode
```bash
curl -s "http://localhost:8080/aitree/Meetings/ActiveScreens?renderMode=qjson"
```

**Critical Finding:** 
```json
{
    "location": "component://webroot/screen/webroot.xml.screen.widgets"
}
```
The screen location was **webroot.xml**, not ActiveScreens.xml!

### 4. Verified File Existence
```bash
ls -la /home/byersa/IdeaProjects/aitree-project/runtime/component/aitree/screen/aitree/Meetings/ActiveScreens.xml
```

**Finding:** File exists and has correct content

### 5. Checked routes.js
```bash
curl -s "http://localhost:8080/aitree/routes.js" | grep -i meeting
```

**Finding:** No Meeting paths in routes.js!

## Root Cause

**Moqui Screen Cache Issue**

The Moqui server was started before the ActiveScreens.xml and related files were created/modified. The screen definition cache and routes.js generation are both stale.

Evidence:
1. routes.js only has catch-all route, no screen paths
2. qjson render returns webroot.xml instead of requested screen
3. All subscreen navigation fails (not just ActiveScreens)

## Solution

**Restart the Moqui server** to:
1. Clear screen definition cache
2. Regenerate routes.js with all screen paths
3. Load new/modified screen XML files

### Commands to Execute:
```bash
# Stop the server
# (Use the appropriate method for your environment)

# Start the server
./gradlew run

# Verify routes.js includes Meeting paths
curl -s "http://localhost:8080/aitree/routes.js" | grep -i meeting

# Test ActiveScreens rendering
curl -s "http://localhost:8080/aitree/Meetings/ActiveScreens?renderMode=qjson" | grep location
```

## Files Modified (Awaiting Server Restart)

1. **ActiveScreens.xml** - Updated with bp-tabbar navigation
2. **MeetingAgendaSplit.xml** - New screen with screen-split widget
3. **MainInstancePage.xml** - Placeholder for dynamic instances
4. **ActiveScreens.md** - Updated blueprint with complete structure
5. **MeetingAgendaSplit.md** - New blueprint

## webmcp Effectiveness

**Successes:**
- ✅ HTTP-based diagnosis worked reliably
- ✅ curl commands provided clear server responses
- ✅ qjson render mode exposed the root cause
- ✅ No terminal hangs (unlike running server commands directly)

**Limitations:**
- ❌ Cannot restart server (requires process management)
- ❌ Cannot clear Moqui cache without server restart
- ❌ Screen rendering issues require server-side action

**Recommendation:** webmcp is excellent for diagnosis but server management commands need to be run separately or via approved process control mechanisms.

## Next Steps

1. Restart Moqui server
2. Verify routes.js includes: `/aitree/Meetings`, `/aitree/Meetings/ActiveScreens`
3. Test ActiveScreens rendering in browser
4. Verify bp-tabbar shows SelectPage and MeetingAgendaSplit tabs
5. Test tab navigation between subscreens
