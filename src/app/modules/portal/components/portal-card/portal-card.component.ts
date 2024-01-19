import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnimateDirective } from '../../../@core/directives/animate.directive';

@Component({
  standalone: true,
  selector: 'portal-card',
  imports: [AnimateDirective],
  styleUrl: './portal-card.component.scss',
  templateUrl: './portal-card.component.html',
})
export class PortalCardComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) background: string = '';
  @Input({ required: true }) description: string = '';

  @Output() onClick = new EventEmitter();
}
