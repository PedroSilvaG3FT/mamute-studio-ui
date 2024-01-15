import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoadingStore } from '../../../../store/loading.store';
import { AppFormGeneratorComponent } from '../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../@core/components/_form-generator/form-generator.service';
import { FirebaseAuthenticationService } from '../../../@core/firebase/firebase-authentication.service';
import { AlertService } from '../../../@core/services/alert.service';
import { IAuthForgotPassword } from '../../interfaces/authentication.interface';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  styleUrl: './forgot-password.component.scss',
  templateUrl: './forgot-password.component.html',
  imports: [AppFormGeneratorComponent, RouterLink],
})
export class ForgotPasswordComponent {
  public loadingStore = inject(LoadingStore);
  public form = this.formGeneratorService.init<IAuthForgotPassword>([
    [
      {
        name: 'email',
        type: 'input',
        label: 'email',
        validators: [Validators.required],
        additional: { inputType: `email` },
      },
    ],
  ]);

  constructor(
    private alertService: AlertService,
    private formGeneratorService: FormGeneratorService,
    private firebaseAuthenticationService: FirebaseAuthenticationService
  ) {}

  ngOnInit() {}

  public handleSubmit(model: IAuthForgotPassword) {
    this.loadingStore.setState(true);

    this.firebaseAuthenticationService
      .recoveryPassword(model.email)
      .then(() => {
        this.alertService.snackBar.open(
          'E-mail de recuperção enviado!',
          'Fechar'
        );

        this.form.group.reset();
      })
      .catch(() => this.alertService.snackDefaultResponseError())
      .finally(() => this.loadingStore.setState(false));
  }
}
