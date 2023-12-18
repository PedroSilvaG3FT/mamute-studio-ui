import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppTextEditorComponent } from '../../app/modules/@core/components/form/app-text-editor/app-text-editor.component';
import { StorybookFormBase } from './_base.form';

const storybookFormBase = new StorybookFormBase();

const meta: Meta<AppTextEditorComponent> = {
  component: AppTextEditorComponent,
  tags: ['autodocs'],
  title: 'Form/Text Editor',
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: storybookFormBase.buildExcludeFormProps([
        'name',
        'appearance',
        'placeholder',
        'configModel',
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
export const component: StoryObj<AppTextEditorComponent> = {
  args: {
    initialValue: '',
    name: 'text-editor-example',
    label: 'Text editor example',
  },
  render: (args: AppTextEditorComponent) => ({ props: args }),
};
