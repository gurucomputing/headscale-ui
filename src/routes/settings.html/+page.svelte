<script lang="ts">
	//
	// Imports
	//
	import DevSettings from '$lib/settings/DevSettings.svelte';
	import ServerSettings from '$lib/settings/ServerSettings.svelte';
	import ThemeSettings from '$lib/settings/ThemeSettings.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Set to true once component is initialized
	let componentLoaded = false;

	onMount(async () => {
		// Display component frontend
		await new Promise(r => setTimeout(r, 200));
		componentLoaded = true;
	});
</script>

<!-- html -->
<body>
	<div hidden={!componentLoaded} in:fade class="px-4 py-4 w-4/5 max-w-screen-lg">
		<ServerSettings />
		<div class="p-4" />
		<ThemeSettings />
		<div class="p-4" />
		<h1 class="text-2xl bold text-primary mb-4">Version</h1>
		<b>insert-version</b>
		<div class ="p-4"></div>
		<DevSettings></DevSettings>
	</div>
</body>
