import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingStore } from '../../../../../store/loading.store';
import { AppFormGeneratorComponent } from '../../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../../@core/components/_form-generator/form-generator.service';
import { AlertService } from '../../../../@core/services/alert.service';
import { AppPageNavComponent } from '../../../../@shared/components/app-page-nav/app-page-nav.component';
import { IUserDB } from '../../../../@shared/interface/user.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';

interface IUserForm extends IUserDB {}
@Component({
  standalone: true,
  selector: 'app-user-register',
  styleUrl: './user-register.component.scss',
  templateUrl: './user-register.component.html',
  imports: [AppPageNavComponent, RouterLink, AppFormGeneratorComponent],
})
export class UserRegisterComponent {
  public loadingStore = inject(LoadingStore);
  public form = this.formGeneratorService.init<IUserForm>([
    [{ name: 'name', type: 'input', label: 'Nome' }],
    [
      {
        name: 'email',
        type: 'input',
        label: 'Email',
        additional: { inputType: 'email' },
      },
      { name: 'role', type: 'select', label: 'Tipo de usuário' },
    ],
    [
      {
        label: 'Foto',
        type: 'image-cropper',
        name: 'profileImageURL',
      },
    ],
  ]);

  constructor(
    private alertService: AlertService,
    private databaseService: DatabaseService,
    private formGeneratorService: FormGeneratorService
  ) {}

  public handleSubmit(model: IUserForm) {
    console.log(model);
  }
}
