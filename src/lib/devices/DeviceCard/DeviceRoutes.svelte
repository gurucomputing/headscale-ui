<script lang="ts">
	import { modifyDeviceRoutes } from './DeviceRoutes/DeviceRouteAPI.svelte';
	import { Device } from '$lib/common/classes';
	import DeviceRoute from './DeviceRoutes/DeviceRoute.svelte';
	import { getDevices } from '$lib/common/apiFunctions.svelte';
	import { alertStore } from '$lib/common/stores';

	export let device = new Device();


</script>

<th>Device Routes</th>
<td
	><ul class="list-disc list-inside">
		{#each device.availableRoutes as route}
			<li>
				<DeviceRoute {route} {device}></DeviceRoute>
			</li>
		{/each}
	</ul></td
>
