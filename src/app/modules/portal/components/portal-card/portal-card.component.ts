import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimateDirective } from '../../../@core/directives/animate.directive';

@Component({
  standalone: true,
  selector: 'portal-card',
  styleUrl: './portal-card.component.scss',
  imports: [AnimateDirective, RouterModule],
  templateUrl: './portal-card.component.html',
})
export class PortalCardComponent {
  @Input() badge: string | null = '';
  @Input() route: string | null = '';
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) background: string = '';
  @Input({ required: true }) description: string = '';

  @Output() onClick = new EventEmitter();
}
