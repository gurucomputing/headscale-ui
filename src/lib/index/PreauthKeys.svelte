<script>
  import { getPreauthKeys } from "$lib/common/apiFunctions.svelte";
  import { User } from '$lib/common/classes';

  // function for refreshing users from parent
	export let user = new User();

  let keyList = 'Refresh to see keys'

  function getPreauthKeysAction() {
    getPreauthKeys(user.name);
  }
</script>

<tr>
	<th
		>Preauth Keys <button on:click={getPreauthKeysAction} class="ml-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
		</svg></button></th
	>
	<td>{keyList}</td>
</tr>
