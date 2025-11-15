<script lang="ts">
	import { appSettings } from '$lib/components/common/state.svelte';

	appSettings.navbarTitle = 'Login';
	appSettings.sidebarDrawerOpen = false;
</script>

<div class="flex items-center justify-center">
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend class="fieldset-legend">Login</legend>

  <label class="label" for="email">Email</label>
  <input type="email" class="input" id="email" placeholder="Email" />

  <label class="label" for="password">Password</label>
  <input type="password" class="input" id="password" placeholder="Password" />

  <button class="btn btn-neutral mt-4">Login</button>
</fieldset>
</div>