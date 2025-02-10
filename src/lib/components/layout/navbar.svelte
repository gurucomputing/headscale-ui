<!-- nav bar content here -->
<script lang="ts">
	import { appSettings } from '$lib/components/common/state.svelte';
</script>

<div class="flex-1">
	<button
		aria-label="open sidebar"
		onclick={() => {
			appSettings.sidebarDrawerOpen = true;
		}}
		class="btn-square btn-ghost mask drawer-button mask-squircle btn-sm lg:hidden"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="m-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
	</button>
	<div class="p-1"><h1 class="bold text-xl text-primary">{appSettings.navbarTitle}</h1></div>
</div>
