import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimateDirective } from '../../../@core/directives/animate.directive';
import { IMenuItem } from '../../interfaces/menu.interface';

@Component({
  standalone: true,
  selector: 'portal-side-menu',
  imports: [RouterModule, AnimateDirective],
  styleUrl: './portal-side-menu.component.scss',
  templateUrl: './portal-side-menu.component.html',
})
export class PortalSideMenuComponent {
  @Input({ required: true }) items: IMenuItem[] = [];
  @Input({ required: true }) isOpen: boolean = false;

  @Output() onClose = new EventEmitter();

  public handleClose() {
    this.onClose.emit();
  }
}
