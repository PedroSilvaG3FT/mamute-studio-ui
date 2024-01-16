import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppThemeSelectionComponent } from '../../../@core/components/app-theme-selection/app-theme-selection.component';
import { AnimateDirective } from '../../../@core/directives/animate.directive';

@Component({
  standalone: true,
  selector: 'app-page-nav',
  styleUrl: './app-page-nav.component.scss',
  templateUrl: './app-page-nav.component.html',
  imports: [RouterModule, AnimateDirective, AppThemeSelectionComponent],
})
export class AppPageNavComponent {
  @Input() backRoute: string = '';
  @Input({ required: true }) title: string = '';
}
