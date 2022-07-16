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

export class User {
  public id: string = '';
  public name: string = '';
  public createdAt: string = '';

  public constructor(init?: Partial<Device>) {
    Object.assign(this, init);
  }
}