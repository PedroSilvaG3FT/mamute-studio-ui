import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SEOService } from '../../../@core/services/seo.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'doc-side-menu',
  styleUrl: './side-menu.component.scss',
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  public links = [
    {
      name: 'Components',
      children: [
        {
          id: 'form-generator',
          name: 'Form generator',
          link: '/features/form-generator',
          icon: 'ant-design:build-outlined',
        },
        {
          id: 'form-control',
          name: 'Form controls',
          icon: 'streamline:input-box',
          link: '/features/form-control',
        },
        {
          id: 'table',
          name: 'Table',
          icon: 'tabler:table',
          link: '/features/table',
        },
      ],
    },
    {
      name: 'Firebase',
      children: [
        {
          name: 'Firestore',
          id: 'firebase-firestore',
          link: '/features/firebase-firestore',
          icon: 'material-symbols:database-outline',
        },
        {
          name: 'Firestorage',
          id: 'firebase-firestorage',
          icon: 'ic:outline-sd-storage',
          link: '/features/firebase-firestorage',
        },
      ],
    },
    {
      name: 'Supabase',
      children: [
        {
          icon: 'lucide:user',
          name: 'Authentication',
          id: 'supabase-authentication',
          link: '/features/supabase-authentication',
        },
        {
          name: 'Table',
          id: 'supabase-table',
          link: '/features/supabase-table',
          icon: 'material-symbols:database-outline',
        },
      ],
    },
    {
      name: 'Store',
      children: [
        {
          id: 'store',
          name: 'Counter',
          icon: 'carbon:flow',
          link: '/features/store',
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
