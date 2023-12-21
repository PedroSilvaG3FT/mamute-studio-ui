import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppTableActionComponent } from '../app/modules/@core/components/app-table/app-table-action/app-table-action.component';
import { AppTableComponent } from '../app/modules/@core/components/app-table/app-table.component';

const meta: Meta<AppTableComponent> = {
  component: AppTableComponent,
  tags: ['autodocs'],
  title: 'Table',
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: [
        'actionColDef',
        'defaultPagination',
        'columnsDefs',
        'dataSource',
        'sort',
        'paginator',
        'ngOnInit',
        'ngAfterViewInit',
        'ngOnChanges',
        'handlePageChange',
        'handleSortChange',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        AppTableActionComponent,
      ],
    }),
  ],
};

export default meta;
export const component: StoryObj<AppTableComponent> = {
  args: {
    actionMenuMode: true,
    actions: [
      {
        title: 'Edit',
        icon: 'iconamoon:edit-fill',
        callback: (element, index) => alert(`Element clicked. Row ${index}`),
      },
    ],
    columns: [
      { def: 'firstCol', key: 'firstCol', label: 'First Col' },
      { def: 'secondCol', key: 'secondCol', label: 'Second Col' },
    ],
    data: [
      { firstCol: 'Content First 1', secondCol: 'Content Second 1' },
      { firstCol: 'Content First 2', secondCol: 'Content Second 2' },
    ],
    pagination: {
      pageSize: 5,
      pageNumber: 1,
      totalItems: 2,
      pageSizeOptions: [5, 10, 15],
    },
  },
  render: (args: AppTableComponent) => ({ props: args }),
};
