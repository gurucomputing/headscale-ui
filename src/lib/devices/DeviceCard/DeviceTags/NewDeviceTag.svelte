<script>
	import { fade } from 'svelte/transition';
	let editingTag = false;
</script>

<div
	on:click|stopPropagation={() => {
		editingTag = true;
	}}
	class="btn btn-xs border-dotted border-2 btn-primary opacity-60 normal-case"
>
	{#if !editingTag}
		<span>+ tag</span>
	{:else}
		<!-- svelte-ignore a11y-autofocus -->
		<form on:submit|preventDefault={() => {console.log("hi");}}>
			<input autofocus class="bg-primary w-16" />
			<button in:fade class="ml-1">
				<!-- checkmark symbol -->
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
			<!-- Delete cancel symbol -->
			<button
				type="button"
				in:fade
				on:click|stopPropagation={() => {
					editingTag = false;
				}}
				class="ml-1"
				><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg></button
			>
		</form>
	{/if}
</div>
