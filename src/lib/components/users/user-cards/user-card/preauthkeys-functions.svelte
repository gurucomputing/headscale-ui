<script module lang="ts">
	import { preauthkey } from '$lib/components/common/classes.svelte';
	import { persistentAppSettings, appSettings } from '$lib/components/common/state.svelte';
	import { newToastAlert } from '$lib/components/layout/toast-functions.svelte';

	export async function getPreauthKeys(userID: string) {
        let preauthkeys: preauthkey[] = [];
		try {
			const response = await fetch(`${persistentAppSettings.headscaleURL}/api/v1/preauthkey?user=${userID}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${persistentAppSettings.headscaleAPIKey}`,
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
                preauthkeys = (await response.json()).preAuthKeys as preauthkey[];
			} else {
                newToastAlert(`${response.status}: ${response.body}`);
			}
		} catch (error) {
			let message: string;
			if (error instanceof Error) {
				message = error.message;
			} else {
				message = String(error);
			}
			newToastAlert(`API test failed (check your server settings): ${message}`);
			appSettings.apiTested = false;
		}
		return preauthkeys;
	}
</script>
