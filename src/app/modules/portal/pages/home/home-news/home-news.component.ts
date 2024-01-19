import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  INewsDB,
  INewsItem,
} from '../../../../@shared/interface/news.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';
import { PortalCardRedirectDetailComponent } from '../../../components/portal-card-redirect-detail/portal-card-redirect-detail.component';
import { PortalCardComponent } from '../../../components/portal-card/portal-card.component';
import { PortalHighlightCardComponent } from '../../../components/portal-highlight-card/portal-highlight-card.component';

@Component({
  standalone: true,
  selector: 'portal-home-news',
  styleUrl: './home-news.component.scss',
  templateUrl: './home-news.component.html',
  imports: [
    DatePipe,
    PortalCardComponent,
    PortalHighlightCardComponent,
    PortalCardRedirectDetailComponent,
  ],
})
export class HomeNewsComponent {
  public news: INewsItem[] = [];
  public highlight: INewsItem = {} as INewsItem;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.getItems();
  }

  public getItems() {
    this.databaseService.news
      .getAllSortLimit<INewsDB[]>('creationDate', 'desc', 4)
      .then((response) => {
        const items = this.databaseService._model.news.buildList(response);

        this.highlight = items[0];
        this.news = items.filter(({ id }) => id !== this.highlight.id);
      })
      .catch(() => {});
  }
}
