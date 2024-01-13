import { Routes } from '@angular/router';
import { DOCUMENTATION_ROUTES } from './modules/documentation/pages/router';

export const routes: Routes = [
  {
    path: '',
    data: { id: 'home', title: 'Hello world' },
    loadComponent: () =>
      import('./modules/documentation/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  ...DOCUMENTATION_ROUTES,
];
