<script lang="ts">
	import { appSettings } from '$lib/components/common/state.svelte';
	import ThemeSettings from '$lib/components/settings/theme-settings.svelte';
	import { onMount } from 'svelte';

	let pageStatus = $state('none');

	onMount(() => {
		appSettings.navbarTitle = 'Settings';
		appSettings.sidebarDrawerOpen = false;
		pageStatus = 'loaded';
	});

	appSettings.navbarTitle = 'Settings';
	appSettings.sidebarDrawerOpen = false;
</script>

<div class="max-w-128">
	<!-- <ServerSettings></ServerSettings> -->
	<ThemeSettings></ThemeSettings>
</div>
