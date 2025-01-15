<script lang="ts">
	import { appSettings, persistentAppSettings } from '$lib/state.svelte';
	import Svelecte from 'svelecte';

	appSettings.navbarTitle = 'Settings';
	appSettings.sidebarDrawerOpen = false;
</script>

<div class="max-w-96">
	<h1 class="mb-4 text-primary">Application Theme</h1>
	<Svelecte name="daisyUITheme" options={['hsui', 'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset']} bind:value={persistentAppSettings.daisyUITheme} />
</div>
