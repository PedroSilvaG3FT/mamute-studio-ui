import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthStore } from '../../../../store/auth.store';
import { LoadingStore } from '../../../../store/loading.store';
import { AppFormGeneratorComponent } from '../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../@core/components/_form-generator/form-generator.service';
import { FirebaseAuthenticationService } from '../../../@core/firebase/firebase-authentication.service';
import { AlertService } from '../../../@core/services/alert.service';
import { UserRole } from '../../../authentication/enums/user-role.enum';
import {
  IAuthCredential,
  IAuthRegister,
} from '../../../authentication/interfaces/authentication.interface';
import { DatabaseService } from '../../services/database.service';

@Component({
  standalone: true,
  selector: 'app-modal-register',
  imports: [AppFormGeneratorComponent],
  styleUrl: './modal-register.component.scss',
  templateUrl: './modal-register.component.html',
})
export class ModalRegisterComponent {
  public authStore = inject(AuthStore);
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
    private databaseService: DatabaseService,
    private formGeneratorService: FormGeneratorService,
    public dialogRef: MatDialogRef<ModalRegisterComponent>,
    private firebaseAuthenticationService: FirebaseAuthenticationService
  ) {}

  ngOnInit() {}

  public handleSubmit(model: IAuthRegister) {
    this.loadingStore.setState(true);

    this.firebaseAuthenticationService
      .signUp(model, UserRole.member)
      .then(() => {
        this.handleLogin({
          email: model.email,
          password: String(model.password),
        });
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  private getUserRole(roleReference: string): UserRole {
    if (roleReference.includes(String(UserRole.admin))) return UserRole.admin;
    else if (roleReference.includes(String(UserRole.member)))
      return UserRole.member;
    else return UserRole.member;
  }

  public handleClose() {
    this.dialogRef.close();
  }

  public handleLogin(model: IAuthCredential) {
    this.loadingStore.setState(true);

    this.firebaseAuthenticationService
      .signIn(model)
      .then((response) => {
        const { refreshToken, accessToken, data } = response.user;

        const userData = this.databaseService._model.user.buildItem(data);
        this.authStore.setUserData(userData);

        this.authStore.setFirebaseToken(accessToken);
        this.authStore.setFirebaseRefreshToken(refreshToken);
        this.authStore.setUserRole(this.getUserRole(userData.role));

        this.handleClose();
      })
      .catch((error) => {
        this.alertService.snackDefaultResponseError();
      })
      .finally(() => this.loadingStore.setState(false));
  }
}
