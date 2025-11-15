<script module lang="ts">
	import { goto } from '$app/navigation';
	import{ resolve } from '$app/paths';
	import { appSettings } from '../common/state.svelte';
	
	export async function checkAuth() {
		let validLogin = appSettings.pb.authStore.isValid;

		if(validLogin) {
			try {
				appSettings.pb.collection("users").authRefresh();
			} catch (error) {
				validLogin = false;
			}
		}
		
		if(!validLogin) {
			goto(resolve(`/login.html`));
		}
	}
// try {
// 				let authData = await appSettings.pb.collection("_superusers").authWithPassword('superadmin@breakglass.local', 'firsttimepasswordchangeme');
// 				if (authData) {
// 					appSettings.pb.authStore.clear();
// 					goto(resolve(`/firstregistration.html`));
// 				}
// 			} catch (error) {
// 				goto(resolve(`/login.html`))
// 			}
</script>