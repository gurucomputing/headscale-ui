<script lang="ts">
	import { preauthkey, user } from '$lib/components/common/classes.svelte';
	import { getPreauthKeys } from './preauthkeys-functions.svelte';

	interface Props {
		userCard: user;
	}

	let { userCard }: Props = $props();
    let preauthKeys: preauthkey[] = $state([]);
	getPreauthKeys(userCard.id).then((returnedPreAuthKeys) => {
		preauthKeys = returnedPreAuthKeys;
	});
</script>

{#each preauthKeys as preauthkey}
<p>{preauthkey.key}</p>
{/each}

