import { Routes } from '@angular/router';

export const INITIAL_ROUTES: Routes = [
  {
    path: '',
    data: { id: 'home', title: 'Hello world' },
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'components',
    data: { id: 'components', title: 'Components' },
    loadComponent: () =>
      import('./components/components.component').then(
        (c) => c.ComponentsComponent
      ),
  },
];
