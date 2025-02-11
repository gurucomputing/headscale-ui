import { toastAlert } from "../common/classes.svelte";
import { appSettings } from "../common/state.svelte";

export function testAPIConnectivity() {
    let toastObject = new toastAlert({
        message: 'success!',
        id: crypto.randomUUID()
    });
    appSettings.toastAlerts.set(toastObject.id, toastObject);
}