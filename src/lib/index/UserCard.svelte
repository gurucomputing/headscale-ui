<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { headscaleURLStore } from '$lib/common/stores.js';
	import { headscaleAPIKeyStore } from '$lib/common/stores.js';
	import { alertStore } from '$lib/common/stores.js';

	// function for refreshing users from parent
	export let getUsers = () => {};
	export let user = { id: '', name: '', createdAt: '' };
	let cardExpanded = false;
	let cardEditing = false;
	let cardDeleting = false;
	let editUserForm: HTMLFormElement;
	let userName = '';

	function editingUser() {
		// cardExpanded = true;
		cardEditing = true;
		userName = user.name;
	}

	function editUser() {
		let endpointURL = '/api/v1/namespace/' + user.name + '/rename/' + userName;

		if (editUserForm.reportValidity()) {
			fetch($headscaleURLStore + endpointURL, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${$headscaleAPIKeyStore}`
				}
			})
				.then((response) => {
					if (response.ok) {
						response.json().then((data) => {
							getUsers();
							cardEditing = false;
						});
					} else {
						response.json().then((data) => {
							$alertStore = data.message;
						});
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			$alertStore = 'Use lower case letters, periods, or dashes only';
		}
	}

	function removeUser() {
		let endpointURL = '/api/v1/namespace/' + user.name;
		fetch($headscaleURLStore + endpointURL, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${$headscaleAPIKeyStore}`
			}
		})
			.then((response) => {
				if (response.ok) {
					response.json().then((data) => {
						cardDeleting = false;
						getUsers();
					});
				} else {
					response.json().then((data) => {
						$alertStore = data.message;
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
</script>

<div in:fade class="card-primary">
	<div on:click={() => (cardExpanded = !cardExpanded)} class="flex justify-between">
		{#if !cardEditing}
			<span class="font-bold">{user.id}: {user.name}</span>
		{:else}
			<form bind:this={editUserForm} on:submit|preventDefault={editUser}>
				<!-- Input has to be lower case, but we will force lower case on submit -->
				<input on:click|stopPropagation bind:value={userName} class="card-input mb-1 lowercase" required pattern="[a-zA-Z\-\.]+" placeholder="name" />
			</form>
		{/if}
		<div>
			{#if !cardDeleting}
				{#if !cardEditing}
					<!-- edit symbol -->
					<button on:click|stopPropagation={() => editingUser()} class="mr-4"
						><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
						</svg></button
					>
				{:else}
					<!-- edit accept symbol -->
					<button in:fade on:click|stopPropagation={editUser} class="mr-4"
						><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg></button
					>
					<!-- edit cancel symbol -->
					<button in:fade on:click|stopPropagation={() => (cardEditing = false)} class="mr-4"
						><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
						</svg></button
					>
				{/if}
			{/if}

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
				<button in:fade on:click|stopPropagation={() => removeUser()}
					><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg></button
				>
				<span in:fade class="font-bold text-red-400">or Cancel </span>
				<!-- Delete cancel symbol -->
				<button in:fade on:click|stopPropagation={() => (cardDeleting = false)} class="mr-4"
					><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
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
			<span class="font-bold">User Created: </span><span class="font-normal">{new Date(user.createdAt)}</span>
		</div>
	{/if}
</div>
