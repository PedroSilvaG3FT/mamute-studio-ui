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
import {
  IPartnerDB,
  IPartnerItem,
} from '../../../@shared/interface/partner.interface';
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
  public items: IPartnerItem[] = [];
  public tableData: IPartnerItem[] = [];
  public pagination: IPagination = {
    pageSize: 5,
    pageNumber: 1,
    totalItems: 20,
    pageSizeOptions: [5, 10, 20, 50],
  };

  public tableActions: ITableCellAction<IPartnerItem>[] = [
    {
      title: 'Edit',
      icon: 'iconamoon:edit-fill',
      callback: (element) => console.log(element),
    },
  ];
  public tableColumns: ITableCell[] = [
    { def: 'name', key: 'name', label: 'Nome' },
    { def: 'email', key: 'email', label: 'Email' },
    { def: 'telephone', key: 'telephone', label: 'Telefone' },
    { def: 'active', key: 'active', label: 'Ativo', boolean: true },
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
      .getAll<IPartnerDB[]>()
      .then((response) => {
        console.log(response);
        this.items = this.databaseService._model.partner.buildList(response);
        this.pagination = { ...this.pagination, totalItems: this.items.length };

        this.handlePaginate(this.items);
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
