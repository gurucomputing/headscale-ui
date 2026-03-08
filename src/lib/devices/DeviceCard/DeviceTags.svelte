<script lang='ts'>
	import NewDeviceTag from './DeviceTags/NewDeviceTag.svelte';
	import { Device } from '$lib/common/classes';
	import { updateTags, getDevices } from '$lib/common/apiFunctions.svelte';
	import { alertStore } from '$lib/common/stores.js';
	export let device = new Device();

	function updateTagsAction(tag: String) {
		let tagList = device.tags;
		// remove tag we're trying to remove
		tagList = tagList.filter(element => element !== tag); 

		updateTags(device.id, tagList).then((response) => {
			// refresh devices after editing
			getDevices();
		})
    .catch((error) => {
      $alertStore = error;
    });
	}


</script>

<div class="flex gap-1">
	<span><NewDeviceTag {device}/></span>

	{#each device.tags as tag}
		<span class="btn btn-xs btn-primary normal-case">{tag.replace("tag:","")}
		<!-- Cancel symbol -->
		<button on:click|stopPropagation={() => {updateTagsAction(tag)}}
		class="ml-1"
		><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg></button
	>
		</span>
	{/each}
</div>

