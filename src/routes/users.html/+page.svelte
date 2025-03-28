<script lang="ts">
	import { appSettings } from '$lib/components/common/state.svelte';
	import UserCards from '$lib/components/users/user-cards.svelte';

	appSettings.navbarTitle = 'Users';
	appSettings.sidebarDrawerOpen = false;
</script>

{#if appSettings.apiTested}
	<UserCards></UserCards>
{/if}