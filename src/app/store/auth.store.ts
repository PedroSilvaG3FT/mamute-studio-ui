import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('auth');
const state = persistService.initState({
  supabaseToken: '',
  supabaseRefreshToken: '',

  firebaseToken: '',
});

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(state),
  withMethods((store) => ({
    setSupabaseToken(supabaseToken: string) {
      patchState(store, { supabaseToken });
      persistService.commit(store, state);
    },
    setSupabaseRefreshToken(supabaseRefreshToken: string) {
      patchState(store, { supabaseRefreshToken });
      persistService.commit(store, state);
    },
  }))
);
