import { toastAlert } from "../common/classes.svelte";
import { appSettings } from "../common/state.svelte";

export function testAPIConnectivity() {
    let id = crypto.randomUUID() 
    let toastObject = new toastAlert({
        message: id,
        id: id
    });
    appSettings.toastAlerts.set(toastObject.id, toastObject);
}