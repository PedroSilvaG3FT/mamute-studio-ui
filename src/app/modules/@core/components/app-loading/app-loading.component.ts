import { Component, inject } from '@angular/core';
import { LoadingStore } from '../../../../store/loading.store';
import { AnimateDirective } from '../../directives/animate.directive';

@Component({
  imports: [AnimateDirective],
  standalone: true,
  selector: 'app-loading',
  styleUrl: './app-loading.component.scss',
  templateUrl: './app-loading.component.html',
})
export class AppLoadingComponent {
  public readonly store = inject(LoadingStore);
}
