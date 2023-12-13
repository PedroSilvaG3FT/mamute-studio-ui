import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { AppInputComponent } from '../app/modules/@core/components/form/app-input/app-input.component';

const meta: Meta<AppInputComponent> = {
  component: AppInputComponent,
  title: 'Example/Page',
  parameters: { layout: 'fullscreen' },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<AppInputComponent>;

export const LoggedOut: Story = {
  render: (args: AppInputComponent) => ({ props: args }),
};
