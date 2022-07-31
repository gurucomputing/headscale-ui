<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { getUsers, editUser } from '$lib/common/apiFunctions.svelte';
	import { alertStore } from '$lib/common/stores.js';
	import { User } from '$lib/common/classes';

	let cardEditing = false;
	let editUserForm: HTMLFormElement;
	let newUserName = '';
	export let user = new User();

	function editingUser() {
		cardEditing = true;
		newUserName = user.name;
	}

	function renameUserAction() {
		if (editUserForm.reportValidity()) {
			editUser(user.name, newUserName)
				.then((response) => {
					cardEditing = false;
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

{#if !cardEditing}
	<span class="font-bold">{user.id}: {user.name}</span>
  <!-- edit symbol -->
	<button type="button" on:click|stopPropagation={() => editingUser()} class="ml-2"
		><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
		</svg></button
	>
{:else}
	<form bind:this={editUserForm} on:submit|preventDefault={renameUserAction}>
		<!-- Input has to be lower case, but we will force lower case on submit -->
		<input in:slide on:click|stopPropagation bind:value={newUserName} class="card-input mb-1 lowercase" required pattern="[a-zA-Z\-\.]+" placeholder="name" />
    <!-- edit accept symbol -->
	<button in:fade on:click|stopPropagation class=""
  ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg></button
>
<!-- edit cancel symbol -->
<button type="button" in:fade on:click|stopPropagation={() => (cardEditing = false)}
  ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg></button
>
	</form>
{/if}