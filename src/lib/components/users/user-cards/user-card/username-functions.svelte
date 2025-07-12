<script module lang="ts">
	import { persistentAppSettings, appSettings } from '$lib/components/common/state.svelte';
	import { newToastAlert } from '$lib/components/layout/toast-functions.svelte';
    import type { user } from '$lib/components/common/classes.svelte';
	import { getUsers } from '../../user-cards-functions.svelte';

	export async function setUsername(user: user, newName: string) {
		try {
			const response = await fetch(`${persistentAppSettings.headscaleURL}/api/v1/user/${user.id}/rename/${newName}`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${persistentAppSettings.headscaleAPIKey}`,
					'Content-Type': 'application/json'
				}
                // body: JSON.stringify({
                // })
			});

			if (response.ok) {
                getUsers();
			} else {
                newToastAlert(`${response.status}`);
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
