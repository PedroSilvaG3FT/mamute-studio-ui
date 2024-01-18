import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [],
  standalone: true,
  selector: 'portal-highlight-card',
  styleUrl: './portal-highlight-card.component.scss',
  templateUrl: './portal-highlight-card.component.html',
})
export class PortalHighlightCardComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) background: string = '';
  @Input({ required: true }) description: string = '';

  @Output() onClick = new EventEmitter();
}
