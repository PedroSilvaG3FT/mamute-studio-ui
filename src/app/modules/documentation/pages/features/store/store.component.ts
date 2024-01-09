import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CounterStore } from '../../../../../store/counter.store';

@Component({
  standalone: true,
  selector: 'doc-store',
  imports: [MatButtonModule],
  styleUrl: './store.component.scss',
  templateUrl: './store.component.html',
})
export class StoreComponent {
  public readonly store = inject(CounterStore);
}
