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
import { AppInputComponent } from '../components/form/app-input/app-input.component';
import { AppRadioButtonComponent } from '../components/form/app-radio-button/app-radio-button.component';
import { AppSelectComponent } from '../components/form/app-select/app-select.component';
import { AppTextareaComponent } from '../components/form/app-textarea/app-textarea.component';
import { IFormGeneratorField } from './app-form-generator.interface';

const components = {
  input: AppInputComponent,
  select: AppSelectComponent,
  radio: AppRadioButtonComponent,
  textarea: AppTextareaComponent,
  checkbox: AppCheckboxComponent,
  datepicker: AppDatepickerComponent,
};

export type FormGeneratorFieldType = keyof typeof components;

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
    this.componentRef.instance.label = this.field.label;
    this.componentRef.instance.formControlName = this.field.name;

    if (this.field.additional) {
      const {
        options,
        isToggle,
        className,
        inputType,
        placeholder,
        errorMessage,
        isDatepickerRange,
      } = this.field.additional;

      this.componentRef.instance.items = options || [];
      this.componentRef.instance.type = inputType || '';
      this.componentRef.instance.toggle = isToggle || false;
      this.componentRef.instance.className = className || '';
      this.componentRef.instance.placeholder = placeholder || '';
      this.componentRef.instance.errorMessage = errorMessage || '';
      this.componentRef.instance.range = isDatepickerRange || false;
    }
  }
}
