<script lang="ts">
	//
	// Imports
	//
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';
	import { TestAPI } from '$lib/common/functions.svelte';

	//
	// Variable Declarations
	//

	// Set to true once component is initialized
	let componentLoaded = false;

	// Server Settings
	let headscaleURLStore: Writable<string>;
	let headscaleURL: string;
	let headscaleAPIKeyStore: Writable<string>;
	let headscaleAPIKey: string;
	let headscaleAPITest = 'untested';
	let serverSettingsForm: HTMLFormElement;

	//
	// Functions
	//

	// Server Settings
	function SaveServerSettings(): void {
		if (serverSettingsForm.reportValidity()) {
			$headscaleURLStore = headscaleURL;
			$headscaleAPIKeyStore = headscaleAPIKey;
		}
	}

	function ClearServerSettings(): void {
		headscaleURL = '';
		headscaleAPIKey = '';
		$headscaleURLStore = headscaleURL;
		$headscaleAPIKeyStore = headscaleAPIKey;
	}

	function TestServerSettings(): void {
		TestAPI().then((succeeded: boolean) => {
			if (succeeded === true) {
				headscaleAPITest = 'succeeded';
			} else {
				headscaleAPITest = 'failed';
			}
		});
	}

	//
	// Component Initialization
	//
	onMount(async () => {
		// get the current URL and APIKey state from the local store
		headscaleURL = localStorage.getItem('headscaleURL') || '';
		headscaleAPIKey = localStorage.getItem('headscaleAPIKey') || '';

		// set the current subscription values to the initial value
		headscaleURLStore = writable(headscaleURL);
		headscaleAPIKeyStore = writable(headscaleAPIKey);

		// subscribe to the URL and APIKey state and update the local storage where needed
		headscaleURLStore.subscribe((val) => localStorage.setItem('headscaleURL', val));
		headscaleAPIKeyStore.subscribe((val) => localStorage.setItem('headscaleAPIKey', val));

		// Display component frontend
		componentLoaded = true;
	});
</script>

<!-- html -->
<body>
	{#if componentLoaded}
		<div in:fade class="px-4 py-4 w-4/5">
			<!-- Server Settings -->
			<form bind:this={serverSettingsForm}>
				<h1 class="text-2xl bold green-400 mb-4">Server Settings</h1>
				<label class="block text-gray-700 text-sm font-bold mb-2" for="url"> Headscale URL </label>
				<input bind:value={headscaleURL} class="form-input" type="url" required pattern={String.raw`https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`} placeholder="https://hs.yourdomain.com.au" />
				<p class="text-xs text-gray-400 text-italics mb-8">URL for your headscale server instance</p>
				<label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Headscale API Key </label>
				<input bind:value={headscaleAPIKey} minlength="54" maxlength="54" class="form-input" type="password" required placeholder="******************" />
				<p class="text-xs text-gray-400 text-italics mb-8">Generate an API key for your headscale instance and place it here.</p>
				<span class="has-tooltip">
					<span class="tooltip rounded shadow-lg p-1 bg-gray-200 -mt-16">Note: API Key and URL currently save to localStorage (IE: Your Browser)<br />Make sure you are using a trusted computer</span>
					<!-- disable the SaveServerSettings button if nothing has changed from stored values, or the dependent inputs do not validate -->
					<button disabled={headscaleAPIKey === $headscaleAPIKeyStore && headscaleURL === $headscaleURLStore} on:click={() => SaveServerSettings()} class="btn-primary bg-green-700 hover:bg-green-900" type="button">Save Server Settings</button>
				</span>
				<button on:click={() => ClearServerSettings()} class="btn-primary bg-teal-700 hover:bg-teal-900 " type="button">Clear Server Settings</button>
				<button on:click={() => TestServerSettings()} class="btn-primary bg-sky-700 hover:bg-sky-900 " type="button">Test Server Settings</button>
				{#if headscaleAPITest === 'succeeded'}
					<svg in:fly={{ x: 10, duration: 600 }} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				{/if}
				{#if headscaleAPITest === 'failed'}
					<svg in:fly={{ x: 10, duration: 600 }} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{/if}
			</form>
			<!-- Server Settings End -->
		</div>
	{/if}
</body>
