import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IFormOption } from '../interfaces/app-form.interface';
import { FileUploadType } from '../types/file-upload.type';
import { InputType } from '../types/input.type';
import { ModelControlType } from '../types/model-control.type';
import { FormGeneratorFieldType } from './field-generator.directive';

export interface ICheckboxAdditional {
  isToggle: boolean;
}
export interface ITextEditorAdditional {
  config: AngularEditorConfig;
}
export interface IFileUploadAdditional {
  maxFiles: number;
  limitErrorMessage: string;
  fileTypes: FileUploadType[];
}
export interface IDatePickerAdditional {
  isDatepickerRange: boolean;
}

export interface ISliderAdditional {
  min: number;
  max: number;
  step: number;
  range: boolean;
  showTickMarks: boolean;
}

export interface IImageCropperAdditional {
  scale: number;
  imageURL: string;
  height: string;
  aspectRatio: number;
  background: string;
  cropperMinWidth: number;
  buttonText: string;
  rounded: boolean;
  onlyScaleDown: boolean;
  maintainAspectRatio: boolean;
}
export interface IFormGeneratorFieldAdditional {
  slider: Partial<ISliderAdditional>;
  checkbox: Partial<ICheckboxAdditional>;
  textEditor: Partial<ITextEditorAdditional>;
  fileUpload: Partial<IFileUploadAdditional>;
  datepicker: Partial<IDatePickerAdditional>;
  imageCropper: Partial<IImageCropperAdditional>;

  className: string;
  placeholder: string;
  inputType: InputType;
  options: IFormOption[];
}

export interface IFormGeneratorField<FieldKeyType> {
  label: string;
  name: FieldKeyType;
  type: FormGeneratorFieldType;
  initialValue?: ModelControlType;
  additional?: Partial<IFormGeneratorFieldAdditional>;
  width?: string;
  validators?: ((
    control: AbstractControl<any, any>
  ) => ValidationErrors | null)[];
}
