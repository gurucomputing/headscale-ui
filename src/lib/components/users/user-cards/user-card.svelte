<script lang="ts">
	import type { user } from '$lib/components/common/classes.svelte';

	interface Props {
		userCard: user;
	}

	let { userCard }: Props = $props();
	let cardExpanded = $state(false);
</script>

<!-- Allow the parent div to open/close the chevron as well for convenience.
requires stopPropogation for downstream buttons -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<li class="list-row" onclick={() => {cardExpanded = !cardExpanded}} >
	<div class="prose prose-sm">
		<strong>
			{userCard.id}
		</strong>
	</div>
	<div class="list-col-grow prose prose-sm">
		<strong class="flex">
			{userCard.name}
			<svg data-slot="icon" fill="none" class="mt-1 ml-2 h-4 w-4" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path>
			</svg>
		</strong>
	</div>
	<div>
		<button class="btn btn-xs" onclick={(e) => {e.stopPropagation(); cardExpanded = !cardExpanded}}>
			{#if !cardExpanded}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
				</svg>
			{/if}
		</button>
	</div>
	<div></div>
</li>
