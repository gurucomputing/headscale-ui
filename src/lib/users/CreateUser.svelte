<script lang="ts">
	import { fade } from 'svelte/transition';
	import { alertStore } from '$lib/common/stores.js';
	import { getUsers, newUser } from '$lib/common/apiFunctions.svelte';

	// name for user creation
	let newUserName = '';
	// whether the new card html element is visible
	export let newUserCardVisible = false;
	// The Form used for validating input
	let newUserForm: HTMLFormElement;

	function newUserAction(): void {
		if (newUserForm.reportValidity()) {
			newUser(newUserName)
				.then((response) => {
					newUserCardVisible = false;
					newUserName = '';
					// refresh users after editing
					getUsers();
				})
				.catch((error) => {
					$alertStore = error;
				});
		} else {
			$alertStore = 'Use lower case letters, periods, or dashes only';
		}
	}
</script>

<!-- html -->
{#if newUserCardVisible}
	<div in:fade out:fade={{ duration: newUserCardVisible ? 0 : 500 }} class="card-pending">
		<form on:submit|preventDefault={newUserAction} class="relative" bind:this={newUserForm}>
			<!-- Input has to be lower case, but we will force lower case on submit -->
			<input bind:value={newUserName} class="card-input lowercase" required pattern="[a-zA-Z\-\.]+" placeholder="name" />
		</form>
		<div>
			<button on:click={() => newUserAction()}
				><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline rounded-full hover:bg-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
			<button
				on:click={() => {
					newUserCardVisible = false;
					newUserName = '';
				}}
				><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline rounded-full hover:bg-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
		</div>
	</div>
{/if}
