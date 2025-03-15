<script lang="ts">
	import { persistentAppSettings } from '$lib/components/common/state.svelte';
	import { testAPIConnectivity } from './server-settings.svelte.ts';
	import { appSettings } from '$lib/components/common/state.svelte';
	import { fly } from 'svelte/transition';
</script>

<div class="form-control">
	<h1 class="bold mb-4 text-xl text-primary">Server Settings</h1>

	<form id="server-settings" onsubmit={testAPIConnectivity}>
		<label class="mb-2 block font-bold text-secondary" for="headscaleURL"> Headscale URL </label>
		<input id="headscaleURL" bind:value={persistentAppSettings.headscaleURL} class="input input-sm input-bordered w-full" type="url" placeholder="https://hs.yourdomain.com.au" />
		<label for="headscaleURL" class="label">
			<span class="label-text-alt">URL for your headscale server instance (does not need populating if it's on the same subdomain)</span>
		</label>
		<label class="mb-2 block font-bold text-secondary" for="headscaleKey"> Headscale API Key </label>
		<input id="headscaleKey" bind:value={persistentAppSettings.headscaleAPIKey} class="input input-sm input-bordered w-full" minlength="40" maxlength="40" type="password" required placeholder="******************" />
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
		<svg data-slot="icon" fill="none" stroke-width="1.5" class="inline h-6 w-6 fill-none stroke-error" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
		  </svg>
		{/if}
	</span>
</div>
