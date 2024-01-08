import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { StorageReference } from 'firebase/storage';
import { AppTableComponent } from '../../../@core/components/app-table/app-table.component';
import { AppFileUploadComponent } from '../../../@core/components/form/app-file-upload/app-file-upload.component';
import { FirebaseStorageService } from '../../../@core/firebase/firebase-storage.service';
import { filterListPagination } from '../../../@core/functions/pagination.function';
import { IPagination } from '../../../@core/interfaces/app-pagination.interface';
import {
  ITableCell,
  ITableCellAction,
} from '../../../@core/interfaces/app-table.interface';
import { AlertService } from '../../../@core/services/alert.service';

@Component({
  standalone: true,
  selector: 'firebase-storage-example',
  styleUrl: './firebase-storage-example.component.scss',
  templateUrl: './firebase-storage-example.component.html',
  imports: [
    FormsModule,
    MatButtonModule,
    AppTableComponent,
    AppFileUploadComponent,
  ],
})
export class FirebaseStorageExampleComponent {
  public fileUpload?: File[];
  public filesData: StorageReference[] = [];
  public readonly path = 'test';
  private readonly errorMessage = `An error occurred while processing the request`;

  public files: StorageReference[] = [];
  public tableData: StorageReference[] = [];
  public pagination: IPagination = {
    pageSize: 5,
    pageNumber: 1,
    totalItems: 0,
    pageSizeOptions: [5, 10, 20, 50],
  };

  public tableActions: ITableCellAction<StorageReference>[] = [
    {
      title: 'View',
      icon: 'material-symbols-light:download',
      callback: (element) => this.downloadFile(element),
    },
    {
      title: 'Delete',
      icon: 'iwwa:delete',
      callback: (element) => this.removeFile(element),
    },
  ];

  public tableColumns: ITableCell[] = [
    { def: 'name', key: 'name', label: 'Name' },
    { def: 'bucket', key: 'bucket', label: 'Bucket' },
  ];

  constructor(
    private alertService: AlertService,
    private firebaseStorageService: FirebaseStorageService
  ) {}

  ngOnInit() {
    this.getFiles();
  }

  private handleError(error: any) {
    console.log(error);
    this.alertService.snackBar.open(this.errorMessage, 'close');
  }

  public createFile() {
    if (!this.fileUpload) {
      this.alertService.snackBar.open('Insert file', 'close');
      return;
    }

    this.firebaseStorageService
      .upload(this.fileUpload[0], this.path)
      .then((response) => {
        console.log('[CREATE FILE]: ', response);
        this.alertService.snackBar.open('File created successfully', 'close');

        this.getFiles();
        this.fileUpload = undefined;
      })
      .catch((error) => this.handleError(error));
  }

  public removeFile(file: StorageReference) {
    this.firebaseStorageService
      .delete(file.fullPath)
      .then(() => {
        console.log('[REMOVE FILE]');
        this.getFiles();
      })
      .catch((error) => this.handleError(error));
  }

  public downloadFile(file: StorageReference) {
    this.firebaseStorageService
      .download(file.fullPath)
      .then((response) => {
        console.log('[DOWNLOAD FILE]: ', response);
      })
      .catch((error) => this.handleError(error));
  }

  public getFiles() {
    this.firebaseStorageService
      .getAll(this.path)
      .then((response) => {
        console.log('[GET FILES]: ', response);

        this.pagination = {
          ...this.pagination,
          totalItems: response.items.length,
        };

        this.files = response.items;
        this.handlePaginate(response.items);
      })
      .catch((error) => this.handleError(error));
  }

  public handlePaginate(items = this.files) {
    const { pageNumber, pageSize } = this.pagination;
    this.tableData = filterListPagination(items, pageNumber, pageSize);
  }

  public onPaginationChange(pagination: IPagination) {
    this.pagination = pagination;
    this.handlePaginate();
  }
}
