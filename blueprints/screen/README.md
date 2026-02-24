# Screen Blueprints

This folder contains blueprints for defining UI screens and frontend components for the aitree Staff Meeting App (SMA).

## Instructions (Critical Scaffolding Rules)
- **Strict XML Well-Formedness**: Moqui's XML parser will throw `SAXParseException`s if standard HTML/Vue boolean shorthands are used. You *must* use explicit string values for all attributes.
  - ❌ Incorrect: `<q-card flat bordered>` or `<q-item-label caption>`
  - ✅ Correct: `<q-card flat="true" bordered="true">` or `<q-item-label caption="true">`
- **Slot Syntax**: Vue slot shorthands must also have explicit assignments.
  - ❌ Incorrect: `<template v-slot:avatar>`
  - ✅ Correct: `<template v-slot:avatar="">`
- **Text Rendering**: Moqui drops standard HTML text nodes embedded inside unknown XML elements during JSON serialization. All text bound for the frontend must use the Moqui `<label>` tag explicitly.
  - ❌ Incorrect: `<q-item-label>Case Review: Oncology</q-item-label>`
  - ✅ Correct: `<q-item-label><label text="Case Review: Oncology"/></q-item-label>`
- **Subscreen Authorization**: Moqui enables screen-level authorization by default (`require-authentication="true"`). When scaffolding internal subscreens that are part of a larger SPA shell (like `Home.xml` inside `aitree.xml`), you must explicitly add `require-authentication="false"` to the root `<screen>` component of the subscreen so it inherits access from the master screen, avoiding `403 Forbidden` errors.
- Adhere to the Vue macro usage and layout standards defined for the `moqui-ai` project.
- Follow the Single Page Architecture (SPA) model.
- Always include ARIA id tags for `moqui-mcp` testability.

## Root SPA Shell Bolierplate (`aitree.xml`)
When defining the root screen representing the base of the standalone SPA layout (`aitree/screen/aitree.xml`), you must always include the following critical blocks.

1. **Pre/Always Actions**: Set paths mapping to the mount point (e.g. `/aitree`).
```xml
    <always-actions>
        <set field="appRoot" value="aitree"/>
        <set field="appRootPath" value="/aitree"/>
        <set field="linkBasePath" value="/aitree"/>
        <set field="basePath" value="/aitree"/>
    </always-actions>
```

2. **Routes.js & MenuData Transitions**: Required to generate routing JSON for the Vue app.
```xml
    <transition name="menuDataQvt2" read-only="true" begin-transaction="false" require-session-token="false">
        <actions><script><![CDATA[
            def sd = ec.screen.getScreenDefinition("component://aitree/screen/aitree.xml")
            def subscreens = []
            for (ssi in sd.getSubscreensItemsSorted()) {
                if (!ssi.menuInclude) continue
                subscreens.add([
                    name: ssi.name,
                    title: ssi.menuTitle ?: ssi.name,
                    path: "/" + ssi.name,
                    pathWithParams: "/" + ssi.name,
                    active: sri.screenUrlInfo.extraPathNameList.contains(ssi.name)
                ])
            }
            ec.web.sendJsonResponse([[
                name: "aitree",
                title: "Staff Meeting",
                path: "/",
                pathWithParams: "/",
                subscreens: subscreens
            ]])
        ]]></script></actions>
        <default-response type="none" save-parameters="true"/>
    </transition>

    <transition name="routes.js" read-only="true">
        <actions>
            <set field="webappName" from="ec.web.request.servletContext.getInitParameter('moqui-name')"/>
            <set field="rootScreenLocation" from="ec.screen.rootScreenFromHost(ec.web.request.getServerName(), webappName)"/>
            <set field="rootScreenDef" from="ec.screen.getScreenDefinition(rootScreenLocation)"/>
            <set field="realPathList" from="sri.screenUrlInfo.fullPathNameList"/>
            <set field="realPath" value="/${realPathList.join('/')}"/>
            <script><![CDATA[
                def getSubscreenPaths (org.moqui.impl.screen.ScreenDefinition currentScreenDefinition,List<String> pathList,String basePath) {
                    def subscreenList = currentScreenDefinition?.getSubscreensItemsSorted()
                    for (subscreen in subscreenList) {
                        if (subscreen.location == null) { continue }
                        subscreenDefinition = ec.screen.getScreenDefinition(subscreen.location)
                        String currentPath = (basePath == '/' ? '/' : basePath + '/') + currentScreenDefinition.getScreenName()
                        pathList = getSubscreenPaths(subscreenDefinition, pathList, currentPath)
                    }
                    String leafPath = (basePath == '/' ? '/' : basePath + '/') + currentScreenDefinition.getScreenName()
                    return pathList + [leafPath]
                }

                pathNameList = getSubscreenPaths(rootScreenDef, [], '/')
                pathList = []
                for (pathName in pathNameList) {
                    String cleanPath = pathName
                    if (cleanPath.startsWith("/aitree")) cleanPath = cleanPath.substring(7)
                    if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath
                    pathList.add([path: cleanPath, component: ''])
                }

                template = ec.resource.template('component://moqui-ai/template/screen/routes.js.ftl', '.ftl')
                ec.web.sendTextResponse(template, "application/javascript", "routes.js")
            ]]></script>
        </actions>
        <default-response type="none"/>
    </transition>
```

3. **Vue Renderer Injection**: Must be at the top of the widgets block.
```xml
    <widgets>
        <render-mode>
            <text type="html" location="component://moqui-ai/template/spa/MoquiAiVue.qvt2.ftl"/>
        </render-mode>

        <container id="apps-root">
            <screen-layout view="hHh lpR fFf" class="bg-grey-1">
                <screen-header elevated="true" class="bg-primary text-white">
                    <screen-toolbar>
                        <render-mode><text type="html"><![CDATA[<q-btn dense flat round icon="menu" aria-label="Menu" @click="leftOpen = !leftOpen"></q-btn>]]></text></render-mode>
                        <label text="Staff Meeting" style="q-toolbar-title"/>
                        <container type="q-space"/>
                        <subscreens-menu pathIndex="0" style="toolbar"/>
                    </screen-toolbar>
                </screen-header>

                <screen-drawer side="left" v-model="leftOpen">
                    <subscreens-menu pathIndex="0" type="drawer"/>
                </screen-drawer>

                <screen-content class="q-pa-md">
                    <subscreens-active/>
                </screen-content>
            </screen-layout>
        </container>
    </widgets>
```
