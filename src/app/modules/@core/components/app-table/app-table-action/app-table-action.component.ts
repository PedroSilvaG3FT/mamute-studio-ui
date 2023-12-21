import {
  Component,
  Input,
  ViewEncapsulation,
  booleanAttribute,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { ITableCellAction } from '../../../interfaces/app-table.interface';

@Component({
  standalone: true,
  selector: 'app-table-action',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './app-table-action.component.scss',
  templateUrl: './app-table-action.component.html',
  imports: [MatTableModule, MatMenuModule, MatButtonModule],
})
export class AppTableActionComponent {
  @Input({ required: true }) index: number = 0;
  @Input({ required: true }) element: object = {};
  @Input({ required: true }) actions: ITableCellAction<any>[] = [];
  @Input({ transform: booleanAttribute }) menuMode: boolean = false;
}
