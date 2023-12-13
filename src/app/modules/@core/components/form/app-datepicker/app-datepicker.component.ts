import { Component, Input, booleanAttribute, forwardRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModelControl } from '../model-control';

@Component({
  standalone: true,
  selector: 'app-datepicker',
  styleUrl: './app-datepicker.component.scss',
  templateUrl: './app-datepicker.component.html',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppDatepickerComponent),
    },
  ],
})
export class AppDatepickerComponent extends ModelControl {
  @Input() placeholderEnd: string = 'End date';
  @Input() placeholderStart: string = 'Start date';
  @Input({ transform: booleanAttribute }) range: boolean = false;

  public rangeControl = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngOnInit() {
    if (!this.isDynamic) this.initMonitoringChanges();

    this.$modelControl = this.rangeControl.valueChanges.subscribe((value) => {
      this.group.patchValue({ [this.formControlName]: value });
    });
  }
}
