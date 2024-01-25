import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../../../store/auth.store';
import { LoadingStore } from '../../../../store/loading.store';
import { AppFormGeneratorComponent } from '../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../@core/components/_form-generator/form-generator.service';
import { FirebaseAuthenticationService } from '../../../@core/firebase/firebase-authentication.service';
import { AlertService } from '../../../@core/services/alert.service';
import { UserRole } from '../../../authentication/enums/user-role.enum';
import { IAuthCredential } from '../../../authentication/interfaces/authentication.interface';
import { EventTicketFacade } from '../../facade/event-ticket.facade';
import { DatabaseService } from '../../services/database.service';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';

@Component({
  standalone: true,
  selector: 'app-modal-login',
  styleUrl: './modal-login.component.scss',
  templateUrl: './modal-login.component.html',
  imports: [AppFormGeneratorComponent, RouterLink],
})
export class ModalLoginComponent {
  public authStore = inject(AuthStore);
  public loadingStore = inject(LoadingStore);
  public form = this.formGeneratorService.init<IAuthCredential>([
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
        name: 'password',
        label: 'Password',
        validators: [Validators.required],
        additional: { inputType: `password` },
      },
    ],
  ]);

  constructor(
    public dialog: MatDialog,
    private alertService: AlertService,
    private databaseService: DatabaseService,
    private eventTicketFacade: EventTicketFacade,
    private formGeneratorService: FormGeneratorService,
    public dialogRef: MatDialogRef<ModalLoginComponent>,
    private firebaseAuthenticationService: FirebaseAuthenticationService
  ) {}

  ngOnInit() {}

  private getUserRole(roleReference: string): UserRole {
    if (roleReference.includes(String(UserRole.admin))) return UserRole.admin;
    else if (roleReference.includes(String(UserRole.member)))
      return UserRole.member;
    else return UserRole.member;
  }

  public handleClose() {
    this.dialogRef.close();
  }

  public handleOpenSignUp() {
    this.handleClose();
    this.dialog.open(ModalRegisterComponent);
  }

  public handleSubmit(model: IAuthCredential) {
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

        this.eventTicketFacade.setUserLoggedTickets();

        this.handleClose();
      })
      .catch(() => this.alertService.snackDefaultResponseError())
      .finally(() => this.loadingStore.setState(false));
  }
}
