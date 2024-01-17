import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingStore } from '../../../../../../store/loading.store';
import { AppTableComponent } from '../../../../../@core/components/app-table/app-table.component';
import { AppSelectComponent } from '../../../../../@core/components/form/app-select/app-select.component';
import { filterListPagination } from '../../../../../@core/functions/pagination.function';
import { IFormOption } from '../../../../../@core/interfaces/app-form.interface';
import { IPagination } from '../../../../../@core/interfaces/app-pagination.interface';
import {
  ITableCell,
  ITableCellAction,
} from '../../../../../@core/interfaces/app-table.interface';
import { AlertService } from '../../../../../@core/services/alert.service';
import { INewsItem } from '../../../../../@shared/interface/news.interface';
import {
  IPartnerDB,
  IPartnerItem,
} from '../../../../../@shared/interface/partner.interface';
import { DatabaseService } from '../../../../../@shared/services/database.service';
import { AdminPartnerSelectionComponent } from '../../../../components/admin-partner-selection/admin-partner-selection.component';

@Component({
  standalone: true,
  selector: 'app-news-partner',
  styleUrl: './news-partner.component.scss',
  templateUrl: './news-partner.component.html',
  imports: [
    AppTableComponent,
    AppSelectComponent,
    FormsModule,
    AdminPartnerSelectionComponent,
  ],
})
export class NewsPartnerComponent {
  @Input({ required: true }) news: INewsItem = {} as INewsItem;
  public loadingStore = inject(LoadingStore);

  public partnerId: string = '';
  public partners: IPartnerItem[] = [];
  public partnersOptions: IFormOption[] = [];

  public events: any[] = [];
  public tableData: any[] = [];
  public pagination: IPagination = {
    pageSize: 5,
    pageNumber: 1,
    totalItems: 20,
    pageSizeOptions: [5, 10, 20, 50],
  };

  public tableActions: ITableCellAction<any>[] = [
    {
      title: 'Edit',
      icon: 'iconamoon:edit-fill',
      callback: (element) => console.log(element),
    },
  ];
  public tableColumns: ITableCell[] = [
    { def: 'name', key: 'name', label: 'Name' },
  ];

  constructor(
    private alertService: AlertService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.getItems();
    this.getPartners();
  }

  public getPartners() {
    this.loadingStore.setState(true);

    this.databaseService.partner
      .getAll<IPartnerDB[]>()
      .then((response) => {
        console.log(response);
        this.partners = this.databaseService._model.partner.buildList(response);
        this.partnersOptions = this.partners.map((item) => ({
          label: item.name,
          value: String(item.id),
        }));
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public getItems() {
    this.loadingStore.setState(true);

    this.databaseService.newsPartner
      .getAll<any[]>()
      .then((response) => {
        console.log(response);
        this.pagination = {
          ...this.pagination,
          totalItems: response.length,
        };

        this.events = response;
        this.handlePaginate(response);
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public addPartner() {}

  public handlePaginate(items = this.events) {
    const { pageNumber, pageSize } = this.pagination;
    this.tableData = filterListPagination(items, pageNumber, pageSize);
  }

  public onPaginationChange(pagination: IPagination) {
    this.pagination = pagination;
    this.handlePaginate();
  }
}
