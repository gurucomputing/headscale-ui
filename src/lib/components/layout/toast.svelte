<!-- used to generate alerts or messages -->
<script lang="ts">
	import { appSettings } from '$lib/components/common/state.svelte';
	import { toastAlert } from '../common/classes.svelte';
	interface Props {
		toast: toastAlert;
	}

	let { toast }: Props = $props();

	async function delayedClose(id: string) {
		await new Promise((resolve) => setTimeout(resolve, 4000));
		removeAlert(id);
	}
	delayedClose(toast.id);

	function removeAlert(id: string) {
		appSettings.toastAlerts.delete(id);
	}
</script>

<div class="alert flex min-w-60 justify-between text-wrap">
	<div>{toast.message}</div>
	<div>
		<button aria-label="close notification" class="mask mask-circle hover:bg-base-300" onclick={() => removeAlert(toast.id)}>
			<div class="radial-progress animate-value" style="--value:var(--_value); --size:2rem; --thickness: 2px;" role="progressbar">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
		</button>
	</div>
</div>

<style>
	/* used to animate the timeout */
	@property --_value {
		syntax: '<number>';
		inherits: true;
		initial-value: 0;
	}
	.animate-value {
		animation-name: grow;
		animation-duration: 4s;
		animation-direction: reverse;
	}

	@keyframes grow {
		from {
			--_value: 0;
		}
		to {
			--_value: 100;
		}
	}
</style>
