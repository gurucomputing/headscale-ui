import { newToastAlert } from "../layout/toast.svelte.ts";
import { appSettings, persistentAppSettings } from "../common/state.svelte";

export async function testAPIConnectivity() {
    const response = await fetch(`${persistentAppSettings.headscaleURL}/api/v1/apikey`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${persistentAppSettings.headscaleAPIKey}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        newToastAlert(`API error! Status: ${response.status}. Check your API settings`);
        appSettings.apiTested = false;
    }

    const data = await response.json();
    appSettings.apiTested = true;

    if (persistentAppSettings.debugLogging) {
        newToastAlert(`API Response: ${JSON.stringify(data)}`);
    }
}