<script module lang="ts">
	import { persistentAppSettings, appSettings } from '../common/state.svelte';
	import { newToastAlert } from '../layout/toast-functions.svelte';

	export async function getUsers() {
		try {
			const response = await fetch(`${persistentAppSettings.headscaleURL}/api/v1/user`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${persistentAppSettings.headscaleAPIKey}`,
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				newToastAlert(`API test failed (check your server settings): ${response.status}`);
				appSettings.apiTested = false;
			} else {
				appSettings.users = (await response.json()).users;
				appSettings.apiTested = true;
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
