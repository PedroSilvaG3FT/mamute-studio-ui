import { Component, computed, inject, signal } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingStore } from '../../../../../store/loading.store';
import { AppFormGeneratorComponent } from '../../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../../@core/components/_form-generator/form-generator.service';
import { FIREBASE_STORAGE_PATH } from '../../../../@core/firebase/@constans/firebase-storage.contant';
import { FirebaseStorageService } from '../../../../@core/firebase/firebase-storage.service';
import { AlertService } from '../../../../@core/services/alert.service';
import { AppPageNavComponent } from '../../../../@shared/components/app-page-nav/app-page-nav.component';
import {
  IEventDB,
  IEventItem,
} from '../../../../@shared/interface/event.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';
import { AdminGalleryRegisterComponent } from '../../../components/admin-gallery-register/admin-gallery-register.component';
import { AdminPartnerSelectionComponent } from '../../../components/admin-partner-selection/admin-partner-selection.component';
import { EventTestimonialComponent } from './event-testimonial/event-testimonial.component';

interface IEventForm extends IEventItem {
  bannerFile?: File[];
}
@Component({
  standalone: true,
  selector: 'admin-event-register',
  styleUrl: './event-register.component.scss',
  templateUrl: './event-register.component.html',
  imports: [
    RouterLink,
    MatTabsModule,
    AppPageNavComponent,
    EventTestimonialComponent,
    AppFormGeneratorComponent,
    AdminGalleryRegisterComponent,
    AdminPartnerSelectionComponent,
  ],
})
export class EventRegisterComponent {
  public readonly galleryPath = FIREBASE_STORAGE_PATH.event;

  public eventId = signal('');
  public event: IEventItem = {} as IEventItem;
  public isNew = computed(() => !this.eventId());
  public pageTitle = computed(() =>
    !!this.isNew() ? `Cadastro de evento` : `Edição de evento`
  );

  public loadingStore = inject(LoadingStore);
  public form = this.formGeneratorService.init<IEventForm>([
    [
      {
        name: 'active',
        label: 'Ativo',
        type: 'checkbox',
        validators: [Validators.required],
        additional: { checkbox: { isToggle: true } },
      },
    ],
    [
      {
        name: 'title',
        type: 'input',
        label: 'Nome',
        validators: [Validators.required],
      },
      {
        name: 'date',
        type: 'datepicker',
        label: 'Data do evento',
        validators: [Validators.required],
      },
    ],
    [
      {
        type: 'input',
        name: 'streamURL',
        label: 'Link de transmissão',
        validators: [Validators.required],
      },
      {
        type: 'datepicker',
        name: 'dateReleaseStream',
        validators: [Validators.required],
        label: 'Data de liberação (transmissão)',
      },
    ],
    [
      {
        type: 'input',
        name: 'addressName',
        label: 'Descrição de endereço',
        validators: [Validators.required],
      },
      {
        type: 'input',
        name: 'addressURL',
        validators: [Validators.required],
        label: 'Link de endereço (Google Maps)',
      },
    ],
    [
      {
        type: 'textarea',
        name: 'addressMapHTML',
        validators: [Validators.required],
        label: 'Código do mapa (Google Maps)',
      },
    ],
    [{ name: 'shortDescription', type: 'textarea', label: 'Descrição curta' }],
    [
      {
        label: 'Descrição',
        name: 'contentHTML',
        type: 'text-editor',
        validators: [Validators.required],
        additional: { checkbox: { isToggle: true } },
      },
    ],
    [
      {
        name: 'bannerFile',
        type: 'file-upload',
        label: 'Imagem de capa',
        additional: { fileUpload: { maxFiles: 1 } },
      },
    ],
  ]);

  constructor(
    private router: Router,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService,
    private formGeneratorService: FormGeneratorService,
    private firebaseStorageService: FirebaseStorageService
  ) {}

  ngOnInit() {
    this.eventId.set(this.activatedRoute.snapshot.params['id']);
    if (!this.isNew()) this.getEvent();
  }

  public getEvent() {
    this.loadingStore.setState(true);
    this.databaseService.event
      .getById<IEventDB>(this.eventId())
      .then((response) => {
        this.event = this.databaseService._model.event.buildItem(response);

        this.form.group.patchValue({
          date: this.event.date,
          title: this.event.title,
          active: this.event.active,
          streamURL: this.event.streamURL,
          bannerURL: this.event.bannerURL,
          addressURL: this.event.addressURL,
          addressName: this.event.addressName,
          contentHTML: this.event.contentHTML,
          addressMapHTML: this.event.addressMapHTML,
          shortDescription: this.event.shortDescription,
          dateReleaseStream: this.event.dateReleaseStream,
        });
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public handleSubmit(model: IEventForm) {
    if (this.isNew()) this.handleCreate(model);
    else this.handleUpdate(model);
  }

  public async handleCreateBannerUrl(file: File) {
    try {
      const path = `${this.firebaseStorageService.getUserPath()}/${
        FIREBASE_STORAGE_PATH.event
      }`;
      const response = await this.firebaseStorageService.upload(file, path);
      return this.firebaseStorageService.download(
        response.metadata.fullPath,
        true
      );
    } catch (error) {
      throw error;
    }
  }

  public async handleCreate(model: IEventForm) {
    try {
      if (!model.bannerFile?.length) {
        this.alertService.snackBar.open(
          'Insira uma imagem de capa para o evento',
          'fechar'
        );
        return;
      }

      this.loadingStore.setState(true);

      if (!!model.bannerFile) {
        const bannerURL = await this.handleCreateBannerUrl(model.bannerFile[0]);
        model.bannerURL = bannerURL;
      }

      delete model.bannerFile;

      const eventDTO =
        this.databaseService._model.event.buildRegisterDTO(model);

      const response = await this.databaseService.event.create(eventDTO);
      this.router.navigate(['/admin/event/register', response.id]);

      this.loadingStore.setState(false);
    } catch (error) {
      this.loadingStore.setState(false);
      this.alertService.snackDefaultResponseError(error);
    }
  }

  public async handleUpdate(model: IEventForm) {
    try {
      this.loadingStore.setState(true);

      if (!!model.bannerFile) {
        const bannerURL = await this.handleCreateBannerUrl(model.bannerFile[0]);
        model.bannerURL = bannerURL;
      } else model.bannerURL = this.event.bannerURL;

      delete model.bannerFile;

      const eventDTO = this.databaseService._model.event.buildRegisterDTO({
        ...this.event,
        ...model,
      });

      await this.databaseService.event.update(this.eventId(), eventDTO);

      this.event = {
        ...this.event,
        ...model,
        images: model.images || this.event.images,
        partners: model.partners || this.event.partners,
      };

      this.loadingStore.setState(false);
    } catch (error) {
      this.loadingStore.setState(false);
      this.alertService.snackDefaultResponseError(error);
    }
  }

  public handlePartnerChange(partners: string[]) {
    this.handleUpdate({ ...this.event, partners });
  }

  public handleGalleryChange(images: string[]) {
    this.handleUpdate({ ...this.event, images });
  }
}
