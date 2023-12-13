import { NgIf } from '@angular/common';
import { Component, Input, booleanAttribute } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardService } from '../../../@core/services/clipboard.service';

@Component({
  standalone: true,
  selector: 'app-terminal-window',
  imports: [NgIf, MatSnackBarModule],
  styleUrl: './terminal-window.component.scss',
  templateUrl: './terminal-window.component.html',
})
export class TerminalWindowComponent {
  @Input() title: string = '';
  @Input({ required: true }) content: string = '';
  @Input({ transform: booleanAttribute }) hidePrefix: boolean = false;

  constructor(private clipboardService: ClipboardService) {}

  public handleCopyContent() {
    this.clipboardService.copy(this.content, 'Content copied!');
  }
}
