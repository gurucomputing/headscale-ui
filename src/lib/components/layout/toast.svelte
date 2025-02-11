<!-- used to generate alerts or messages -->
<script lang="ts">
	import { appSettings } from '$lib/components/common/state.svelte';
	import { toastAlert } from '../common/classes.svelte';
	interface Props {
		toast: toastAlert;
	}

	let { toast }: Props = $props();

	// animates the close dialogue
	let progress = $state(100);
	const intervalTime = 20; // 20ms
	const totalTime = 4000; // 4 seconds
	const decrement = 100 / (totalTime / intervalTime);

	var interval = setInterval(() => {
		progress -= decrement;
		if (progress <= 0) {
			clearInterval(interval);
		}
	}, intervalTime);

	async function delayedClose(id: string) {
		await new Promise((resolve) => setTimeout(resolve, 4000));
		removeAlert(id)
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
			<div class="radial-progress" style="--value:{progress}; --size:2rem; --thickness: 2px;" role="progressbar">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
		</button>
	</div>
</div>
