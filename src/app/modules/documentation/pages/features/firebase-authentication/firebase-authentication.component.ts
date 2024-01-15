import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthStore } from '../../../../../store/auth.store';
import { LoadingStore } from '../../../../../store/loading.store';
import { FirebaseAuthenticationService } from '../../../../@core/firebase/firebase-authentication.service';
import { AlertService } from '../../../../@core/services/alert.service';
import { SignInComponent } from '../../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../../components/sign-up/sign-up.component';
import { TerminalWindowComponent } from '../../../components/terminal-window/terminal-window.component';
import {
  IDocAuthenticationCredentials,
  IDocAuthenticationSignUp,
} from '../../../interfaces/doc-authentication.interface';

@Component({
  standalone: true,
  selector: 'app-firebase-authentication',
  styleUrl: './firebase-authentication.component.scss',
  templateUrl: './firebase-authentication.component.html',
  imports: [
    MatTabsModule,
    SignInComponent,
    SignUpComponent,
    TerminalWindowComponent,
  ],
})
export class FirebaseAuthenticationComponent {
  public authStore = inject(AuthStore);
  public loadingStore = inject(LoadingStore);
  private readonly errorMessage = `An error occurred while processing the request`;

  public jsonResponse: string = '';
  public credentials: IDocAuthenticationCredentials =
    {} as IDocAuthenticationCredentials;

  constructor(
    private alertService: AlertService,
    private firebaseAuthenticationService: FirebaseAuthenticationService
  ) {}

  private handleError(error: any) {
    console.log(error);
    this.alertService.snackBar.open(this.errorMessage, 'close');
  }

  public handleSubmitSignIn(data: IDocAuthenticationCredentials) {
    this.loadingStore.setState(true);

    this.firebaseAuthenticationService
      .signIn(data)
      .then((response) => {
        const { refreshToken, accessToken } = response.user;

        console.log(response);
        this.authStore.setFirebaseRefreshToken(refreshToken);
        this.jsonResponse = JSON.stringify(response);
        this.authStore.setFirebaseToken(accessToken);
      })
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public handleSubmitSignUp(data: IDocAuthenticationSignUp) {
    this.loadingStore.setState(true);

    this.firebaseAuthenticationService
      .signUp(data as any)
      .then((response) => (this.jsonResponse = JSON.stringify(response)))
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }
}
