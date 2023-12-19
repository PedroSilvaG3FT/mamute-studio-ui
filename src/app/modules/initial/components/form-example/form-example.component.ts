import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppFormComponents } from '../../../@core/components/form';
import { IFormOption } from '../../../@core/interfaces/app-form.interface';
import { TerminalWindowComponent } from '../terminal-window/terminal-window.component';

@Component({
  standalone: true,
  selector: 'app-form-example',
  styleUrl: './form-example.component.scss',
  templateUrl: './form-example.component.html',
  imports: [
    ...AppFormComponents,
    JsonPipe,
    FormsModule,
    RouterModule,
    TerminalWindowComponent,
  ],
})
export class FormExampleComponent {
  public defaultOptions: IFormOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  public form = {
    radio: 1,
    select: 1,
    input: 'Teste',
    checkbox: true,
    fileUpload: [],
    textarea: 'Textarea',
    datepicker: new Date(),
    datepickerRange: null,
    textEditor: `<b>INITIAL</b>`,
  };

  public onSubmit() {
    console.log('FORM', this.form);
  }
}
