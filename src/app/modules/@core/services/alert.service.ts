import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(public snackBar: MatSnackBar) {}

  public snackDefaultResponseError(error?: any) {
    const message =
      error?.message || `Ocorreu um erro ao processar a solicitação`;

    this.snackBar.open(message, 'fechar');
  }
}
