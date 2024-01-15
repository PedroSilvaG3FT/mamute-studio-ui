import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { AuthStore } from '../../../../store/auth.store';
import { LoadingStore } from '../../../../store/loading.store';
import { AppFormGeneratorComponent } from '../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../@core/components/_form-generator/form-generator.service';
import { FirebaseAuthenticationService } from '../../../@core/firebase/firebase-authentication.service';
import { AlertService } from '../../../@core/services/alert.service';
import { UserRole } from '../../enums/user-role.enum';
import { IAuthCredential } from '../../interfaces/authentication.interface';

@Component({
  standalone: true,
  selector: 'app-login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
  imports: [AppFormGeneratorComponent, RouterLink],
})
export class LoginComponent {
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
    private router: Router,
    private alertService: AlertService,
    private formGeneratorService: FormGeneratorService,
    private firebaseAuthenticationService: FirebaseAuthenticationService
  ) {}

  ngOnInit() {}

  private getUserRole(roleReference: string): UserRole {
    if (roleReference.includes(String(UserRole.admin))) return UserRole.admin;
    else if (roleReference.includes(String(UserRole.member)))
      return UserRole.member;
    else return UserRole.member;
  }

  public handleSubmit(model: IAuthCredential) {
    this.loadingStore.setState(true);

    this.firebaseAuthenticationService
      .signIn(model)
      .then((response) => {
        const { refreshToken, accessToken, data } = response.user;

        this.authStore.setUserData({
          ...data,
          creationDate: (data.creationDate as Timestamp).toDate(),
        });

        this.authStore.setFirebaseToken(accessToken);
        this.authStore.setFirebaseRefreshToken(refreshToken);
        this.authStore.setUserRole(this.getUserRole(data.role));

        this.handleLogin();
      })
      .catch((error) => {
        console.log(error);
        this.alertService.snackDefaultResponseError();
      })
      .finally(() => this.loadingStore.setState(false));
  }

  public handleLogin() {
    const redirectURLs = {
      [UserRole.admin]: '/admin/event',
      [UserRole.member]: '/',
    };

    console.log('trertert :::', this.authStore.userRole());
    const role = this.authStore.userRole();
    console.log(role);
    this.router.navigate([redirectURLs[role]]);
  }
}
