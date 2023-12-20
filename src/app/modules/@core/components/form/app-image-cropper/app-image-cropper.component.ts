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
  @Input() scale: number = APP_IMAGE_CROPPER_DEFAULT_VALUES.scale;
  @Input() height: string = APP_IMAGE_CROPPER_DEFAULT_VALUES.height;
  @Input() imageURL: string = APP_IMAGE_CROPPER_DEFAULT_VALUES.imageURL;
  @Input() background: string = APP_IMAGE_CROPPER_DEFAULT_VALUES.background;
  @Input() buttonText: string = APP_IMAGE_CROPPER_DEFAULT_VALUES.buttonText;
  @Input() aspectRatio: number = APP_IMAGE_CROPPER_DEFAULT_VALUES.aspectRatio;

  @Input() cropperMinWidth: number =
    APP_IMAGE_CROPPER_DEFAULT_VALUES.cropperMinWidth;
  @Input({ transform: booleanAttribute }) rounded =
    APP_IMAGE_CROPPER_DEFAULT_VALUES.rounded;
  @Input({ transform: booleanAttribute }) onlyScaleDown =
    APP_IMAGE_CROPPER_DEFAULT_VALUES.onlyScaleDown;
  @Input({ transform: booleanAttribute }) maintainAspectRatio =
    APP_IMAGE_CROPPER_DEFAULT_VALUES.maintainAspectRatio;

  public translateH = 0;
  public translateV = 0;
  public loading = false;
  public rotation?: number;
  public canvasRotation = 0;
  public showCropper = false;
  public imageChangedEvent = '';
  public containWithinAspectRatio = false;
  public inputId: string = 'image-upload-input';
  public transform: ImageTransform = { translateUnit: 'px' };

  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    if (this.rounded) this.aspectRatio = 4 / 4;
    if (!this.isDynamic) this.initMonitoringChanges();

    this.inputId = `${this.inputId}-${this.name}`;
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

export const APP_IMAGE_CROPPER_DEFAULT_VALUES = {
  scale: 1,
  imageURL: '',
  height: '200px',
  aspectRatio: 4 / 3,
  background: 'black',
  cropperMinWidth: 128,
  buttonText: 'Select file',
  rounded: false,
  onlyScaleDown: true,
  maintainAspectRatio: true,
};
