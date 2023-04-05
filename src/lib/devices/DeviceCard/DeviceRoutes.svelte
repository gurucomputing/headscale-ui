<script lang="ts">
	import { deleteDeviceRoute, getDeviceRoutes, modifyDeviceRoutes } from './DeviceRoutesAPI.svelte';
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

	function deleteDeviceRouteAction() {
		deleteDeviceRoute(routeID)
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
			<div style="margin-left: -12px;">
				<button
					on:click|stopPropagation={() => {
						routeID = route.id;
						deleteDeviceRouteAction();
					}}
					class="ml-1"
					><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</button>
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
							routeID = route.id;
							modifyDeviceRoutesAction();
						}}
						type="button"
						class="btn btn-xs tooltip capitalize bg-secondary text-secondary-content mx-1"
						data-tip="press to enable route">pending</button
					>
				{/if}
			</div>
		{/each}
	</ul></td
>
