import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-landing-page',
  styleUrl: './landing-page.component.scss',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {}
