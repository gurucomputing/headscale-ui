<script lang="ts">
	import { themeStore } from '$lib/common/stores.js'
	let themes = ['hsui', 'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter'];
</script>

<h1 class="text-2xl bold text-primary mb-4">Theme Settings</h1>
<select bind:value={$themeStore} class="select select-bordered w-full select-sm max-w-xs">
	{#each themes as localTheme}
		<option value={localTheme}>{localTheme}</option>
	{/each}
</select>
