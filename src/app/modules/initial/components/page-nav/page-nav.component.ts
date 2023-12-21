import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppThemeSelectionComponent } from '../../../@core/components/app-theme-selection/app-theme-selection.component';
import { AnimateDirective } from '../../../@core/directives/animation.directive';

@Component({
  standalone: true,
  selector: 'page-nav',
  styleUrl: './page-nav.component.scss',
  templateUrl: './page-nav.component.html',
  imports: [RouterModule, AnimateDirective, AppThemeSelectionComponent],
})
export class PageNavComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) backRoute: string = '';
}
