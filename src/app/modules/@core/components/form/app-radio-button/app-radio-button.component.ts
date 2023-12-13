import { Component, Input, forwardRef } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { IFormOption } from '../../../interfaces/app-form.interface';
import { ModelControl } from '../model-control';

@Component({
  standalone: true,
  selector: 'app-radio-button',
  styleUrl: './app-radio-button.component.scss',
  templateUrl: './app-radio-button.component.html',
  imports: [FormsModule, MatRadioModule, MatInputModule, ReactiveFormsModule],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppRadioButtonComponent),
    },
  ],
})
export class AppRadioButtonComponent extends ModelControl {
  @Input({ required: true }) items: IFormOption[] = [];

  ngOnInit() {
    if (!this.isDynamic) this.initMonitoringChanges();
  }
}
