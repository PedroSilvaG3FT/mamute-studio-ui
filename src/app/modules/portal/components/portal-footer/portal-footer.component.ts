import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SOCIAL_MEDIA } from '../../constants/social-media.constant';
import { PortalSocialMediaComponent } from '../portal-social-media/portal-social-media.component';

@Component({
  standalone: true,
  selector: 'portal-footer',
  styleUrl: './portal-footer.component.scss',
  templateUrl: './portal-footer.component.html',
  imports: [RouterModule, PortalSocialMediaComponent],
})
export class PortalFooterComponent {
  public socialMediaItems = SOCIAL_MEDIA;
}
