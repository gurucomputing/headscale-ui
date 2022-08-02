<script>
	import { fade } from 'svelte/transition';
	import { Device } from '$lib/common/classes';
	import { userStore, alertStore } from '$lib/common/stores';
	import { moveDevice, getDevices } from '$lib/common/apiFunctions.svelte';

	export let device = new Device();
	let deviceMoving = false;
	let selectedUser = device.namespace.name;

	function moveDeviceAction() {
		moveDevice(device.id, selectedUser)
			.then((response) => {
				deviceMoving = false;
				// refresh devices after editing
				getDevices();
			})
			.catch((error) => {
				$alertStore = error;
			});
	}
</script>

<td>
	{#if !deviceMoving}
		{device.namespace.name}
		<!-- edit symbol -->
		<button
			on:click={() => {
				deviceMoving = true;
			}}
			type="button"
			class="ml-2"
			><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
			</svg></button
		>
	{:else}
		<form on:submit|preventDefault={moveDeviceAction}>
			<select class="card-select mr-3" required bind:value={selectedUser}>
				{#each $userStore as user}
					<option>{user.name}</option>
				{/each}
			</select>
			<!-- edit accept symbol -->
			<button in:fade class=""
				><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
			<!-- edit cancel symbol -->
			<button type="button" in:fade on:click|stopPropagation={() => (deviceMoving = false)}
				><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
		</form>
	{/if}
</td>
