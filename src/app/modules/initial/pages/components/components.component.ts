import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

import { JsonPipe } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { AppFormGeneratorComponent } from '../../../@core/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../@core/_form-generator/form-generator.service';
import { IFormOption } from '../../../@core/interfaces/app-form.interface';
import { DatePickerRangeValue } from '../../../@core/types/datepicker.type';
import { FormExampleComponent } from '../../components/form-example/form-example.component';
import { TerminalWindowComponent } from '../../components/terminal-window/terminal-window.component';

import { AppThemeSelectionComponent } from '../../../@core/components/app-theme-selection/app-theme-selection.component';
import { AppCheckboxComponent } from '../../../@core/components/form/app-checkbox/app-checkbox.component';

@Component({
  standalone: true,
  selector: 'app-components',
  styleUrl: './components.component.scss',
  templateUrl: './components.component.html',
  imports: [
    JsonPipe,
    FormsModule,
    RouterModule,
    MatTabsModule,
    AppCheckboxComponent,
    FormExampleComponent,
    TerminalWindowComponent,
    AppFormGeneratorComponent,
    AppThemeSelectionComponent,
  ],
})
export class ComponentsComponent {
  public defaultOptions: IFormOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 },
  ];

  private readonly fieldWidth: string = 'calc(50% - 12px)';
  public formValue: IFormGeneratorExample = {} as IFormGeneratorExample;
  public formExample = this.formGeneratorService.init<IFormGeneratorExample>([
    [
      {
        width: this.fieldWidth,
        type: 'input',
        name: 'password',
        label: 'Password',
        initialValue: '',
        validators: [Validators.required],
        additional: { inputType: `password` },
      },
      {
        width: this.fieldWidth,
        name: 'email',
        type: 'input',
        label: 'email',
        initialValue: '',
        validators: [Validators.required],
        additional: { inputType: `email` },
      },
    ],
    [
      {
        width: this.fieldWidth,
        name: 'name',
        label: 'Name',
        type: 'input',
        initialValue: '',
        validators: [Validators.required],
      },
      {
        width: this.fieldWidth,
        name: 'select',
        type: 'select',
        label: 'Select',
        initialValue: 0,
        validators: [Validators.required],
      },
    ],
    [
      {
        width: this.fieldWidth,
        name: 'age',
        label: 'Age',
        type: 'input',
        initialValue: 0,
        additional: { inputType: `number` },
      },
      {
        width: this.fieldWidth,
        name: 'radio',
        type: 'radio',
        label: 'radio',
        initialValue: 0,
        validators: [Validators.required],
      },
    ],
    [
      {
        width: this.fieldWidth,
        name: 'birthDate',
        type: 'datepicker',
        label: 'Birth date',
        initialValue: new Date(),
      },
      {
        width: this.fieldWidth,
        name: 'rage',
        label: 'Rage',
        initialValue: '',
        type: 'datepicker',
        additional: { isDatepickerRange: true },
      },
    ],
    [
      {
        initialValue: '',
        type: 'textarea',
        name: 'description',
        label: 'Description',
      },
    ],
    [
      {
        width: this.fieldWidth,
        name: 'isAdmin',
        type: 'checkbox',
        label: 'Is admin',
        initialValue: false,
        additional: { isToggle: true },
      },
    ],
  ]);

  constructor(private formGeneratorService: FormGeneratorService) {}

  ngOnInit() {
    this.formExample.setOptionsField('radio', this.defaultOptions);
    this.formExample.setOptionsField('select', this.defaultOptions);

    this.formExample.setInitialValue('name', 'Valor inicial');
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
  select: number;
  isAdmin: boolean;
  description: string;
  birthDate: string | Date;
  rage: DatePickerRangeValue;
}
