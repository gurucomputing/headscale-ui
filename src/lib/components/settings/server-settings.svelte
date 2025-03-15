<script lang="ts">
	import { persistentAppSettings } from '$lib/components/common/state.svelte';
	import { testAPIConnectivity } from "./server-settings.svelte.ts";
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
	<button form="server-settings" class="btn btn-secondary btn-sm w-16">Save</button>
</div>
