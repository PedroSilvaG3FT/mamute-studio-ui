import { Component, Input, forwardRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { FileUploadType } from '../../../types/file-upload.type';
import { ModelControl } from '../model-control';

@Component({
  standalone: true,
  selector: 'app-file-upload',
  styleUrl: './app-file-upload.component.scss',
  templateUrl: './app-file-upload.component.html',
  imports: [ReactiveFormsModule],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppFileUploadComponent),
    },
  ],
})
export class AppFileUploadComponent extends ModelControl {
  @Input() maxFiles: number = 1;
  @Input() fileTypes: FileUploadType[] = ['*/*'];
  @Input() limitErrorMessage: string = `File limit reached`;

  public files: File[] = [];
  public isMultiple?: boolean;
  public fileType: string = '';
  public inputId: string = 'file-upload-input';
  public filesControl = new FormGroup({ model: new FormControl<File[]>([]) });

  ngOnInit() {
    this.isMultiple = this.maxFiles > 1;
    this.fileType = this.fileTypes.join(',');
    this.inputId = `${this.inputId}-${this.name}`;

    if (!this.isDynamic) this.initMonitoringChanges();

    this.$modelControl = this.filesControl.valueChanges.subscribe(() => {
      this.group.patchValue({ [this.formControlName]: this.files });
    });
  }

  public handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  public handleDrop(event: DragEvent) {
    event.preventDefault();
    this.processFiles(event.dataTransfer?.files);
  }

  public handleFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.processFiles(inputElement.files);
  }

  public handleRemove(index: number) {
    this.files.splice(index, 1);
    this.filesControl.setValue({ model: [] });
  }

  public processFiles(files?: FileList | null) {
    if (!files || !files.length) return;

    const items = [];
    for (let i = 0; i < files.length; i++) items.push(files[i]);

    const filesControl =
      this.maxFiles === 1 ? items : [...this.files, ...items];

    if (files.length > this.maxFiles || filesControl.length > this.maxFiles) {
      this.alertService.snackBar.open(this.limitErrorMessage, 'Close');
      return;
    }

    this.files = filesControl;
    this.filesControl.setValue({ model: [] });
  }

  public clearFileSelection() {
    this.files = [];
    this.filesControl.reset();
  }
}

export const APP_FILE_UPLOAD_DEFAULT_VALUES = {
  maxFiles: 1,
  fileTypes: ['*/*'],
  limitErrorMessage: `File limit reached`,
};
