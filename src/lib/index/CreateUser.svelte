<script lang="ts">
	import { fade } from 'svelte/transition';

	function createUser() {}
</script>

<!-- html -->
<div in:fade class="p-4"><button class="btn-primary bg-teal-700 hover:bg-teal-900 " type="button">+ New User</button></div>
<div in:fade class="card-pending">
	<input class="card-input" placeholder="name" />
	<div>
    <button><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline rounded-full hover:bg-gray-300" fill="none" viewBox="0 0 24 24" stroke="black" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg></button>
		<button><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 inline rounded-full hover:bg-gray-300" fill="none" viewBox="0 0 24 24" stroke="black" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg></button>
	</div>
</div>