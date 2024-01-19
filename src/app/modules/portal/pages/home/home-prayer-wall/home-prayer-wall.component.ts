import { Component } from '@angular/core';
import { where } from 'firebase/firestore';
import {
  IPrayerWallDB,
  IPrayerWallItem,
} from '../../../../@shared/interface/prayer-wall.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';
import { PortalCardPrayerComponent } from '../../../components/portal-card-prayer/portal-card-prayer.component';
import { PortalCardRedirectDetailComponent } from '../../../components/portal-card-redirect-detail/portal-card-redirect-detail.component';

@Component({
  standalone: true,
  selector: 'portal-home-prayer-wall',
  styleUrl: './home-prayer-wall.component.scss',
  templateUrl: './home-prayer-wall.component.html',
  imports: [PortalCardPrayerComponent, PortalCardRedirectDetailComponent],
})
export class HomePrayerWallComponent {
  public prayers: IPrayerWallItem[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.getItems();
  }

  public getItems() {
    this.databaseService.prayerWall
      .getAllSortLimit<IPrayerWallDB[]>('creationDate', 'desc', 4, [
        where('active', '==', true),
      ])
      .then((response) => {
        console.log(response);
        this.prayers = this.databaseService._model.prayerWall
          .buildList(response)
          .filter(({ active }) => !!active);
      })
      .catch(() => {});
  }
}
