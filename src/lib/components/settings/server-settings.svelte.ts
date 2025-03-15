import { toastAlert } from "../common/classes.svelte";
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
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Key Response:', data);
    } catch (error) {
        console.error('Error fetching API key:', error);
    }
}