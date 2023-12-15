import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IFormOption } from '../../app/modules/@core/interfaces/app-form.interface';

export class StorybookFormBase {
  public initialOptions: IFormOption[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
  ];

  public commonImports = [
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSlideToggleModule,

    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ];

  public buildExcludeFormProps(items: string[], excludeCommon = true) {
    const commonInputs = ['model', 'isDynamic'];
    const commonProperties = [
      'onChange',
      'onTouched',
      'rangeControl',
      '$modelControl',
    ];
    const commonMethods = [
      'ngOnInit',
      'writeValue',
      'ngOnDestroy',
      'setInitialValue',
      'registerOnChange',
      'registerOnTouched',
      'initMonitoringChanges',
    ];

    const commonItems = [
      ...commonInputs,
      ...commonMethods,
      ...commonProperties,
    ];
    const excludeItems = excludeCommon ? commonItems : [];

    return [...excludeItems, ...items];
  }
}
