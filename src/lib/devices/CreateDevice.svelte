<script lang="ts">
	import { fade } from 'svelte/transition';
	import { alertStore } from '$lib/common/stores.js';
	import { getUsers } from '$lib/common/apiFunctions.svelte';
	import { onMount } from 'svelte';

	// whether the new card html element is visible
	let newDeviceCardVisible = false;
	let deviceCreateForm: HTMLFormElement;
	let newDeviceKey = '';
	let headscaleUsers = [{ id: '', name: '', createdAt: '' }];

	let tabs = ['Default Configuration', 'With Preauth Keys', 'With OIDC'];
	let activeTab = 0;

	function setHeadscaleUsers() {
		getUsers()
			.then((users) => {
				headscaleUsers = users;
			})
			.catch((error) => {
				$alertStore = error;
			});
	}

	onMount(async () => {
		setHeadscaleUsers();
	});
</script>

<!-- html -->
<!-- device creation visibility button -->
<div in:fade class="p-4">
	{#if newDeviceCardVisible == false}
		<button on:click={() => (newDeviceCardVisible = true)} class="btn btn-primary btn-sm capitalize" type="button">+ New Device</button>
	{:else}
		<button on:click={() => (newDeviceCardVisible = false)} class="btn btn-secondary btn-sm capitalize" type="button">- Hide New Device</button>
	{/if}
</div>

{#if newDeviceCardVisible == true}
	<div in:fade class="p-2 max-w-screen-lg border border-dashed border-base-content mx-4 rounded-md text-sm text-base-content shadow mb-10">
		<div class="tabs">
			{#each tabs as tab, index}
				<button class="tab tab-bordered h-fit w-1/3" class:tab-active={activeTab == index} on:click={() => (activeTab = index)}>{tab}</button>
			{/each}
		</div>
		<!-- Default Configuration -->
		{#if activeTab == 0}
			<div in:fade class="m-2">
				<p>Install Tailscale with the client pointing to your domain (see <a target="_blank" class="link link-primary" href="https://github.com/juanfont/headscale/tree/main/docs">headscale client documentation</a>). Log in using the tray icon, and your browser should give you instructions with a key. Copy the key below:</p>
				<div class="mockup-code m-2">
					<pre><code>headscale -n NAMESPACE nodes register --key &lt;your device key&gt;</code></pre>
				</div>
				<form class="flex flex-wrap" bind:this={deviceCreateForm}>
					<div class="flex-none mr-4">
						<label class="block text-secondary text-sm font-bold mb-2" for="text">Device Key</label>
						<input bind:value={newDeviceKey} minlength="54" class="card-input mt-2" type="text" required placeholder="******************" />
					</div>
					<div class="flex-none">
						<label class="block text-secondary text-sm font-bold mb-2" for="select"
							>Select User <button type="button" on:click={() => setHeadscaleUsers()}
								><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
								</svg></button
							></label
						>
						<select class="card-select mr-3">
							{#each headscaleUsers as user}
								<option>{user.name}</option>
							{/each}
						</select>
					</div>
					<div class="flex-none pt-6">
						<button
							><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-1 inline rounded-full hover:bg-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg></button
						>
						<button
							><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-1 inline rounded-full hover:bg-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg></button
						>
					</div>
				</form>
			</div>
		{/if}
		<!-- With Preauth Keys -->
		{#if activeTab == 1}
			<div in:fade class="m-2">
				<p>Preauth Keys provide the capability to install tailscale using a pre-registered key (see the <code class="bg-base-200 px-2 rounded">--authkey</code> flag in the <a target="_blank" class="link link-primary" href="https://tailscale.com/kb/1080/cli/">tailscale command line documentation</a>)</p>
				<p>Preauth Keys are especially useful for deploying headscale as an always-on VPN (see the <code class="bg-base-200 px-2 rounded">TS_UNATTENDEDMODE</code> install option in the <a target="_blank" class="link link-primary" href="https://tailscale.com/kb/1189/install-windows-msi/">tailscale documentation</a>) or router-level VPN.</p>
				<div class="bg-base-200 p-4 m-2 rounded-xl">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span class="pl-2">Preauth Keys can be managed in the <a href="/" class="link link-primary">User Section</a> of the UI</span>
				</div>
			</div>
		{/if}
		<!-- With OIDC -->
		{#if activeTab == 2}
			<div in:fade class="m-2">
				<p>OIDC provides the ability to register an external authentication provider (such as <a target="_blank" class="link link-primary" href="https://www.keycloak.org/">keycloak</a>) to authenticate devices to headscale.</p>
				<br />
				<p>Configure Headscale to register with an authentication provider (see <a target="_blank" class="link link-primary" href="https://github.com/juanfont/headscale/blob/main/config-example.yaml">headscale configuration documentation</a>). Once configured, successfully authenticated devices will automatically self-register</p>
			</div>
		{/if}
	</div>
{/if}
