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
        type: 'input',
        name: 'password',
        label: 'Password',
        width: this.fieldWidth,
        validators: [Validators.required],
        additional: { inputType: `password` },
      },
      {
        name: 'email',
        type: 'input',
        label: 'email',
        width: this.fieldWidth,
        validators: [Validators.required],
        additional: { inputType: `email` },
      },
    ],
    [
      {
        name: 'name',
        label: 'Name',
        type: 'input',
        width: this.fieldWidth,
        validators: [Validators.required],
      },
      {
        name: 'select',
        type: 'select',
        label: 'Select',
        width: this.fieldWidth,
        validators: [Validators.required],
      },
    ],
    [
      {
        name: 'age',
        label: 'Age',
        type: 'input',
        width: this.fieldWidth,
        additional: { inputType: `number` },
      },
      {
        name: 'radio',
        type: 'radio',
        label: 'radio',
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
        name: 'rage',
        label: 'Rage',
        type: 'datepicker',
        width: this.fieldWidth,
        additional: { isDatepickerRange: true },
      },
    ],
    [{ type: 'textarea', name: 'description', label: 'Description' }],
    [{ label: '', type: 'text-editor', name: 'text-editor' }],
    [
      {
        name: 'isAdmin',
        type: 'checkbox',
        label: 'Is admin',
        width: this.fieldWidth,
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
