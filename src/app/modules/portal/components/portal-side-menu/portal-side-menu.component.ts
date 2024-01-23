import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../../store/auth.store';
import { AppThemeSelectionComponent } from '../../../@core/components/app-theme-selection/app-theme-selection.component';
import { AnimateDirective } from '../../../@core/directives/animate.directive';
import { IMenuItem } from '../../interfaces/menu.interface';

@Component({
  standalone: true,
  selector: 'portal-side-menu',
  styleUrl: './portal-side-menu.component.scss',
  templateUrl: './portal-side-menu.component.html',
  imports: [
    RouterModule,
    MatIconModule,
    MatMenuModule,
    AnimateDirective,
    AppThemeSelectionComponent,
  ],
})
export class PortalSideMenuComponent {
  @Input({ required: true }) items: IMenuItem[] = [];
  @Input({ required: true }) isOpen: boolean = false;

  @Output() onClose = new EventEmitter();

  public authStore = inject(AuthStore);

  public handleClose() {
    this.onClose.emit();
  }
}
