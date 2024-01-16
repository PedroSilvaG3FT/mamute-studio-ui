import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingStore } from '../../../../../../store/loading.store';
import { AppEmptyListComponent } from '../../../../../@core/components/app-empty-list/app-empty-list.component';
import { AppFileUploadComponent } from '../../../../../@core/components/form/app-file-upload/app-file-upload.component';
import { AlertService } from '../../../../../@core/services/alert.service';
import { DatabaseService } from '../../../../../@shared/services/database.service';

@Component({
  standalone: true,
  selector: 'admin-event-gallery',
  styleUrl: './event-gallery.component.scss',
  templateUrl: './event-gallery.component.html',
  imports: [AppFileUploadComponent, AppEmptyListComponent, FormsModule],
})
export class EventGalleryComponent {
  public loadingStore = inject(LoadingStore);

  public files: File[] = [];
  public images: any[] = [];

  constructor(
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
        console.log(response);
        this.images = response;
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }
}
