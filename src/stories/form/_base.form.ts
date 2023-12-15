import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";


export class StorybookFormBase {
  public commonImports = [
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ];

  public buildExcludeFormProps(items: string[], excludeCommon = true) {
    const commonProperties = ['$modelControl', 'onChange', 'onTouched'];
    const commonInputs = ['model', 'isDynamic'];
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
