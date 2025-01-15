<script lang="ts">
	import { getDevices } from '$lib/common/apiFunctions.svelte';
	import { deviceSortDirectionStore, deviceSortStore } from '$lib/common/stores.js';

	function sortAction() {
		if ($deviceSortDirectionStore == 'ascending') {
			$deviceSortDirectionStore = 'descending';
		} else {
			$deviceSortDirectionStore = 'ascending';
		}
		getDevices();
	}
</script>

<span class="flex">
	<button
		on:keypress on:click={() => {
			sortAction();
		}}
		class="mx-1"
	>
		{#if $deviceSortDirectionStore == 'ascending'}
			<!-- ascending sort icon -->

			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
			</svg>
		{:else}
			<!-- descending sort icon -->
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
			</svg>
		{/if}
	</button>

	<span class="btn-group">
		<button class:btn-active="{$deviceSortStore == 'id'}" on:click="{() => {$deviceSortStore = 'id'; getDevices()}}" class="btn btn-xs">ID</button>
		<button class:btn-active="{$deviceSortStore == 'givenName'}" on:click="{() => {$deviceSortStore = 'givenName'; getDevices()}}" class="btn btn-xs capitalize">Device Name</button>
		<button class:btn-active="{$deviceSortStore == 'lastSeen'}" on:click="{() => {$deviceSortStore = 'lastSeen'; getDevices()}}" class="btn btn-xs capitalize">Last Seen</button>
	</span>
</span>
