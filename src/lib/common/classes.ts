export class Device {
  public id: string = '';
  public name: string = '';
  public givenName: string = '';
  public lastSeen: string = '';
  public ipAddresses: string[] = []
  public forcedTags: string[] = []
  public validTags: string[] = []
  public invalidTags: string[] = []
  public namespace: { name: string } = { name: '' }

  public constructor(init?: Partial<Device>) {
    Object.assign(this, init);
  }
}

export class ACL {
  public groups: {[key: string]: [string]} = {}

  public constructor(init?: Partial<Route>) {
    Object.assign(this, init);
  }
}

export class Route {
  // current (hs 18+) method of handling a route
  advertised: boolean = true;
  prefix: string = "";
  enabled: boolean = false;
  id: number = 0;

  public constructor(init?: Partial<Route>) {
    Object.assign(this, init);
  }
}

export class APIKey {
  id: string = '';
  prefix: string = '';
  expiration: string = '';
  createdAt: string = '';
  lastSeen: string = '';

  public constructor(init?: Partial<Route>) {
    Object.assign(this, init);
  }
}

export class PreAuthKey {
  public namespace: string = '';
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
  public createdAt: string = '';
  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}