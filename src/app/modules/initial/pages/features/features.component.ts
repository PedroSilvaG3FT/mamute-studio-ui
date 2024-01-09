import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet } from '@angular/router';
import { PageNavComponent } from '../../components/page-nav/page-nav.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  standalone: true,
  selector: 'app-features',
  styleUrl: './features.component.scss',
  templateUrl: './features.component.html',
  imports: [
    RouterOutlet,
    MatMenuModule,
    MatButtonModule,
    PageNavComponent,
    SideMenuComponent,
  ],
})
export class FeaturesComponent {}
