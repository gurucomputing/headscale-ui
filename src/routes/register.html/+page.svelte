<!-- typescript -->
<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { getUsers } from '$lib/common/apiFunctions.svelte';
	import { apiTestStore } from '$lib/common/stores.js';
	import CreateDevice from '$lib/devices/CreateDevice.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let newDeviceKey = $page.url.searchParams.get('nodekey') as string|undefined

	let newDeviceCardVisible = true;

	let newDeviceRedirect = `${base}/devices.html`;

	//
	// Component Variables
	//

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
	<div in:fade|global>
		<div in:fade|global class="px-4 pt-4">
			<h1 class="text-2xl bold text-primary">Register Device</h1>
		</div>
		{#if $apiTestStore === 'succeeded'}

			<CreateDevice bind:newDeviceCardVisible bind:newDeviceKey bind:newDeviceRedirect />

		{/if}
		{#if $apiTestStore === 'failed'}
			<div in:fade|global class="max-w-lg  mx-auto p-4 border-4 text-sm text-base-content shadow-lg text-center">
				<p>API test did not succeed.<br />Headscale might be down or API settings may need to be set<br />change server settings in the <a href="{base}/settings.html" class="link link-primary">settings</a> page</p>
			</div>
		{/if}
	</div>
{/if}
