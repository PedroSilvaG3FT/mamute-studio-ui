import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortalFooterComponent } from '../portal-footer/portal-footer.component';
import { PortalHeaderComponent } from '../portal-header/portal-header.component';
import { PortalUserMenuComponent } from '../portal-user-menu/portal-user-menu.component';

@Component({
  standalone: true,
  selector: 'portal-layout',
  styleUrl: './portal-layout.component.scss',
  templateUrl: './portal-layout.component.html',
  imports: [
    RouterOutlet,
    PortalHeaderComponent,
    PortalFooterComponent,
    PortalUserMenuComponent,
  ],
})
export class PortalLayoutComponent {}
