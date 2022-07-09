<script lang="ts">
	import { fade } from 'svelte/transition';
	import { alert } from '$lib/common/stores.js';

  // whether the new card html element is visible
	let newDeviceCardVisible = false;
</script>

<!-- html -->
<div in:fade class="p-4"><button on:click={() => (newDeviceCardVisible = true)} class="btn-primary bg-teal-700 hover:bg-teal-900 " type="button">+ New Device</button></div>
