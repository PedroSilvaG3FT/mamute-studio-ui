import { DatePipe, NgClass } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoadingStore } from '../../../../store/loading.store';
import { SeedStore } from '../../../../store/seed.store';
import { AppEmptyListComponent } from '../../../@core/components/app-empty-list/app-empty-list.component';
import { AppDatepickerComponent } from '../../../@core/components/form/app-datepicker/app-datepicker.component';
import { AppSelectComponent } from '../../../@core/components/form/app-select/app-select.component';
import { FirebaseAuthenticationService } from '../../../@core/firebase/firebase-authentication.service';
import { IFormOption } from '../../../@core/interfaces/app-form.interface';
import { AlertService } from '../../../@core/services/alert.service';
import { DatePickerRangeValue } from '../../../@core/types/datepicker.type';
import { ObjectUtil } from '../../../@core/util/object.util';
import { AppPageNavComponent } from '../../../@shared/components/app-page-nav/app-page-nav.component';
import {
  IPrayerWallDB,
  IPrayerWallItem,
} from '../../../@shared/interface/prayer-wall.interface';
import { DatabaseService } from '../../../@shared/services/database.service';

@Component({
  standalone: true,
  selector: 'app-prayer-wall',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './prayer-wall.component.scss',
  templateUrl: './prayer-wall.component.html',
  imports: [
    NgClass,
    DatePipe,
    RouterLink,
    FormsModule,
    AppSelectComponent,
    AppPageNavComponent,
    AppEmptyListComponent,
    AppDatepickerComponent,
  ],
})
export class PrayerWallComponent {
  public seedStore = inject(SeedStore);
  public loadingStore = inject(LoadingStore);

  public categoryOptions: IFormOption[] = [];
  public filter: IPrayerWallFilter = {} as IPrayerWallFilter;

  public items: IPrayerWallItem[] = [];
  public originalItems: IPrayerWallItem[] = [];

  constructor(
    private alertService: AlertService,
    private databaseService: DatabaseService,
    private firebaseAuthenticationService: FirebaseAuthenticationService
  ) {}

  ngOnInit() {
    this.categoryOptions = [
      { label: 'Todos', value: '' },
      ...this.seedStore.prayerCategoriesOptions(),
    ];

    this.getItems();
  }

  get categoryName() {
    return (category: string) => {
      const item = this.categoryOptions.find(({ value }) => value === category);
      return item?.label || '';
    };
  }

  public getItems() {
    this.loadingStore.setState(true);

    this.databaseService.prayerWall
      .getAll<IPrayerWallDB[]>()
      .then((response) => {
        this.items = this.databaseService._model.prayerWall.buildList(response);
        this.originalItems = ObjectUtil.clone(this.items);
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public remove(item: IPrayerWallItem) {
    this.loadingStore.setState(true);

    this.databaseService.prayerWall
      .delete(String(item.id))
      .then(() => (this.items = this.items.filter(({ id }) => id !== item.id)))
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public toggleStatus(item: IPrayerWallItem) {
    this.loadingStore.setState(true);

    const userApprover = this.firebaseAuthenticationService.getUserReference();

    this.databaseService.prayerWall
      .update<Partial<IPrayerWallDB>>(String(item.id), {
        userApprover,
        active: !item.active,
      })
      .then(() => (item.active = !item.active))
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
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

    this.items = categoryFiltered;
  }

  public handleClearFilter() {
    this.filter = {} as IPrayerWallFilter;
    this.items = ObjectUtil.clone(this.originalItems);
  }
}

interface IPrayerWallFilter {
  date: DatePickerRangeValue;
  category: string;
}
