import { Injectable } from '@angular/core';
import { IFormOption } from '../interfaces/app-form.interface';
import { ModelControlType } from '../types/model-control.type';
import { IFormGeneratorField } from './app-form-generator.interface';

@Injectable({ providedIn: 'root' })
export class FormGeneratorService {
  constructor() {}

  public init<Data>(fields: IFormGeneratorField[][]) {
    type FieldKeyType = keyof Data;

    return {
      fields,
      setInitialValue: (fieldName: FieldKeyType, value: ModelControlType) =>
        this.setInitialValue<FieldKeyType>(fields, fieldName, value),
      setOptionsField: (fieldName: FieldKeyType, options: IFormOption[]) =>
        this.setOptionsField<FieldKeyType>(fields, fieldName, options),
    };
  }

  private looperHandler<KeyType>(
    fields: IFormGeneratorField[][],
    fieldName: KeyType,
    callback: (field: IFormGeneratorField) => void
  ) {
    fields.forEach((row) =>
      row.forEach((field) => {
        if (field.name === fieldName) callback(field);
      })
    );
  }

  private setInitialValue<KeyType>(
    fields: IFormGeneratorField[][],
    fieldName: KeyType,
    value: ModelControlType
  ) {
    this.looperHandler(fields, fieldName, (field) => {
      field.initialValue = value;
    });
  }

  private setOptionsField<Data>(
    fields: IFormGeneratorField[][],
    fieldName: Data,
    options: IFormOption[]
  ) {
    this.looperHandler(fields, fieldName, (field) => {
      field.additional = { ...field.additional, options };
    });
  }
}
