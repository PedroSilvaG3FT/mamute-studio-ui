import { ViewportScroller } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../../store/auth.store';
import { AppThemeSelectionComponent } from '../../../@core/components/app-theme-selection/app-theme-selection.component';
import { WhatsAppService } from '../../../@core/services/whatsapp.service';
import { ModalLoginComponent } from '../../../@shared/components/modal-login/modal-login.component';
import { IMenuItem } from '../../interfaces/menu.interface';
import { PortalSideMenuComponent } from '../portal-side-menu/portal-side-menu.component';
import { PortalUserMenuComponent } from '../portal-user-menu/portal-user-menu.component';

@Component({
  standalone: true,
  selector: 'portal-header',
  styleUrl: './portal-header.component.scss',
  templateUrl: './portal-header.component.html',
  imports: [
    RouterModule,
    MatButtonModule,
    PortalUserMenuComponent,
    PortalSideMenuComponent,
    AppThemeSelectionComponent,
  ],
})
export class PortalHeaderComponent {
  public authStore = inject(AuthStore);
  public whatsAppService = inject(WhatsAppService);

  public isScrolled: boolean = false;
  public isShowSideMenu: boolean = false;

  public items: IMenuItem[] = [
    { title: `Home`, route: `home-hero` },
    { title: `Serviços`, route: `home-services` },
    { title: `Salas`, route: `home-rooms` },
    { title: `Trabalhos`, route: `home-works` },
    { title: `Endereço`, route: `home-address` },
  ];

  constructor(
    public dialog: MatDialog,
    private viewportScroller: ViewportScroller
  ) {}

  @HostListener('window:scroll', [])
  public onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  public toggleSideMenu() {
    this.isShowSideMenu = !this.isShowSideMenu;
  }

  public openModalLogin(): void {
    this.dialog.open(ModalLoginComponent);
  }

  public handleOpenWhatsapp() {
    this.whatsAppService.sendMessage();
  }

  public scrollToElement(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
