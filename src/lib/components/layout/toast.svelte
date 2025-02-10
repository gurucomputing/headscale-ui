<!-- used to generate alerts or messages -->
<script lang="ts">
	import { appSettings } from '$lib/components/common/state.svelte';
	let { toastAlert } = $props();

	let progress = $state(100);

	// sets a timer and removes the alert after totalTime miliseconds
	const intervalTime = 20; // 20ms
	const totalTime = 4000; // 4 seconds
	const decrement = 100 / (totalTime / intervalTime);

	const interval = setInterval(() => {
		progress -= decrement;
		if (progress <= 0) {
			progress = 0;
			removeAlert();
		}
	}, intervalTime);

	function removeAlert() {
		clearInterval(interval); // Stop the interval at 0
		appSettings.toastAlerts = appSettings.toastAlerts.filter(function (returnObj) {
				return returnObj.id !== toastAlert.id;
			});
	}
</script>

	<div class="alert flex justify-between min-w-60 text-wrap">
		<div>{toastAlert.message}</div>
		<div>
			<button aria-label="close notification" class="mask mask-circle hover:bg-base-300" onclick={() => removeAlert()}>
				<div class="radial-progress" style="--value:{progress}; --size:2rem; --thickness: 2px;" role="progressbar">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</div>
			</button>
		</div>
	</div>
