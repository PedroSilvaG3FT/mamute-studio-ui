import { Injectable, inject } from '@angular/core';
import { AuthStore } from '../../../store/auth.store';
import { EventTicketStore } from '../../../store/event-ticket.store';
import { IEventTicketDB } from '../interface/event.interface';
import { DatabaseService } from '../services/database.service';

@Injectable({ providedIn: 'root' })
export class EventTicketFacade {
  private authStore = inject(AuthStore);
  public _store = inject(EventTicketStore);

  constructor(private databaseService: DatabaseService) {}

  public setUserLoggedTickets() {
    this.databaseService.eventTicket
      .getByUserId<IEventTicketDB>(String(this.authStore.userData().uid))
      .then((response) => {
        const items =
          this.databaseService._model.eventTicket.buildList(response);
        this._store.setUserTickets(items);
      });
  }
}
