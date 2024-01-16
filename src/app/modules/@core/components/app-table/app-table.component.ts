import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
  booleanAttribute,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IPagination } from '../../interfaces/app-pagination.interface';
import {
  ITableCell,
  ITableCellAction,
} from '../../interfaces/app-table.interface';
import { AppEmptyListComponent } from '../app-empty-list/app-empty-list.component';
import { AppTableActionComponent } from './app-table-action/app-table-action.component';

@Component({
  standalone: true,
  selector: 'app-table',
  styleUrl: './app-table.component.scss',
  templateUrl: './app-table.component.html',
  imports: [
    DatePipe,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    AppEmptyListComponent,
    AppTableActionComponent,
  ],
})
export class AppTableComponent {
  public readonly actionColDef: string = 'action';
  private readonly defaultPagination: IPagination = {
    pageSize: 5,
    pageNumber: 1,
    totalItems: 20,
    pageSizeOptions: [5, 10, 20, 50],
  };

  @Input() title: string = '';

  @Input() actionColTitle: string = '';
  @Input() actions: ITableCellAction<any>[] = [];
  @Input({ transform: booleanAttribute }) actionMenuMode: boolean = false;

  @Input({ required: true }) data: object[] = [];
  @Input({ required: true }) columns: ITableCell[] = [];
  @Input() pagination: IPagination = this.defaultPagination;

  @Input() emptyDescription: string = ``;
  @Input() emptyRedirectURL: string = ``;
  @Input() emptyRedirectText: string = ``;

  @Output() onSortChange = new EventEmitter<Sort>();
  @Output() onPaginationChange = new EventEmitter<IPagination>();

  public columnsDefs: string[] = [];
  public dataSource = new MatTableDataSource<object>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.columnsDefs = this.columns.map(({ def }) => def);
    if (this.actions.length) this.columnsDefs.push(this.actionColDef);

    this.pagination = { ...this.defaultPagination, ...this.pagination };

    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = changes['data'].currentValue;
    this.pagination =
      changes['pagination']?.currentValue || this.defaultPagination;
  }

  public handlePageChange(event: PageEvent) {
    this.onPaginationChange.emit({
      ...this.pagination,
      pageSize: event.pageSize,
      pageNumber: event.pageIndex + 1,
    });
  }

  public handleSortChange(sortState: Sort) {
    this.onSortChange.emit(sortState);
  }
}
