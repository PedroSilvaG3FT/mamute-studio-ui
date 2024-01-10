import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { LoadingStore } from '../../../../../store/loading.store';
import { AlertService } from '../../../../@core/services/alert.service';
import { SupabaseAuthenticationService } from '../../../../@core/supabase/supabase-authentication.service';
import { SignInComponent } from '../../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../../components/sign-up/sign-up.component';
import { TerminalWindowComponent } from '../../../components/terminal-window/terminal-window.component';
import {
  IDocAuthenticationCredentials,
  IDocAuthenticationSignUp,
} from '../../../interfaces/doc-authentication.interface';

@Component({
  standalone: true,
  selector: 'app-supabase-authentication',
  styleUrl: './supabase-authentication.component.scss',
  templateUrl: './supabase-authentication.component.html',
  imports: [
    MatTabsModule,
    SignInComponent,
    SignUpComponent,
    TerminalWindowComponent,
  ],
})
export class SupabaseAuthenticationComponent {
  public loadingStore = inject(LoadingStore);
  private readonly errorMessage = `An error occurred while processing the request`;

  public jsonResponse: string = '';
  public credentials: IDocAuthenticationCredentials =
    {} as IDocAuthenticationCredentials;

  constructor(
    private alertService: AlertService,
    private supabaseAuthenticationService: SupabaseAuthenticationService
  ) {}

  private handleError(error: any) {
    console.log(error);
    this.alertService.snackBar.open(this.errorMessage, 'close');
  }

  public handleSubmitSignIn(data: IDocAuthenticationCredentials) {
    this.loadingStore.setState(true);

    this.supabaseAuthenticationService
      .signIn(data)
      .then((data) => (this.jsonResponse = JSON.stringify(data)))
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }

  public handleSubmitSignUp(data: IDocAuthenticationSignUp) {
    this.loadingStore.setState(true);

    this.supabaseAuthenticationService
      .signUp({
        email: data.email,
        password: data.password,
      })
      .then((data) => (this.jsonResponse = JSON.stringify(data)))
      .catch((error) => this.handleError(error))
      .finally(() => this.loadingStore.setState(false));
  }
}
