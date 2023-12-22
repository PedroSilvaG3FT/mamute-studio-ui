export class SessionStorageService {
  get(key: string) {
    return sessionStorage.getItem(key);
  }

  set(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }

  remove(key: string) {
    sessionStorage.removeItem(key);
  }
}
