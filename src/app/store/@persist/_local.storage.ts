export class LocalStorageService {
  public get(key: string) {
    return localStorage.getItem(key);
  }

  public set(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }
}
