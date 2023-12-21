import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { JsonPipe } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { AppFormGeneratorComponent } from '../../../@core/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../@core/_form-generator/form-generator.service';
import { IFormOption } from '../../../@core/interfaces/app-form.interface';
import { DatePickerRangeValue } from '../../../@core/types/datepicker.type';
import { FormExampleComponent } from '../../components/form-example/form-example.component';
import { TerminalWindowComponent } from '../../components/terminal-window/terminal-window.component';

import { Sort } from '@angular/material/sort';
import { AppTableComponent } from '../../../@core/components/app-table/app-table.component';
import { AppCheckboxComponent } from '../../../@core/components/form/app-checkbox/app-checkbox.component';
import { filterListPagination } from '../../../@core/functions/pagination.function';
import { IPagination } from '../../../@core/interfaces/app-pagination.interface';
import {
  ITableCell,
  ITableCellAction,
} from '../../../@core/interfaces/app-table.interface';
import { AlertService } from '../../../@core/services/alert.service';
import { PageNavComponent } from '../../components/page-nav/page-nav.component';

@Component({
  standalone: true,
  selector: 'app-components',
  styleUrl: './components.component.scss',
  templateUrl: './components.component.html',
  imports: [
    JsonPipe,
    FormsModule,
    MatTabsModule,
    PageNavComponent,
    AppTableComponent,
    AppCheckboxComponent,
    FormExampleComponent,
    TerminalWindowComponent,
    AppFormGeneratorComponent,
  ],
})
export class ComponentsComponent {
  public defaultOptions: IFormOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 },
  ];

  private readonly fieldWidth: string = 'calc(50% - 12px)';
  public formValue: IFormGeneratorExample = {} as IFormGeneratorExample;
  public formExample = this.formGeneratorService.init<IFormGeneratorExample>([
    [
      {
        name: 'slider',
        type: 'slider',
        label: 'Slider',
        additional: { slider: { min: 0, max: 10, step: 0.5 } },
      },

      {
        type: 'slider',
        name: 'sliderRange',
        label: 'Slider Range',
        additional: { slider: { min: 0, max: 10, step: 0.5, range: true } },
      },
    ],
    [
      {
        name: 'fileUpload',
        type: 'file-upload',
        label: 'File upload',
        additional: { fileUpload: { maxFiles: 3 } },
      },
    ],
    [
      {
        name: 'imageCropper',
        type: 'image-cropper',
        label: 'Image Cropper',
      },
      {
        name: 'imageCropperOutro',
        type: 'image-cropper',
        label: 'Image Cropper 2',
        additional: {
          imageCropper: {
            rounded: true,
          },
        },
      },
    ],
    [
      {
        type: 'input',
        name: 'password',
        label: 'Password',
        width: this.fieldWidth,
        validators: [Validators.required],
        additional: { inputType: `password` },
      },
      {
        name: 'email',
        type: 'input',
        label: 'email',
        width: this.fieldWidth,
        validators: [Validators.required],
        additional: { inputType: `email` },
      },
    ],
    [
      {
        name: 'name',
        label: 'Name',
        type: 'input',
        width: this.fieldWidth,
        validators: [Validators.required],
      },
      {
        name: 'select',
        type: 'select',
        label: 'Select',
        width: this.fieldWidth,
        validators: [Validators.required],
      },
    ],
    [
      {
        name: 'age',
        label: 'Age',
        type: 'input',
        width: this.fieldWidth,
        additional: { inputType: `number` },
      },
      {
        name: 'radio',
        type: 'radio',
        label: 'radio',
        width: this.fieldWidth,
        validators: [Validators.required],
      },
    ],
    [
      {
        name: 'birthDate',
        type: 'datepicker',
        label: 'Birth date',
        width: this.fieldWidth,
      },
      {
        name: 'rage',
        label: 'Rage',
        type: 'datepicker',
        width: this.fieldWidth,
        additional: { datepicker: { isDatepickerRange: true } },
      },
    ],
    [{ type: 'textarea', name: 'description', label: 'Description' }],
    [{ label: '', type: 'text-editor', name: 'text-editor' }],
    [
      {
        name: 'isAdmin',
        type: 'checkbox',
        label: 'Is admin',
        width: this.fieldWidth,
        additional: { checkbox: { isToggle: true } },
      },
    ],
  ]);

  //table
  public tableData: PeriodicElement[] = [];
  public pagination: IPagination = {
    pageSize: 5,
    pageNumber: 1,
    totalItems: 20,
    pageSizeOptions: [5, 10, 20, 50],
  };

  public tableActions: ITableCellAction<PeriodicElement>[] = [
    {
      title: 'Edit',
      icon: 'iconamoon:edit-fill',
      callback: (element) => this.handleEdit(element),
    },
  ];
  public tableColumns: ITableCell[] = [
    { def: 'position', key: 'position', label: 'No.', sticky: true },
    { def: 'name', key: 'name', label: 'Name' },
    { def: 'amount', key: 'amount', label: 'Amount' },
    { def: 'weight', key: 'weight', label: 'Weight' },
    { def: 'symbol', key: 'symbol', label: 'Symbol' },
  ];

  constructor(
    private alertService: AlertService,
    private formGeneratorService: FormGeneratorService
  ) {}

  ngOnInit() {
    this.formExample.setOptionsField('radio', this.defaultOptions);
    this.formExample.setOptionsField('select', this.defaultOptions);

    this.formExample.setInitialValue('name', 'Valor inicial');

    this.getItems();
  }

  public getItems() {
    const { pageNumber, pageSize } = this.pagination;
    this.tableData = filterListPagination(ELEMENT_DATA, pageNumber, pageSize);
  }

  public onSortChange(sort: Sort) {
    console.log(sort);
  }

  public onPaginationChange(pagination: IPagination) {
    this.pagination = pagination;
    this.getItems();
  }

  public handleEdit(item: PeriodicElement) {
    this.alertService.snackBar.open(item.name, 'close');
  }

  public onSubmit(model: IFormGeneratorExample) {
    alert(JSON.stringify(model));
  }

  public onValueChange(model: IFormGeneratorExample) {
    this.formValue = model;
  }
}

interface IFormGeneratorExample {
  age: number;
  name: string;
  email: string;
  radio: number;
  select: number;
  isAdmin: boolean;
  description: string;
  birthDate: string | Date;
  rage: DatePickerRangeValue;
}

export interface PeriodicElement {
  name: string;
  weight: number;
  symbol: string;
  position: number;
  amount: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { amount: 123, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { amount: 123, position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { amount: 123, position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { amount: 123, position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { amount: 123, position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { amount: 123, position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { amount: 123, position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { amount: 123, position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { amount: 123, position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { amount: 123, position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { amount: 123, position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  {
    amount: 123,
    position: 12,
    name: 'Magnesium',
    weight: 24.305,
    symbol: 'Mg',
  },
  {
    amount: 123,
    position: 13,
    name: 'Aluminum',
    weight: 26.9815,
    symbol: 'Al',
  },
  { amount: 123, position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  {
    amount: 123,
    position: 15,
    name: 'Phosphorus',
    weight: 30.9738,
    symbol: 'P',
  },
  { amount: 123, position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { amount: 123, position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { amount: 123, position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  {
    amount: 123,
    position: 19,
    name: 'Potassium',
    weight: 39.0983,
    symbol: 'K',
  },
  { amount: 123, position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
