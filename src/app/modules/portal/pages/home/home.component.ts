import { Component } from '@angular/core';
import { HomeAddressComponent } from './home-address/home-address.component';
import { HomeHeroComponent } from './home-hero/home-hero.component';
import { HomeRoomsComponent } from './home-rooms/home-rooms.component';
import { HomeServicesComponent } from './home-services/home-services.component';
import { HomeWorksComponent } from './home-works/home-works.component';

@Component({
  standalone: true,
  selector: 'portal-home',
  imports: [
    HomeHeroComponent,
    HomeWorksComponent,
    HomeRoomsComponent,
    HomeAddressComponent,
    HomeServicesComponent,
  ],

  template: `
    <portal-home-hero />
    <portal-home-services />
    <portal-home-rooms />
    <portal-home-works />
    <portal-home-address />
  `,
})
export class HomeComponent {}
