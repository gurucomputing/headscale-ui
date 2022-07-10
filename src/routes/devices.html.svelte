<!-- typescript -->
<script lang="ts">
	import DeviceCard from '$lib/devices/DeviceCard.svelte';
	import CreateDevice from '$lib/devices/CreateDevice.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	//
	// Component Variables
	//

	// let's the page know if it's ready to load
	let componentLoaded = false;

	// page state variables
	let headscaleAPITest = 'untested';

	// endpoint url for getting users
	let endpointURL = '/api/v1/machine';

	let headscaleDevices = [{ id: '', name: '', lastSeen: '', ipAddresses: [''] }];

	// We define the meat of our script in onMount as doing so forces client side rendering.
	// Doing so also does not perform any actions until components are initialized
	onMount(async () => {
		// attempt to pull list of users
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';
		fetch(headscaleURL + endpointURL, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${headscaleAPIKey}`
			}
		})
			.then((response) => {
				if (response.ok) {
					headscaleAPITest = 'succeeded';
					// return the api data
					response.json().then((data) => {
						headscaleDevices = data.machines;
						console.log(headscaleDevices);
					});
				} else {
					headscaleAPITest = 'failed';
				}
			})
			.catch((error) => {
				headscaleAPITest = 'failed';
			});

		// load the page
		componentLoaded = true;
	});
</script>

<!-- html -->
{#if componentLoaded}
	<div in:fade class="px-4 pt-4">
		<h1 class="text-2xl bold text-primary">Device View</h1>
	</div>
	{#if headscaleAPITest === 'succeeded'}
		<!-- instantiate device based components -->
		<CreateDevice/>
		{#each headscaleDevices as device}
			<DeviceCard device={device} />
		{/each}
	{/if}
	{#if headscaleAPITest === 'failed'}
		<div in:fade class="max-w-lg  mx-auto p-4 border-4 text-sm text-gray-600 shadow-lg text-center">
			<p>API test did not succeed.<br />Headscale might be down or API settings may need to be set<br />change server settings in the <a href="/settings.html" class="hyperlink">settings</a> page</p>
		</div>
	{/if}
{/if}
