<script lang="ts">
	import { showACLPagesStore } from '$lib/common/stores';
	import { fade } from 'svelte/transition';

	let showDevSettings = false;
</script>

<div class="inline-block"><h1 class="text-2xl bold text-primary mb-4">Developer Flags<input type="checkbox" class="toggle toggle-sm tooltip ml-2 align-middle" data-tip="To enable development features. Only check this if you're a developer or like being confused" bind:checked={showDevSettings} /></h1></div>
{#if showDevSettings}
	<div in:fade>
    <h2 class="text-xl bold text-secondary mb-2 ml-2">ACL Pages <input bind:checked={$showACLPagesStore} type="checkbox" class="toggle toggle-sm ml-2 align-middle" /></h2>
  </div>
{/if}
