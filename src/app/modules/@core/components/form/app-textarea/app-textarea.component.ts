import { Component, Input, forwardRef } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ModelControl } from '../model-control';

@Component({
  standalone: true,
  selector: 'app-textarea',
  styleUrl: './app-textarea.component.scss',
  templateUrl: './app-textarea.component.html',
  imports: [MatInputModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppTextareaComponent),
    },
  ],
})
export class AppTextareaComponent extends ModelControl {
  @Input() rows: number = 3;

  ngOnInit() {
    if (!this.isDynamic) this.initMonitoringChanges();
  }
}
