import { DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { SeedStore } from '../../../../store/seed.store';
import { IPrayerWallItem } from '../../../@shared/interface/prayer-wall.interface';

@Component({
  standalone: true,
  imports: [DatePipe],
  selector: 'portal-card-prayer',
  styleUrl: './portal-card-prayer.component.scss',
  templateUrl: './portal-card-prayer.component.html',
})
export class PortalCardPrayerComponent {
  @Input({ required: true }) data: IPrayerWallItem = {} as IPrayerWallItem;

  public seedStore = inject(SeedStore);

  get categoryName() {
    return (category: string) => {
      const item = this.seedStore
        .prayerCategoriesOptions()
        .find(({ value }) => value === category);
      return item?.label || '';
    };
  }
}
