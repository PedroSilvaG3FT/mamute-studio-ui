import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SEOService } from '../../../@core/services/seo.service';
import { ADMIN_ROUTES_CONFIG } from '../../constants/admin-routes.contant';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'admin-side-menu',
  styleUrl: './admin-side-menu.component.scss',
  templateUrl: './admin-side-menu.component.html',
})
export class AdminSideMenuComponent {
  public links = [
    {
      name: 'Sistema',
      children: [
        {
          link: '/admin/event',
          icon: 'ic:round-event',
          id: ADMIN_ROUTES_CONFIG.event.id,
          name: ADMIN_ROUTES_CONFIG.event.title,
        },
        {
          link: '/admin/news',
          icon: 'tabler:news',
          id: ADMIN_ROUTES_CONFIG.news.id,
          name: ADMIN_ROUTES_CONFIG.news.title,
        },
        {
          link: '/admin/partner',
          icon: 'mdi:partnership-outline',
          id: ADMIN_ROUTES_CONFIG.partner.id,
          name: ADMIN_ROUTES_CONFIG.partner.title,
        },
        {
          link: '/admin/user',
          icon: 'lucide:user',
          id: ADMIN_ROUTES_CONFIG.user.id,
          name: ADMIN_ROUTES_CONFIG.user.title,
        },
        {
          link: '/admin/prayer-wall',
          icon: 'mingcute:pray-line',
          id: ADMIN_ROUTES_CONFIG.prayerWall.id,
          name: ADMIN_ROUTES_CONFIG.prayerWall.title,
        },
      ],
    },

    {
      name: 'Produtos',
      children: [
        {
          link: '/admin/marketplace',
          icon: 'mdi:marketplace-outline',
          id: ADMIN_ROUTES_CONFIG.marketplace.id,
          name: ADMIN_ROUTES_CONFIG.marketplace.title,
        },
      ],
    },
  ];

  public currentId: string = '';

  constructor(private seoService: SEOService) {
    this.seoService.onRouteChange().subscribe(() => {
      const data = this.seoService.getRouteData();
      this.currentId = data.id || '';
    });
  }
}
