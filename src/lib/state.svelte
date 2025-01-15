<script module lang="ts">
	import { AppSettingsObject, PersistentAppSettingsObject } from './classes.svelte';

	// defines global state objects for the application
	var appSettingsInitializer = new AppSettingsObject();
	export let appSettings = $state(Object.assign({}, appSettingsInitializer));
	
	// defines global state objects that get written to localStorage for persistence
	var persistentAppSettingsInitializer = new PersistentAppSettingsObject();
	export let persistentAppSettings = $state(Object.assign({}, persistentAppSettingsInitializer));
</script>
