<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { alertStore } from '$lib/common/stores.js';
	export let ms = 3000;
	let visible = false;
	let timeout: number;

	onMount(async () => {
		window.addEventListener('unhandledrejection', function (promiseRejectionEvent) {
			$alertStore = promiseRejectionEvent.reason;
		});
	});

	const onMessageChange = (message: string, ms: number) => {
		clearTimeout(timeout);
		if (!message) {
			// hide Alert if message is empty
			visible = false;
		} else {
			visible = true;
			if (ms > 0)
				timeout = window.setTimeout(() => {
					$alertStore = '';
				}, ms); // and hide it after ms milliseconds
		}
	};
	$: onMessageChange($alertStore, ms); // whenever the alert store or the ms props changes run onMessageChange
	onDestroy(() => clearTimeout(timeout)); // make sure we clean-up the timeout
</script>

{#if visible}
	<div
		transition:slide
		class="absolute alert text-lg left-1/2 transform -translate-x-1/2 justify-center shadow-lg max-w-lg"
		on:keypress on:click={() => {
			$alertStore = '';
		}}
	>
		<p>{$alertStore}</p>
	</div>
{/if}
