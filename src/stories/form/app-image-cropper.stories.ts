import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppImageCropperComponent } from '../../app/modules/@core/components/form/app-image-cropper/app-image-cropper.component';
import { StorybookFormBase } from './_base.form';

const storybookFormBase = new StorybookFormBase();

const meta: Meta<AppImageCropperComponent> = {
  component: AppImageCropperComponent,
  tags: ['autodocs'],
  title: 'Form/Image Cropper',
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
export const component: StoryObj<AppImageCropperComponent> = {
  args: {
    initialValue: [],
    name: 'file-upload-example',
    label: 'File Upload example',
  },
  render: (args: AppImageCropperComponent) => ({ props: args }),
};
