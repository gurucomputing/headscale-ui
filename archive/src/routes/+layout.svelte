<script lang="ts">
	import '../app.css';
	import Nav from '$lib/common/nav.svelte';
	import Alert from '$lib/common/Alert.svelte';
	import Stores from '$lib/common/Stores.svelte';
	import { themeStore } from '$lib/common/stores.js'
	

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
</script>

<main data-theme={$themeStore} class="flex flex-col">
	<!-- initialize localStorage -->
	<Stores></Stores>
	<div class="flex">
		<!-- sidebar -->
		<Nav />
		<!-- main window -->
		<div class="flex flex-1 min-w-0 flex-col bg-base-100">
			<Alert />
			<!-- header -->
			<!-- <div class="flex bg-gray-100 h-12 p-4">Header</div> -->
			<!-- content -->
			<div>
				<slot />
			</div>
		</div>
	</div>
	<!-- <div class="flex">Footer</div> -->
</main>
