import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingStore } from '../../../../store/loading.store';
import { AppTableComponent } from '../../../@core/components/app-table/app-table.component';
import { filterListPagination } from '../../../@core/functions/pagination.function';
import { IPagination } from '../../../@core/interfaces/app-pagination.interface';
import {
  ITableCell,
  ITableCellAction,
} from '../../../@core/interfaces/app-table.interface';
import { AlertService } from '../../../@core/services/alert.service';
import { AppPageNavComponent } from '../../../@shared/components/app-page-nav/app-page-nav.component';
import { DatabaseService } from '../../../@shared/services/database.service';

@Component({
  standalone: true,
  selector: 'app-partner',
  styleUrl: './partner.component.scss',
  templateUrl: './partner.component.html',
  imports: [AppPageNavComponent, RouterLink, AppTableComponent],
})
export class PartnerComponent {
  public loadingStore = inject(LoadingStore);
  public items: any[] = [];
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
    { def: 'position', key: 'position', label: 'No.', sticky: true },
    { def: 'name', key: 'name', label: 'Name' },
    { def: 'weight', key: 'weight', label: 'Weight' },
    { def: 'symbol', key: 'symbol', label: 'Symbol' },
  ];

  constructor(
    private alertService: AlertService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  public getItems() {
    this.loadingStore.setState(true);

    this.databaseService.partner
      .getAll<any[]>()
      .then((response) => {
        console.log(response);
        this.pagination = {
          ...this.pagination,
          totalItems: response.length,
        };

        this.items = response;
        this.handlePaginate(response);
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public handlePaginate(items = this.items) {
    const { pageNumber, pageSize } = this.pagination;
    this.tableData = filterListPagination(items, pageNumber, pageSize);
  }

  public onPaginationChange(pagination: IPagination) {
    this.pagination = pagination;
    this.handlePaginate();
  }
}
