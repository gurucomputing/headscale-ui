<script lang="ts">
	import type { user } from '$lib/components/common/classes.svelte';

	interface Props {
		userCard: user;
	}

	let { userCard }: Props = $props();
	let editUsername = $state(false);
	let newUsername = $state(userCard.name);
</script>

<strong class="flex">
	{#if !editUsername}
    <span class="mt-0.5">{userCard.name}</span>
		<button
			class="btn btn-ghost btn-xs btn-square ml-2"
			onclick={() => {
				editUsername = true;
			}}
		>
			<!-- edit icon -->
			<svg data-slot="icon" fill="none" class="h-5 w-5" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path>
			</svg>
		</button>
	{:else}
		<input class="input input-sm lowercase" placeholder="name" bind:value={newUsername} />
		<button class="btn btn-ghost btn-sm btn-square ml-2">
			<!-- confirm icon -->
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		</button>

		<button
			class="btn btn-ghost btn-sm btn-square"
			onclick={() => {
				editUsername = false;
			}}
		>
			<!-- cancel icon -->
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		</button>
	{/if}
</strong>
