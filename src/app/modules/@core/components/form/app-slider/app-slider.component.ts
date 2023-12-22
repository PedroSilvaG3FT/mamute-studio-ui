import { Component, Input, booleanAttribute, forwardRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { ModelControlType } from '../../../types/model-control.type';
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
  @Input({ required: true }) min: number = APP_SLIDER_UPLOAD_DEFAULT_VALUES.min;
  @Input({ required: true }) max: number = APP_SLIDER_UPLOAD_DEFAULT_VALUES.max;
  @Input({ required: true }) step: number =
    APP_SLIDER_UPLOAD_DEFAULT_VALUES.step;
  @Input({ transform: booleanAttribute }) range: boolean =
    APP_SLIDER_UPLOAD_DEFAULT_VALUES.range;
  @Input({ transform: booleanAttribute }) showTickMarks: boolean =
    APP_SLIDER_UPLOAD_DEFAULT_VALUES.showTickMarks;

  public minValue: number = 0;
  public maxValue: number = 0;
  public currentGroup: FormGroup = this.group;

  public rangeControl = new FormGroup({
    min: new FormControl<number | null>(null),
    max: new FormControl<number | null>(null),
  });

  ngOnInit() {
    if (!this.isDynamic) this.initMonitoringChanges();

    if (this.range) {
      this.currentGroup = this.rangeControl;
      this.setRangeInitialValue();
    } else {
      this.currentGroup = this.group;
      this.setLabelValues(this.initialValue);
    }

    this.$modelControl = this.rangeControl.valueChanges.subscribe((value) => {
      this.group.patchValue({ [this.formControlName]: value });
    });

    this.group.valueChanges.subscribe((value) => {
      this.setLabelValues(value[this.formControlName]);
    });
  }

  private setLabelValues(value?: ModelControlType) {
    if (!value) {
      this.minValue = this.min;
      this.maxValue = this.max;
    } else if (typeof value === 'object') {
      this.minValue = (value as SliderRangeValue)?.min || this.min;
      this.maxValue = (value as SliderRangeValue)?.max || this.max;
    } else this.maxValue = Number(value) || this.max;
  }

  private setRangeInitialValue() {
    const controlValue = this.group.controls[this.formControlName].value;

    if (controlValue) {
      this.rangeControl.setValue({
        min: controlValue.min,
        max: controlValue.max,
      });

      this.setLabelValues(controlValue);
      return;
    }

    if (typeof this.initialValue !== 'object' || !this.initialValue) return;

    this.rangeControl.setValue({
      min: (this.initialValue as SliderRangeValue).min,
      max: (this.initialValue as SliderRangeValue).max,
    });
  }
}

export const APP_SLIDER_UPLOAD_DEFAULT_VALUES = {
  min: 0,
  max: 0,
  step: 0,
  range: false,
  showTickMarks: false,
};
