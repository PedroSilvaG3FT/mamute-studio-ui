import { Component, Input, forwardRef } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { IFormOption } from '../../../interfaces/app-form.interface';
import { ModelControl } from '../model-control';

@Component({
  standalone: true,
  selector: 'app-select',
  styleUrl: './app-select.component.scss',
  templateUrl: './app-select.component.html',
  imports: [MatSelectModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelectComponent),
    },
  ],
})
export class AppSelectComponent extends ModelControl {
  @Input({ required: true }) items: IFormOption[] = [];

  ngOnInit() {
    if (!this.isDynamic) this.initMonitoringChanges();
  }
}
