<script lang="ts">
	import { fade } from 'svelte/transition';
	import { alert } from '$lib/common/stores.js';

	// name for user creation
	let userName = '';
	// whether the new card html element is visible
	let newUserCardVisible = false;
	// The Form used for validating input
	let newUserForm: HTMLFormElement;
	// function for refreshing users from parent
	export let refreshUsers = () => {}

	
	function createUser(): void {
		let headscaleURL = localStorage.getItem('headscaleURL') || '';
		let headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';
		let endpointURL = '/api/v1/namespace';
		if (newUserForm.reportValidity()) {
			fetch(headscaleURL + endpointURL, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${headscaleAPIKey}`
				},
				body: JSON.stringify({
					name: userName.toLowerCase()
				})
			})
				.then((response) => {
					if (response.ok) {
						response.json().then((data) => {
							refreshUsers();
							newUserCardVisible = false;
							userName = '';
						});
					} else {
						response.json().then((data) => {
							$alert = data.message;
						});
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			$alert = "Use lower case letters, periods, or dashes only"
		}
	}
</script>

<!-- html -->
<div in:fade class="p-4"><button on:click={() => (newUserCardVisible = true)} class="btn-primary bg-teal-700 hover:bg-teal-900 " type="button">+ New User</button></div>
{#if newUserCardVisible}
	<div in:fade out:fade={{ duration: newUserCardVisible ? 0 : 500 }} class="card-pending">
		<form class="relative" bind:this={newUserForm}>
			<!-- Input has to be lower case, but we will force lower case on submit -->
			<input bind:value={userName} class="card-input lowercase" required pattern="[a-zA-Z\-\.]+" placeholder="name" />
		</form>
		<div>
			<button on:click={() => createUser()}
				><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline rounded-full hover:bg-gray-300" fill="none" viewBox="0 0 24 24" stroke="black" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
			<button on:click={() => {newUserCardVisible = false; userName = ''}}
				><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline rounded-full hover:bg-gray-300" fill="none" viewBox="0 0 24 24" stroke="black" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
		</div>
	</div>
{/if}
