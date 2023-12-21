import { DatePickerRangeValue } from './datepicker.type';
import { SliderRangeValue } from './slider.type';

export type ModelControlType =
  | DatePickerRangeValue
  | SliderRangeValue
  | boolean
  | string
  | number
  | object
  | File[]
  | File
  | Date
  | null;
