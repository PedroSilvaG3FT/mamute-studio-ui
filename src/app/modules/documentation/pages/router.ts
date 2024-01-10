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
    children: [
      {
        path: 'form-generator',
        data: { id: 'form-generator', title: 'Form generator' },
        loadComponent: () =>
          import('./features/form-generator/form-generator.component').then(
            (c) => c.FormGeneratorComponent
          ),
      },
      {
        path: 'form-control',
        data: { id: 'form-control', title: 'Form control' },
        loadComponent: () =>
          import('./features/form-controls/form-controls.component').then(
            (c) => c.FormControlsComponent
          ),
      },
      {
        path: 'table',
        data: { id: 'table', title: 'Table' },
        loadComponent: () =>
          import('./features/table/table.component').then(
            (c) => c.TableComponent
          ),
      },
      {
        path: 'store',
        data: { id: 'store', title: 'Store' },
        loadComponent: () =>
          import('./features/store/store.component').then(
            (c) => c.StoreComponent
          ),
      },
      {
        path: 'firebase-firestorage',
        data: { id: 'firebase-firestorage', title: 'Firebase Firestorage' },
        loadComponent: () =>
          import(
            './features/firebase-firestorage/firebase-firestorage.component'
          ).then((c) => c.FirebaseFirestorageComponent),
      },
      {
        path: 'firebase-firestore',
        data: { id: 'firebase-firestore', title: 'Firebase Firestore' },
        loadComponent: () =>
          import(
            './features/firebase-firestore/firebase-firestore.component'
          ).then((c) => c.FirebaseFirestoreComponent),
      },
      {
        path: 'supabase-table',
        data: { id: 'supabase-table', title: 'Supabase Table' },
        loadComponent: () =>
          import('./features/supabase-table/supabase-table.component').then(
            (c) => c.SupabaseTableComponent
          ),
      },
      {
        path: 'supabase-authentication',
        data: {
          id: 'supabase-authentication',
          title: 'Supabase Authentication',
        },
        loadComponent: () =>
          import(
            './features/supabase-authentication/supabase-authentication.component'
          ).then((c) => c.SupabaseAuthenticationComponent),
      },
    ],
  },
];
