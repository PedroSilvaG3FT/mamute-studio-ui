import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { LoadingStore } from '../../../../../store/loading.store';
import { AppFormGeneratorComponent } from '../../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../../@core/components/_form-generator/form-generator.service';
import { AlertService } from '../../../../@core/services/alert.service';
import { AppPageNavComponent } from '../../../../@shared/components/app-page-nav/app-page-nav.component';
import { INewsDB } from '../../../../@shared/interface/news.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';
import { NewsPartnerComponent } from './news-partner/news-partner.component';

interface INewsForm extends INewsDB {
  bannerFile: File[];
}

@Component({
  standalone: true,
  selector: 'app-news-register',
  styleUrl: './news-register.component.scss',
  templateUrl: './news-register.component.html',
  imports: [
    RouterLink,
    MatTabsModule,
    AppPageNavComponent,
    NewsPartnerComponent,
    AppFormGeneratorComponent,
  ],
})
export class NewsRegisterComponent {
  public loadingStore = inject(LoadingStore);
  public form = this.formGeneratorService.init<INewsForm>([
    [
      {
        label: 'Ativo',
        name: 'active',
        type: 'checkbox',
        additional: { checkbox: { isToggle: true } },
      },
    ],
    [{ name: 'title', type: 'input', label: 'Título' }],
    [{ name: 'contentHTML', type: 'text-editor', label: 'Conteúdo' }],
    [{ name: 'bannerURL', type: 'image-cropper', label: 'Capa' }],
  ]);

  constructor(
    private alertService: AlertService,
    private databaseService: DatabaseService,
    private formGeneratorService: FormGeneratorService
  ) {}

  public handleSubmit(model: INewsForm) {
    console.log(model);
  }
}
