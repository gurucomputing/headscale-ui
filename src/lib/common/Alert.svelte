<script lang="ts">
	import { writable } from 'svelte/store';
	import { onDestroy } from 'svelte';
	import { onMount } from 'svelte';
	export const alert = writable('test');
	export let ms = 3000;
	let visible = false;
	let timeout: number;

	onMount(async () => {
		const onMessageChange = (message: string, ms: number) => {
			clearTimeout(timeout);
			if (!message) {
				// hide Alert if message is empty
				visible = false;
			} else {
				visible = true;
				if (ms > 0) timeout = window.setTimeout(() => (visible = false), ms); // and hide it after ms milliseconds
			}
		};
		$: onMessageChange($alert, ms); // whenever the alert store or the ms props changes run onMessageChange
		onDestroy(() => clearTimeout(timeout)); // make sure we clean-up the timeout
	});
</script>

{#if visible}
	<div on:click={() => (visible = false)}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
			><path
				d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
			/></svg
		>
		<p>{$alert}</p>
	</div>
{/if}

<style>
	div {
		position: fixed;
		cursor: pointer;
		margin-right: 1.5rem;
		margin-left: 1.5rem;
		margin-top: 1rem;
		right: 0;
		display: flex;
		align-items: center;
		border-radius: 0.2rem;
		background-color: #565656;
		color: #fff;
		font-size: 0.875rem;
		font-weight: 700;
		padding: 0.5rem 1.4rem;
		font-size: 1.5rem;
		z-index: 100;
		opacity: 95%;
	}
	div p {
		color: #fff;
	}
	div svg {
		height: 1.6rem;
		fill: currentcolor;
		width: 1.4rem;
		margin-right: 0.5rem;
	}
</style>
