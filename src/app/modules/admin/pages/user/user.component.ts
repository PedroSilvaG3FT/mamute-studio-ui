import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
import { IUserDB, IUserItem } from '../../../@shared/interface/user.interface';
import { DatabaseService } from '../../../@shared/services/database.service';
@Component({
  standalone: true,
  selector: 'app-user',
  styleUrl: './user.component.scss',
  templateUrl: './user.component.html',
  imports: [AppPageNavComponent, RouterLink, AppTableComponent],
})
export class UserComponent {
  public loadingStore = inject(LoadingStore);
  public items: IUserItem[] = [];
  public tableData: IUserItem[] = [];
  public pagination: IPagination = {
    pageSize: 10,
    pageNumber: 1,
    totalItems: 20,
    pageSizeOptions: [5, 10, 20, 50],
  };

  public tableActions: ITableCellAction<IUserItem>[] = [
    {
      title: 'Edit',
      icon: 'iconamoon:edit-fill',
      callback: (element) => {
        this.router.navigate(['/admin/user/register', element.id]);
      },
    },
  ];
  public tableColumns: ITableCell[] = [
    { def: 'name', key: 'name', label: 'Name' },
    { def: 'email', key: 'email', label: 'Email' },
    { def: 'active', key: 'active', label: 'Ativo', boolean: true },
  ];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  public getItems() {
    this.loadingStore.setState(true);

    this.databaseService.user
      .getAll<IUserDB[]>()
      .then((response) => {
        this.items = this.databaseService._model.user.buildList(response);
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
