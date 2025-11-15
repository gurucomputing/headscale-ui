<script lang="ts">
	import { appSettings } from '$lib/components/common/state.svelte';
	import ServerSettings from '$lib/components/settings/server-settings.svelte';
	import ThemeSettings from '$lib/components/settings/theme-settings.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	let pageStatus = $state('none');

	onMount(() => {
		if (!appSettings.pb.authStore.isValid) {
			goto(resolve('/login.html'));
		} else {
			appSettings.navbarTitle = 'Settings';
			appSettings.sidebarDrawerOpen = false;
			pageStatus = 'loaded';
		}
	});

	appSettings.navbarTitle = 'Settings';
	appSettings.sidebarDrawerOpen = false;
</script>

<div class="max-w-128">
	<ServerSettings></ServerSettings>
	<ThemeSettings></ThemeSettings>
</div>
