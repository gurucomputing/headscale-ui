<script lang="ts">
	import { filterDevices } from '$lib/common/searching.svelte';
	import { deviceSearchStore } from '$lib/common/stores';

	export let overrideSort = false;

	// called when search changes
	deviceSearchStore.subscribe((value) => {
		if (value != '') {
			overrideSort = true;
		} else {
			overrideSort = false;
		}
		filterDevices();
	});
</script>

<!-- search icon -->
<div class="flex">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-3 mr-1 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
		<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
	</svg> <input type="text" placeholder="search" bind:value={$deviceSearchStore} class="input input-bordered input-xs w-full max-w-xs" />
</div>
