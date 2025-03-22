<script lang="ts">
	import { persistentAppSettings } from '$lib/components/common/state.svelte';
	import { getAPIKeys, rotateAPIKey } from './server-settings-functions.svelte';
	import { appSettings } from '$lib/components/common/state.svelte';
	import { fly } from 'svelte/transition';

	let apiSecretHidden = $state(true); // for hiding or showing the API key
	let rotateButtonDisabled = $state(false);

	function rotateAPIKeyClick() {
		rotateButtonDisabled = true;
		rotateAPIKey();
		rotateButtonDisabled = false;
	}
</script>

<div class="form-control">
	<h1 class="bold mb-4 text-xl text-primary">Server Settings</h1>

	<form id="server-settings" onsubmit={getAPIKeys}>
		<label class="mb-2 block font-bold text-secondary" for="headscaleURL"> Headscale URL </label>
		<input id="headscaleURL" bind:value={persistentAppSettings.headscaleURL} class="input input-sm input-bordered w-full" type="url" placeholder="https://hs.yourdomain.com.au" />
		<label for="headscaleURL" class="label">
			<span class="label-text-alt">URL for your headscale server instance (does not need populating if it's on the same subdomain)</span>
		</label>
		<div class="relative flex">
			<label class="mb-2 block font-bold text-secondary" for="headscaleKey"> Headscale API Key </label>
			{#if appSettings.apiKeyExpiration != undefined}
				<button type="button" disabled={rotateButtonDisabled} onclick={rotateAPIKeyClick} class="tooltip" data-tip="{appSettings.apiKeyExpiration} days left. Click to rotate key" aria-label="check time left"
					><svg data-slot="icon" fill="none" class="-my-3 ml-2 h-5 w-5 stroke-success" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"></path>
					</svg></button
				>
			{/if}
		</div>
		<div class="relative flex">
			<input id="headscaleKey" bind:value={persistentAppSettings.headscaleAPIKey} class="input input-sm input-bordered w-full" minlength="40" maxlength="40" type={apiSecretHidden ? 'password' : 'text'} required placeholder="******************" />
			<button
				type="button"
				class="ml-2"
				onclick={() => {
					apiSecretHidden = !apiSecretHidden;
				}}
				>{#if apiSecretHidden}
					<!-- eye off -->
					<svg xmlns="http://www.w3.org/2000/svg" class="my-1.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
				{:else}
					<!-- eye on -->
					<svg xmlns="http://www.w3.org/2000/svg" class="my-1.5 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
					</svg>
				{/if}
			</button>
		</div>
		<label for="headscaleKey" class="label">
			<span class="label-text-alt">Generate an API key for your headscale instance and place it here.</span>
		</label>
	</form>
	<span
		><button form="server-settings" class="btn btn-secondary btn-sm w-24"> Test API</button>
		{#if appSettings.apiTested}
			<svg in:fly|global={{ x: 10, duration: 600 }} xmlns="http://www.w3.org/2000/svg" class="inline h-6 w-6 fill-none stroke-success" viewBox="0 0 24 24" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		{:else}
			<svg in:fly|global={{ x: 10, duration: 600 }} data-slot="icon" fill="none" stroke-width="1.5" class="inline h-6 w-6 fill-none stroke-error" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
			</svg>
		{/if}
	</span>
</div>
