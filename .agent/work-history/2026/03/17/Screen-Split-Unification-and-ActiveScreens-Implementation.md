# Screen-Split Unification and ActiveScreens Implementation

**Date:** 2026-03-17  
**Author:** Qwen Code  
**Task:** Build out ActiveScreens blueprint and consolidate screen-accordion into screen-split

## Summary

This session accomplished two major tasks:

1. **Consolidated screen-accordion into screen-split** - Unified the two splitter components into a single versatile element
2. **Implemented ActiveScreens.xml and MainInstancePage.xml** - Created the base structure for the active screens manager

## Task 1: screen-split Unification

### Problem
The codebase had two separate splitter components:
- `screen-accordion` - Static widget distribution with Quasar q-splitter
- `screen-split` - Dynamic list-driven component loading

This duplication was unnecessary and confusing.

### Solution
Enhanced `screen-split` to handle both use cases:

**Mode 1: Static Widget Distribution** (replaces screen-accordion)
```xml
<screen-split model="30" horizontal="false">
    <container>Left panel content</container>
    <form-single>Right panel content</form-single>
</screen-split>
```

**Mode 2: Dynamic Component Loading** (original screen-split functionality)
```xml
<screen-split list="activeContainerIds" component="MainInstance" horizontal="true"/>
```

### Files Modified

1. **`xsd/moqui-ai-screen.xsd`**
   - Removed `screen-accordion` element definition
   - Enhanced `screen-split` with new attributes:
     - `model` - splitter position (0-100%)
     - `horizontal` - orientation (true=vertical split, false=horizontal split)
     - `limits` - splitter limits
     - `dynamic-component` - field name for multiple component types
     - Changed `list` and `component` from required to optional

2. **`screen/moquiai/components/ScreenSplit.qvt.js`**
   - Complete rewrite supporting both modes
   - Dynamic mode: Uses existing m-dynamic-container approach
   - Static mode: Uses Quasar's q-splitter with before/after slots

3. **`template/MoquiAiScreenMacros.qvt.ftl`**
   - Updated screen-split macro to support all new attributes
   - Conditional attribute passing

4. **`screen/moquiai/js/BlueprintClient.js`**
   - Removed screen-accordion case
   - Added explicit screen-split handling

5. **`src/main/groovy/org/moqui/ai/impl/screen/DeterministicVueRenderer.groovy`**
   - Replaced screen-accordion with screen-split in case statement

6. **`screen/moquiai/components/ScreenAccordion.qvt.js`**
   - **Deleted** - no longer needed

### Important Note
**Groovy files require rebuild:** Moqui does not automatically recompile Groovy files when changed. Run `./gradlew build` to compile changes to `DeterministicVueRenderer.groovy`.

## Task 2: ActiveScreens Implementation

### Architecture Decision
Created separate named screen files rather than inline subscreen content. This follows Moqui conventions and enables:
- Reusability across multiple parent screens
- Transition references
- Blueprint compatibility
- Easier debugging

### Files Created

#### 1. ActiveScreens.xml
Parent screen that manages the split-screen layout:

```xml
<screen xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="component://moqui-ai/xsd/moqui-ai-screen.xsd" require-authentication="false">

    <subscreens>
        <subscreens-item name="SelectPage" location="component://aitree/screen/aitree/Meetings/ActiveScreens/AgendaContainerSelectPage.xml"/>
        <subscreens-item name="MainInstance" location="component://aitree/screen/aitree/Meetings/ActiveScreens/MainInstancePage.xml"/>
    </subscreens>

    <widgets>
        <screen-layout id="ActiveScreensLayout">
            <screen-header id="ActiveScreensHeader">
                <label text="Active Screens Manager" type="h5"/>
            </screen-header>
            <screen-content id="ActiveScreensContent">
                <screen-split name="as_screen_split" model="30" horizontal="false"
                              list="activeContainerIds" component="MainInstance"
                              fail-message="No active containers selected. Use the panel on the left to select containers."/>
            </screen-content>
        </screen-layout>
    </widgets>
</screen>
```

**Key Features:**
- Uses screen-split in **dynamic mode**
- Left panel: SelectPage (AgendaContainerSelectPage) for choosing containers
- Right panel: Dynamically renders one MainInstancePage per active container
- `model="30"` gives 30% width to the selection panel
- Fail message shown when no containers are active

#### 2. MainInstancePage.xml
Placeholder screen for meeting instance content:

```xml
<screen xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:noNamespaceSchemaLocation="component://moqui-ai/xsd/moqui-ai-screen.xsd" require-authentication="false">
    