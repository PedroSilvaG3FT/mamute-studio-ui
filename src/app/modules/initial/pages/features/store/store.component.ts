import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CounterStore } from '../../../../../store/counter.store';

@Component({
  standalone: true,
  selector: 'app-store',
  imports: [MatButtonModule],
  styleUrl: './store.component.scss',
  templateUrl: './store.component.html',
})
export class StoreComponent {
  public readonly store = inject(CounterStore);
}
