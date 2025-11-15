<script lang="ts">
	import { type PersistentAppSettingsObject } from '$lib/components/common/classes.svelte';
	import { appSettings, persistentAppSettings } from '$lib/components/common/state.svelte';
	import Navbar from '$lib/components/layout/navbar.svelte';
	import Sidebar from '$lib/components/layout/sidebar.svelte';
	import Toast from '$lib/components/layout/toast.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import '../app.css';
	let { children } = $props();
	let pageStatus = $state('');

	onMount(() => {
		// monitor the persistent app store and read/write to local storage as required
		// load existing persistentAppSettings from localStorage
		let localStorageAppSettings = JSON.parse(localStorage.getItem('persistentAppSettings') || '{}') as PersistentAppSettingsObject;
		Object.assign(persistentAppSettings, localStorageAppSettings);

		// track when persistentAppSettings changes and write it back into localStorage
		$effect(() => {
			localStorage.setItem('persistentAppSettings', JSON.stringify(persistentAppSettings));
		});
		pageStatus = 'loaded';
	});
</script>

{#if pageStatus == 'loaded'}
	<!-- daisy UI theme and menu settings -->
	<main data-theme={persistentAppSettings.daisyUITheme} in:fade={{ duration: 200 }} class="drawer lg:drawer-open">
		<input id="drawer-toggle" type="checkbox" class="drawer-toggle" checked={appSettings.sidebarDrawerOpen ? true : null} />
		<div class="drawer-content flex flex-col">
			<!-- toast content -->
			<div class="toast toast-center toast-top z-40">
				{#each appSettings.toastAlerts.entries() as [toastID, toastObject]}
					<div transition:fade={{ duration: 200 }}>
						<Toast toast={toastObject}></Toast>
					</div>
				{/each}
			</div>
			<!-- Navbar Content -->
			<div class="navbar bg-base-100 h-10 min-h-0 w-full border-b-2">
				<Navbar></Navbar>
			</div>
			<!-- Page Content -->
			<div class="mt-5 mr-5 ml-5 min-h-[calc(100vh-(var(--spacing)*15))] items-center justify-center">
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
			<ul class="menu bg-base-100 min-h-full w-44 border-e-2 p-1">
				<Sidebar></Sidebar>
			</ul>
		</div>
	</main>
{/if}
