import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppRadioButtonComponent } from '../../app/modules/@core/components/form/app-radio-button/app-radio-button.component';
import { StorybookFormBase } from './_base.form';

const storybookFormBase = new StorybookFormBase();

const meta: Meta<AppRadioButtonComponent> = {
  component: AppRadioButtonComponent,
  tags: ['autodocs'],
  title: 'Form/Radio Button',
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: storybookFormBase.buildExcludeFormProps([
        'appearance',
        'placeholder',
        'errorMessage',
      ]),
    },
  },
  decorators: [
    moduleMetadata({
      imports: [...storybookFormBase.commonImports],
    }),
  ],
};

export default meta;
export const component: StoryObj<AppRadioButtonComponent> = {
  args: {
    initialValue: 1,
    name: 'radio-button-example',
    label: 'Radio button example',
    items: storybookFormBase.initialOptions,
  },
  argTypes: { initialValue: { control: { type: 'number' } } },
  render: (args: AppRadioButtonComponent) => ({ props: args }),
};
