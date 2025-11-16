<script lang="ts">
	import { fade } from 'svelte/transition';
	let inputEmail = $state('');
	let inputPassword = $state('');
	let inputRepeatPassword = $state('');
	let validEmail = $derived(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputEmail));
	let hasOneCapital = $derived(/[A-Z]/.test(inputPassword));
	let hasOneNumberOrSymbol = $derived(/[0-9\W]/.test(inputPassword));
	let hasAtLeastEightCharacters = $derived(inputPassword.length >= 8);
	let doesPasswordsMatch = $derived(inputPassword == inputRepeatPassword);
	let isFormValid = $derived(validEmail && hasOneCapital && hasOneNumberOrSymbol && hasAtLeastEightCharacters && doesPasswordsMatch);
</script>

<div in:fade class="flex items-center justify-center">
	<form action="">
		<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
			<legend class="fieldset-legend">First Time Registration</legend>
			<p class="label">The first account will also be created as a superadmin<br> in the pocketbase back end</p>
			<label class="label" for="email">Email</label>
			<input type="email" bind:value={inputEmail} required class="input" id="email" placeholder="Email" />
			<p class="label">
				<span>{#if validEmail}
						<svg in:fade class="stroke-success" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m4.5 12.75l6 6l9-13.5" /></svg>
					{:else}
						<svg in:fade class="stroke-error" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" /></svg>
					{/if}</span>
				Valid E-mail Address
			</p>
			<label class="label" for="password">New Password</label>
			<input class="input" type="password" bind:value={inputPassword} required id="password" placeholder="Password" />
			<p class="label">
				<span>{#if hasOneCapital}
						<svg in:fade class="stroke-success" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m4.5 12.75l6 6l9-13.5" /></svg>
					{:else}
						<svg in:fade class="stroke-error" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" /></svg>
					{/if}</span>
				At least 1 Capital
			</p>
			<p class="label"><span>{#if hasOneNumberOrSymbol}
						<svg in:fade class="stroke-success" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m4.5 12.75l6 6l9-13.5" /></svg>
					{:else}
						<svg in:fade class="stroke-error" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" /></svg>
					{/if}</span>
					At least 1 Number or Symbol</p>
			<p class="label"><span>{#if hasAtLeastEightCharacters}
						<svg in:fade class="stroke-success" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m4.5 12.75l6 6l9-13.5" /></svg>
					{:else}
						<svg in:fade class="stroke-error" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" /></svg>
					{/if}</span>At least 8 characters</p>
			<input type="password" bind:value={inputRepeatPassword} required class="input" id="password" placeholder="Repeat Password" />
			<p class="label"><span>{#if doesPasswordsMatch}
						<svg in:fade class="stroke-success" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m4.5 12.75l6 6l9-13.5" /></svg>
					{:else}
						<svg in:fade class="stroke-error" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" /></svg>
					{/if}</span>Passwords Match</p>
			<button class="btn btn-neutral mt-4" disabled={!isFormValid} type="submit">Register Admin Account</button>
		</fieldset>
	</form>
</div>
