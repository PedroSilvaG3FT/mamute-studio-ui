import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { LoadingStore } from '../../../../../store/loading.store';
import { AppFormGeneratorComponent } from '../../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../../@core/components/_form-generator/form-generator.service';
import { AlertService } from '../../../../@core/services/alert.service';
import { AppPageNavComponent } from '../../../../@shared/components/app-page-nav/app-page-nav.component';
import { IPartnerDB } from '../../../../@shared/interface/partner.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';
import { PartnerAdvertingComponent } from './partner-adverting/partner-adverting.component';

export interface IPartnerForm extends IPartnerDB {
  imageFile: File[];
}
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
    private alertService: AlertService,
    private databaseService: DatabaseService,
    private formGeneratorService: FormGeneratorService
  ) {}

  public handleSubmit(model: IPartnerForm) {
    console.log(model);
  }
}
