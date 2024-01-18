import { Routes } from '@angular/router';
import { PortalLayoutComponent } from '../components/portal-layout/portal-layout.component';

const EVENT_ROUTES: Routes = [
  {
    path: 'eventos',
    loadComponent: () =>
      import('./event/event.component').then((c) => c.EventComponent),
  },
  {
    path: 'eventos/:id',
    loadComponent: () =>
      import('./event/event-detail/event-detail.component').then(
        (c) => c.EventDetailComponent
      ),
  },
];

const NEWS_ROUTES: Routes = [
  {
    path: 'noticias',
    loadComponent: () =>
      import('./news/news.component').then((c) => c.NewsComponent),
  },
  {
    path: 'noticias/:id',
    loadComponent: () =>
      import('./news/news-detail/news-detail.component').then(
        (c) => c.NewsDetailComponent
      ),
  },
];

const PARTNER_ROUTES: Routes = [
  {
    path: 'parceiros',
    loadComponent: () =>
      import('./partner/partner.component').then((c) => c.PartnerComponent),
  },
  {
    path: 'parceiros/:id',
    loadComponent: () =>
      import('./partner/partner-detail/partner-detail.component').then(
        (c) => c.PartnerDetailComponent
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
      ...EVENT_ROUTES,
      ...NEWS_ROUTES,
      ...PARTNER_ROUTES,
      {
        path: 'oracao',
        loadComponent: () =>
          import('./prayer-wall/prayer-wall.component').then(
            (c) => c.PrayerWallComponent
          ),
      },
      {
        path: 'contato',
        loadComponent: () =>
          import('./contact/contact.component').then((c) => c.ContactComponent),
      },
    ],
  },
];
