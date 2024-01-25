import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { IEventTicketItem } from '../modules/@shared/interface/event.interface';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('event-ticket');
const state = persistService.initState({
  userTickets: [] as IEventTicketItem[],
});

export const EventTicketStore = signalStore(
  { providedIn: 'root' },
  withState(state),

  withMethods((store) => ({
    setUserTickets(userTickets: IEventTicketItem[]) {
      patchState(store, { userTickets });
      persistService.commit(store, state);
    },
    reset() {
      patchState(store, { userTickets: [] });
      persistService.commit(store, state);
    },
  }))
);
