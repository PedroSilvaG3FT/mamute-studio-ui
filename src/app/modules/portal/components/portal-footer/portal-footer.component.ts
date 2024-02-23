import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WhatsAppService } from '../../../@core/services/whatsapp.service';
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
  public whatsAppService = inject(WhatsAppService);
  public viewportScroller = inject(ViewportScroller);

  public openUxnocodeLink() {
    window.open(`https://uxnocode.com/`, '_blank');
  }

  public handleOpenWhatsapp() {
    this.whatsAppService.sendMessage();
  }

  public scrollToElement(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
