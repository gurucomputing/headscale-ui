<script lang="ts">
	import { getPreauthKeys } from '$lib/common/apiFunctions.svelte';
	import { PreAuthKey, User } from '$lib/common/classes';
	import { alertStore, preAuthHideStore } from '$lib/common/stores';

	// function for refreshing users from parent
	export let user = new User();
	let keyList = [new PreAuthKey()];
	let preAuthHide = ($preAuthHideStore == 'true');

	// If the key hasn't expired or key hasn't been used, flag as green, otherwise flag as red
	function testExpiry(keyExpiry: string, keyUsed: boolean): string {
		if (new Date(keyExpiry).getTime() > new Date().getTime()) {
			if (!keyUsed) {
				return 'text-success';
			}
		}
		return 'text-error';
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
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
				</svg></button
			>
		</div>
		<div class="border rounded p-1 -mx-2 w-fit">
			<input type="checkbox" bind:checked="{preAuthHide}" on:change="{() => {preAuthHide ? $preAuthHideStore = 'true': $preAuthHideStore = 'false'}}" class="checkbox checkbox-xs text-base-content" /><span
				on:click={() => {
					$preAuthHideStore == 'true' ? $preAuthHideStore = 'false' : $preAuthHideStore = 'true';
					preAuthHide = ($preAuthHideStore == 'true');
				}}
				class="font-normal ml-2">Hide Expired/Used Keys</span
			>
		</div>
		<!-- plus icon -->
	</th>
	<td>
		<table class="table table-compact w-full">
			<tbody>
				{#each keyList as key}
					{#if key.key == 'placeholder'}
						<tr><td>Refresh to see contents</td></tr>
					{:else}
						<!-- hide if key is expired or used (and not reusable) and checkbox is checked -->
						<tr class:hidden={preAuthHide && ((key.used && !key.reusable) || new Date(key.expiration).getTime() < new Date().getTime())}>
							<th>{key.id}</th>
							<td
								><code class="border p-1 rounded">{key.key}</code>
								<div class="tooltip" data-tip="{new Date(key.expiration).toLocaleString()}">
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
								<button class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
										<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg></button>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</td>
</tr>
