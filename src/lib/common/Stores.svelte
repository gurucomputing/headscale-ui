<script>
	import { onMount } from 'svelte';
	import { deviceSortStore, deviceSortDirectionStore, userSortStore, sortDirectionStore, themeStore, showACLPagesStore} from '$lib/common/stores.js';
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
		URLStore.set(localStorage.getItem('headscaleURL') || (await (await fetch('http://localhost:20000/api/url', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})).json()).url || '');
		// remove trailing slashes when storing the URL
		URLStore.subscribe(async (val) => { var replaceVal = val.replace(/\/+$/, '');
			localStorage.setItem('headscaleURL', replaceVal);
			const response = await fetch('http://localhost:20000/api/url', {
				method: 'POST',
				body: JSON.stringify({ "url": replaceVal }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
		});
		APIKeyStore.set(localStorage.getItem('headscaleAPIKey') || (await (await fetch('http://localhost:20000/api/apikey', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})).json()).apikey || '');
		APIKeyStore.subscribe(async (val) => {localStorage.setItem('headscaleAPIKey', val);
		const response = await fetch('http://localhost:20000/api/apikey', {
			method: 'POST',
			body: JSON.stringify({ "apikey": val }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	});

		// stores whether preauthkeys get hidden when expired/used
		preAuthHideStore.set((localStorage.getItem('headscalePreAuthHide') || 'false') == 'true');
		preAuthHideStore.subscribe((val) => localStorage.setItem('headscalePreAuthHide', val ? 'true' : 'false'));

		// dev setting stores
		showACLPagesStore.set((localStorage.getItem('showACLPages') || 'false') == 'true');
		showACLPagesStore.subscribe((val) => localStorage.setItem('showACLPages', val ? 'true' : 'false'));

	});
</script>
