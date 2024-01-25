import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthStore } from '../../../../../store/auth.store';
import { LoadingStore } from '../../../../../store/loading.store';
import { FirebaseStorageService } from '../../../../@core/firebase/firebase-storage.service';
import { AlertService } from '../../../../@core/services/alert.service';
import { StringUtil } from '../../../../@core/util/string.util';
import { ModalRequestLoginComponent } from '../../../../@shared/components/modal-request-login/modal-request-login.component';
import { EventTicketFacade } from '../../../../@shared/facade/event-ticket.facade';
import {
  IEventDB,
  IEventItem,
  IEventTicketDB,
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
    RouterModule,
    MatButtonModule,
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

  public authStore = inject(AuthStore);
  public loadingStore = inject(LoadingStore);

  public isPresenceConfirmed = computed(() => {
    return this.eventTicketFacade._store
      .userTickets()
      .some((item) => item.event === this.eventId());
  });

  constructor(
    public dialog: MatDialog,
    private renderer: Renderer2,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService,
    private eventTicketFacade: EventTicketFacade,
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

  public handleConfirmPresence() {
    if (!this.authStore.isLogged()) {
      this.dialog.open(ModalRequestLoginComponent);
      return;
    }

    this.loadingStore.setState(true);

    const ticketDTO = this.databaseService._model.eventTicket.buildRegisterDTO({
      active: true,
      event: this.eventId(),
      creationDate: new Date(),
      eventDate: this.event.date,
      eventName: this.event.title,
      userName: this.authStore.userData().name,
      number: StringUtil.generateTicketNumber(),
      user: String(this.authStore.userData().id),
    });

    this.databaseService.eventTicket
      .create<IEventTicketDB>(ticketDTO)
      .then(() => this.eventTicketFacade.setUserLoggedTickets())
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }
}
