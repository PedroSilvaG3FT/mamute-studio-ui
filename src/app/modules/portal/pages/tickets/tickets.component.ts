import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EventTicketStore } from '../../../../store/event-ticket.store';
import { EventTicketFacade } from '../../../@shared/facade/event-ticket.facade';

@Component({
  standalone: true,
  imports: [DatePipe],
  selector: 'portal-tickets',
  styleUrl: './tickets.component.scss',
  templateUrl: './tickets.component.html',
})
export class TicketsComponent {
  public eventTicketStore = inject(EventTicketStore);

  constructor(private eventTicketFacade: EventTicketFacade) {
    this.eventTicketFacade.setUserLoggedTickets();
  }
}
