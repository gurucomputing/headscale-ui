<script module lang="ts">
	import { AppSettingsObject, PersistentAppSettingsObject } from './classes.svelte';

	// defines global state objects for the application
	export let appSettings = $state({
		navbarTitle: '',
		appLoaded: false,
		sidebarDrawerOpen: false,
		toastAlerts: []
	} as AppSettingsObject);

	// defines global state objects that get written to localStorage for persistence
	export let persistentAppSettings = $state({
		daisyUITheme: ''
	} as PersistentAppSettingsObject);
</script>
