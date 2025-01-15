<script lang="ts">
	import { getUsers } from '$lib/common/apiFunctions.svelte';
	import { sortDirectionStore, userSortStore } from '$lib/common/stores.js';

	function sortAction() {
		if ($sortDirectionStore == 'ascending') {
			$sortDirectionStore = 'descending';
		} else {
			$sortDirectionStore = 'ascending';
		}
		getUsers();
	}
</script>

<span class="flex">
	<button
		on:click={() => {
			sortAction();
		}}
		class="mx-1"
	>
		{#if $sortDirectionStore == 'ascending'}
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
		<button class:btn-active="{$userSortStore == 'id'}" on:click="{() => {$userSortStore = 'id'; getUsers()}}" class="btn btn-xs">ID</button>
		<button class:btn-active="{$userSortStore == 'name'}" on:click="{() => {$userSortStore = 'name'; getUsers()}}" class="btn btn-xs capitalize">User Name</button>
		<button class:btn-active="{$userSortStore == 'createdAt'}" on:click="{() => {$userSortStore = 'createdAt'; getUsers()}}" class="btn btn-xs capitalize">Creation Date</button>
	</span>
</span>
