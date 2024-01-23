import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { IUserItem } from '../modules/@shared/interface/user.interface';
import { UserRole } from '../modules/authentication/enums/user-role.enum';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('auth');
const state = persistService.initState({
  stripeCustomerId: '',

  supabaseToken: '',
  supabaseRefreshToken: '',

  userRole: '' as UserRole,
  userData: {} as IUserItem,
  firebaseToken: '',
  firebaseRefreshToken: '',
});

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(state),
  withComputed((state) => ({
    isLogged: computed(() => !!state.firebaseToken()),
    isAdmin: computed(() => state.userRole() === UserRole.admin),
    userFirstName: computed(() => state.userData()?.name?.split(' ')[0]),
  })),
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
    setUserData(userData: IUserItem) {
      patchState(store, { userData });
      persistService.commit(store, state);
    },
    setUserRole(userRole: UserRole) {
      patchState(store, { userRole });
      persistService.commit(store, state);
    },
    reset() {
      patchState(store, {
        firebaseToken: '',
        firebaseRefreshToken: '',
        userRole: '' as UserRole,
        userData: {} as IUserItem,
      });

      persistService.commit(store, state);
    },
  }))
);
