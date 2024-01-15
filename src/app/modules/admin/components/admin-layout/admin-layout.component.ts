import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet } from '@angular/router';
import { AdminSideMenuComponent } from '../admin-side-menu/admin-side-menu.component';

@Component({
  standalone: true,
  selector: 'app-admin-layout',
  styleUrl: './admin-layout.component.scss',
  templateUrl: './admin-layout.component.html',
  imports: [
    RouterOutlet,
    MatMenuModule,
    MatButtonModule,
    AdminSideMenuComponent,
  ],
})
export class AdminLayoutComponent {}
