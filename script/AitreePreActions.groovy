// if user not logged in save current path and params then redirect to Login
// if (!ec.user.userId) { ec.web.saveScreenLastInfo(null, null); sri.sendRedirectAndStopRender('/Login') }

// Defensively remove standard WebrootVue to prevent double-initialization
footer_scripts.remove('/js/WebrootVue.qvt2.js')

// Aitree Vue App
String scriptPath = '/aitree/moquiaiJs/MoquiAiVue.qvt2.js'
String instancePurpose = System.getProperty("instance_purpose")
boolean isProd = !instancePurpose || instancePurpose == 'production'

// Load Base Libraries
html_scripts.add('/libs/moment.js/moment-with-locales.min.js')
html_scripts.add('/libs/jquery/jquery.min.js')

if (isProd) {
    html_scripts.add('/js/MoquiLib.min.js')
    footer_scripts.add('/libs/vue/vue.global.prod.min.js')
} else {
    html_scripts.add('/js/MoquiLib.js')
    footer_scripts.add('/libs/vue/vue.global.js')
}

// Load SPA Libraries
footer_scripts.add('/libs/vue-router/vue-router.global.js')
footer_scripts.add('/js/http-vue-loader/httpVueLoader.js')
footer_scripts.add("/libs/quasar/quasar.umd.prod.js")
footer_scripts.add('/libs/vue3-sfc-loader/vue3-sfc-loader.min.js')
footer_scripts.add('https://unpkg.com/vue-demi@0.14.7/lib/index.iife.js')
footer_scripts.add('https://unpkg.com/pinia@2.1.7/dist/pinia.iife.js')

// Load Pinia Stores
footer_scripts.add('/aitree/moquiaiJs/stores/meetingsStore.js')

// Load Routing
String pathInfo = ec.web.request.pathInfo ?: ""
if (pathInfo == "/aitree" || pathInfo == "aitree") pathInfo = ""
footer_scripts.add('/routes.js' + pathInfo)

// Load Main App
if (ec.resource.getLocationReference("component://moqui-ai/screen/moquiai/js/MoquiAiVue.qvt2.js").exists) {
    footer_scripts.add(scriptPath)
} else {
    ec.logger.warn("AitreeVue script not found: " + scriptPath)
}

// Auto-register JS scripts for all subscreens
org.moqui.util.ContextStack cs = ec.context
org.moqui.impl.screen.ScreenDefinition sd = sri.getActiveScreenDef()

if (sd != null) {
    // 1. Get all subscreen items (menus)
    List<org.moqui.impl.screen.ScreenDefinition.SubscreensItem> subscreenItems = sd.getSubscreensItemsSorted()
    
    // 2. Iterate and check for matching .qvt2.js files
    for (org.moqui.impl.screen.ScreenDefinition.SubscreensItem ssi : subscreenItems) {
        String name = ssi.getName()
        String location = ssi.getLocation()
        
        // Only proceed if it's a component location
        if (location && location.contains("component://")) {
            // Construct the expected script location (e.g., in aitreejs directory)
            // We moved the scripts to 'aitreejs' to avoid collision with screen rendering URLs
            String scriptLocation = location.replace("/aitree/", "/aitreejs/").replace(".xml", ".qvt2.js")
            
            // Check existence using ResourceFacade
            if (ec.resource.getLocationReference(scriptLocation).getExists()) {
                // Construct the web path - We assume /aitreejs/ prefix works as per AitreeVue
                String scriptUrlLine = "/aitreejs/" + name + ".qvt2.js"
                
                if (!footer_scripts.contains(scriptUrlLine)) {
                     footer_scripts.add(scriptUrlLine)
                }
            }
        }
    }
}

