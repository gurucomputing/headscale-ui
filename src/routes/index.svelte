<!-- typescript -->
<script lang="ts">
	import CreateUser from '$lib/index/CreateUser.svelte';
	import UserCard from '$lib/index/UserCard.svelte';
	import { headscaleUserStore, apiTestStore } from '$lib/common/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { getUsers } from '$lib/common/apiFunctions.svelte';

	//
	// Component Variables
	//

	// let's the page know if it's ready to load
	let componentLoaded = false;

	// We define the meat of our script in onMount as doing so forces client side rendering.
	// Doing so also does not perform any actions until components are initialized
	onMount(async () => {
		// update user list
		getUsers()
			.then((users) => {
				$headscaleUserStore = users;
				$apiTestStore = 'succeeded';
			})
			.catch(() => {
				$apiTestStore = 'failed';
			});
		// load the page
		componentLoaded = true;
	});
</script>

<!-- html -->
{#if componentLoaded}
	<div in:fade class="px-4 pt-4">
		<h1 class="text-2xl bold text-primary">User View</h1>
	</div>
	{#if $apiTestStore === 'succeeded'}
		<!-- instantiate user based components -->
		<CreateUser />
		{#each $headscaleUserStore as user}
			<UserCard {user} />
		{/each}
	{/if}
	{#if $apiTestStore === 'failed'}
		<div in:fade class="max-w-lg  mx-auto p-4 border-4 text-sm text-base-content shadow-lg text-center">
			<p>API test did not succeed.<br />Headscale might be down or API settings may need to be set<br />change server settings in the <a href="/settings.html" class="link link-primary">settings</a> page</p>
		</div>
	{/if}
{/if}
