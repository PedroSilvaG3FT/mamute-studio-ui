import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { LoadingStore } from '../../../../../store/loading.store';
import { FirebaseStorageService } from '../../../../@core/firebase/firebase-storage.service';
import { AlertService } from '../../../../@core/services/alert.service';
import {
  IEventDB,
  IEventItem,
} from '../../../../@shared/interface/event.interface';
import {
  IPartnerDB,
  IPartnerItem,
} from '../../../../@shared/interface/partner.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';
import { PortalGalleryComponent } from '../../../components/portal-gallery/portal-gallery.component';
import { PortalPartnerListComponent } from '../../../components/portal-partner-list/portal-partner-list.component';

@Component({
  standalone: true,
  selector: 'portal-event-detail',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './event-detail.component.scss',
  templateUrl: './event-detail.component.html',
  imports: [
    DatePipe,
    HttpClientModule,
    MatTooltipModule,
    PortalGalleryComponent,
    PortalPartnerListComponent,
  ],
})
export class EventDetailComponent {
  @ViewChild('mapContainer', { static: true }) mapContainer:
    | ElementRef
    | undefined;

  public eventId = signal('');
  public galleryImages: string[] = [];
  public partners: IPartnerItem[] = [];
  public event: IEventItem = {} as IEventItem;

  public loadingStore = inject(LoadingStore);

  constructor(
    private renderer: Renderer2,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService,
    private firebaseStorageService: FirebaseStorageService
  ) {}

  ngOnInit() {
    this.eventId.set(this.activatedRoute.snapshot.params['id']);
    this.getEvent();
  }

  public getEvent() {
    this.loadingStore.setState(true);
    this.databaseService.event
      .getById<IEventDB>(this.eventId())
      .then((response) => {
        this.event = this.databaseService._model.event.buildItem(response);

        if (this.mapContainer) {
          this.renderer.setProperty(
            this.mapContainer.nativeElement,
            'innerHTML',
            this.event.addressMapHTML
          );
        }

        this.getPartners();
        this.initGallery();
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public async initGallery() {
    try {
      for await (let path of this.event.images) {
        const url = await this.firebaseStorageService.download(path, true);
        this.galleryImages.push(url);
      }
    } catch (error) {
      throw error;
    }
  }

  public async getPartners() {
    try {
      for await (let item of this.event.partners) {
        const response = await this.databaseService.partner.getById<IPartnerDB>(
          item
        );

        const partner = this.databaseService._model.partner.buildItem(response);
        this.partners.push(partner);
      }
    } catch (error) {
      throw error;
    }
  }
}
