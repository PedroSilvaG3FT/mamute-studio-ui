import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoadingStore } from '../../../../store/loading.store';
import { AppEmptyListComponent } from '../../../@core/components/app-empty-list/app-empty-list.component';
import { AppFileUploadComponent } from '../../../@core/components/form/app-file-upload/app-file-upload.component';
import { AnimateDirective } from '../../../@core/directives/animate.directive';
import { FirebaseStorageService } from '../../../@core/firebase/firebase-storage.service';
import { AlertService } from '../../../@core/services/alert.service';

@Component({
  standalone: true,
  selector: 'admin-gallery-register',
  styleUrl: './admin-gallery-register.component.scss',
  templateUrl: './admin-gallery-register.component.html',
  imports: [
    FormsModule,
    MatButtonModule,
    AnimateDirective,
    AppEmptyListComponent,
    AppFileUploadComponent,
  ],
})
export class AdminGalleryRegisterComponent {
  @Input({ required: true }) path: string = '';
  @Input({ required: true }) images: string[] = [];

  @Output() onChange = new EventEmitter();
  @ViewChild(AppFileUploadComponent) appFileUploadRef!: AppFileUploadComponent;

  public loadingStore = inject(LoadingStore);

  public files: File[] = [];
  public imagesControl: IGalleryImageControlItem[] = [];

  constructor(
    private alertService: AlertService,
    private firebaseStorageService: FirebaseStorageService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes['images'].currentValue) this.getImages();
  }

  public async getImages() {
    try {
      this.loadingStore.setState(true);
      const images: IGalleryImageControlItem[] = [];

      for await (let path of this.images) {
        images.push({
          path,
          url: await this.firebaseStorageService.download(path, true),
        });
      }

      this.imagesControl = images;
      this.loadingStore.setState(false);
    } catch (error) {
      this.loadingStore.setState(false);
      this.alertService.snackDefaultResponseError(error);
    }
  }

  public async handleAdd() {
    try {
      const images: string[] = [];
      this.loadingStore.setState(true);

      for await (let file of this.files) {
        images.push(await this.handleUploadImage(file));
      }

      this.files = [];
      this.appFileUploadRef.clearFileSelection();
      this.onChange.emit([...this.images, ...images]);
      this.loadingStore.setState(false);
    } catch (error) {
      this.loadingStore.setState(false);
      this.alertService.snackDefaultResponseError(error);
    }
  }

  public handleRemove(item: IGalleryImageControlItem) {
    this.loadingStore.setState(true);

    this.firebaseStorageService
      .delete(item.path)
      .then(() => {
        this.images = this.images.filter((path) => path !== item.path);
        this.onChange.emit(this.images);
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  private async handleUploadImage(file: File) {
    try {
      const path = `${this.firebaseStorageService.getUserPath()}/${this.path}`;
      const response = await this.firebaseStorageService.upload(file, path);
      return response.metadata.fullPath;
    } catch (error) {
      throw error;
    }
  }
}

interface IGalleryImageControlItem {
  path: string;
  url: string;
}
