<script>
	import '../app.css';
	import Nav from '$lib/common/nav.svelte';
	import Alert from '$lib/common/Alert.svelte'
</script>

<main class="flex flex-col" data-theme="light">
	<div class="flex min-h-screen overflow-hidden">
		<!-- sidebar -->
		<Nav />
		<!-- main window -->
		<div class="flex flex-1 flex-col bg-base-100">
			<Alert></Alert>
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
