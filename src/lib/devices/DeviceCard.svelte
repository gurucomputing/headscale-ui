<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	export let device = { id: '', name: '', lastSeen: '', ipAddresses: [''] };
	let cardExpanded = false;
</script>

<div in:fade class="grid grid-cols-1 divide-y p-2 max-w-screen-lg border-2 mx-4 border-gray-100 rounded-md text-sm text-gray-600 shadow">
	<div on:click={() => (cardExpanded = !cardExpanded)} class="flex justify-between">
		<span class="font-bold">{device.id}: {device.name}</span>
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
		<div transition:slide class="pt-2 pl-2">
			<p><span class="font-bold">Device Last Seen: </span><span class="font-normal">{new Date(device.lastSeen)}</span></p>
			<p><span class="font-bold">IP Addresses: </span><span class="font-normal">{device.ipAddresses}</span></p>
		</div>
	{/if}
</div>
