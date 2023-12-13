import { Component, forwardRef } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ModelControl } from '../model-control';

@Component({
  standalone: true,
  selector: 'app-checkbox',
  styleUrl: './app-checkbox.component.scss',
  templateUrl: './app-checkbox.component.html',
  imports: [
    FormsModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppCheckboxComponent),
    },
  ],
})
export class AppCheckboxComponent extends ModelControl {
  ngOnInit() {
    if (!this.isDynamic) this.initMonitoringChanges();
  }
}
