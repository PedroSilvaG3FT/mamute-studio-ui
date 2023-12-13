import { transition, useAnimation } from '@angular/animations';
import { slideLeft, slideRight } from './slide.animation';

export const ROUTER_STACK_ANIMATION = [
  transition('home => components', useAnimation(slideLeft)),
  transition('components => home', useAnimation(slideRight)),
];
