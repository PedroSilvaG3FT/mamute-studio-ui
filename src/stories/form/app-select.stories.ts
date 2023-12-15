import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppSelectComponent } from '../../app/modules/@core/components/form/app-select/app-select.component';
import { StorybookFormBase } from './_base.form';

const storybookFormBase = new StorybookFormBase();

const meta: Meta<AppSelectComponent> = {
  component: AppSelectComponent,
  tags: ['autodocs'],
  title: 'Form/Select',
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: storybookFormBase.buildExcludeFormProps([
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
export const component: StoryObj<AppSelectComponent> = {
  args: {
    initialValue: 1,
    name: 'select-example',
    label: 'Select example',
    items: storybookFormBase.initialOptions,
  },
  argTypes: { initialValue: { control: { type: 'number' } } },
  render: (args: AppSelectComponent) => ({ props: args }),
};
