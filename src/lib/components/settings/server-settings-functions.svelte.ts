import { newToastAlert } from "../layout/toast.svelte.ts";
import { appSettings, persistentAppSettings } from "../common/state.svelte";

export async function testAPIConnectivity() {
    try {
        const response = await fetch(`${persistentAppSettings.headscaleURL}/api/v1/apikey`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${persistentAppSettings.headscaleAPIKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            newToastAlert(`API test failed (check your server settings): ${response.status}`);
            appSettings.apiTested = false;
        }

        const data = await response.json();
        appSettings.apiTested = true;

        if (persistentAppSettings.debugLogging) {
            newToastAlert(`API Response: ${JSON.stringify(data)}`);
        }
    } catch (error) {
        let message
        if (error instanceof Error) { message = error.message }
        else { message = String(error) }
        newToastAlert(`API test failed (check your server settings): ${message}`)
        appSettings.apiTested = false;
    }
}