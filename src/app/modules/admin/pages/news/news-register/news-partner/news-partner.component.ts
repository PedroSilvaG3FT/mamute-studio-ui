import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingStore } from '../../../../../../store/loading.store';
import { AppTableComponent } from '../../../../../@core/components/app-table/app-table.component';
import { AppSelectComponent } from '../../../../../@core/components/form/app-select/app-select.component';
import { filterListPagination } from '../../../../../@core/functions/pagination.function';
import { IPagination } from '../../../../../@core/interfaces/app-pagination.interface';
import {
  ITableCell,
  ITableCellAction,
} from '../../../../../@core/interfaces/app-table.interface';
import { AlertService } from '../../../../../@core/services/alert.service';
import { DatabaseService } from '../../../../../@shared/services/database.service';

@Component({
  standalone: true,
  selector: 'app-news-partner',
  styleUrl: './news-partner.component.scss',
  templateUrl: './news-partner.component.html',
  imports: [AppTableComponent, AppSelectComponent, FormsModule],
})
export class NewsPartnerComponent {
  public loadingStore = inject(LoadingStore);

  public partner: any = null;
  public partiners: any[] = [];
  public partinersOptions: any[] = [];

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
      .getAll<any[]>()
      .then((response) => {
        console.log(response);
        this.partiners = response;
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

  public handlePaginate(items = this.events) {
    const { pageNumber, pageSize } = this.pagination;
    this.tableData = filterListPagination(items, pageNumber, pageSize);
  }

  public onPaginationChange(pagination: IPagination) {
    this.pagination = pagination;
    this.handlePaginate();
  }
}
