import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IFormOption } from '../interfaces/app-form.interface';
import { InputType } from '../types/input.type';
import { ModelControlType } from '../types/model-control.type';
import { FormGeneratorFieldType } from './field-generator.directive';

export interface IFormGeneratorFieldAdditional {
  isToggle: boolean;
  className: string;
  placeholder: string;
  inputType: InputType;
  options: IFormOption[];
  isDatepickerRange: boolean;
  textEditorConfig: AngularEditorConfig;
}

export interface IFormGeneratorField {
  name: string;
  label: string;
  type: FormGeneratorFieldType;
  initialValue?: ModelControlType;
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
