import { Routes } from '@angular/router';
import { PortalLayoutComponent } from '../components/portal-layout/portal-layout.component';

const EVENT_ROUTES: Routes = [
  {
    path: 'eventos',
    data: { title: 'Eventos' },
    loadComponent: () =>
      import('./event/event.component').then((c) => c.EventComponent),
  },
  {
    path: 'bilhetes',
    data: { title: 'Bilhetes' },
    loadComponent: () =>
      import('./tickets/tickets.component').then((c) => c.TicketsComponent),
  },
  {
    path: 'eventos/:id',
    data: { title: 'Evento' },
    loadComponent: () =>
      import('./event/event-detail/event-detail.component').then(
        (c) => c.EventDetailComponent
      ),
  },
];

const NEWS_ROUTES: Routes = [
  {
    path: 'noticias',
    data: { title: 'Notícias' },
    loadComponent: () =>
      import('./news/news.component').then((c) => c.NewsComponent),
  },
  {
    path: 'noticias/:id',
    data: { title: 'Notícia' },
    loadComponent: () =>
      import('./news/news-detail/news-detail.component').then(
        (c) => c.NewsDetailComponent
      ),
  },
];

export const PORTAL_ROUTES: Routes = [
  {
    path: '',
    component: PortalLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/home.component').then((c) => c.HomeComponent),
      },
    ],
  },
  {
    path: 'portal',
    component: PortalLayoutComponent,
    children: [
      ...NEWS_ROUTES,
      ...EVENT_ROUTES,
      {
        path: 'perfil',
        data: { title: 'Meu perfil' },
        loadComponent: () =>
          import('./profile/profile.component').then((c) => c.ProfileComponent),
      },
      {
        path: 'oracao',
        data: { title: 'Mural de oração' },
        loadComponent: () =>
          import('./prayer-wall/prayer-wall.component').then(
            (c) => c.PrayerWallComponent
          ),
      },
      {
        path: 'contato',
        data: { title: 'Contato' },
        loadComponent: () =>
          import('./contact/contact.component').then((c) => c.ContactComponent),
      },
    ],
  },
];
