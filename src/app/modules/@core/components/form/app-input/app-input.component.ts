import { Component, Input, forwardRef } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { InputType } from '../../../types/input.type';
import { ModelControl } from '../model-control';

@Component({
  standalone: true,
  selector: 'app-input',
  imports: [MatInputModule, FormsModule, ReactiveFormsModule],
  styleUrl: './app-input.component.scss',
  templateUrl: './app-input.component.html',
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInputComponent),
    },
  ],
})
export class AppInputComponent extends ModelControl {
  @Input() type: InputType = 'text';

  ngOnInit() {
    if (!this.isDynamic) this.initMonitoringChanges();
  }
}
