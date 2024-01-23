import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalLoginComponent } from '../modal-login/modal-login.component';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-modal-request-login',
  styleUrl: './modal-request-login.component.scss',
  templateUrl: './modal-request-login.component.html',
})
export class ModalRequestLoginComponent {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalRequestLoginComponent>
  ) {}

  public handleOpenLogin() {
    this.dialogRef.close();
    this.dialog.open(ModalLoginComponent);
  }
}
