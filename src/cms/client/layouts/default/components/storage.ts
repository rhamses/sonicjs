export class StorageClass {
  private storage: any;

  constructor() {
    this.storage = new Map();
  }

  setItem(key: string, value: any) {
    this.storage.set(key, JSON.stringify(value));
  }

  getItem(key: string) {
    const value = this.storage.get(key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string) {
    this.storage.delete(key);
  }
}
