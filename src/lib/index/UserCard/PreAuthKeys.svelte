<script lang="ts">
	import { getPreauthKeys, newPreAuthKey } from '$lib/common/apiFunctions.svelte';
	import { PreAuthKey, User } from '$lib/common/classes';
	import { alertStore, preAuthHideStore } from '$lib/common/stores';
	import NewPreAuthKey from './PreAuthKeys/NewPreAuthKey.svelte';

	// function for refreshing users from parent
	export let user = new User();
	let keyList = [new PreAuthKey()];
	let newPreAuthKeyShow = false;

	function NewPreAuthKeyAction() {
		newPreAuthKey(user.name)
			.then(() => {
				getPreauthKeysAction();
			})
			.catch((error) => {
				$alertStore = error;
			});
	}

	function getPreauthKeysAction() {
		getPreauthKeys(user.name)
			.then((keys) => {
				keyList = keys;
			})
			.catch((error) => {
				$alertStore = error;
			});
	}
</script>

<tr>
	<th>
		<div>
			Preauth Keys <button on:click={getPreauthKeysAction} class="ml-2">
				<!-- refresh icon -->
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
				</svg></button
			>
			<button
				on:click={() => {
					newPreAuthKeyShow = !newPreAuthKeyShow;
				}}
			>
				{#if !newPreAuthKeyShow}
				<!-- plus icon -->
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
				</svg>
				{:else}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
				</svg>
				<!-- minus icon -->
				{/if}
			</button>
		</div>
		<div class="border rounded p-1 -mx-2 mt-2 w-fit">
			<input
				type="checkbox"
				bind:checked={($preAuthHideStore)}
				class="checkbox checkbox-xs text-base-content"
			/><span
				on:click={() => {
					$preAuthHideStore = !$preAuthHideStore
				}}
				class="font-normal ml-2">Hide Expired/Used Keys</span
			>
		</div>
	</th>
	<td>
		{#if newPreAuthKeyShow}
			<NewPreAuthKey />
		{/if}
		<table class="table table-compact w-full">
			<tbody>
				{#each keyList as key}
					{#if key.key == 'placeholder'}
						<tr><td>Refresh to see contents</td></tr>
					{:else}
						<!-- hide if key is expired or used (and not reusable) and checkbox is checked -->
						<tr class:hidden={$preAuthHideStore && ((key.used && !key.reusable) || new Date(key.expiration).getTime() < new Date().getTime())}>
							<th>{key.id}</th>
							<td
								><code class="border p-1 rounded">{key.key}</code>
								<div class="tooltip" data-tip={new Date(key.expiration).toLocaleString()}>
									{#if new Date(key.expiration).getTime() > new Date().getTime()}
										<div class="btn btn-xs capitalize bg-success text-success-content mx-1">active</div>
									{:else}
										<div class="btn btn-xs capitalize bg-error text-error-content mx-1">expired</div>
									{/if}
								</div>
								{#if !key.used}
									<div class="btn btn-xs capitalize bg-primary text-primary-content mx-1">unused</div>
								{:else}
									<div class="btn btn-xs capitalize bg-warning text-warning-content mx-1">used</div>
								{/if}
								{#if key.reusable}
									<div class="btn btn-xs capitalize bg-secondary text-secondary-content mx-1">reusable</div>
								{/if}
							</td>
							<td>
								<!-- trash symbol -->
								<button class="mr-2"
									><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
										<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg></button
								>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</td>
</tr>
