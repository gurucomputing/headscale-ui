<script lang="ts">
	import { fade } from 'svelte/transition';
	import { alertStore } from '$lib/common/stores.js';
	import { headscaleURLStore } from '$lib/common/stores.js';
	import { headscaleAPIKeyStore } from '$lib/common/stores.js';
	import { getUsers } from '$lib/common/apiFunctions.svelte';
	import { headscaleUserStore } from '$lib/common/stores';

	// name for user creation
	let userName = '';
	// whether the new card html element is visible
	let newUserCardVisible = false;
	// The Form used for validating input
	let newUserForm: HTMLFormElement;

	function newUser(): void {
		let endpointURL = '/api/v1/namespace';
		if (newUserForm.reportValidity()) {
			fetch($headscaleURLStore + endpointURL, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${$headscaleAPIKeyStore}`
				},
				body: JSON.stringify({
					name: userName.toLowerCase()
				})
			})
				.then((response) => {
					if (response.ok) {
						response.json().then((data) => {
							getUsers()
								.then((users) => {
									$headscaleUserStore = users;
								})
								.catch((error) => {
									$alertStore = error;
								});
							newUserCardVisible = false;
							userName = '';
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
</script>

<!-- html -->
<div in:fade class="p-4"><button on:click={() => (newUserCardVisible = true)} class="btn btn-primary btn-sm capitalize" type="button">+ New User</button></div>
{#if newUserCardVisible}
	<div in:fade out:fade={{ duration: newUserCardVisible ? 0 : 500 }} class="card-pending">
		<form on:submit|preventDefault={newUser} class="relative" bind:this={newUserForm}>
			<!-- Input has to be lower case, but we will force lower case on submit -->
			<input bind:value={userName} class="card-input lowercase" required pattern="[a-zA-Z\-\.]+" placeholder="name" />
		</form>
		<div>
			<button on:click={() => newUser()}
				><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline rounded-full hover:bg-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
			<button
				on:click={() => {
					newUserCardVisible = false;
					userName = '';
				}}
				><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline rounded-full hover:bg-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
		</div>
	</div>
{/if}
