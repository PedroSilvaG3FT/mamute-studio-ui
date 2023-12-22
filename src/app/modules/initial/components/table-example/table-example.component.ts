import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { AppTableComponent } from '../../../@core/components/app-table/app-table.component';
import { filterListPagination } from '../../../@core/functions/pagination.function';
import { IPagination } from '../../../@core/interfaces/app-pagination.interface';
import {
  ITableCell,
  ITableCellAction,
} from '../../../@core/interfaces/app-table.interface';
import { AlertService } from '../../../@core/services/alert.service';

@Component({
  standalone: true,
  selector: 'table-example',
  imports: [AppTableComponent],
  styleUrl: './table-example.component.scss',
  templateUrl: './table-example.component.html',
})
export class TableExampleComponent {
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

  constructor(private alertService: AlertService) {}

  ngOnInit() {
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
