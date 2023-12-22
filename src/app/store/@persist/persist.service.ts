import { LocalStorageService } from './_local.storage';
import { SessionStorageService } from './_session.storage';

export class PersistService {
  private readonly storeKey = '@App';
  private storageControl = {
    local: new LocalStorageService(),
    session: new SessionStorageService(),
  };

  constructor(
    private name: string,
    private storageKey: 'local' | 'session' = 'local'
  ) {}

  private get moduleKey(): string {
    return `${this.storeKey}:${this.name}`;
  }

  private get storage() {
    return this.storageControl[this.storageKey];
  }

  private getCurrentState() {
    const storaged = this.storage.get(this.moduleKey);

    if (storaged) {
      try {
        return JSON.parse(storaged);
      } catch (error) {
        console.error(
          `[app]: an error occurred while converting to object ${this.moduleKey}`
        );
        return {};
      }
    } else return {};
  }

  private getSignalStateValue(store: object, model: object) {
    const keys = Object.keys(model);

    return Object.entries(store).reduce((initial, [key, value]) => {
      const result = keys.includes(key) ? { [key]: value() } : {};
      return { ...initial, ...result };
    }, {});
  }

  private setState(value: object) {
    this.storage.set(this.moduleKey, JSON.stringify(value));
    return value;
  }

  public initState<Data>(model: Data): Data {
    const state = this.getCurrentState();
    const hasState = !!Object.keys(state).length;

    if (hasState) return state;
    else return this.setState(Object(model)) as Data;
  }

  public commit(store: object, model: object) {
    const value = this.getSignalStateValue(store, model);
    return this.setState(value);
  }
}
