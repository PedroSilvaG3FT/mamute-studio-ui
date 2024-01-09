import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('loading');
const state = persistService.initState({
  show: false,
  message: '',
});

export const LoadingStore = signalStore(
  { providedIn: 'root' },
  withState(state),
  withMethods((store) => ({
    setState(show: boolean, message = '') {
      patchState(store, { show, message });
      persistService.commit(store, state);
    },
    setMessage(message = '') {
      patchState(store, { message });
      persistService.commit(store, state);
    },
  }))
);
