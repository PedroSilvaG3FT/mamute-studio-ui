import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppPageNavComponent } from '../../../@shared/components/app-page-nav/app-page-nav.component';

@Component({
  standalone: true,
  selector: 'app-prayer-wall',
  styleUrl: './prayer-wall.component.scss',
  imports: [AppPageNavComponent, RouterLink],
  templateUrl: './prayer-wall.component.html',
})
export class PrayerWallComponent {
  constructor() {}
}
