import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'portal-ticket-sucess-modal',
  styleUrl: './portal-ticket-sucess-modal.component.scss',
  templateUrl: './portal-ticket-sucess-modal.component.html',
})
export class PortalTicketSucessModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PortalTicketSucessModalComponent>
  ) {}

  public handleClose() {
    this.dialogRef.close();
  }
}
