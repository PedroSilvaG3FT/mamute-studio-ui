import {
  Component,
  Input,
  ViewEncapsulation,
  booleanAttribute,
  forwardRef,
  inject,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ImageCroppedEvent,
  ImageCropperModule,
  ImageTransform,
} from 'ngx-image-cropper';
import { ModelControl } from '../model-control';

@Component({
  standalone: true,
  selector: 'app-image-cropper',
  styleUrl: './app-image-cropper.component.scss',
  templateUrl: './app-image-cropper.component.html',
  imports: [ImageCropperModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppImageCropperComponent),
    },
  ],
})
export class AppImageCropperComponent extends ModelControl {
  @Input() scale: number = 1;
  @Input() imageURL: string = '';
  @Input() height: string = '300px';
  @Input() aspectRatio: number = 4 / 3;
  @Input() background: string = 'black';
  @Input() cropperMinWidth: number = 128;
  @Input() buttonText: string = 'Select file';
  @Input({ transform: booleanAttribute }) rounded = false;
  @Input({ transform: booleanAttribute }) onlyScaleDown = true;
  @Input({ transform: booleanAttribute }) maintainAspectRatio = true;

  public translateH = 0;
  public translateV = 0;
  public loading = false;
  public rotation?: number;
  public canvasRotation = 0;
  public showCropper = false;
  public imageChangedEvent = '';
  public containWithinAspectRatio = false;
  public readonly inputId: string = 'image-upload-input';
  public transform: ImageTransform = { translateUnit: 'px' };

  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    if (this.rounded) this.aspectRatio = 4 / 4;
    if (!this.isDynamic) this.initMonitoringChanges();
  }

  public imageCropped(event: ImageCroppedEvent) {
    const preview = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl || event.base64 || ''
    );

    this.group.patchValue({ [this.formControlName]: event.objectUrl });
  }

  public imageLoaded() {
    this.showCropper = true;
  }

  public cropperReady() {
    this.loading = false;
  }

  public loadImageFailed() {
    console.error('Load image failed');
  }

  public fileChangeEvent(event: any): void {
    this.loading = true;
    this.imageChangedEvent = event;

    setTimeout(() => this.resetImage());
  }

  public rotateLeft() {
    this.loading = true;
    setTimeout(() => {
      this.canvasRotation--;
      this.flipAfterRotate();
    });
  }

  public flipHorizontal() {
    this.transform = { ...this.transform, flipH: !this.transform.flipH };
  }

  public flipVertical() {
    this.transform = { ...this.transform, flipV: !this.transform.flipV };
  }

  public resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = { translateUnit: 'px' };
  }

  public zoomOut() {
    this.scale -= 0.1;
    this.transform = { ...this.transform, scale: this.scale };
  }

  public zoomIn() {
    this.scale += 0.1;
    this.transform = { ...this.transform, scale: this.scale };
  }

  public toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  private flipAfterRotate() {
    this.transform = {
      ...this.transform,
      flipH: this.transform.flipV,
      flipV: this.transform.flipH,
    };

    this.translateH = 0;
    this.translateV = 0;
  }
}
