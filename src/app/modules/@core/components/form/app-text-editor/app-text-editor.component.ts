import { HttpClientModule } from '@angular/common/http';
import { Component, Input, forwardRef } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { ModelControl } from '../model-control';

@Component({
  standalone: true,
  selector: 'app-text-editor',
  styleUrl: './app-text-editor.component.scss',
  templateUrl: './app-text-editor.component.html',
  imports: [
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppTextEditorComponent),
    },
  ],
})
export class AppTextEditorComponent extends ModelControl {
  @Input() config: AngularEditorConfig = {} as AngularEditorConfig;

  public configModel: AngularEditorConfig = {
    height: '100',
    editable: true,
    translate: 'yes',
    toolbarPosition: 'bottom',
    toolbarHiddenButtons: [
      ['heading', 'insertUnorderedList', 'insertOrderedList'],
      [
        'unlink',
        'htmlCode',
        'insertImage',
        'insertVideo',
        'customClasses',
        'backgroundColor',
      ],
    ],
    ...this.config,
  };

  ngOnInit() {
    Object.assign(this.configModel, this.config);
    if (!this.isDynamic) this.initMonitoringChanges();
  }
}
