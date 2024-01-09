import { trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import Iconify from '@iconify/iconify';
import { ROUTER_STACK_ANIMATION } from './modules/@core/animations/router-stack.animation';
import { AppLoadingComponent } from './modules/@core/components/app-loading/app-loading.component';
import { SEOService } from './modules/@core/services/seo.service';
import { ThemeService } from './modules/@core/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
  animations: [trigger('triggerName', ROUTER_STACK_ANIMATION)],
  imports: [CommonModule, RouterOutlet, RouterModule, AppLoadingComponent],
})
export class AppComponent {
  constructor(
    private seoService: SEOService,
    private themeService: ThemeService
  ) {
    Iconify.listIcons();
    this.themeService.init();
    this.seoService.initTitleMonitoring();
  }

  public prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData['id']
    );
  }
}
