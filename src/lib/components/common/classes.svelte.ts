import { SvelteMap } from "svelte/reactivity";

export class PersistentAppSettingsObject {
    daisyUITheme = ""       // for setting the UI theme. See https://daisyui.com/docs/themes/
    headscaleAPIKey = ""    // sensitive, allows for administrative access to headscale
    headscaleURL = ""       // url for headscale to use
    debugLogging = false    // to turn on additional messages

    public constructor(init?: Partial<PersistentAppSettingsObject>) {
        Object.assign(this, init);
    }
}

export class AppSettingsObject {
    navbarTitle = ""                // for setting the title of the page
    appLoaded = false               // for hiding the screen until hydration has completed
    sidebarDrawerOpen = false       // for determining if the sidebar is open when on a small screen
    toastAlerts = new SvelteMap<string, toastAlert>();  // for adding or removing alerts
    apiTested = true               // used to hide the app if the api tests are failing
    apiSecretHidden = true       // for hiding or showing the API key
    
    public constructor(init?: Partial<AppSettingsObject>) {
        Object.assign(this, init);
    }
}

// alert used for populating toasts in the layout
export class toastAlert {
    message = ""                //message to display
    notificationType = "alert"  //to style the toast
    id = ""                     //UUID generated to reference the toast

    public constructor(init?: Partial<toastAlert>) {
        Object.assign(this, init);
    }
}