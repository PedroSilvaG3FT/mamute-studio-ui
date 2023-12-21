import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppSliderComponent } from '../../app/modules/@core/components/form/app-slider/app-slider.component';
import { StorybookFormBase } from './_base.form';

const storybookFormBase = new StorybookFormBase();

const meta: Meta<AppSliderComponent> = {
  component: AppSliderComponent,
  tags: ['autodocs'],
  title: 'Form/Slider',
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: storybookFormBase.buildExcludeFormProps([
        'appearance',
        'placeholder',
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
export const component: StoryObj<AppSliderComponent> = {
  args: {
    min: 0,
    max: 10,
    step: 1,
    range: false,
    initialValue: 4,
    name: 'slider-example',
    label: 'Slider example',
  },
  render: (args: AppSliderComponent) => ({ props: args }),
};
