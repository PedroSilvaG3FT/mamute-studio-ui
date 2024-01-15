import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoadingStore } from '../../../../store/loading.store';
import { AppFormGeneratorComponent } from '../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../@core/components/_form-generator/form-generator.service';
import { FirebaseAuthenticationService } from '../../../@core/firebase/firebase-authentication.service';
import { AlertService } from '../../../@core/services/alert.service';
import { UserRole } from '../../enums/user-role.enum';
import { IAuthRegister } from '../../interfaces/authentication.interface';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  styleUrl: './sign-up.component.scss',
  templateUrl: './sign-up.component.html',
  imports: [AppFormGeneratorComponent, RouterLink],
})
export class SignUpComponent {
  public loadingStore = inject(LoadingStore);
  public form = this.formGeneratorService.init<IAuthRegister>([
    [
      {
        name: 'email',
        type: 'input',
        label: 'email',
        validators: [Validators.required],
        additional: { inputType: `email` },
      },
    ],
    [
      {
        type: 'input',
        label: 'Senha',
        name: 'password',
        validators: [Validators.required],
        additional: { inputType: `password` },
      },
    ],
    [
      {
        name: 'name',
        type: 'input',
        label: 'Nome',
        validators: [Validators.required],
      },
    ],
  ]);

  constructor(
    private alertService: AlertService,
    private formGeneratorService: FormGeneratorService,
    private firebaseAuthenticationService: FirebaseAuthenticationService
  ) {}

  ngOnInit() {}

  public handleSubmit(model: IAuthRegister) {
    this.loadingStore.setState(true);

    this.firebaseAuthenticationService
      .signUp(model, UserRole.admin)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        this.alertService.snackDefaultResponseError();
      })
      .finally(() => this.loadingStore.setState(false));
  }
}
