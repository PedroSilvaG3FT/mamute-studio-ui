import { AbstractControl, ValidationErrors } from '@angular/forms';
import { IFormOption } from '../interfaces/app-form.interface';
import { InputType } from '../types/input.type';
import { ModelControlType } from '../types/model-control.type';
import { FormGeneratorFieldType } from './field-generator.directive';

export interface IFormGeneratorFieldAdditional {
  hint: string;
  className: string;
  placeholder: string;
  errorMessage: string;
  inputType: InputType;
  options: IFormOption[];
  isDatepickerRange: boolean;
}

export interface IFormGeneratorField {
  name: string;
  label: string;
  type: FormGeneratorFieldType;
  initialValue: ModelControlType;
  additional?: Partial<IFormGeneratorFieldAdditional>;
  width?: string;
  validators?: ((
    control: AbstractControl<any, any>
  ) => ValidationErrors | null)[];
}

export interface IFormGeneratorConfig {
  fields: IFormGeneratorField[][];
}

export interface IFormGeneratorFields {
  fields: IFormGeneratorField[][];
}
