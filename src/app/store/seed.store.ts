import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { differenceInMinutes } from 'date-fns';
import { IFormOption } from '../modules/@core/interfaces/app-form.interface';
import { ICategoryDB } from '../modules/@shared/interface/category.interface';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('seed');
const state = persistService.initState({
  lastUpdated: null as Date | null,
  newsCategories: [] as ICategoryDB[],
  prayerCategories: [] as ICategoryDB[],
  partnerCategories: [] as ICategoryDB[],
});

const buildOptions = (value: ICategoryDB[]): IFormOption[] => {
  return value.map((item) => ({
    label: item.label,
    value: item.id,
  }));
};

export const SeedStore = signalStore(
  { providedIn: 'root' },
  withState(state),
  withComputed((state) => ({
    isEnableUpdate: computed(() => {
      if (!state.lastUpdated()) return true;
      return differenceInMinutes(new Date(), state.lastUpdated() as Date) >= 3;
    }),
    newsCategoriesOptions: computed(() => buildOptions(state.newsCategories())),
    prayerCategoriesOptions: computed(() =>
      buildOptions(state.prayerCategories())
    ),
    partnerCategoriesOptions: computed(() =>
      buildOptions(state.partnerCategories())
    ),
  })),
  withMethods((store) => ({
    setLastUpdate(lastUpdated: Date) {
      patchState(store, { lastUpdated });
      persistService.commit(store, state);
    },
    setNewsCategories(newsCategories: ICategoryDB[]) {
      patchState(store, { newsCategories });
      persistService.commit(store, state);
    },
    setPrayerCategories(prayerCategories: ICategoryDB[]) {
      patchState(store, { prayerCategories });
      persistService.commit(store, state);
    },
    setPartnerCategories(partnerCategories: ICategoryDB[]) {
      patchState(store, { partnerCategories });
      persistService.commit(store, state);
    },
  }))
);
