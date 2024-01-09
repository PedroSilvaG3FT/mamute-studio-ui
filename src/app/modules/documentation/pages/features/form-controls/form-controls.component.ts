import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppFormComponents } from '../../../../@core/components/form';
import { IFormOption } from '../../../../@core/interfaces/app-form.interface';
import { TerminalWindowComponent } from '../../../components/terminal-window/terminal-window.component';

@Component({
  standalone: true,
  selector: 'doc-form-controls',
  styleUrl: './form-controls.component.scss',
  templateUrl: './form-controls.component.html',
  imports: [
    ...AppFormComponents,
    JsonPipe,
    FormsModule,
    RouterModule,
    TerminalWindowComponent,
  ],
})
export class FormControlsComponent {
  public defaultOptions: IFormOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  public form = {
    radio: 1,
    select: 1,
    slider: 4,
    input: 'Teste',
    checkbox: true,
    fileUpload: [],
    imageCropper: null,
    textarea: 'Textarea',
    datepicker: new Date(),
    datepickerRange: {
      start: new Date(2023, 10, 10),
      end: new Date(2023, 10, 13),
    },
    textEditor: `<b>INITIAL</b>`,
    sliderRange: { min: 2, max: 6 },
  };

  public onSubmit() {
    console.log('FORM', this.form);
  }
}
