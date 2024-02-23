import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PortalSocialMediaComponent } from '../../../components/portal-social-media/portal-social-media.component';

@Component({
  standalone: true,
  selector: 'portal-home-works',
  imports: [PortalSocialMediaComponent],
  styleUrl: './home-works.component.scss',
  templateUrl: './home-works.component.html',
})
export class HomeWorksComponent {
  private domSanitizer = inject(DomSanitizer);

  public youtubeLinks = [
    `https://www.youtube.com/embed/w4jfczP1csY?si=kVfF4m_-VUiHS8eG`,
    `https://www.youtube.com/embed/4alnqIW5E8A?si=E7Lflo2UlzYr3Q_2`,
    `https://www.youtube.com/embed/yTQ-t-lc8bc?si=2PbGgX8_W-8rbbbv`,
    `https://www.youtube.com/embed/KoKp4fFRqhs?si=fx_uWx9HbIeuyVzV`,
    `https://www.youtube.com/embed/WcWp7FNcc40?si=VrC_DPhXAG19mhjc`,
    `https://www.youtube.com/embed/MpeGNeiJpi4?si=_jkfyYBb7dl_h0Zw`,
  ].map((link) => this.domSanitizer.bypassSecurityTrustResourceUrl(link));
}
