<script lang="ts">
	import Svelecte from 'svelecte';
	import {persistentAppSettings } from '$lib/components/common/state.svelte';
	let themeOptions = ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset'];
</script>

<h1 class="bold mb-4 mt-4 text-xl text-primary">Application Theme</h1>
<Svelecte name="daisyUITheme" options={themeOptions} bind:value={persistentAppSettings.daisyUITheme} />