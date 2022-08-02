<!-- typescript -->
<script lang="ts">
	import { base } from '$app/paths';
	import { getDevices, getUsers } from '$lib/common/apiFunctions.svelte';
	import { apiTestStore, deviceFilterStore, deviceStore } from '$lib/common/stores.js';
	import CreateDevice from '$lib/devices/CreateDevice.svelte';
	import DeviceCard from '$lib/devices/DeviceCard.svelte';
	import SearchDevices from '$lib/devices/SearchDevices.svelte';
	import SortDevices from '$lib/devices/SortDevices.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let newDeviceCardVisible = false;

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
		// attempt to pull list of devices
		getDevices();
		// load the page
		componentLoaded = true;
	});
</script>

<!-- html -->
{#if componentLoaded}
	<div in:fade>
		<div in:fade class="px-4 pt-4">
			<h1 class="text-2xl bold text-primary">Device View</h1>
		</div>
		{#if $apiTestStore === 'succeeded'}
			<!-- instantiate device based components -->
			<table>
				<tr
					><td
						><!-- device creation visibility button -->
						<div class="p-4">
							{#if newDeviceCardVisible == false}
								<button on:click={() => (newDeviceCardVisible = true)} class="btn btn-primary btn-xs capitalize" type="button">+ New Device</button>
							{:else}
								<button on:click={() => (newDeviceCardVisible = false)} class="btn btn-secondary btn-xs capitalize" type="button">- Hide New Device</button>
							{/if}
						</div></td
					><td><SortDevices /></td><td><SearchDevices /></td></tr
				>
			</table>

			<CreateDevice bind:newDeviceCardVisible />

			{#each $deviceStore as device}
				{#if $deviceFilterStore.includes(device)}
					<DeviceCard {device} />
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
