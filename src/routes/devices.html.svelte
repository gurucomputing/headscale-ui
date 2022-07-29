<!-- typescript -->
<script lang="ts">
	import DeviceCard from '$lib/devices/DeviceCard.svelte';
	import CreateDevice from '$lib/devices/CreateDevice.svelte';
	import SortDevices from '$lib/devices/SortDevices.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { apiTestStore, headscaleUserStore, headscaleDeviceStore } from '$lib/common/stores.js';
	import { getUsers, getDevices } from '$lib/common/apiFunctions.svelte';
	import { base } from '$app/paths';

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
		// attempt to pull list of devices
		getDevices()
			.then((devices) => {
				$headscaleDeviceStore = devices;
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
	<div in:fade>
		<div in:fade class="px-4 pt-4">
			<h1 class="text-2xl bold text-primary">Device View</h1>
		</div>
		{#if $apiTestStore === 'succeeded'}
			<!-- instantiate device based components -->
			<table><tr><td><CreateDevice /></td><td><SortDevices /></td></tr></table>
			{#each $headscaleDeviceStore as device}
				<DeviceCard {device} />
			{/each}
		{/if}
		{#if $apiTestStore === 'failed'}
			<div in:fade class="max-w-lg  mx-auto p-4 border-4 text-sm text-base-content shadow-lg text-center">
				<p>API test did not succeed.<br />Headscale might be down or API settings may need to be set<br />change server settings in the <a href="{base}/settings.html" class="link link-primary">settings</a> page</p>
			</div>
		{/if}
	</div>
{/if}
