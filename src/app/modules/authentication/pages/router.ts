import { Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from '../components/authentication-layout/authentication-layout.component';

export const AUTHENTICATION_ROUTES: Routes = [
  {
    path: 'auth',
    component: AuthenticationLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./sign-up/sign-up.component').then((c) => c.SignUpComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent
          ),
      },
    ],
  },
];
