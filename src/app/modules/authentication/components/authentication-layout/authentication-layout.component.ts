import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-authentication-layout',
  styleUrl: './authentication-layout.component.scss',
  templateUrl: './authentication-layout.component.html',
})
export class AuthenticationLayoutComponent {}
