<script lang="ts">
	import { getPreauthKeys } from '$lib/common/apiFunctions.svelte';
	import { PreAuthKey, User } from '$lib/common/classes';
	import { alertStore } from '$lib/common/stores';

	// function for refreshing users from parent
	export let user = new User();
	let keyList = [new PreAuthKey()];

	function testExpiry(keyExpiry: string): string {
		if((new Date(keyExpiry)).getTime() > (new Date()).getTime()) {
			return "text-success"
		}
		return "text-error"
	}

	function getPreauthKeysAction() {
		getPreauthKeys(user.name)
			.then((keys) => {
				keyList = keys;
			})
			.catch((error) => {
				$alertStore = error;
			});
	}
</script>

<tr>
	<th
		>Preauth Keys <button on:click={getPreauthKeysAction} class="ml-2"
			><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
			</svg></button
		></th
	>
	<td
		><ul class="list-disc list-inside">
			{#each keyList as key}
			<li><span class="{testExpiry(key.expiration)}">{key.key} </span></li>
			{/each}
		</ul></td
	>
</tr>
