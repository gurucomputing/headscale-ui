<script>
	import NewDeviceTag from './DeviceTags/NewDeviceTag.svelte';
	import { Device } from '$lib/common/classes';

	export let device = new Device();
</script>

<span><NewDeviceTag /></span>

{#each device.forcedTags as tag}
	<span class="mb-1 mr-1 btn btn-xs btn-primary normal-case">{tag.replace("tag:","")}</span>
{/each}

{#each device.validTags as tag}
	<span class="mb-1 mr-1 btn btn-xs btn-secondary normal-case">{tag.replace("tag:","")}</span>
{/each}

