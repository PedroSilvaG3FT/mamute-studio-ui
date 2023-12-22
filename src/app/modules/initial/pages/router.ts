import { Routes } from '@angular/router';

export const INITIAL_ROUTES: Routes = [
  {
    path: '',
    data: { id: 'home', title: 'Hello world' },
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'features',
    data: { id: 'features', title: 'Features' },
    loadComponent: () =>
      import('./features/features.component').then((c) => c.FeaturesComponent),
  },
];
