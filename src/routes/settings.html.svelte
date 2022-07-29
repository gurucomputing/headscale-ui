<script lang="ts">
	//
	// Imports
	//
	import ServerSettings from '$lib/settings/ServerSettings.svelte';
	import ThemeSettings from '$lib/settings/ThemeSettings.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Set to true once component is initialized
	let componentLoaded = false;

	onMount(async () => {
		// Display component frontend
		componentLoaded = true;
	});
</script>

<!-- html -->
<body>
	{#if componentLoaded}
		<div in:fade class="px-4 py-4 w-4/5">
			<ServerSettings />
			<div class="p-4"></div>
			<ThemeSettings />
			<div class="p-4"></div>
			<h1 class="text-2xl bold text-primary mb-4">Version</h1><b>insert-version</b>
		</div>
	{/if}
</body>
