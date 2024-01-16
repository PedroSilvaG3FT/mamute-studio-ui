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
import { IEventItem } from '../../../@shared/interface/event.interface';
import { DatabaseService } from '../../../@shared/services/database.service';

@Component({
  standalone: true,
  selector: 'admin-event',
  styleUrl: './event.component.scss',
  templateUrl: './event.component.html',
  imports: [AppPageNavComponent, AppTableComponent, RouterLink],
})
export class EventComponent {
  public loadingStore = inject(LoadingStore);
  public items: IEventItem[] = [];
  public tableData: IEventItem[] = [];
  public pagination: IPagination = {
    pageSize: 5,
    pageNumber: 1,
    totalItems: 20,
    pageSizeOptions: [5, 10, 20, 50],
  };

  public tableActions: ITableCellAction<IEventItem>[] = [
    {
      title: 'Edit',
      icon: 'iconamoon:edit-fill',
      callback: (element) => {
        this.router.navigate(['/admin/event/register', element.id]);
      },
    },
  ];

  public tableColumns: ITableCell[] = [
    { def: 'title', key: 'title', label: 'Name' },
    { def: 'date', key: 'date', label: 'Data', date: true },
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

    this.databaseService.event
      .getAll<any[]>()
      .then((response) => {
        this.items = this.databaseService._model.event.buildList(response);
        this.pagination = { ...this.pagination, totalItems: this.items.length };

        console.log(response);
        console.log(this.items);
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
