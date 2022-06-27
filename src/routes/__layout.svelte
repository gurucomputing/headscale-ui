<script>
	import '../app.css';
	import Nav from '$lib/nav.svelte';
</script>

<main class="flex flex-col">
	<div class="flex min-h-screen overflow-hidden">
		<!-- sidebar -->
		<Nav />
		<!-- main window -->
		<div class="flex flex-1 flex-col">
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
