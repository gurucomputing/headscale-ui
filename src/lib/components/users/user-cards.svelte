<script lang="ts">
	import { getUsers } from './user-cards-functions.svelte';
	import { appSettings } from '../common/state.svelte';
	import UserCard from './user-cards/user-card.svelte';

	getUsers();
</script>

<ul class="list bg-base-200 rounded-box shadow-md max-w-xl">
	{#each appSettings.users as user}
		<li class="list-row">
			<UserCard userCard={user} />
		</li>
	{/each}
</ul>
