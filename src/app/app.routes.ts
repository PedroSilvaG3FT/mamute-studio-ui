import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './modules/admin/pages/router';
import { AUTHENTICATION_ROUTES } from './modules/authentication/pages/router';
import { DOCUMENTATION_ROUTES } from './modules/documentation/pages/router';

export const routes: Routes = [
  {
    path: '',
    data: { id: 'landing-page', title: '' },
    loadComponent: () =>
      import('./modules/landing-page/landing-page.component').then(
        (c) => c.LandingPageComponent
      ),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  ...ADMIN_ROUTES,
  ...DOCUMENTATION_ROUTES,
  ...AUTHENTICATION_ROUTES,
  // { path: '**' },
];
