import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { JsonPipe } from '@angular/common';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { AppFormGeneratorComponent } from '../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../@core/components/_form-generator/form-generator.service';
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
import { SliderRangeValue } from '../../../@core/types/slider.type';
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
  ];

  private readonly fieldWidth: string = 'calc(50% - 12px)';
  public formGroup!: FormGroup;
  public formValue: IFormGeneratorExample = {} as IFormGeneratorExample;
  public formExample = this.formGeneratorService.init<IFormGeneratorExample>([
    [
      {
        name: 'email',
        type: 'input',
        label: 'email',
        width: this.fieldWidth,
        validators: [Validators.required],
        additional: { inputType: `email` },
      },
      {
        type: 'input',
        name: 'password',
        label: 'Password',
        width: this.fieldWidth,
        validators: [Validators.required],
        additional: { inputType: `password` },
      },
    ],
    [
      {
        name: 'name',
        type: 'input',
        label: 'Name',
        width: this.fieldWidth,
        validators: [Validators.required],
      },
      {
        name: 'age',
        label: 'Age',
        type: 'input',
        width: this.fieldWidth,
        additional: { inputType: `number` },
      },
    ],
    [
      {
        name: 'select',
        type: 'select',
        label: 'Select',
        width: this.fieldWidth,
        validators: [Validators.required],
      },

      {
        name: 'radio',
        type: 'radio',
        label: 'Radio',
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
        label: 'Rage',
        type: 'datepicker',
        width: this.fieldWidth,
        name: 'datePickerRange',
        additional: { datepicker: { isDatepickerRange: true } },
      },
    ],
    [{ type: 'textarea', name: 'description', label: 'Description' }],
    [{ label: 'Text editor', type: 'text-editor', name: 'textEditor' }],
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
        name: 'isAdmin',
        type: 'checkbox',
        label: 'Is admin',
        width: this.fieldWidth,
        additional: { checkbox: { isToggle: true } },
      },
    ],
    [{ name: 'fileUpload', type: 'file-upload', label: 'File upload' }],
    [{ name: 'imageCropper', type: 'image-cropper', label: 'Image Cropper' }],
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
    { def: 'weight', key: 'weight', label: 'Weight' },
    { def: 'symbol', key: 'symbol', label: 'Symbol' },
  ];

  constructor(
    private alertService: AlertService,
    private formGeneratorService: FormGeneratorService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getItems();
  }

  public initForm() {
    this.formExample.setOptionsField('radio', this.defaultOptions);
    this.formExample.setOptionsField('select', this.defaultOptions);

    const initialValue: Partial<IFormGeneratorExample> = {
      age: 10,
      radio: 3,
      select: 2,
      slider: 5,
      isAdmin: true,
      name: 'Initial Name',
      birthDate: new Date(),
      password: 'password',
      email: 'inital@email.com',
      sliderRange: { min: 4, max: 6 },
      textEditor: 'Initial Text Editor',
      description: 'Initial Description',
      datePickerRange: {
        end: new Date(2023, 10, 13),
        start: new Date(2023, 10, 10),
      },
    };

    this.formExample.group.patchValue(initialValue);
    this.formValue = { ...this.formValue, ...initialValue };
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
  slider: number;
  select: number;
  fileUpload: any;
  isAdmin: boolean;
  password: string;
  imageCropper: any;
  textEditor: string;
  description: string;
  birthDate: string | Date;
  sliderRange: SliderRangeValue;
  datePickerRange: DatePickerRangeValue;
}

export interface PeriodicElement {
  name: string;
  weight: number;
  symbol: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
