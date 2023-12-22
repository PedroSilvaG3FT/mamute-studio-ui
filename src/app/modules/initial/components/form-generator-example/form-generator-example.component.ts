import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppFormGeneratorComponent } from '../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../@core/components/_form-generator/form-generator.service';
import { IFormOption } from '../../../@core/interfaces/app-form.interface';
import { DatePickerRangeValue } from '../../../@core/types/datepicker.type';
import { SliderRangeValue } from '../../../@core/types/slider.type';
import { TerminalWindowComponent } from '../terminal-window/terminal-window.component';

@Component({
  standalone: true,
  selector: 'form-generator-example',
  styleUrl: './form-generator-example.component.scss',
  templateUrl: './form-generator-example.component.html',
  imports: [JsonPipe, AppFormGeneratorComponent, TerminalWindowComponent],
})
export class FormGeneratorExampleComponent {
  public defaultOptions: IFormOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
  ];

  private readonly fieldWidth: string = 'calc(50% - 12px)';
  public formValue: IFormGeneratorExample = {} as IFormGeneratorExample;
  public form = this.formGeneratorService.init<IFormGeneratorExample>([
    [
      {
        name: 'email',
        type: 'input',
        label: 'email',
        width: this.fieldWidth,
        validators: [Validators.required],
        additional: { inputType: `email` },
      },
      {
        type: 'input',
        name: 'password',
        label: 'Password',
        width: this.fieldWidth,
        validators: [Validators.required],
        additional: { inputType: `password` },
      },
    ],
    [
      {
        name: 'name',
        type: 'input',
        label: 'Name',
        width: this.fieldWidth,
        validators: [Validators.required],
      },
      {
        name: 'age',
        label: 'Age',
        type: 'input',
        width: this.fieldWidth,
        additional: { inputType: `number` },
      },
    ],
    [
      {
        name: 'select',
        type: 'select',
        label: 'Select',
        width: this.fieldWidth,
        validators: [Validators.required],
      },

      {
        name: 'radio',
        type: 'radio',
        label: 'Radio',
        width: this.fieldWidth,
        validators: [Validators.required],
      },
    ],
    [
      {
        name: 'birthDate',
        type: 'datepicker',
        label: 'Birth date',
        width: this.fieldWidth,
      },
      {
        label: 'Rage',
        type: 'datepicker',
        width: this.fieldWidth,
        name: 'datePickerRange',
        additional: { datepicker: { isDatepickerRange: true } },
      },
    ],
    [{ type: 'textarea', name: 'description', label: 'Description' }],
    [{ label: 'Text editor', type: 'text-editor', name: 'textEditor' }],
    [
      {
        name: 'slider',
        type: 'slider',
        label: 'Slider',
        additional: { slider: { min: 0, max: 10, step: 0.5 } },
      },

      {
        type: 'slider',
        name: 'sliderRange',
        label: 'Slider Range',
        additional: { slider: { min: 0, max: 10, step: 0.5, range: true } },
      },
    ],
    [
      {
        name: 'isAdmin',
        type: 'checkbox',
        label: 'Is admin',
        width: this.fieldWidth,
        additional: { checkbox: { isToggle: true } },
      },
    ],
    [
      {
        name: 'fileUpload',
        type: 'file-upload',
        label: 'File upload',
        additional: {
          fileUpload: { maxFiles: 3 },
        },
      },
    ],
    [{ name: 'imageCropper', type: 'image-cropper', label: 'Image Cropper' }],
  ]);

  constructor(private formGeneratorService: FormGeneratorService) {}

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.form.setOptionsField('radio', this.defaultOptions);
    this.form.setOptionsField('select', this.defaultOptions);

    const initialValue: Partial<IFormGeneratorExample> = {
      age: 10,
      radio: 2,
      select: 2,
      slider: 5,
      isAdmin: true,
      name: 'Initial Name',
      birthDate: new Date(),
      password: 'password',
      email: 'inital@email.com',
      sliderRange: { min: 4, max: 6 },
      textEditor: 'Initial Text Editor',
      description: 'Initial Description',
      datePickerRange: {
        end: new Date(2023, 10, 13),
        start: new Date(2023, 10, 10),
      },
    };

    this.form.group.patchValue(initialValue);
    this.formValue = { ...this.formValue, ...initialValue };
  }

  public onSubmit(model: IFormGeneratorExample) {
    alert(JSON.stringify(model));
  }

  public onValueChange(model: IFormGeneratorExample) {
    this.formValue = model;
  }
}

interface IFormGeneratorExample {
  age: number;
  name: string;
  email: string;
  radio: number;
  slider: number;
  select: number;
  fileUpload: any;
  isAdmin: boolean;
  password: string;
  imageCropper: any;
  textEditor: string;
  description: string;
  birthDate: string | Date;
  sliderRange: SliderRangeValue;
  datePickerRange: DatePickerRangeValue;
}
