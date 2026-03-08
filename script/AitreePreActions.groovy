// if user not logged in save current path and params then redirect to Login
// if (!ec.user.userId) { ec.web.saveScreenLastInfo(null, null); sri.sendRedirectAndStopRender('/Login') }

// AMB 2026-03-02: Set base paths for the aitree standalone webapp
ec.context.put("appRootPath", "/aitree")
ec.context.put("basePath", "/aitree")
ec.context.put("linkBasePath", "/aitree")

// Defensively remove standard WebrootVue to prevent double-initialization
footer_scripts.remove('/js/WebrootVue.qvt.js')

// Aitree Vue App
String scriptPath = '/aitree/moquiaiJs/MoquiAiVue.qvt.js'
String instancePurpose = System.getProperty("instance_purpose")
boolean isProd = !instancePurpose || instancePurpose == 'production'

// Load Base Libraries
html_scripts.add('/libs/moment.js/moment-with-locales.min.js')
html_scripts.add('/libs/jquery/jquery.min.js')

if (isProd) {
    html_scripts.add('/js/MoquiLib.min.js')
    footer_scripts.add('https://unpkg.com/vue@3.3.4/dist/vue.global.prod.js')
} else {
    html_scripts.add('/js/MoquiLib.js')
    footer_scripts.add('https://unpkg.com/vue@3.3.4/dist/vue.global.js')
}

// Load Stylesheets for Quasar and Material Icons
html_stylesheets.add('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons')
html_stylesheets.add('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200')
html_stylesheets.add('https://unpkg.com/quasar@2.12.6/dist/quasar.prod.css')

// Load SPA Libraries
footer_scripts.add('https://unpkg.com/vue-router@4.2.4/dist/vue-router.global.prod.js')
footer_scripts.add('/js/http-vue-loader/httpVueLoader.js')
footer_scripts.add('https://unpkg.com/quasar@2.12.6/dist/quasar.umd.prod.js')
footer_scripts.add('https://unpkg.com/vue3-sfc-loader@0.8.4/dist/vue3-sfc-loader.min.js')
footer_scripts.add('https://unpkg.com/vue-demi@0.14.7/lib/index.iife.js')
footer_scripts.add('https://unpkg.com/pinia@2.1.7/dist/pinia.iife.js')

// Load Pinia Stores
footer_scripts.add('/aitree/moquiaiJs/stores/meetingsStore.js')

// Load Routing - always use the clean base path for the script
footer_scripts.add('/aitree/routes.js')
// Note: pathInfo was previously added but caused duplicate path segments on refresh. 
// moqui.routes will handle the client-side routing based on window.location.

// Load Main App
if (ec.resource.getLocationReference("component://moqui-ai/screen/moquiai/js/MoquiAiVue.qvt.js").exists) {
    footer_scripts.add(scriptPath + "?v=" + System.currentTimeMillis())
} else {
    ec.logger.warn("AitreeVue script not found: " + scriptPath)
}

String blueprintClientUrl = '/aitree/moquiaiJs/BlueprintClient.js'
if (ec.resource.getLocationReference("component://moqui-ai/screen/moquiai/js/BlueprintClient.js").exists) {
    footer_scripts.add(blueprintClientUrl + "?v=" + System.currentTimeMillis())
}

// Auto-register JS scripts for all subscreens
org.moqui.util.ContextStack cs = ec.context
org.moqui.impl.screen.ScreenDefinition sd = sri.getActiveScreenDef()

if (sd != null) {
    // 1. Get all subscreen items (menus)
    List<org.moqui.impl.screen.ScreenDefinition.SubscreensItem> subscreenItems = sd.getSubscreensItemsSorted()
    
    // 2. Iterate and check for matching .qvt.js files
    for (org.moqui.impl.screen.ScreenDefinition.SubscreensItem ssi : subscreenItems) {
        String name = ssi.getName()
        String location = ssi.getLocation()
        
        // Only proceed if it's a component location
        if (location && location.contains("component://")) {
            // Construct the expected script location (e.g., in aitreejs directory)
            // We moved the scripts to 'aitreejs' to avoid collision with screen rendering URLs
            String scriptLocation = location.replace("/aitree/", "/aitreejs/").replace(".xml", ".qvt.js")
            
            // Check existence using ResourceFacade
            if (ec.resource.getLocationReference(scriptLocation).getExists()) {
                // Construct the web path - We assume /aitreejs/ prefix works as per AitreeVue
                String scriptUrlLine = "/aitreejs/" + name + ".qvt.js"
                
                if (!footer_scripts.contains(scriptUrlLine)) {
                     footer_scripts.add(scriptUrlLine)
                }
            }
        }
    }
}

