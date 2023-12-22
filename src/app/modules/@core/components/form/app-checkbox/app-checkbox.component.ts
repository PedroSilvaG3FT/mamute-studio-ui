import { Component, Input, booleanAttribute, forwardRef } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ModelControl } from '../model-control';

@Component({
  standalone: true,
  selector: 'app-checkbox',
  styleUrl: './app-checkbox.component.scss',
  templateUrl: './app-checkbox.component.html',
  imports: [
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
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
  @Input() toggleClassName: string = '';
  @Input({ transform: booleanAttribute }) toggle: boolean = false;

  ngOnInit() {
    if (!this.isDynamic) this.initMonitoringChanges();
  }
}
