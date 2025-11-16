<script module lang="ts">
	import { newPBUser } from '../common/classes.svelte';
	import { appSettings } from '../common/state.svelte';

	export async function registerFirstUser(newUserData: newPBUser) {
        // log in with the first superadmin pass
		var superUser = await appSettings.pb.collection('_superusers').authWithPassword('superadmin@breakglass.local', 'firsttimepasswordchangeme');
        // create the new user
		await appSettings.pb.collection('users').create(newUserData);
        // change the superadmin pass to a random pass
        console.log(superUser.record.id);
        await appSettings.pb.collection('_superusers').update(superUser.record.id,{
            password: 'Th1sismynewpassword',
            passwordConfirm: 'Th1sismynewpassword',
        });
        // log out of the super admin
        appSettings.pb.authStore.clear();
	}
</script>
