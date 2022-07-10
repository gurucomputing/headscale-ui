<script lang="ts">
	//
	// Imports
	//
	import ServerSettings from '$lib/settings/ServerSettings.svelte';
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
			<!-- Server Settings -->
			<ServerSettings />
			<!-- Server Settings End -->
		</div>
	{/if}
</body>
