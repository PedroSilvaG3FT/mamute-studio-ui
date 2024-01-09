import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CounterStore } from '../../../../store/counter.store';
import { AppThemeSelectionComponent } from '../../../@core/components/app-theme-selection/app-theme-selection.component';
import { AnimateDirective } from '../../../@core/directives/animate.directive';

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

  public readonly store = inject(CounterStore);
}
