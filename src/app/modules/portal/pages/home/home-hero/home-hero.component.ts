import { Component } from '@angular/core';
import { PortalSocialMediaComponent } from '../../../components/portal-social-media/portal-social-media.component';

@Component({
  standalone: true,
  selector: 'portal-home-hero',
  imports: [PortalSocialMediaComponent],
  styleUrl: './home-hero.component.scss',
  templateUrl: './home-hero.component.html',
})
export class HomeHeroComponent {}
