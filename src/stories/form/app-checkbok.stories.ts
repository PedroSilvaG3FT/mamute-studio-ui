import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppCheckboxComponent } from '../../app/modules/@core/components/form/app-checkbox/app-checkbox.component';
import { StorybookFormBase } from './_base.form';

const storybookFormBase = new StorybookFormBase();

const meta: Meta<AppCheckboxComponent> = {
  component: AppCheckboxComponent,
  tags: ['autodocs'],
  title: 'Form/Checkbox',
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: storybookFormBase.buildExcludeFormProps([
        'hint',
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
export const component: StoryObj<AppCheckboxComponent> = {
  args: {
    initialValue: true,
    name: 'checkbox-example',
    label: 'Checkbox example',
  },
  argTypes: { initialValue: { control: { type: 'boolean' } } },
  render: (args: AppCheckboxComponent) => ({ props: args }),
};
