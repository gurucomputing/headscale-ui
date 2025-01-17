<script lang="ts">
    import { persistentAppSettings } from '$lib/state.svelte';
	import Svelecte from 'svelecte';
</script>

<h1 class="bold mb-4 mt-4 text-xl text-primary">Application Theme</h1>
	<Svelecte name="daisyUITheme" options={['hsui', 'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset']} bind:value={persistentAppSettings.daisyUITheme} />