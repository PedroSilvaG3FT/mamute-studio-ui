import { Component, Input, booleanAttribute, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthStore } from '../../../../store/auth.store';
import { FirebaseAuthenticationService } from '../../../@core/firebase/firebase-authentication.service';

@Component({
  standalone: true,
  selector: 'portal-user-menu',
  styleUrl: './portal-user-menu.component.scss',
  templateUrl: './portal-user-menu.component.html',
  imports: [MatMenuModule, MatIconModule, MatButtonModule],
})
export class PortalUserMenuComponent {
  @Input({ transform: booleanAttribute }) fixedPosition: boolean = false;

  public authStore = inject(AuthStore);

  constructor(
    private firebaseAuthenticationService: FirebaseAuthenticationService
  ) {}

  public handleSignOut() {
    this.firebaseAuthenticationService.signOut();
  }
}