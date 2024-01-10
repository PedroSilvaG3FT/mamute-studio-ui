import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoadingStore } from '../../../../../store/loading.store';
import { AppTableComponent } from '../../../../@core/components/app-table/app-table.component';
import { AppFileUploadComponent } from '../../../../@core/components/form/app-file-upload/app-file-upload.component';
import { filterListPagination } from '../../../../@core/functions/pagination.function';
import { IPagination } from '../../../../@core/interfaces/app-pagination.interface';
import {
  ITableCell,
  ITableCellAction,
} from '../../../../@core/interfaces/app-table.interface';
import { AlertService } from '../../../../@core/services/alert.service';
import { SUPABASE_BUCKETS } from '../../../../@core/supabase/@constants/bucket.constant';
import { ISupabaseStorageFile } from '../../../../@core/supabase/@interfaces/supabase-storage.interface';
import { SupabaseStorageService } from '../../../../@core/supabase/supabase-storage.service';

@Component({
  standalone: true,
  selector: 'doc-supabase-storage',
  styleUrl: './supabase-storage.component.scss',
  templateUrl: './supabase-storage.component.html',
  imports: [
    FormsModule,
    MatButtonModule,
    AppTableComponent,
    AppFileUploadComponent,
  ],
})
export class SupabaseStorageComponent {
  public loadingStore = inject(LoadingStore);
  public fileUpload?: File[];

  public readonly path = 'example';
  public readonly bucket = SUPABASE_BUCKETS.default;
  private readonly errorMessage = `An error occurred while processing the request`;

  public files: ISupabaseStorageFile[] = [];
  public tableData: ISupabaseStorageFile[] = [];
  public pagination: IPagination = {
    pageSize: 5,
    pageNumber: 1,
    totalItems: 0,
    pageSizeOptions: [5, 10, 20, 50],
  };

  public tableActions: ITableCellAction<ISupabaseStorageFile>[] = [
    {
      title: 'View',
      icon: 'material-symbols:download',
      callback: (element) => this.downloadFile(element),
    },
    {
      title: 'Delete',
      icon: 'iwwa:delete',
      callback: (element) => this.removeFile(element),
    },
    {
      title: 'URL',
      icon: 'ion:link-sharp',
      callback: (element) => this.getUrl(element),
    },
  ];

  public tableColumns: ITableCell[] = [
    { def: 'name', key: 'name', label: 'Name' },
  ];

  constructor(
    private alertService: AlertService,
    private supabaseStorageService: SupabaseStorageService
  ) {}

  ngOnInit() {
    this.getFiles();
  }

  private getFullPathFile(file: ISupabaseStorageFile) {
    return `${this.path}/${file.name}`;
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

    this.loadingStore.setState(true);

    this.supabaseStorageService
      .upload(this.bucket, this.path, this.fileUpload[0])
      .then(() => {
        this.getFiles();
        this.fileUpload = undefined;
      })
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public removeFile(file: ISupabaseStorageFile) {
    this.loadingStore.setState(true);
    const fullPaths = [this.getFullPathFile(file)];

    this.supabaseStorageService
      .delete(this.bucket, fullPaths)
      .then(() => this.getFiles())
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public downloadFile(file: ISupabaseStorageFile) {
    this.loadingStore.setState(true);

    this.supabaseStorageService
      .download(this.bucket, this.getFullPathFile(file))
      .then(() => {})
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public getUrl(file: ISupabaseStorageFile) {
    const { data } = this.supabaseStorageService.getPublicURL(
      this.bucket,
      this.getFullPathFile(file)
    );

    this.alertService.snackBar.open(data.publicUrl, 'close');
  }

  public getFiles() {
    this.loadingStore.setState(true);

    this.supabaseStorageService
      .getAll(this.bucket, this.path)
      .then((response) => {
        this.pagination = {
          ...this.pagination,
          totalItems: response.data.length,
        };

        this.files = response.data;
        this.handlePaginate(response.data);
      })
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
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
