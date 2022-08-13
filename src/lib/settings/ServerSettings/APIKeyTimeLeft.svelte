<script lang="ts">
	import { getAPIKeys } from '$lib/common/apiFunctions.svelte';
	import { APIKey } from '$lib/common/classes';
	import { alertStore, APIKeyStore } from '$lib/common/stores';
	import { onMount } from 'svelte';
	let keyList = [new APIKey()];
  let timeLeftWarning = false;
  let timeLeftTip = '';

	function getAPIKeysAction(): void {
		getAPIKeys()
			.then((keys) => {
				keyList = keys;
        // match up the current apikey to the keylist
        keyList.forEach(key => {
          if($APIKeyStore.includes(key.prefix)) {
            timeLeft(new Date(key.expiration));
          }
        });
			})
			.catch((error) => {
				$alertStore = error;
			});
	}

	// sets time expiry in human readable format
	function timeLeft(date: Date): void {
		let currentTime = new Date();
		// gets time difference in seconds
		let timeDifferenceDays = Math.round((date.getTime() - currentTime.getTime()) / 1000 / 60 / 60 / 24);
		if(timeDifferenceDays < 30) {
      $alertStore = `${timeDifferenceDays} days left before API Key expiry, consider rolling your key`
      timeLeftWarning = true;
    }
    timeLeftTip = `${timeDifferenceDays} days left before expiry`;
	}

	onMount(() => {
		getAPIKeysAction();
	});
</script>

<button type="button" class="tooltip" data-tip={timeLeftTip}>
	<!-- clock -->
	<svg xmlns="http://www.w3.org/2000/svg" class:stroke-error="{timeLeftWarning}" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
</button>
