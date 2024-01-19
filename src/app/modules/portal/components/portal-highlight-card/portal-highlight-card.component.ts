import {
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
} from '@angular/core';

@Component({
  imports: [],
  standalone: true,
  selector: 'portal-highlight-card',
  styleUrl: './portal-highlight-card.component.scss',
  templateUrl: './portal-highlight-card.component.html',
})
export class PortalHighlightCardComponent {
  @Input() badge: string | null = '';
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) background: string = '';
  @Input({ required: true }) description: string = '';
  @Input({ transform: booleanAttribute }) heightFull: boolean = false;

  @Output() onClick = new EventEmitter();
}
