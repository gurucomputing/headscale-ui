import { newToastAlert } from "../layout/toast.svelte.ts";
import { appSettings, persistentAppSettings } from "../common/state.svelte";

export async function getAPIKeys() {
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
        } else {
            appSettings.apiKeyList = (await response.json()).apiKeys;
            appSettings.apiTested = true;

            // determine the remaining time for the key we are currently using
            appSettings.apiKeyList.forEach(key => {
                if (persistentAppSettings.headscaleAPIKey.startsWith(key.prefix)) {
                    getKeyRemainingTime(new Date(key.expiration));
                }
            })
        }

    } catch (error) {
        let message: string;
        if (error instanceof Error) { message = error.message }
        else { message = String(error) }
        newToastAlert(`API test failed (check your server settings): ${message}`)
        appSettings.apiTested = false;
    }
}

function getKeyRemainingTime(expiration: Date) {
    let currentTime = new Date();
    // gets time difference in seconds
    appSettings.apiKeyExpiration = Math.round((expiration.getTime() - currentTime.getTime()) / 1000 / 60 / 60 / 24);
    if (appSettings.apiKeyExpiration < 30) {
        newToastAlert(`${appSettings.apiKeyExpiration} days left before API Key expiry, consider rolling your key`);
    }
}

export function rotateAPIKey() {
    appSettings.apiKeyList.forEach(key => {
        // select the current key being used
        if (persistentAppSettings.headscaleAPIKey.startsWith(key.prefix)) {
            let currentKey = key;
            let newExpiration = new Date();
            newExpiration.setDate(newExpiration.getDate() + 90);

            // create a new API key with the new new expiration, set it as the current API key,
            // and then expire the previous API key

            createNewAPIKey(newExpiration).then((apiKey) => {
                if (apiKey == undefined) {
                    throw new Error("expecting API key string, string was undefined");
                }
                persistentAppSettings.headscaleAPIKey = apiKey;
                expireAPIKey(currentKey.prefix).then(() => {
                    getAPIKeys().then(() => {
                        // console.log(appSettings.apiKeyList);
                    });
                });
            });
        }
    })
}

export async function createNewAPIKey(expireDate: Date) {
    try {
        const response = await fetch(`${persistentAppSettings.headscaleURL}/api/v1/apikey`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${persistentAppSettings.headscaleAPIKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "expiration": expireDate.toISOString()
            })
        });

        if (!response.ok) {
            newToastAlert(`Creating new API Key Failed (check your server settings): ${response.status}`);
            appSettings.apiTested = false;
        } else {
            let apiKey = '';
            apiKey = (await response.json()).apiKey;
            return apiKey;
        }

    } catch (error) {
        let message: string;
        if (error instanceof Error) { message = error.message }
        else { message = String(error) }
        newToastAlert(`API Call Failed (check your server settings): ${message}`)
        appSettings.apiTested = false;
    }
}

export async function expireAPIKey(apiPrefix: string) {
    try {
        const response = await fetch(`${persistentAppSettings.headscaleURL}/api/v1/apikey/expire`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${persistentAppSettings.headscaleAPIKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "prefix": apiPrefix
            })
        });

        if (!response.ok) {
            newToastAlert(`API test failed (check your server settings): ${response.status}`);
            appSettings.apiTested = false;
        }

    } catch (error) {
        let message: string;
        if (error instanceof Error) { message = error.message }
        else { message = String(error) }
        newToastAlert(`API test failed (check your server settings): ${message}`)
        appSettings.apiTested = false;
    }
}