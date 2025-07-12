<script module lang="ts">
	import { persistentAppSettings, appSettings } from '$lib/components/common/state.svelte';
	import { newToastAlert } from '$lib/components/layout/toast-functions.svelte';

	export async function getUsers() {
		try {
			const response = await fetch(`${persistentAppSettings.headscaleURL}/api/v1/user`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${persistentAppSettings.headscaleAPIKey}`,
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
                appSettings.users = (await response.json()).users;
				appSettings.apiTested = true;
			} else {
                newToastAlert(`API test failed (check your server settings): ${response.status}`);
				appSettings.apiTested = false;
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
	}
</script>
