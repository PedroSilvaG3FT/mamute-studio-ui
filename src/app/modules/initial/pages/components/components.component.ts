import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { FormExampleComponent } from '../../components/form-example/form-example.component';

import { CounterStore } from '../../../../store/counter.store';
import { FormGeneratorExampleComponent } from '../../components/form-generator-example/form-generator-example.component';
import { PageNavComponent } from '../../components/page-nav/page-nav.component';
import { TableExampleComponent } from '../../components/table-example/table-example.component';

@Component({
  standalone: true,
  selector: 'app-components',
  styleUrl: './components.component.scss',
  templateUrl: './components.component.html',
  imports: [
    MatTabsModule,
    PageNavComponent,
    FormExampleComponent,
    TableExampleComponent,
    FormGeneratorExampleComponent,
  ],
})
export class ComponentsComponent {
  public readonly store = inject(CounterStore);

  constructor() {}

  ngOnInit() {}
}
