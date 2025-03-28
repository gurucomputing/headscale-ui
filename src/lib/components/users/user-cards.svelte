<script lang="ts">
	import { getUsers } from './user-cards-functions.svelte';
	import { appSettings } from '../common/state.svelte';
	import UserCard from './user-cards/user-card.svelte';

	getUsers();
</script>

<ul class="list bg-base-200 rounded-box max-w-xl shadow-md">
	{#each appSettings.users as user}
		<UserCard userCard={user} />
	{/each}
</ul>
