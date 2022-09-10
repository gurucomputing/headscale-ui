<script lang="ts">
	//
	// Imports
	//
	import { showACLPagesStore } from '$lib/common/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Set to true once component is initialized
	let componentLoaded = false;

	onMount(async () => {
		componentLoaded = true;
	});
</script>

<body>
	{#if showACLPagesStore}
		<div hidden={!componentLoaded} in:fade class="px-4 py-4 w-4/5 max-w-screen-lg">
				<h1 class="text-2xl bold text-primary">Group View</h1>
		</div>
	{/if}
</body>
