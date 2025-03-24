<script lang="ts">
	import Svelecte from 'svelecte';
	import { persistentAppSettings } from '$lib/components/common/state.svelte';
	let themeOptions = ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset'];
</script>

<h1 class="bold text-primary mt-4 mb-4 text-xl">Application Theme</h1>
<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs min-w-full border p-4">
	<legend class="fieldset-legend">Theme Selector</legend>
	<Svelecte name="daisyUITheme" options={themeOptions} bind:value={persistentAppSettings.daisyUITheme} />
</fieldset>
