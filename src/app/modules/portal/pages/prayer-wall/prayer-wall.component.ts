import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { where } from 'firebase/firestore';
import { AuthStore } from '../../../../store/auth.store';
import { LoadingStore } from '../../../../store/loading.store';
import { SeedStore } from '../../../../store/seed.store';
import { AppEmptyListComponent } from '../../../@core/components/app-empty-list/app-empty-list.component';
import { AppDatepickerComponent } from '../../../@core/components/form/app-datepicker/app-datepicker.component';
import { AppSelectComponent } from '../../../@core/components/form/app-select/app-select.component';
import { IFormOption } from '../../../@core/interfaces/app-form.interface';
import { AlertService } from '../../../@core/services/alert.service';
import { DatePickerRangeValue } from '../../../@core/types/datepicker.type';
import { ObjectUtil } from '../../../@core/util/object.util';
import { ModalRequestLoginComponent } from '../../../@shared/components/modal-request-login/modal-request-login.component';
import {
  IPrayerWallDB,
  IPrayerWallItem,
} from '../../../@shared/interface/prayer-wall.interface';
import { DatabaseService } from '../../../@shared/services/database.service';
import { PortalCardPrayerComponent } from '../../components/portal-card-prayer/portal-card-prayer.component';
import { PortalRequestPrayModalComponent } from '../../components/portal-request-pray-modal/portal-request-pray-modal.component';

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
  public authStore = inject(AuthStore);
  public seedStore = inject(SeedStore);
  public loadingStore = inject(LoadingStore);

  public categoryOptions: IFormOption[] = [];
  public filter: IPrayerWallFilter = {} as IPrayerWallFilter;

  public prayers: IPrayerWallItem[] = [];
  public originalItems: IPrayerWallItem[] = [];

  public userLoggedPrayingItems: string[] = [];

  constructor(
    public dialog: MatDialog,
    private alertService: AlertService,
    private databaseService: DatabaseService
  ) {}

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
        this.buildPrayingItems();
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

  public handleRequestPray() {
    const component: any = !this.authStore.isLogged()
      ? ModalRequestLoginComponent
      : PortalRequestPrayModalComponent;

    this.dialog.open(component);
  }

  public buildPrayingItems() {
    this.userLoggedPrayingItems = this.originalItems
      .filter((item) =>
        item.peoplePraying.includes(this.authStore.idUserLogged())
      )
      .map(({ id }) => String(id));
  }

  public handleTogglePray(item: IPrayerWallItem, newStatus: boolean) {
    const cloneItem = ObjectUtil.clone(item);

    if (newStatus) cloneItem.peoplePraying.push(this.authStore.idUserLogged());
    else {
      cloneItem.peoplePraying = cloneItem.peoplePraying.filter(
        (item) => item !== this.authStore.idUserLogged()
      );
    }

    const prayDTO =
      this.databaseService._model.prayerWall.buildRegisterDTO(cloneItem);

    this.loadingStore.setState(true);

    this.databaseService.prayerWall
      .update<IPrayerWallDB>(String(item.id), prayDTO)
      .then(() => {
        this.originalItems.forEach((pray) => {
          if (cloneItem.id === pray.id)
            pray.peoplePraying = cloneItem.peoplePraying;
        });

        this.buildPrayingItems();
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }
}

interface IPrayerWallFilter {
  date: DatePickerRangeValue;
  category: string;
}
