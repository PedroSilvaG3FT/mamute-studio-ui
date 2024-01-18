import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortalHeaderComponent } from '../portal-header/portal-header.component';

@Component({
  standalone: true,
  selector: 'portal-layout',
  styleUrl: './portal-layout.component.scss',
  templateUrl: './portal-layout.component.html',
  imports: [PortalHeaderComponent, RouterOutlet],
})
export class PortalLayoutComponent {}
