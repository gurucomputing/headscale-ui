<script lang="ts">
	import { appSettings } from '$lib/components/common/state.svelte';
	import UserCards from '$lib/components/users/user-cards.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	let pageStatus = $state('none');

	onMount(() => {
		appSettings.navbarTitle = 'Users';
		appSettings.sidebarDrawerOpen = false;
		if (!appSettings.pb.authStore.isValid) {
			goto(resolve('/login.html'));
		} else {
			pageStatus = 'loaded';
		}
	});
</script>

{#if pageStatus == 'loaded'}
	<UserCards></UserCards>
{/if}