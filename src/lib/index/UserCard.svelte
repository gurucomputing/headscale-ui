<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { headscaleUserStore, alertStore } from '$lib/common/stores.js';
	import { getUsers, removeUser } from '$lib/common/apiFunctions.svelte';
	import EditUser from '$lib/index/EditUser.svelte';
	import { User } from '$lib/common/classes';

	// function for refreshing users from parent
	export let user = new User();
	let cardExpanded = false;
	let cardDeleting = false;

	function removeUserAction() {
		removeUser(user.name)
			.then((response) => {
				cardDeleting = false;
				// refresh users after editing
				getUsers()
					.then((users) => {
						$headscaleUserStore = users;
					})
					.catch((error) => {
						$alertStore = error;
					});
			})
			.catch((error) => {
				$alertStore = error;
			});
	}
</script>

<div in:fade class="card-primary">
	<div on:click={() => (cardExpanded = !cardExpanded)} class="flex justify-between">
		<div>
			<EditUser {user} />
		</div>
		<div>
		{#if !cardDeleting}
			<!-- Delete trash symbol -->
			<button on:click|stopPropagation={() => (cardDeleting = true)} class="mr-4"
				><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg></button
			>
		{:else}
			<!-- Delete Warning -->
			<span in:fade class="font-bold text-red-400">Deleting {user.name}. Confirm </span>
			<!-- Delete confirm symbol -->
			<button in:fade on:click|stopPropagation={() => removeUserAction()}
				><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
			<span in:fade class="font-bold text-red-400">or Cancel </span>
			<!-- Delete cancel symbol -->
			<button in:fade on:click|stopPropagation={() => (cardDeleting = false)} class="mr-4"
				><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
		{/if}
		<!-- chevron for expanding -->
		<button>
			{#if !cardExpanded}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			{:else}
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
							<th>User Creation Date</th>
							<td>{new Date(user.createdAt)}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
