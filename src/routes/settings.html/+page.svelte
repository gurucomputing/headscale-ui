<script lang="ts">
	import { appSettings } from '$lib/components/common/state.svelte';
	import ServerSettings from '$lib/components/settings/server-settings.svelte';
	import ThemeSettings from '$lib/components/settings/theme-settings.svelte';

	appSettings.navbarTitle = 'Settings';
	appSettings.sidebarDrawerOpen = false;
</script>

<div class="max-w-128">
	<ServerSettings></ServerSettings>
	<ThemeSettings></ThemeSettings>
</div>
