<script lang="ts">
	import { testAPIConnectivity } from "./server-settings.svelte.ts";
</script>

<div class="form-control">
	<h1 class="bold mb-4 text-xl text-primary">Server Settings</h1>

	<form id="server-settings" onsubmit={testAPIConnectivity}>
		<label class="mb-2 block font-bold text-secondary" for="url"> Headscale URL </label>
		<input class="input input-sm input-bordered w-full" pattern={String.raw`https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`} type="url" placeholder="https://hs.yourdomain.com.au" />
		<label for="url" class="label">
			<span class="label-text-alt">URL for your headscale server instance (does not need populating if it's on the same subdomain)</span>
		</label>
		<label class="mb-2 block font-bold text-secondary" for="password"> Headscale API Key </label>
		<input class="input input-sm input-bordered w-full" minlength="54" maxlength="54" type="password" required placeholder="******************" />
		<label for="url" class="label">
			<span class="label-text-alt">Generate an API key for your headscale instance and place it here.</span>
		</label>
	</form>
	<button form="server-settings" class="btn btn-secondary btn-sm w-16">Save</button>
</div>
