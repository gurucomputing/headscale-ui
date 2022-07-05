<script lang="ts">
	import { onDestroy } from 'svelte';
	import { slide } from 'svelte/transition';
	import { alert } from '$lib/common/stores.js';
	export let ms = 3000;
	let visible = false;
	let timeout: number;
	const onMessageChange = (message: string, ms: number) => {
		clearTimeout(timeout);
		if (!message) {
			// hide Alert if message is empty
			visible = false;
		} else {
			visible = true;
			if (ms > 0) timeout = window.setTimeout(() => {visible = false; $alert = ''}, ms); // and hide it after ms milliseconds
		}
	};
	$: onMessageChange($alert, ms); // whenever the alert store or the ms props changes run onMessageChange
	onDestroy(() => clearTimeout(timeout)); // make sure we clean-up the timeout
</script>

{#if visible}
	<div transition:slide class="absolute top-0 left-1/2 transform -translate-x-1/2 p-4 text-lg text-center shadow-xl rounded-b-lg bg-gray-200 max-w-lg" on:click={() => (visible = false)}>
		<p>{$alert}</p>
	</div>
{/if}
