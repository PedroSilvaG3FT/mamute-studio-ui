import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ThemeType } from '../modules/@core/types/theme.type';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('ui');
const state = persistService.initState({ theme: 'dark' });

export const UiStore = signalStore(
  { providedIn: 'root' },
  withState(state),
  withComputed((state) => ({
    logoPath: computed(() =>
      state.theme() === 'dark'
        ? `/assets/images/logo-white.png`
        : `/assets/images/logo-black.png`
    ),
  })),
  withMethods((store) => ({
    setTheme(theme: ThemeType) {
      patchState(store, { theme });
      persistService.commit(store, state);
    },
  }))
);
