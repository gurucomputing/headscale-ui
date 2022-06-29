<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	export let user = { id: '', name: '', createdAt: '' };
	let cardExpanded = false;
</script>

<div in:fade on:click={() => cardExpanded = !cardExpanded} class="grid grid-cols-1 divide-y p-2 max-w-screen-lg border-2 mx-4 border-gray-100 rounded-md text-sm text-gray-600 shadow">
	<div class="flex justify-between">
		<span class="font-bold">{user.id}: {user.name}</span>
		{#if !cardExpanded}
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
			</svg>
		{/if}
	</div>
	{#if cardExpanded}
		<div transition:slide class="pt-2 pl-2"><p><span class="font-bold">User Created: </span><span class="font-normal">{new Date(user.createdAt)}</span></p></div>
	{/if}
</div>
