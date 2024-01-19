import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { INewsDB, INewsItem } from '../../../@shared/interface/news.interface';
import { DatabaseService } from '../../../@shared/services/database.service';
import { PortalCardComponent } from '../../components/portal-card/portal-card.component';

@Component({
  standalone: true,
  selector: 'portal-news',
  styleUrl: './news.component.scss',
  templateUrl: './news.component.html',
  imports: [DatePipe, PortalCardComponent],
})
export class NewsComponent {
  public news: INewsItem[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.getItems();
  }

  public getItems() {
    this.databaseService.news
      .getAllSortLimit<INewsDB[]>('creationDate', 'desc', 500)
      .then((response) => {
        this.news = this.databaseService._model.news
          .buildList(response)
          .filter(({ active }) => !!active);
      })
      .catch(() => {});
  }
}
