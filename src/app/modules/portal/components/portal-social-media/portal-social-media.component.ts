import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SOCIAL_MEDIA } from '../../constants/social-media.constant';

@Component({
  standalone: true,
  imports: [MatTooltipModule],
  selector: 'portal-social-media',
  styleUrl: './portal-social-media.component.scss',
  templateUrl: './portal-social-media.component.html',
})
export class PortalSocialMediaComponent {
  public items = SOCIAL_MEDIA;
}
