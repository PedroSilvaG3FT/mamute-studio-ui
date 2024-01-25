import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthStore, onLoginStateChange } from '../../../../store/auth.store';
import { AppThemeSelectionComponent } from '../../../@core/components/app-theme-selection/app-theme-selection.component';
import { AnimateDirective } from '../../../@core/directives/animate.directive';
import { ModalLoginComponent } from '../../../@shared/components/modal-login/modal-login.component';
import { IMenuItem } from '../../interfaces/menu.interface';

@Component({
  standalone: true,
  selector: 'portal-side-menu',
  styleUrl: './portal-side-menu.component.scss',
  templateUrl: './portal-side-menu.component.html',
  imports: [RouterModule, AnimateDirective, AppThemeSelectionComponent],
})
export class PortalSideMenuComponent {
  @Input({ required: true }) items: IMenuItem[] = [];
  @Input({ required: true }) isOpen: boolean = false;

  @Output() onClose = new EventEmitter();

  public authStore = inject(AuthStore);
  public $loginSate!: Subscription;

  constructor(public dialog: MatDialog) {
    this.$loginSate = onLoginStateChange
      .asObservable()
      .subscribe((isLogged) => {
        if (isLogged && this.isOpen) this.handleClose();
      });
  }

  public handleClose() {
    this.onClose.emit();
  }

  public openModalLogin(): void {
    this.dialog.open(ModalLoginComponent);
  }

  ngOnDestroy() {
    this.$loginSate.unsubscribe();
  }
}
