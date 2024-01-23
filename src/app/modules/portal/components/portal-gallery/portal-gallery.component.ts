import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AnimateDirective } from '../../../@core/directives/animate.directive';

@Component({
  standalone: true,
  selector: 'portal-gallery',
  styleUrl: './portal-gallery.component.scss',
  imports: [MatButtonModule, AnimateDirective],
  templateUrl: './portal-gallery.component.html',
})
export class PortalGalleryComponent {
  @Input({ required: true }) data: string[] = [];

  public selectedImageURL: string = '';

  public handleSelectImage(url: string) {
    this.selectedImageURL = url;
  }

  public closePreview() {
    this.selectedImageURL = '';
  }
}
