import { Component, HostListener, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../../store/auth.store';
import { AppThemeSelectionComponent } from '../../../@core/components/app-theme-selection/app-theme-selection.component';
import { IMenuItem } from '../../interfaces/menu.interface';
import { PortalSideMenuComponent } from '../portal-side-menu/portal-side-menu.component';

@Component({
  standalone: true,
  selector: 'portal-header',
  styleUrl: './portal-header.component.scss',
  templateUrl: './portal-header.component.html',
  imports: [
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    PortalSideMenuComponent,
    AppThemeSelectionComponent,
  ],
})
export class PortalHeaderComponent {
  public authStore = inject(AuthStore);

  public isScrolled: boolean = false;
  public isShowSideMenu: boolean = false;

  public items: IMenuItem[] = [
    { title: `Home`, route: `/` },
    { title: `Eventos`, route: `/portal/eventos` },
    { title: `Notícias`, route: `/portal/noticias` },
    { title: `Mural de oração`, route: `/portal/oracao` },
    { title: `Contato`, route: `/portal/contato` },
  ];

  constructor() {}

  @HostListener('window:scroll', [])
  public onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  public toggleSideMenu() {
    this.isShowSideMenu = !this.isShowSideMenu;
  }
}
