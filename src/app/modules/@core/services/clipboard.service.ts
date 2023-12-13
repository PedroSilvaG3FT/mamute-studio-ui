import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class ClipboardService {
  constructor(private alertService: AlertService) {}

  public copy(value: string, snackMessage = '', snackDuration = 50000) {
    const selBox = document.createElement('textarea');
    selBox.value = value;

    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';

    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    if (snackMessage)
      this.alertService.snackBar.open(snackMessage, 'close', {
        duration: snackDuration,
      });
  }
}
