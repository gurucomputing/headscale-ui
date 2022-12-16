<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import EditUser from '$lib/users/UserCard/RenameUser.svelte';
	import RemoveUser from '$lib/users/UserCard/RemoveUser.svelte';
	import PreauthKeys from '$lib/users/UserCard/PreAuthKeys.svelte';
	import { User } from '$lib/common/classes';
	import { userStore } from '$lib/common/stores';

	// function for refreshing users from parent
	export let user = new User();
	let cardExpanded = false;
</script>

<div in:fade class="card-primary">
	<div on:keypress on:click={() => (cardExpanded = !cardExpanded)} class="flex justify-between">
		<div>
			<EditUser {user} />
		</div>
		<div>
			<RemoveUser {user} />
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
						{#key $userStore}
							<PreauthKeys {user} />
						{/key}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
