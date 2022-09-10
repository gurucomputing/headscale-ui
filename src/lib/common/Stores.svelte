<script>
	import { onMount } from 'svelte';
	import { deviceSortStore, deviceSortDirectionStore, userSortStore, sortDirectionStore, themeStore, showACLPagesStore } from '$lib/common/stores.js';
	import { URLStore } from '$lib/common/stores.js';
	import { APIKeyStore } from '$lib/common/stores.js';
	import { preAuthHideStore } from '$lib/common/stores.js';

	onMount(async () => {
		// stores headscale theme
		themeStore.set(localStorage.getItem('headscaleTheme') || 'hsui');
		themeStore.subscribe((val) => localStorage.setItem('headscaleTheme', val));

		// stores device sort preferences
		deviceSortStore.set(localStorage.getItem('headscaleDeviceSort') || 'id');
		deviceSortStore.subscribe((val) => localStorage.setItem('headscaleDeviceSort', val));
		deviceSortDirectionStore.set(localStorage.getItem('headscaleDeviceSortDirection') || 'ascending');
		deviceSortDirectionStore.subscribe((val) => localStorage.setItem('headscaleDeviceSortDirection', val));

		// stores user sort preferences
		userSortStore.set(localStorage.getItem('headscaleUserSort') || 'id');
		userSortStore.subscribe((val) => localStorage.setItem('headscaleUserSort', val));
		sortDirectionStore.set(localStorage.getItem('headscaleUserSortDirection') || 'ascending');
		sortDirectionStore.subscribe((val) => localStorage.setItem('headscaleUserSortDirection', val));

		// stores URL and API key
		URLStore.set(localStorage.getItem('headscaleURL') || '');
		// remove trailing slashes when storing the URL
		URLStore.subscribe((val) => localStorage.setItem('headscaleURL', val.replace(/\/+$/, '')));
		APIKeyStore.set(localStorage.getItem('headscaleAPIKey') || '');
		APIKeyStore.subscribe((val) => localStorage.setItem('headscaleAPIKey', val));

		// stores whether preauthkeys get hidden when expired/used
		preAuthHideStore.set((localStorage.getItem('headscalePreAuthHide') || 'false') == 'true');
		preAuthHideStore.subscribe((val) => localStorage.setItem('headscalePreAuthHide', val ? 'true' : 'false'));
		
		// dev setting stores
		showACLPagesStore.set((localStorage.getItem('showACLPages') || 'false') == 'true');
		showACLPagesStore.subscribe((val) => localStorage.setItem('showACLPages', val ? 'true' : 'false'));
		
	});
</script>
