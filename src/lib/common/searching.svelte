<script context="module" lang="ts">
	import { userFilterStore, userStore, userSearchStore, deviceFilterStore, deviceSearchStore, deviceStore } from './stores';
	import { get } from 'svelte/store';
	import Fuse from 'fuse.js';
	import type { Device, User } from './classes';

	export function filterUsers() {
    // only run if we have search contents set
		if (get(userSearchStore)) {
			let searcher = new Fuse(get(userStore), {
				keys: ['id', 'name']
			});

      // search using the searchstore term, and take the resultant array contents and set it to userFilterStore
			userFilterStore.set(searcher.search(get(userSearchStore)).map((a) => a.item));
		} else {
      // if we have no search parameters, just copy across the whole object
      userFilterStore.set(get(userStore));
    }
	}

  export function filterDevices() {
    // only run if we have search contents set
		if (get(deviceSearchStore)) {
			let searcher = new Fuse(get(deviceStore), {
				keys: ['id', 'givenName', 'name', 'tags', 'user.name']
			});

      // search using the searchstore term, and take the resultant array contents and set it to userFilterStore
			deviceFilterStore.set(searcher.search(get(deviceSearchStore)).map((a) => a.item));
		} else {
      // if we have no search parameters, just copy across the whole object
      deviceFilterStore.set(get(deviceStore));
    }
	}
</script>
