import { Component, computed, inject, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingStore } from '../../../../../store/loading.store';
import { SeedStore } from '../../../../../store/seed.store';
import { AppFormGeneratorComponent } from '../../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../../@core/components/_form-generator/form-generator.service';
import { FIREBASE_STORAGE_PATH } from '../../../../@core/firebase/@constans/firebase-storage.contant';
import { FirebaseStorageService } from '../../../../@core/firebase/firebase-storage.service';
import { AlertService } from '../../../../@core/services/alert.service';
import { DownloadUtil } from '../../../../@core/util/download.util';
import { AppPageNavComponent } from '../../../../@shared/components/app-page-nav/app-page-nav.component';
import {
  IPartnerDB,
  IPartnerItem,
} from '../../../../@shared/interface/partner.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';
import { PartnerAdvertingComponent } from './partner-adverting/partner-adverting.component';

interface IPartnerForm extends IPartnerItem {}
@Component({
  standalone: true,
  selector: 'app-partner-register',
  styleUrl: './partner-register.component.scss',
  templateUrl: './partner-register.component.html',
  imports: [
    RouterLink,
    MatTabsModule,
    AppPageNavComponent,
    PartnerAdvertingComponent,
    AppFormGeneratorComponent,
  ],
})
export class PartnerRegisterComponent {
  public partnerId = signal('');
  private partner: IPartnerItem = {} as IPartnerItem;
  public isNew = computed(() => !this.partnerId());
  public pageTitle = computed(() =>
    !!this.isNew() ? `Cadastro de parceiro` : `Edição de parceiro`
  );

  public seedStore = inject(SeedStore);
  public loadingStore = inject(LoadingStore);
  public form = this.formGeneratorService.init<IPartnerForm>([
    [
      {
        label: 'Ativo',
        name: 'active',
        type: 'checkbox',
        additional: { checkbox: { isToggle: true } },
      },
    ],
    [{ name: 'name', type: 'input', label: 'Nome' }],
    [
      { name: 'telephone', type: 'input', label: 'Telefone de contato' },
      {
        name: 'email',
        type: 'input',
        label: 'Email',
        additional: { inputType: 'email' },
      },
    ],
    [
      { name: 'category', type: 'select', label: 'Categoria' },
      { name: 'portfolioURL', type: 'input', label: 'Link portifólio' },
    ],
    [
      {
        type: 'textarea',
        label: 'Descrição',
        name: 'occupationDescription',
      },
    ],
    [
      {
        label: 'Logo',
        name: 'imageURL',
        type: 'image-cropper',
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
    this.partnerId.set(this.activatedRoute.snapshot.params['id']);
    if (!this.isNew()) this.getPartner();

    this.form.setOptionsField(
      'category',
      this.seedStore.partnerCategoriesOptions()
    );
  }

  public getPartner() {
    this.loadingStore.setState(true);
    this.databaseService.partner
      .getById<IPartnerDB>(this.partnerId())
      .then((response) => {
        console.log('GET BY ID', response);
        this.partner = this.databaseService._model.partner.buildItem(response);
        this.form.group.patchValue({
          name: this.partner.name,
          email: this.partner.email,
          active: this.partner.active,
          imageURL: this.partner.imageURL,
          category: this.partner.category,
          telephone: this.partner.telephone,
          portfolioURL: this.partner.portfolioURL,
          occupationDescription: this.partner.occupationDescription,
        });
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public handleSubmit(model: IPartnerForm) {
    console.log(model);

    if (this.isNew()) this.handleCreate(model);
    else this.handleUpdate(model);
  }

  public async handleCreateImageUrl(fileBlobURL: string) {
    try {
      const path = `${this.firebaseStorageService.getUserPath()}/${
        FIREBASE_STORAGE_PATH.partner
      }`;

      const file = await DownloadUtil.stringBlobToFile(fileBlobURL);
      const response = await this.firebaseStorageService.upload(file, path);
      return this.firebaseStorageService.download(
        response.metadata.fullPath,
        true
      );
    } catch (error) {
      throw error;
    }
  }

  public async handleCreate(model: IPartnerForm) {
    try {
      if (!model.imageURL) {
        this.alertService.snackBar.open(
          'Insira uma imagem para o parceiro',
          'fechar'
        );
        return;
      }

      this.loadingStore.setState(true);

      if (!!model.imageURL) {
        const imageURL = await this.handleCreateImageUrl(model.imageURL);
        model.imageURL = imageURL;
      }

      const partnerDTO =
        this.databaseService._model.partner.buildRegisterDTO(model);
      const response = await this.databaseService.partner.create(partnerDTO);
      this.router.navigate(['/admin/partner/register', response.id]);

      this.loadingStore.setState(false);
    } catch (error) {
      console.log(error);
      this.loadingStore.setState(false);
      this.alertService.snackDefaultResponseError(error);
    }
  }

  public async handleUpdate(model: IPartnerForm) {
    try {
      this.loadingStore.setState(true);

      if (!!model.imageURL) {
        const imageURL = await this.handleCreateImageUrl(model.imageURL);
        model.imageURL = imageURL;
      } else model.imageURL = this.partner.imageURL;

      const partnerDTO =
        this.databaseService._model.partner.buildRegisterDTO(model);
      await this.databaseService.partner.update(this.partnerId(), partnerDTO);
      this.loadingStore.setState(false);
    } catch (error) {
      this.loadingStore.setState(false);
      this.alertService.snackDefaultResponseError(error);
    }
  }
}
