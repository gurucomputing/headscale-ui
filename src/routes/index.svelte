<!-- typescript -->
<script lang="ts">
	import { base } from '$app/paths';
	import { fade } from 'svelte/transition';
	import { getUsers } from '$lib/common/apiFunctions.svelte';
	import { headscaleUserStore, apiTestStore } from '$lib/common/stores';
	import { onMount } from 'svelte';
	import CreateUser from '$lib/index/CreateUser.svelte';
	import SortUsers from '$lib/index/SortUsers.svelte';
	import UserCard from '$lib/index/UserCard.svelte';

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
	<div in:fade class="px-4 pt-4">
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
				><td><SortUsers /></td></tr
			>
		</table>
		<CreateUser bind:newUserCardVisible />
		{#each $headscaleUserStore as user}
			<UserCard {user} />
		{/each}
	{/if}
	{#if $apiTestStore === 'failed'}
		<div in:fade class="max-w-lg  mx-auto p-4 border-4 text-sm text-base-content shadow-lg text-center">
			<p>API test did not succeed.<br />Headscale might be down or API settings may need to be set<br />change server settings in the <a href="{base}/settings.html" class="link link-primary">settings</a> page</p>
		</div>
	{/if}
{/if}
