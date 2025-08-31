<script module lang="ts">
	import { SvelteMap } from 'svelte/reactivity';
	import PocketBase from 'pocketbase';

	export class PersistentAppSettingsObject {
		daisyUITheme = 'winter'; // for setting the UI theme. See https://daisyui.com/docs/themes/
		headscaleAPIKey = ''; // sensitive, allows for administrative access to headscale
		headscaleURL = ''; // url for headscale to use
		debugLogging = false; // to turn on additional messages

		public constructor(init?: Partial<PersistentAppSettingsObject>) {
			Object.assign(this, init);
		}
	}

	export class AppSettingsObject {
		navbarTitle = ''; // for setting the title of the page
		appLoaded = false; // for hiding the screen until hydration has completed
		sidebarDrawerOpen = false; // for determining if the sidebar is open when on a small screen
		toastAlerts = new SvelteMap<string, toastAlert>(); // for adding or removing alerts
		apiTested = true; // used to hide the app if the api tests are failing
		apiKeyList: APIKey[] = []; //list of apikeys retrieved from headscale API
		pb: PocketBase = new PocketBase(); //authentication middleware interface
		users: user[] = []; //list of users retrieved from headscale API
		apiKeyExpiration?: number = undefined; // number of days left until the key in use expires

		public constructor(init?: Partial<AppSettingsObject>) {
			Object.assign(this, init);
		}
	}

	// alert used for populating toasts in the layout
	export class toastAlert {
		message = ''; //message to display
		notificationType = 'alert'; //to style the toast
		id = ''; //UUID generated to reference the toast

		public constructor(init?: Partial<toastAlert>) {
			Object.assign(this, init);
		}
	}

	// retrieved as an array from headscale
	export class APIKey {
		id = ''; // unique identifier for headscale
		prefix = ''; // beginning of key to match full string
		expiration = ''; // when key expires, formatting as datetime
		createdAt = ''; // date of creation
		lastSeen = ''; // date last seen, seems to be always null?

		public constructor(init?: Partial<APIKey>) {
			Object.assign(this, init);
		}
	}

	// used for describing headscale users
	export class user {
		id = '';
		name = '';
		createdAt = '';
		displayName = '';
		email = '';
		providerId = '';
		provider = '';
		profilePicUrl = '';

		public constructor(init?: Partial<user>) {
			Object.assign(this, init);
		}
	}

	// used for describing keys associated with a user
	export class preauthkey {
		user = new user();
		id = '';
		key = '';
		reusable = false;
		ephemeral = false;
		used = false;
		expiration = '';
		createdAt = '';
		aclTags = [''];

		public constructor(init?: Partial<preauthkey>) {
			Object.assign(this, init);
		}
	}
</script>
