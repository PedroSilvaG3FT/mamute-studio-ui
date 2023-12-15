import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppInputComponent } from '../../app/modules/@core/components/form/app-input/app-input.component';
import { StorybookFormBase } from './_base.form';

const storybookFormBase = new StorybookFormBase();

const meta: Meta<AppInputComponent> = {
  component: AppInputComponent,
  tags: ['autodocs'],
  title: 'Form/Input',
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: storybookFormBase.buildExcludeFormProps([]),
    },
  },
  decorators: [
    moduleMetadata({
      imports: [...storybookFormBase.commonImports],
    }),
  ],
};

export default meta;
export const component: StoryObj<AppInputComponent> = {
  args: {
    initialValue: '',
    name: 'input-example',
    label: 'input example',
    placeholder: 'input example placeholder',
  },
  render: (args: AppInputComponent) => ({ props: args }),
};
