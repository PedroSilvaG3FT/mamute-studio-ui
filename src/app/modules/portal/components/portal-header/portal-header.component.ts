import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IMenuItem } from '../../interfaces/menu.interface';
import { PortalSideMenuComponent } from '../portal-side-menu/portal-side-menu.component';

@Component({
  standalone: true,
  selector: 'portal-header',
  styleUrl: './portal-header.component.scss',
  templateUrl: './portal-header.component.html',
  imports: [RouterModule, PortalSideMenuComponent],
})
export class PortalHeaderComponent {
  public isScrolled: boolean = false;
  public isShowSideMenu: boolean = false;

  public items: IMenuItem[] = [
    { title: `Eventos`, route: `/portal/eventos` },
    { title: `Mural de oração`, route: `/portal/oracao` },
    { title: `Notícias`, route: `/portal/noticias` },
    { title: `Parceiros`, route: `/portal/parceiros` },
    { title: `contato`, route: `/portal/contato` },
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