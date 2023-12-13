import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[animate]',
})
export class AnimateDirective implements OnInit {
  @Input() animation = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setAnimation();
  }

  setAnimation() {
    this.el.nativeElement.classList.add(`animate__animated`);
    this.el.nativeElement.classList.add(this.animation);
  }
}
