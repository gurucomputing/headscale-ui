<script lang="ts">
	import { fade } from 'svelte/transition';
	import { alert } from '$lib/common/stores.js';

  // whether the new card html element is visible
	let newDeviceCardVisible = false;
</script>

<!-- html -->
<div in:fade class="p-4"><button on:click={() => (newDeviceCardVisible = true)} class="btn btn-primary btn-sm capitalize" type="button">+ New Device</button></div>
