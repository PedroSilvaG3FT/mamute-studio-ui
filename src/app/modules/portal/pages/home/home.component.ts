import { Component } from '@angular/core';
import { HomeEventComponent } from './home-event/home-event.component';
import { HomeFaqComponent } from './home-faq/home-faq.component';
import { HomeHeroComponent } from './home-hero/home-hero.component';
import { HomeNewsComponent } from './home-news/home-news.component';
import { HomePartnerComponent } from './home-partner/home-partner.component';
import { HomePrayerWallComponent } from './home-prayer-wall/home-prayer-wall.component';

@Component({
  standalone: true,
  selector: 'portal-home',
  imports: [
    HomeFaqComponent,
    HomeHeroComponent,
    HomeNewsComponent,
    HomeEventComponent,
    HomePartnerComponent,
    HomePrayerWallComponent,
  ],

  template: `
    <portal-home-hero />
    <portal-home-event />
    <portal-home-prayer-wall />
    <portal-home-news />
    <portal-home-partner />
  `,
})
export class HomeComponent {}
