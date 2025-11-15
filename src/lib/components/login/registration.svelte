<script lang="ts">
    import { fade } from "svelte/transition";
</script>

<div in:fade class="flex items-center justify-center">
	<fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
		<legend class="fieldset-legend">First Time Registration</legend>

		<label class="label" for="email">Email</label>
		<input type="email" required class="input validator" id="email" placeholder="Email" />
		<label class="label" for="password">New Password</label>
		<input type="password" class="input" id="password" placeholder="Password" />

		<button class="btn btn-neutral mt-4" type="submit">Register Admin Account</button>
	</fieldset>
</div>
