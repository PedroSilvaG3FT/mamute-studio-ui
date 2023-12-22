import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('counter');
const state = persistService.initState({ count: 0 });

export const CounterStore = signalStore(
  { providedIn: 'root' },
  withState(state),
  withComputed((state) => ({
    doubleCount: computed(() => state.count() * 2),
  })),
  withMethods((store) => ({
    increment() {
      patchState(store, { count: store.count() + 1 });
      persistService.commit(store, state);
    },
    decrement() {
      patchState(store, { count: store.count() - 1 });
      persistService.commit(store, state);
    },
  }))
);
