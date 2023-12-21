import { Component, Input, booleanAttribute, forwardRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { SliderRangeValue } from '../../../types/slider.type';
import { ModelControl } from '../model-control';

@Component({
  standalone: true,
  selector: 'app-slider',
  styleUrl: './app-slider.component.scss',
  templateUrl: './app-slider.component.html',
  imports: [MatSliderModule, ReactiveFormsModule],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSliderComponent),
    },
  ],
})
export class AppSliderComponent extends ModelControl {
  @Input({ required: true }) min: number = 0;
  @Input({ required: true }) max: number = 0;
  @Input({ required: true }) step: number = 0;
  @Input({ transform: booleanAttribute }) range: boolean = false;
  @Input({ transform: booleanAttribute }) showTickMarks: boolean = false;

  public currentGroup: FormGroup = this.group;

  public rangeControl = new FormGroup({
    min: new FormControl<number | null>(null),
    max: new FormControl<number | null>(null),
  });

  public formatLabel(value: number) {
    return String(value);
  }

  ngOnInit() {
    if (!this.isDynamic) this.initMonitoringChanges();
    if (this.range) {
      this.currentGroup = this.rangeControl;
      this.setRangeInitialValue();
    }

    this.$modelControl = this.rangeControl.valueChanges.subscribe((value) => {
      this.group.patchValue({ [this.formControlName]: value });
    });
  }

  setRangeInitialValue() {
    if (typeof this.initialValue !== 'object' || !this.initialValue) return;

    this.rangeControl.setValue({
      min: (this.initialValue as SliderRangeValue).min,
      max: (this.initialValue as SliderRangeValue).max,
    });
  }
}
