<script lang="ts">
	import type { user } from "$lib/components/common/classes.svelte";

	interface Props {
		userCard: user;
	}

	let { userCard }: Props = $props();
</script>

<div>
    {userCard.name}
</div>