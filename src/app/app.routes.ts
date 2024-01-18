import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './modules/admin/pages/router';
import { AUTHENTICATION_ROUTES } from './modules/authentication/pages/router';
import { DOCUMENTATION_ROUTES } from './modules/documentation/pages/router';
import { PORTAL_ROUTES } from './modules/portal/pages/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  ...ADMIN_ROUTES,
  ...PORTAL_ROUTES,
  ...DOCUMENTATION_ROUTES,
  ...AUTHENTICATION_ROUTES,
  // { path: '**' },
];
