<!-- typescript -->
<script lang="ts">
	import { base } from '$app/paths';
	import { getUsers } from '$lib/common/apiFunctions.svelte';
	import { apiTestStore, userFilterStore, userStore } from '$lib/common/stores';
	import CreateUser from '$lib/users/CreateUser.svelte';
	import SearchUsers from '$lib/users/SearchUsers.svelte';
	import SortUsers from '$lib/users/SortUsers.svelte';
	import UserCard from '$lib/users/UserCard.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	//
	// Component Variables
	//
	// whether the new card html element is visible
	let newUserCardVisible = false;

	// let's the page know if it's ready to load
	let componentLoaded = false;

	// We define the meat of our script in onMount as doing so forces client side rendering.
	// Doing so also does not perform any actions until components are initialized
	onMount(async () => {
		// update user list
		getUsers();
		// load the page
		componentLoaded = true;
	});
</script>

<!-- html -->
{#if componentLoaded}
	<div in:fade>
		<div class="px-4 pt-4">
			<h1 class="text-2xl bold text-primary">User View</h1>
		</div>
		{#if $apiTestStore === 'succeeded'}
			<!-- instantiate user based components -->
			<table>
				<tr
					><td
						><!-- device creation visibility button -->
						<div class="p-4">
							{#if newUserCardVisible == false}
								<button on:click={() => (newUserCardVisible = true)} class="btn btn-primary btn-xs capitalize" type="button">+ New User</button>
							{:else}
								<button on:click={() => (newUserCardVisible = false)} class="btn btn-secondary btn-xs capitalize" type="button">- Hide New User</button>
							{/if}
						</div></td
					><td><SortUsers /></td><td><SearchUsers /></td></tr
				>
			</table>
			<CreateUser bind:newUserCardVisible />
			{#each $userStore as user}
			{#if $userFilterStore.includes(user)}
				<UserCard {user} />
			{/if}
			{/each}
		{/if}
		{#if $apiTestStore === 'failed'}
			<div in:fade class="max-w-lg  mx-auto p-4 border-4 text-sm text-base-content shadow-lg text-center">
				<p>API test did not succeed.<br />Headscale might be down or API settings may need to be set<br />change server settings in the <a href="{base}/settings.html" class="link link-primary">settings</a> page</p>
			</div>
		{/if}
	</div>
{/if}
