import { transition, useAnimation } from '@angular/animations';
import { slideLeft, slideRight } from './slide.animation';

export const ROUTER_STACK_ANIMATION = [
  transition('home => features', useAnimation(slideLeft)),
  transition('features => home', useAnimation(slideRight)),
];
