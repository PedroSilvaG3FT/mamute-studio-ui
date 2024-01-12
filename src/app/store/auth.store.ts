import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('auth');
const state = persistService.initState({
  stripeCustomerId: '',

  supabaseToken: '',
  supabaseRefreshToken: '',

  firebaseToken: '',
  firebaseRefreshToken: '',
});

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(state),
  withMethods((store) => ({
    setStripeCustomerId(stripeCustomerId: string) {
      patchState(store, { stripeCustomerId });
      persistService.commit(store, state);
    },
    setSupabaseToken(supabaseToken: string) {
      patchState(store, { supabaseToken });
      persistService.commit(store, state);
    },
    setSupabaseRefreshToken(supabaseRefreshToken: string) {
      patchState(store, { supabaseRefreshToken });
      persistService.commit(store, state);
    },
    setFirebaseToken(firebaseToken: string) {
      patchState(store, { firebaseToken });
      persistService.commit(store, state);
    },
    setFirebaseRefreshToken(firebaseRefreshToken: string) {
      patchState(store, { firebaseRefreshToken });
      persistService.commit(store, state);
    },
  }))
);
