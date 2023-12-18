import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppDatepickerComponent } from '../../app/modules/@core/components/form/app-datepicker/app-datepicker.component';
import { StorybookFormBase } from './_base.form';

const storybookFormBase = new StorybookFormBase();

const meta: Meta<AppDatepickerComponent> = {
  component: AppDatepickerComponent,
  tags: ['autodocs'],
  title: 'Form/Datepicker',
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: storybookFormBase.buildExcludeFormProps(['placeholder']),
    },
  },
  decorators: [
    moduleMetadata({
      imports: [...storybookFormBase.commonImports],
    }),
  ],
};

export default meta;
export const component: StoryObj<AppDatepickerComponent> = {
  args: {
    initialValue: new Date(),
    name: 'datepicker-example',
    label: 'datepicker example',
  },
  render: (args: AppDatepickerComponent) => ({ props: args }),
};
