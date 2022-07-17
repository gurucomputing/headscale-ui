export class Device {
  public id: string = '';
  public name: string = '';
  public lastSeen: string = '';
  public ipAddresses: [string] = ['']
  public namespace: { name: string } = { name: '' }

  public constructor(init?: Partial<Device>) {
    Object.assign(this, init);
  }
}

export class PreAuthKey {
  public namespace: string = '';
  public id: string = '';
  public key: string = 'placeholder';
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