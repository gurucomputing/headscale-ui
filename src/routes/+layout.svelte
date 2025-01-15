<script lang="ts">
	import { toastAlert, type PersistentAppSettingsObject } from '$lib/classes.svelte';
	import Toast from '$lib/components/layout/toast.svelte';
	import Navbar from '$lib/components/layout/navbar.svelte';
	import Sidebar from '$lib/components/layout/sidebar.svelte';
	import { appSettings, persistentAppSettings } from '$lib/state.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import '../app.css';
	let { children } = $props();

	onMount(async () => {
		// monitor the persistent app store and read/write to local storage as required
		// load existing persistentAppSettings from localStorage
		let localStorageAppSettings = JSON.parse(localStorage.getItem('persistentAppSettings') || '{}') as PersistentAppSettingsObject;
		Object.assign(persistentAppSettings, localStorageAppSettings);

		// track when persistentAppSettings changes and write it back into localStorage
		$effect(() => {
			localStorage.setItem('persistentAppSettings', JSON.stringify(persistentAppSettings));
		});

		// delay load until page is hydrated
		appSettings.appLoaded = true;
		
	// alert test
	// 	appSettings.toastAlerts.push(
	// 		new toastAlert({
	// 			message: 'this is a test message',
	// 			id: crypto.randomUUID()
	// 		})
	// 	);

	// 	appSettings.toastAlerts.push(
	// 		new toastAlert({
	// 			message: 'this is a test message too and super long and long and long',
	// 			id: crypto.randomUUID()
	// 		})
	// 	);
});
</script>

{#if appSettings.appLoaded}
	<!-- daisy UI theme and menu settings -->
	<main data-theme={persistentAppSettings.daisyUITheme} in:fade={{ duration: 200 }} class="drawer lg:drawer-open">
		<input id="drawer-toggle" type="checkbox" class="drawer-toggle" checked={appSettings.sidebarDrawerOpen ? true : null} />
		<div class="drawer-content flex flex-col">
			<!-- toast content -->
			<div class="toast toast-center toast-top z-40">
				{#each appSettings.toastAlerts as toast}
					<div transition:fade={{ duration: 200 }}>
						<Toast toastAlert={toast}></Toast>
					</div>
				{/each}
			</div>
			<!-- Navbar Content -->
			<div class="navbar h-10 min-h-0 border-b-2 bg-base-100">
				<Navbar></Navbar>
			</div>
			<!-- Page Content -->
			<div class="ml-5 mr-5 mt-5 min-h-screen items-center justify-center">
				{@render children()}
			</div>
		</div>
		<!-- Sidebar Content -->
		<div class="drawer-side">
			<button
				aria-label="close sidebar"
				class="drawer-overlay lg:hidden"
				onclick={() => {
					appSettings.sidebarDrawerOpen = false;
				}}
			></button>
			<ul class="menu min-h-full w-44 border-e-2 bg-base-100 p-1">
				<Sidebar></Sidebar>
			</ul>
		</div>
	</main>
{/if}
