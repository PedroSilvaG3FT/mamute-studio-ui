import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  IEventDB,
  IEventItem,
} from '../../../../@shared/interface/event.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';
import { PortalCardRedirectDetailComponent } from '../../../components/portal-card-redirect-detail/portal-card-redirect-detail.component';
import { PortalCardComponent } from '../../../components/portal-card/portal-card.component';
import { PortalHighlightCardComponent } from '../../../components/portal-highlight-card/portal-highlight-card.component';

@Component({
  standalone: true,
  selector: 'portal-home-event',
  styleUrl: './home-event.component.scss',
  templateUrl: './home-event.component.html',
  imports: [
    DatePipe,
    PortalCardComponent,
    PortalHighlightCardComponent,
    PortalCardRedirectDetailComponent,
  ],
})
export class HomeEventComponent {
  public events: IEventItem[] = [];
  public highlight: IEventItem = {} as IEventItem;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.getItems();
  }

  public getItems() {
    this.databaseService.event
      .getAllSortLimit<IEventDB[]>('creationDate', 'desc', 4)
      .then((response) => {
        const items = this.databaseService._model.event.buildList(response);

        this.highlight = items[0];
        this.events = items.filter(({ id }) => id !== this.highlight.id);
        console.log(this.highlight);
        console.log(this.events);
      })
      .catch(() => {});
  }
}
