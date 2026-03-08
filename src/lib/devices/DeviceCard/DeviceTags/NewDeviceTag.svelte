<script>
	import { updateTags, getDevices } from '$lib/common/apiFunctions.svelte';
	import { Device } from '$lib/common/classes';
	import { fade } from 'svelte/transition';
	import { alertStore } from '$lib/common/stores.js';

	let editingTag = false;
	let newTag = '';
	export let device = new Device();

	function updateTagsAction() {
		let tagList = device.tags;
		tagList.push(`tag:${newTag}`);
		// remove duplicates
		tagList = [...new Set(tagList)];
		// force lowercase
		tagList = tagList.map(str => str.toLowerCase());

		updateTags(device.id, tagList)
			.then((response) => {
				editingTag = false;
				newTag = '';
				// refresh devices after editing
				getDevices();
			})
			.catch((error) => {
				$alertStore = error;
			});
	}
</script>

<button
	on:click|stopPropagation={() => {
		editingTag = true;
	}}
	class="btn btn-xs border-dotted border-2 btn-primary opacity-60 normal-case"
>
	{#if !editingTag}
		<span>+ tag</span>
	{:else}
		<!-- svelte-ignore a11y-autofocus -->
		<form on:submit|preventDefault={updateTagsAction}>
			<input bind:value={newTag} autofocus required class="bg-primary w-16" />
			<button in:fade|global class="ml-1">
				<!-- checkmark symbol -->
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
			<!-- Delete cancel symbol -->
			<button
				type="button"
				in:fade|global
				on:click|stopPropagation={() => {
					editingTag = false;
					newTag = '';
				}}
				class="ml-1"
				><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
		</form>
	{/if}
</button>
