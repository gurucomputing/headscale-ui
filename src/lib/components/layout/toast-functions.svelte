<script module lang="ts">
	import { appSettings } from '../common/state.svelte';
	import { toastAlert } from '../common/classes.svelte';

	export function newToastAlert(message: string) {
		let uuid = crypto.randomUUID();
		appSettings.toastAlerts.set(
			uuid,
			new toastAlert({
				id: uuid,
				message: message
			})
		);
	}
</script>
