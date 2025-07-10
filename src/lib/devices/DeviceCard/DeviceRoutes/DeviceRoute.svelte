<script>
	import { getDevices } from '$lib/common/apiFunctions.svelte';
	import { Device } from '$lib/common/classes';
	import { alertStore } from '$lib/common/stores';
	import { approveDeviceRoute } from './DeviceRouteAPI.svelte';

	export let route = '';
	export let device = new Device();

	let routeDisabled = false;
	function approveRouteAction() {
		approveDeviceRoute(device.id, [...device.approvedRoutes, route])
			.then(() => {
				// refresh users after editing
				getDevices();
			})
			.catch((error) => {
				$alertStore = error;
			});
	}

	function removeRouteAction() {
		approveDeviceRoute(device.id, device.approvedRoutes.filter((r) => r !== route))
			.then(() => {
				// refresh users after editing
				getDevices();
			})
			.catch((error) => {
				$alertStore = error;
			});
	}
</script>

{route}
{#if device.approvedRoutes.includes(route)}
	<button
		on:click={() => {
			routeDisabled = true;
			removeRouteAction();
			routeDisabled = false;
		}}
		type="button"
		class="btn btn-xs tooltip capitalize bg-success text-success-content mx-1">active</button
	>
{:else}
	<button
		on:click={() => {
			routeDisabled = true;
			approveRouteAction();
			routeDisabled = false;
		}}
		type="button"
		class="btn btn-xs tooltip capitalize bg-secondary text-secondary-content mx-1"
		class:disabled={routeDisabled}
		data-tip="click to enable route">pending</button
	>
{/if}
{#if device.subnetRoutes.includes(route)}
	<button type="button" class="btn btn-xs tooltip capitalize bg-secondary text-secondary-content mx-1">subnet</button>
{/if}
