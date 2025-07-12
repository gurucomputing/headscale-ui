<script lang="ts">
	import Svelecte from 'svelecte';
	import { user } from '$lib/components/common/classes.svelte';
	import { getPreauthKeys } from './preauthkeys-functions.svelte';

	interface Props {
		userCard: user;
	}

	let { userCard }: Props = $props();
    let preauthKeys: string[] = $state([]);
	getPreauthKeys(userCard.id).then((returnedPreAuthKeys) => {
		preauthKeys = returnedPreAuthKeys.map(obj => obj.key);
	});
	let selectedKey = $state('');
</script>

<Svelecte options={preauthKeys} bind:value={selectedKey} />

