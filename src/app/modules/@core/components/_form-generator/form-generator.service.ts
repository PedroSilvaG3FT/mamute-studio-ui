import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IFormOption } from '../../interfaces/app-form.interface';
import { IFormGeneratorField } from './app-form-generator.interface';

@Injectable({ providedIn: 'root' })
export class FormGeneratorService {
  constructor(private formBuilder: FormBuilder) {}

  public init<Data extends {}>(fields: IFormGeneratorField<keyof Data>[][]) {
    type FieldKeyType = keyof Data;

    return {
      fields,
      group: this.initGroup<Data>(fields),
      setOptionsField: (fieldName: FieldKeyType, options: IFormOption[]) =>
        this.setOptionsField<Data, FieldKeyType>(fields, fieldName, options),
      setImageURLToCropper: (fieldName: FieldKeyType, imageURL: string) =>
        this.setImageURLToCropper<Data, FieldKeyType>(
          fields,
          fieldName,
          imageURL
        ),
    };
  }

  private initGroup<Data extends {}>(
    fields: IFormGeneratorField<keyof Data>[][]
  ) {
    const group = fields.flat().reduce((initial, field) => {
      const validators = field.validators || [];
      return { ...initial, [field.name]: [field.initialValue, ...validators] };
    }, {});

    return this.formBuilder.group<Data>(group as Data);
  }

  private looperHandler<Data, KeyType>(
    fields: IFormGeneratorField<keyof Data>[][],
    fieldName: KeyType,
    callback: (field: IFormGeneratorField<keyof Data>) => void
  ) {
    fields.forEach((row) =>
      row.forEach((field) => {
        if (field.name === fieldName) callback(field);
      })
    );
  }

  private setOptionsField<Data, FieldKeyType>(
    fields: IFormGeneratorField<keyof Data>[][],
    fieldName: FieldKeyType,
    options: IFormOption[]
  ) {
    this.looperHandler<Data, FieldKeyType>(fields, fieldName, (field) => {
      field.additional = { ...field.additional, options };
    });
  }

  private setImageURLToCropper<Data, FieldKeyType>(
    fields: IFormGeneratorField<keyof Data>[][],
    fieldName: FieldKeyType,
    imageURL: string
  ) {
    this.looperHandler<Data, FieldKeyType>(fields, fieldName, (field) => {
      field.additional = {
        ...field.additional,
        imageCropper: { ...field.additional?.imageCropper, imageURL },
      };
    });
  }
}
