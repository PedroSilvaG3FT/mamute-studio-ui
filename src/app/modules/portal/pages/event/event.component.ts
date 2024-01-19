import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  IEventDB,
  IEventItem,
} from '../../../@shared/interface/event.interface';
import { DatabaseService } from '../../../@shared/services/database.service';
import { PortalCardComponent } from '../../components/portal-card/portal-card.component';

@Component({
  standalone: true,
  selector: 'portal-event',
  styleUrl: './event.component.scss',
  templateUrl: './event.component.html',
  imports: [DatePipe, PortalCardComponent],
})
export class EventComponent {
  public events: IEventItem[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.getItems();
  }

  public getItems() {
    this.databaseService.event
      .getAllSortLimit<IEventDB[]>('creationDate', 'desc', 500)
      .then((response) => {
        this.events = this.databaseService._model.event
          .buildList(response)
          .filter(({ active }) => !!active);
      })
      .catch(() => {});
  }
}
