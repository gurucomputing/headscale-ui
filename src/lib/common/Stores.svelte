<script>
	import { onMount } from 'svelte';
	import { headscaleThemeStore } from '$lib/common/stores.js';
	import { headscaleURLStore } from '$lib/common/stores.js';
	import { headscaleAPIKeyStore } from '$lib/common/stores.js';

	onMount(async () => {
		// stores headscale theme
		headscaleThemeStore.set(localStorage.getItem('headscaleTheme') || 'hsui');

		// stores URL and API key
		headscaleURLStore.set(localStorage.getItem('headscaleURL') || '');
		headscaleAPIKeyStore.set(localStorage.getItem('headscaleAPIKey') || '');

		// subscribe to store's state and update the local storage where needed
		headscaleThemeStore.subscribe((val) => localStorage.setItem('headscaleTheme', val));

		headscaleURLStore.subscribe((val) => localStorage.setItem('headscaleURL', val));
		headscaleAPIKeyStore.subscribe((val) => localStorage.setItem('headscaleAPIKey', val));
	});
</script>
