export class Device {
	public id: string = '';
	public name: string = '';
	public givenName: string = '';
	public lastSeen: string = '';
	public ipAddresses: string[] = [];
	public tags: string[] = [];
	public approvedRoutes: string[] = [];
	public availableRoutes: string[] = [];
	public subnetRoutes: string[] = [];
	public user: User = new User();
	public online?: boolean;

	public constructor(init?: Partial<Device>) {
		Object.assign(this, init);
	}
}

export class ACL {
	public groups: { [key: string]: [string] } = {};

	public constructor(init?: Partial<ACL>) {
		Object.assign(this, init);
	}
}

export class APIKey {
	id: string = '';
	prefix: string = '';
	expiration: string = '';
	createdAt: string = '';
	lastSeen: string = '';

	public constructor(init?: Partial<APIKey>) {
		Object.assign(this, init);
	}
}

export class PreAuthKey {
	public user: string = '';
	public id: string = '';
	public key: string = '';
	public createdAt: string = '';
	public expiration: string = '';
	public reusable: boolean = false;
	public ephemeral: boolean = false;
	public used: boolean = false;

	public constructor(init?: Partial<PreAuthKey>) {
		Object.assign(this, init);
	}
}

export class User {
	public id: string = '';
	public name: string = '';
	public email: string = '';
	public createdAt: string = '';
	public constructor(init?: Partial<User>) {
		Object.assign(this, init);
	}
}
