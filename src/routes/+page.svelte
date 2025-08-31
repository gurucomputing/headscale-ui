<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	onMount(async () => {
		goto(resolve(`/users.html`));
	});
</script>
