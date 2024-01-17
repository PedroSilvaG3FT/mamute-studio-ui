import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../components/admin-layout/admin-layout.component';
import { ADMIN_ROUTES_CONFIG } from '../constants/admin-routes.constant';

const EVENT_ROUTES: Routes = [
  {
    path: 'event',
    data: { ...ADMIN_ROUTES_CONFIG.event },
    loadComponent: () =>
      import('./event/event.component').then((c) => c.EventComponent),
  },
  {
    path: 'event/register',
    data: { ...ADMIN_ROUTES_CONFIG.eventRegister },
    loadComponent: () =>
      import('./event/event-register/event-register.component').then(
        (c) => c.EventRegisterComponent
      ),
  },
  {
    path: 'event/register/:id',
    data: { ...ADMIN_ROUTES_CONFIG.eventRegister },
    loadComponent: () =>
      import('./event/event-register/event-register.component').then(
        (c) => c.EventRegisterComponent
      ),
  },
];

const NEWS_ROUTES: Routes = [
  {
    path: 'news',
    data: { ...ADMIN_ROUTES_CONFIG.news },
    loadComponent: () =>
      import('./news/news.component').then((c) => c.NewsComponent),
  },
  {
    path: 'news/register',
    data: { ...ADMIN_ROUTES_CONFIG.newsRegister },
    loadComponent: () =>
      import('./news/news-register/news-register.component').then(
        (c) => c.NewsRegisterComponent
      ),
  },
  {
    path: 'news/register/:id',
    data: { ...ADMIN_ROUTES_CONFIG.newsRegister },
    loadComponent: () =>
      import('./news/news-register/news-register.component').then(
        (c) => c.NewsRegisterComponent
      ),
  },
];

const PARTNER_ROUTES: Routes = [
  {
    path: 'partner',
    data: { ...ADMIN_ROUTES_CONFIG.partner },
    loadComponent: () =>
      import('./partner/partner.component').then((c) => c.PartnerComponent),
  },
  {
    path: 'partner/register',
    data: { ...ADMIN_ROUTES_CONFIG.partnerRegister },
    loadComponent: () =>
      import('./partner/partner-register/partner-register.component').then(
        (c) => c.PartnerRegisterComponent
      ),
  },
  {
    path: 'partner/register/:id',
    data: { ...ADMIN_ROUTES_CONFIG.partnerRegister },
    loadComponent: () =>
      import('./partner/partner-register/partner-register.component').then(
        (c) => c.PartnerRegisterComponent
      ),
  },
];

const USER_ROUTES: Routes = [
  {
    path: 'user',
    data: { ...ADMIN_ROUTES_CONFIG.user },
    loadComponent: () =>
      import('./user/user.component').then((c) => c.UserComponent),
  },
  {
    path: 'user/register',
    data: { ...ADMIN_ROUTES_CONFIG.userRegister },
    loadComponent: () =>
      import('./user/user-register/user-register.component').then(
        (c) => c.UserRegisterComponent
      ),
  },
  {
    path: 'user/register/:id',
    data: { ...ADMIN_ROUTES_CONFIG.userRegister },
    loadComponent: () =>
      import('./user/user-register/user-register.component').then(
        (c) => c.UserRegisterComponent
      ),
  },
];

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      ...USER_ROUTES,
      ...NEWS_ROUTES,
      ...EVENT_ROUTES,
      ...PARTNER_ROUTES,
      {
        path: 'prayer-wall',
        data: { ...ADMIN_ROUTES_CONFIG.prayerWall },
        loadComponent: () =>
          import('./prayer-wall/prayer-wall.component').then(
            (c) => c.PrayerWallComponent
          ),
      },
      {
        path: 'marketplace',
        data: { ...ADMIN_ROUTES_CONFIG.marketplace },
        loadComponent: () =>
          import('./marketplace/marketplace.component').then(
            (c) => c.MarketplaceComponent
          ),
      },
    ],
  },
];
