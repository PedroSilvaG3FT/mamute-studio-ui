import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LoadingStore } from '../../../../../store/loading.store';
import { AppTableComponent } from '../../../../@core/components/app-table/app-table.component';
import { filterListPagination } from '../../../../@core/functions/pagination.function';
import { IPagination } from '../../../../@core/interfaces/app-pagination.interface';
import {
  ITableCell,
  ITableCellAction,
} from '../../../../@core/interfaces/app-table.interface';
import { AlertService } from '../../../../@core/services/alert.service';
import { IDocDocumentDatabase } from '../../../interfaces/doc-document-database.interface';
import { SupabaseExampleService } from '../../../services/supabase-example.service';

@Component({
  standalone: true,
  selector: 'doc-supabase-table',
  styleUrl: './supabase-table.component.scss',
  imports: [AppTableComponent, MatButtonModule],
  templateUrl: './supabase-table.component.html',
})
export class SupabaseTableComponent {
  public loadingStore = inject(LoadingStore);
  public documentsData: IDocDocumentDatabase[] = [];
  private readonly errorMessage = `An error occurred while processing the request`;

  public tableData: IDocDocumentDatabase[] = [];
  public documents: IDocDocumentDatabase[] = [];
  public pagination: IPagination = {
    pageSize: 5,
    pageNumber: 1,
    totalItems: 0,
    pageSizeOptions: [5, 10, 20, 50],
  };

  public tableActions: ITableCellAction<IDocDocumentDatabase>[] = [
    {
      title: 'View',
      icon: 'solar:eye-broken',
      callback: (element) => this.getDocument(Number(element.id)),
    },
    {
      title: 'Update',
      icon: 'radix-icons:update',
      callback: (element) => this.updateDocument(element),
    },
    {
      title: 'Delete',
      icon: 'iwwa:delete',
      callback: (element) => this.deleteDocument(Number(element.id)),
    },
  ];

  public tableColumns: ITableCell[] = [
    { def: 'name', key: 'name', label: 'Name' },
    { def: 'email', key: 'email', label: 'email' },
    { def: 'age', key: 'age', label: 'email' },
  ];

  constructor(
    private alertService: AlertService,
    private supabaseExampleService: SupabaseExampleService
  ) {}

  ngOnInit() {
    this.getDocuments();
  }

  private handleError(error: any) {
    console.log(error);
    this.alertService.snackBar.open(this.errorMessage, 'close');
  }

  public getDocuments() {
    this.loadingStore.setState(true);

    this.supabaseExampleService
      .getAll<IDocDocumentDatabase[]>()
      .then((response) => {
        this.pagination = {
          ...this.pagination,
          totalItems: response.data.length || 0,
        };

        this.documentsData = response.data || [];
        this.handlePaginate(this.documentsData);
      })
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public getDocument(id: number) {
    this.loadingStore.setState(true);

    this.supabaseExampleService
      .getById<IDocDocumentDatabase>(id)
      .then((response) => {
        this.alertService.snackBar.open(response.data.email, 'close');
      })
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public createDocument() {
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eva', 'Frank', 'Grace'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomEmail = `${randomName.toLowerCase()}@example.com`;
    const randomAge = Math.floor(Math.random() * 100);

    const data = {
      age: randomAge,
      name: randomName,
      email: randomEmail,
    };

    this.loadingStore.setState(true);

    this.supabaseExampleService
      .create(data)
      .then(() => this.getDocuments())
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public updateDocument(item: IDocDocumentDatabase) {
    this.loadingStore.setState(true);

    const editRandom = Math.floor(Math.random() * 100);
    const currentName = item.name.split('-')[1] || item.name;
    const name = `(Edit ${editRandom}) - ${currentName}`;

    this.supabaseExampleService
      .update({ name }, Number(item.id))
      .then(() => this.getDocuments())
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public deleteDocument(id: number) {
    this.loadingStore.setState(true);

    this.supabaseExampleService
      .delete(id)
      .then(() => this.getDocuments())
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public handlePaginate(items = this.documents) {
    const { pageNumber, pageSize } = this.pagination;
    this.tableData = filterListPagination(items, pageNumber, pageSize);
  }

  public onPaginationChange(pagination: IPagination) {
    this.pagination = pagination;
    this.handlePaginate();
  }
}
