import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AppTableComponent } from '../../../@core/components/app-table/app-table.component';
import { filterListPagination } from '../../../@core/functions/pagination.function';
import { IPagination } from '../../../@core/interfaces/app-pagination.interface';
import {
  ITableCell,
  ITableCellAction,
} from '../../../@core/interfaces/app-table.interface';
import { AlertService } from '../../../@core/services/alert.service';
import { FirebaseExampleService } from '../../services/firebase-example.service';

@Component({
  standalone: true,
  selector: 'firebase-example',
  imports: [AppTableComponent, MatButtonModule],
  styleUrl: './firebase-example.component.scss',
  templateUrl: './firebase-example.component.html',
})
export class FirebaseExampleComponent {
  public documentsData: IExampleFirebaseDocument[] = [];
  private readonly errorMessage = `An error occurred while processing the request`;

  public tableData: IExampleFirebaseDocument[] = [];
  public documents: IExampleFirebaseDocument[] = [];
  public pagination: IPagination = {
    pageSize: 5,
    pageNumber: 1,
    totalItems: 0,
    pageSizeOptions: [5, 10, 20, 50],
  };

  public tableActions: ITableCellAction<IExampleFirebaseDocument>[] = [
    {
      title: 'View',
      icon: 'solar:eye-broken',
      callback: (element) => this.getDocument(String(element.id)),
    },
    {
      title: 'Update',
      icon: 'radix-icons:update',
      callback: (element) => this.updateDocument(String(element.id)),
    },
    {
      title: 'Delete',
      icon: 'iwwa:delete',
      callback: (element) => this.deleteDocument(String(element.id)),
    },
  ];

  public tableColumns: ITableCell[] = [
    { def: 'authorName', key: 'authorName', label: 'Author name' },
    { def: 'active', key: 'active', label: 'Status' },
  ];

  constructor(
    private alertService: AlertService,
    private firebaseExampleService: FirebaseExampleService
  ) {}

  ngOnInit() {
    this.getDocuments();
  }

  private handleError(error: any) {
    console.log(error);
    this.alertService.snackBar.open(this.errorMessage, 'close');
  }

  public getDocuments() {
    this.firebaseExampleService
      .getAll<IExampleFirebaseDocument[]>()
      .then((response) => {
        console.log('[GET ALL]: ', response);

        this.pagination = {
          ...this.pagination,
          totalItems: response.length,
        };

        this.documents = response;
        this.handlePaginate(response);
      })
      .catch((error) => this.handleError(error));
  }

  public getDocument(id: string) {
    this.firebaseExampleService
      .getById<IExampleFirebaseDocument>(id)
      .then((response) => {
        console.log('[GET BY ID]: ', response);
        this.alertService.snackBar.open(response.description, 'close');
      })
      .catch((error) => this.handleError(error));
  }

  public createDocument() {
    const categoryRef = this.firebaseExampleService.getDocumentReference(
      'DocumentId',
      'CollectionName'
    );

    this.firebaseExampleService
      .create<IExampleFirebaseDocument>({
        active: false,
        userApprover: null,
        description: 'Test',
        category: categoryRef,
        creationDate: new Date(),
        authorName: `Create ${Math.random()}`,
      })
      .then((response) => {
        console.log('[Create]: ', response);
        this.getDocuments();
      })
      .catch((error) => this.handleError(error));
  }

  public updateDocument(id: string) {
    this.firebaseExampleService
      .update<Partial<IExampleFirebaseDocument>>(id, {
        authorName: `Edit ${Math.random()}`,
      })
      .then((response) => {
        console.log('[UPDATE]: ', response);
        this.getDocuments();
      })
      .catch((error) => this.handleError(error));
  }

  public deleteDocument(id: string) {
    this.firebaseExampleService
      .delete(id)
      .then((response) => {
        console.log('[DELETE]: ', response);
        this.getDocuments();
      })
      .catch((error) => this.handleError(error));
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

interface IExampleFirebaseDocument {
  id?: string;
  active: boolean;
  authorName: string;
  description: string;

  category: any;
  userApprover: any;
  creationDate: any;
}
