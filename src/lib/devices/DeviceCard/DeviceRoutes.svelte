<script lang="ts">
	import { getDeviceRoutes, modifyDeviceRoutes } from './DeviceRoutesAPI.svelte';
	import { Device, Route } from '$lib/common/classes';
	import { onMount } from 'svelte';
	import { alertStore } from '$lib/common/stores';

	export let device = new Device();
	let routesList: Route[] = [];
	let routeID = 0;

	onMount(async () => {
		getDeviceRoutesAction();
	});

	function getDeviceRoutesAction() {
		getDeviceRoutes(device.id)
			.then((routes) => {
				routesList = routes;
			})
			.catch((error) => {
				$alertStore = error;
			});
	}

	function modifyDeviceRoutesAction() {
		modifyDeviceRoutes(device.id, routesList, routeID)
			.then((response) => {
				getDeviceRoutesAction();
			})
			.catch((error) => {
				$alertStore = error;
			});
	}
</script>

<th>Device Routes</th>
<td
	><ul class="list-disc list-inside">
		{#each routesList as route, index}
			<li>
				{route.prefix}
				{#if route.enabled}
					<button
						on:click={() => {
							routesList[index].enabled = false;
							routeID = route.id;
							modifyDeviceRoutesAction();
						}}
						type="button"
						class="btn btn-xs tooltip capitalize bg-success text-success-content mx-1"
						data-tip="press to disable route">active</button
					>
				{:else}
					<button
						on:click={() => {
							routesList[index].enabled = true;
							routeID = route.id
							modifyDeviceRoutesAction();
						}}
						type="button"
						class="btn btn-xs tooltip capitalize bg-secondary text-secondary-content mx-1"
						data-tip="press to enable route">pending</button
					>
				{/if}
			</li>
		{/each}
	</ul></td
>
