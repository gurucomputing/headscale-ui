<script lang="ts">
	import ServerSettings from '$lib/components/settings/server-settings.svelte';
	import ThemeSettings from '$lib/components/settings/theme-settings.svelte';
	import { appSettings } from '$lib/state.svelte';

	appSettings.navbarTitle = 'Settings';
	appSettings.sidebarDrawerOpen = false;
</script>

<div class="max-w-full lg:max-w-96">
	<ServerSettings></ServerSettings>
	<ThemeSettings></ThemeSettings>
</div>
