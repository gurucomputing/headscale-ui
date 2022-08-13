<script lang="ts">
	import { fly } from 'svelte/transition';
	import { URLStore } from '$lib/common/stores.js';
	import { APIKeyStore } from '$lib/common/stores.js';
	import { getAPIKeys } from '$lib/common/apiFunctions.svelte';
	import { onMount } from 'svelte';
	import ApiKeyTimeLeft from './ServerSettings/APIKeyTimeLeft.svelte';
	import RolloverApi from './ServerSettings/RolloverAPI.svelte';

	// Server Settings
	let apiStatus = 'untested';
	let apiKeyInputState = 'password';

	function TestServerSettings() {
		getAPIKeys()
			.then(() => {
				apiStatus = 'succeeded';
			})
			.catch(() => {
				apiStatus = 'failed';
			});
	}

	function ClearServerSettings() {
		$URLStore = '';
		$APIKeyStore = '';
		apiStatus = 'untested';
	}

	onMount(() => {
		// test api settings on page load
		TestServerSettings();
	});
</script>

<form>
	<h1 class="text-2xl bold text-primary mb-4">Server Settings</h1>
	<label class="block text-secondary text-sm font-bold mb-2" for="url"> Headscale URL </label>
	<input bind:value={$URLStore} class="form-input" type="url" pattern={String.raw`https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`} placeholder="https://hs.yourdomain.com.au" />
	<p class="text-xs text-base-content text-italics mb-8">URL for your headscale server instance</p>
	<label class="block text-secondary text-sm font-bold mb-2" for="password">
		Headscale API Key
		{#if apiStatus == 'succeeded'}
			{#key $APIKeyStore}
				<ApiKeyTimeLeft />
			{/key}
		{/if}
	</label>
	<div class="flex relative">
		<input bind:value={$APIKeyStore} {...{ type: apiKeyInputState }} minlength="54" maxlength="54" class="form-input" disabled='{apiStatus == 'succeeded'}' required placeholder="******************" />
		<button
			type="button"
			class="absolute right-40"
			on:click={() => {
				apiKeyInputState == 'text' ? (apiKeyInputState = 'password') : (apiKeyInputState = 'text');
			}}
		>
			{#if apiKeyInputState == 'password'}
				<!-- eye off -->
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
					><path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg
				>
			{:else}
				<!-- eye on -->
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
				</svg>
			{/if}
		</button>
		<RolloverApi {apiStatus} />
	</div>
	<p class="text-xs text-base-content text-italics mb-8">Generate an API key for your headscale instance and place it here.</p>
	{#if apiStatus != 'succeeded'}
		<button on:click={() => {TestServerSettings()}} class="btn btn-sm btn-secondary capitalize" type="button">Save API Key</button>
	{:else}
		<button on:click={() => {apiStatus = 'untested'}} class="btn btn-sm btn-primary capitalize" type="button">Edit API Key</button>
	{/if}
	<button on:click={() => ClearServerSettings()} class="btn btn-sm btn-primary capitalize" type="button">Clear Server Settings</button>
	<button on:click={() => TestServerSettings()} class="btn btn-sm btn-secondary capitalize" type="button">Test Server Settings</button>
	{#if apiStatus === 'succeeded'}
		<svg in:fly={{ x: 10, duration: 600 }} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
	{/if}
	{#if apiStatus === 'failed'}
		<svg in:fly={{ x: 10, duration: 600 }} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	{/if}
</form>
