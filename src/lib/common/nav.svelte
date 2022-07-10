<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';

	// navigation bar variables
	let navExpanded = writable('');
	let componentLoaded = false;

	onMount(async () => {
		// get the navbar state from the local store
		navExpanded = writable(localStorage.getItem('navExpanded') || '');

		// subscribe to the navbar state and update the local storage where needed
		navExpanded.subscribe((val) => localStorage.setItem('navExpanded', val));

		// if there is no initial stored navbar state, try to determine a state based on screen size
		if ($navExpanded == '') {
			// assuming a mobile unless larger than 640px
			if (window.outerWidth >= 640) {
				$navExpanded = 'expanded';
			} else {
				$navExpanded = 'collapsed';
			}
		}
		componentLoaded = true;
	});
</script>

<!-- let the page initialize before showing the nav bar -->
{#if componentLoaded}
	<aside class="bg-base-200 shadow-xl w-14" class:navCollapsed={$navExpanded == 'collapsed'} class:navExpanded={$navExpanded == 'expanded'} transition:fade>
		<!-- sidebar menu items -->
		<p class="nav-item" on:click={() => ($navExpanded == 'collapsed' ? ($navExpanded = 'expanded') : ($navExpanded = 'collapsed'))}>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
			</svg>
			<span class="indent-4 text-primary font-extrabold">Headscale</span>
		</p>

		<div />
		<a href="/" class="nav-item">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
			</svg>
			<span class="indent-4">User View</span>
		</a>
		<a href="/devices.html" class="nav-item">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
			</svg>
			<span class="indent-4">Device View</span>
		</a>
		<a href="/settings.html" class="nav-item">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
				/>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
			<span class="indent-4">Settings</span>
		</a>
	</aside>
{/if}

<style lang="postcss">
	.navExpanded {
		transition: ease-out 200ms;
		width: 180px;
	}

	.navCollapsed {
		transition: ease-out 200ms;
		width: 55px;
	}

	.nav-item {
		@apply flex items-center text-sm py-4 px-4 h-12 overflow-hidden text-base-content stroke-base-content text-ellipsis cursor-default whitespace-nowrap rounded hover:bg-base-300 transition duration-300 ease-in-out;
	}
</style>
