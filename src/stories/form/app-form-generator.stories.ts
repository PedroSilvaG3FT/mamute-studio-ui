import { JsonPipe, NgClass, NgStyle } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppFormGeneratorComponent } from '../../app/modules/@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FieldGeneratorDirective } from '../../app/modules/@core/components/_form-generator/field-generator.directive';
import { StorybookFormBase } from './_base.form';

const storybookFormBase = new StorybookFormBase();

const meta: Meta<AppFormGeneratorComponent> = {
  component: AppFormGeneratorComponent,
  tags: ['autodocs'],
  title: 'Form/Form Generator',
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: [
        'initForm',
        'ngOnInit',
        'formGroup',
        'handleSubmit',
        'defaultFieldWidth',
        'dynamicColumClass',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        NgStyle,
        NgClass,
        JsonPipe,
        ReactiveFormsModule,
        FieldGeneratorDirective,
        ...storybookFormBase.commonImports,
      ],
    }),
  ],
};

export default meta;

const fieldWidth: string = 'calc(50% - 12px)';
export const component: StoryObj<AppFormGeneratorComponent> = {
  args: {
    fields: [
      [
        {
          type: 'input',
          name: 'password',
          initialValue: '',
          label: 'Password',
          width: fieldWidth,
          validators: [Validators.required],
          additional: { inputType: `password` },
        },
        {
          name: 'email',
          type: 'input',
          label: 'email',
          initialValue: '',
          width: fieldWidth,
          validators: [Validators.required],
          additional: { inputType: `email` },
        },
      ],
      [
        {
          width: fieldWidth,
          name: 'name',
          label: 'Name',
          type: 'input',
          initialValue: '',
          validators: [Validators.required],
        },
        {
          name: 'select',
          type: 'select',
          label: 'Select',
          initialValue: 0,
          width: fieldWidth,
          validators: [Validators.required],
          additional: { options: storybookFormBase.initialOptions },
        },
      ],
      [
        {
          name: 'age',
          label: 'Age',
          type: 'input',
          initialValue: 0,
          width: fieldWidth,
          additional: { inputType: `number` },
        },
        {
          name: 'radio',
          type: 'radio',
          label: 'radio',
          initialValue: 0,
          width: fieldWidth,
          validators: [Validators.required],
          additional: { options: storybookFormBase.initialOptions },
        },
      ],
      [
        {
          width: fieldWidth,
          name: 'birthDate',
          type: 'datepicker',
          label: 'Birth date',
          initialValue: new Date(),
        },
        {
          name: 'rage',
          label: 'Rage',
          initialValue: '',
          width: fieldWidth,
          type: 'datepicker',
          additional: { datepicker: { isDatepickerRange: true } },
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
          name: 'isAdmin',
          type: 'checkbox',
          label: 'Is admin',
          width: fieldWidth,
          initialValue: false,
          additional: { checkbox: { isToggle: true } },
        },
      ],
    ],
  },
  render: (args: AppFormGeneratorComponent) => ({ props: args }),
};
