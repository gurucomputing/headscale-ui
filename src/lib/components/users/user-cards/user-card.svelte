<script lang="ts">
	import type { user } from '$lib/components/common/classes.svelte';
	import Username from './user-card/username.svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		userCard: user;
	}

	let { userCard }: Props = $props();
	let cardExpanded = $state(false);
</script>

<li class="list-row">
	<div class="text-xl font-thin tabular-nums opacity-50">
		<strong>
			{userCard.id.padStart(2, '0')}
		</strong>
	</div>
	<div class="list-col-grow prose prose-sm">
		<Username {userCard}></Username>
		{#if cardExpanded}
			<table transition:slide class="table -mx-10">
				<tbody>
					<!-- row 1 -->
					<tr><th class="min-w-32">Preauth Keys</th><td>stuff and things and stuff stuff and things and stuff stuff and things and stuff stuff and things and stuff</td></tr>
				</tbody>
			</table>
		{/if}
	</div>
	<div>
		<button
			class="btn btn-sm btn-square"
			onclick={() => {
				cardExpanded = !cardExpanded;
			}}
		>
			{#if !cardExpanded}
				<!-- chevron closed icon -->
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			{:else}
				<!-- chevron open icon -->
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
				</svg>
			{/if}
		</button>
	</div>
</li>
