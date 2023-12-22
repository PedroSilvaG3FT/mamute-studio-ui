import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CounterStore } from '../../../../store/counter.store';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'store-counter-example',
  styleUrl: './store-counter-example.component.scss',
  templateUrl: './store-counter-example.component.html',
})
export class StoreCounterExampleComponent {
  public readonly store = inject(CounterStore);
}
