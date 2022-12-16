<script lang="ts">
	import { Device } from '$lib/common/classes';
	import { slide } from 'svelte/transition';
	import DeviceRoutes from './DeviceCard/DeviceRoutes.svelte';
	import DeviceTags from './DeviceCard/DeviceTags.svelte';
	import MoveDevice from './DeviceCard/MoveDevice.svelte';
	import RemoveDevice from './DeviceCard/RemoveDevice.svelte';
	import RenameDevice from './DeviceCard/RenameDevice.svelte';

	export let device = new Device();
	let cardExpanded = false;
	let cardEditing = false;

	// returns button colour based on time difference
	function timeDifference(date: Date) {
		let currentTime = new Date();
		let timeDifference = Math.round((currentTime.getTime() - date.getTime()) / 1000);
		if (timeDifference < 3600) {
			return 'bg-success';
		} else if (timeDifference < 86400) {
			return 'bg-warning';
		}
	}

	// returns time last seen in human readable format
	function timeSince(date: Date) {
		let currentTime = new Date();
		// gets time difference in seconds
		let timeDifference = Math.round((currentTime.getTime() - date.getTime()) / 1000);
		let timeUnit = '';

		if (timeDifference < 60) {
			timeUnit = 'seconds';
		} else if (timeDifference < 3600) {
			timeDifference = Math.floor(timeDifference / 60);
			if (timeDifference == 1) {
				timeUnit = 'minute';
			} else {
				timeUnit = 'minutes';
			}
		} else if (timeDifference < 86400) {
			timeDifference = Math.floor(timeDifference / (60 * 60));
			if (timeDifference == 1) {
				timeUnit = 'hour';
			} else {
				timeUnit = 'hours';
			}
		} else {
			timeDifference = Math.floor(timeDifference / (60 * 60 * 24));
			if (timeDifference == 1) {
				timeUnit = 'day';
			} else {
				timeUnit = 'days';
			}
		}
		return `Last seen ${timeDifference} ${timeUnit} ago`;
	}
</script>

<div class="card-primary">
	<div on:keypress on:click={() => (cardExpanded = !cardExpanded)} class="flex">
		<span class="min-w-64 w-1/2 font-bold">
			{#if cardEditing == false}
				<span class="badge badge-xs tooltip {timeDifference(new Date(device.lastSeen))}" data-tip={timeSince(new Date(device.lastSeen))} /> {device.id}: {device.givenName}
			{/if}
			<RenameDevice bind:cardEditing {device} />
		</span>
		<div class="grow w-full"><DeviceTags {device} /></div>
		<div class="grow min-w-fit">
			<RemoveDevice {device} />
			<button type="button">
				{#if !cardExpanded}
					<!-- Icon: chevron down -->
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				{:else}
					<!-- Icon: chevron up -->
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
					</svg>
				{/if}
			</button>
		</div>
	</div>
	{#if cardExpanded}
		<!-- we put a conditional on the outro transition so page changes do not trigger the animation -->
		<div in:slide out:slide={{ duration: cardExpanded ? 0 : 500 }} class="pt-2 pl-2">
			<div class="overflow-x-auto">
				<table class="table table-compact w-full">
					<tbody>
						<tr>
							<th>Device Last Seen</th>
							<td>{new Date(device.lastSeen)}</td>
						</tr>
						<tr>
							<th>IP Addresses</th>
							<td>
								<ul class="list-disc list-inside">
									{#each device.ipAddresses as address}
										<li>{address}</li>
									{/each}
								</ul>
							</td>
						</tr>
						<tr>
							<th>Assigned User</th>
							<MoveDevice {device} />
						</tr>
						<tr>
							<th>Device Name</th>
							<td>{device.name}</td>
						</tr>
						<tr>
							<DeviceRoutes {device} />
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
