import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { where } from 'firebase/firestore';
import { SeedStore } from '../../../../store/seed.store';
import { AppEmptyListComponent } from '../../../@core/components/app-empty-list/app-empty-list.component';
import { AppDatepickerComponent } from '../../../@core/components/form/app-datepicker/app-datepicker.component';
import { AppSelectComponent } from '../../../@core/components/form/app-select/app-select.component';
import { IFormOption } from '../../../@core/interfaces/app-form.interface';
import { DatePickerRangeValue } from '../../../@core/types/datepicker.type';
import { ObjectUtil } from '../../../@core/util/object.util';
import {
  IPrayerWallDB,
  IPrayerWallItem,
} from '../../../@shared/interface/prayer-wall.interface';
import { DatabaseService } from '../../../@shared/services/database.service';
import { PortalCardPrayerComponent } from '../../components/portal-card-prayer/portal-card-prayer.component';

@Component({
  standalone: true,
  selector: 'portal-prayer-wall',
  imports: [
    FormsModule,
    AppSelectComponent,
    AppEmptyListComponent,
    AppDatepickerComponent,
    PortalCardPrayerComponent,
  ],
  styleUrl: './prayer-wall.component.scss',
  templateUrl: './prayer-wall.component.html',
})
export class PrayerWallComponent {
  public seedStore = inject(SeedStore);

  public categoryOptions: IFormOption[] = [];
  public filter: IPrayerWallFilter = {} as IPrayerWallFilter;

  public prayers: IPrayerWallItem[] = [];
  public originalItems: IPrayerWallItem[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.categoryOptions = [
      { label: 'Todos', value: '' },
      ...this.seedStore.prayerCategoriesOptions(),
    ];

    this.getItems();
  }

  public getItems() {
    this.databaseService.prayerWall
      .getAllSortLimit<IPrayerWallDB[]>('creationDate', 'desc', 500, [
        where('active', '==', true),
      ])
      .then((response) => {
        this.prayers = this.databaseService._model.prayerWall
          .buildList(response)
          .filter(({ active }) => !!active);

        this.originalItems = ObjectUtil.clone(this.prayers);
      })
      .catch(() => {});
  }

  public handleFilter() {
    const applyCategory = (items: IPrayerWallItem[]) => {
      return items.filter(({ category }) => {
        if (!this.filter.category) return true;
        return category === this.filter.category;
      });
    };

    const applyDateRange = (items: IPrayerWallItem[]) => {
      const startDate = this.filter?.date?.start;
      const endDate = this.filter?.date?.end;

      if (!startDate || !endDate) return items;
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      return items.filter((item) => {
        const creationDate = new Date(item.creationDate);
        return creationDate >= startDate && creationDate <= endDate;
      });
    };

    const data = ObjectUtil.clone(this.originalItems);

    const dateFiltered = applyCategory(data);
    const categoryFiltered = applyDateRange(dateFiltered);

    this.prayers = categoryFiltered;
  }

  public handleClearFilter() {
    this.filter = {} as IPrayerWallFilter;
    this.prayers = ObjectUtil.clone(this.originalItems);
  }
}

interface IPrayerWallFilter {
  date: DatePickerRangeValue;
  category: string;
}
