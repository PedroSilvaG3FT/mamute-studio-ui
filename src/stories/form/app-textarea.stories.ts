import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppTextareaComponent } from '../../app/modules/@core/components/form/app-textarea/app-textarea.component';
import { StorybookFormBase } from './_base.form';

const storybookFormBase = new StorybookFormBase();

const meta: Meta<AppTextareaComponent> = {
  component: AppTextareaComponent,
  tags: ['autodocs'],
  title: 'Form/Textarea',
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
export const component: StoryObj<AppTextareaComponent> = {
  args: {
    initialValue: '',
    name: 'textarea-example',
    label: 'Textarea example',
    placeholder: 'Textarea example placeholder',
  },
  render: (args: AppTextareaComponent) => ({ props: args }),
};
