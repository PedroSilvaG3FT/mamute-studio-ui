import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiStore } from '../../../../store/ui.store';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-authentication-layout',
  styleUrl: './authentication-layout.component.scss',
  templateUrl: './authentication-layout.component.html',
})
export class AuthenticationLayoutComponent {
  public uiStore = inject(UiStore);
}
