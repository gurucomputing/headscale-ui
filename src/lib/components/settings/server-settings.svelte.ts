import { newToastAlert } from "../layout/toast.svelte.ts";
import { persistentAppSettings } from "../common/state.svelte";

export async function testAPIConnectivity(submission: SubmitEvent) {
    try {
        const response = await fetch(`${persistentAppSettings.headscaleURL}/api/v1/apikey`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${persistentAppSettings.headscaleAPIKey}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            newToastAlert(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        newToastAlert('success!');
        if (persistentAppSettings.debugLogging) {
            newToastAlert(`API Response: ${JSON.stringify(data)}`);
        }
    } catch (error) {
        newToastAlert(`Error fetching API key: ${error}`);
    }
}