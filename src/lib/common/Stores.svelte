<script>
	import { onMount } from 'svelte';
	import { headscaleDeviceSortStore, headscaleDeviceSortDirectionStore, headscaleUserSortStore, headscaleUserSortDirectionStore, headscaleThemeStore } from '$lib/common/stores.js';
	import { headscaleURLStore } from '$lib/common/stores.js';
	import { headscaleAPIKeyStore } from '$lib/common/stores.js';
	import { preAuthHideStore } from '$lib/common/stores.js';

	onMount(async () => {
		// stores headscale theme
		headscaleThemeStore.set(localStorage.getItem('headscaleTheme') || 'hsui');
		headscaleThemeStore.subscribe((val) => localStorage.setItem('headscaleTheme', val));

		// stores device sort preferences
		headscaleDeviceSortStore.set(localStorage.getItem('headscaleDeviceSort') || 'id');
		headscaleDeviceSortStore.subscribe((val) => localStorage.setItem('headscaleDeviceSort', val));
		headscaleDeviceSortDirectionStore.set(localStorage.getItem('headscaleDeviceSortDirection') || 'ascending');
		headscaleDeviceSortDirectionStore.subscribe((val) => localStorage.setItem('headscaleDeviceSortDirection', val));

		// stores user sort preferences
		headscaleUserSortStore.set(localStorage.getItem('headscaleUserSort') || 'id');
		headscaleUserSortStore.subscribe((val) => localStorage.setItem('headscaleUserSort', val));
		headscaleUserSortDirectionStore.set(localStorage.getItem('headscaleUserSortDirection') || 'ascending');
		headscaleUserSortDirectionStore.subscribe((val) => localStorage.setItem('headscaleUserSortDirection', val));

		// stores URL and API key
		headscaleURLStore.set(localStorage.getItem('headscaleURL') || '');
		headscaleURLStore.subscribe((val) => localStorage.setItem('headscaleURL', val));
		headscaleAPIKeyStore.set(localStorage.getItem('headscaleAPIKey') || '');
		headscaleAPIKeyStore.subscribe((val) => localStorage.setItem('headscaleAPIKey', val));

		// stores whether preauthkeys get hidden when expired/used
		preAuthHideStore.set((localStorage.getItem('headscalePreAuthHide') || 'false') == 'true');
		preAuthHideStore.subscribe((val) => localStorage.setItem('headscalePreAuthHide', val ? 'true' : 'false'));
		
	});
</script>
