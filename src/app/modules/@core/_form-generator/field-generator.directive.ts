import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppCheckboxComponent } from '../components/form/app-checkbox/app-checkbox.component';
import { AppDatepickerComponent } from '../components/form/app-datepicker/app-datepicker.component';
import {
  APP_FILE_UPLOAD_DEFAULT_VALUES,
  AppFileUploadComponent,
} from '../components/form/app-file-upload/app-file-upload.component';
import {
  APP_IMAGE_CROPPER_DEFAULT_VALUES,
  AppImageCropperComponent,
} from '../components/form/app-image-cropper/app-image-cropper.component';
import { AppInputComponent } from '../components/form/app-input/app-input.component';
import { AppRadioButtonComponent } from '../components/form/app-radio-button/app-radio-button.component';
import { AppSelectComponent } from '../components/form/app-select/app-select.component';
import {
  APP_SLIDER_UPLOAD_DEFAULT_VALUES,
  AppSliderComponent,
} from '../components/form/app-slider/app-slider.component';
import { AppTextEditorComponent } from '../components/form/app-text-editor/app-text-editor.component';
import { AppTextareaComponent } from '../components/form/app-textarea/app-textarea.component';
import { IFormGeneratorField } from './app-form-generator.interface';

const components = {
  input: AppInputComponent,
  select: AppSelectComponent,
  slider: AppSliderComponent,
  radio: AppRadioButtonComponent,
  textarea: AppTextareaComponent,
  checkbox: AppCheckboxComponent,
  datepicker: AppDatepickerComponent,
  'text-editor': AppTextEditorComponent,
  'file-upload': AppFileUploadComponent,
  'image-cropper': AppImageCropperComponent,
};

export type FormGeneratorFieldType = keyof typeof components;
type HandlerCallbackPropsType = { [key in FormGeneratorFieldType]: Function };

@Directive({
  standalone: true,
  selector: '[appFieldGenerator]',
})
export class FieldGeneratorDirective {
  @Input({ required: true }) group!: FormGroup;
  @Input({ required: true }) field!: IFormGeneratorField;

  private componentRef!: ComponentRef<any>;

  constructor(
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(
      components[this.field.type] as any
    );

    this.componentRef = this.container.createComponent(factory);

    this.componentRef.instance.isDynamic = true;
    this.componentRef.instance.group = this.group;
    this.componentRef.instance.name = this.field.name;
    this.componentRef.instance.label = this.field.label;
    this.componentRef.instance.formControlName = this.field.name;

    if (this.field.additional) {
      const callbacks: HandlerCallbackPropsType = {
        input: () => {},
        radio: () => {},
        select: () => {},
        textarea: () => {},
        slider: () => this.setSliderProps(),
        checkbox: () => this.setCheckboxProps(),
        datepicker: () => this.setDatePickerProps(),
        'text-editor': () => this.setTextEditorProps(),
        'file-upload': () => this.setFileUploadProps(),
        'image-cropper': () => this.setImageCropperProps(),
      };

      this.setCommonProps();
      callbacks[this.field.type]();
    }
  }

  private setCommonProps() {
    if (!this.field.additional) return;

    const { options, inputType, className, placeholder } =
      this.field.additional;

    this.componentRef.instance.items = options || [];
    this.componentRef.instance.type = inputType || '';

    this.componentRef.instance.className = className || '';
    this.componentRef.instance.placeholder = placeholder || '';
  }

  private setCheckboxProps() {
    if (!this.field.additional) return;

    this.componentRef.instance.toggle =
      this.field.additional.checkbox?.isToggle || false;
  }

  private setSliderProps() {
    if (!this.field.additional) return;

    const { instance } = this.componentRef;
    const { slider } = this.field.additional;
    const props = APP_SLIDER_UPLOAD_DEFAULT_VALUES;

    instance.min = slider?.min || props.min;
    instance.max = slider?.max || props.max;
    instance.step = slider?.step || props.step;
    instance.range = slider?.range || props.range;
    instance.showTickMarks = slider?.showTickMarks || props.showTickMarks;
  }

  private setTextEditorProps() {
    if (!this.field.additional) return;

    this.componentRef.instance.config =
      this.field.additional.textEditor?.config || {};
  }

  private setDatePickerProps() {
    if (!this.field.additional) return;

    this.componentRef.instance.range =
      this.field.additional.datepicker?.isDatepickerRange || false;
  }

  private setFileUploadProps() {
    if (!this.field.additional) return;

    const { instance } = this.componentRef;
    const { fileUpload } = this.field.additional;
    const props = APP_FILE_UPLOAD_DEFAULT_VALUES;

    instance.maxFiles = fileUpload?.maxFiles || props.maxFiles;
    instance.fileTypes = fileUpload?.fileTypes || props.fileTypes;
    instance.limitErrorMessage =
      fileUpload?.limitErrorMessage || props.limitErrorMessage;
  }

  private setImageCropperProps() {
    if (!this.field.additional) return;

    const { instance } = this.componentRef;
    const { imageCropper } = this.field.additional;
    const props = APP_IMAGE_CROPPER_DEFAULT_VALUES;

    instance.scale = imageCropper?.scale || props.scale;
    instance.height = imageCropper?.height || props.height;
    instance.rounded = imageCropper?.rounded || props.rounded;
    instance.imageURL = imageCropper?.imageURL || props.imageURL;
    instance.buttonText = imageCropper?.buttonText || props.buttonText;
    instance.background = imageCropper?.background || props.background;
    instance.aspectRatio = imageCropper?.aspectRatio || props.aspectRatio;
    instance.onlyScaleDown = imageCropper?.onlyScaleDown || props.onlyScaleDown;
    instance.cropperMinWidth =
      imageCropper?.cropperMinWidth || props.cropperMinWidth;
    instance.maintainAspectRatio =
      imageCropper?.maintainAspectRatio || props.maintainAspectRatio;
  }
}
