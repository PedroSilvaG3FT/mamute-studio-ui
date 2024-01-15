import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(public snackBar: MatSnackBar) {}

  public snackDefaultResponseError() {
    this.snackBar.open('Ocorreu um erro ao processar a solicitação', 'fechar');
  }
}
