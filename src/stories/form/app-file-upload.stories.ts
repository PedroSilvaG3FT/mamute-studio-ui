import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppFileUploadComponent } from '../../app/modules/@core/components/form/app-file-upload/app-file-upload.component';
import { StorybookFormBase } from './_base.form';

const storybookFormBase = new StorybookFormBase();

const meta: Meta<AppFileUploadComponent> = {
  component: AppFileUploadComponent,
  tags: ['autodocs'],
  title: 'Form/File Upload',
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: storybookFormBase.buildExcludeFormProps(['id', 'appearance']),
    },
  },
  decorators: [
    moduleMetadata({
      imports: [...storybookFormBase.commonImports],
    }),
  ],
};

export default meta;
export const component: StoryObj<AppFileUploadComponent> = {
  args: {
    initialValue: [],
    name: 'file-upload-example',
    label: 'File Upload example',
  },
  render: (args: AppFileUploadComponent) => ({ props: args }),
};
