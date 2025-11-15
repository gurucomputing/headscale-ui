<script module lang="ts">
	import { appSettings } from '../common/state.svelte';

	export async function loginOrRegister() {
		try {
			let authData = await appSettings.pb.collection('_superusers').authWithPassword('superadmin@breakglass.local', 'firsttimepasswordchangeme');
			if (authData) {
				appSettings.pb.authStore.clear();
				return 'registration';
			}
		} catch (error) {
			return 'login';
		}

		return 'none';
	}
</script>
