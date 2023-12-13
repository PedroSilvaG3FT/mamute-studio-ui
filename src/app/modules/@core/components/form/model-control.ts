import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModelControlType } from '../../types/model-control.type';

@Component({ template: `` })
export class ModelControl implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() hint: string = '';
  @Input() label: string = '';
  @Input() className: string = '';
  @Input() styleMode: string = '';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';
  @Input() isDynamic: boolean = false;
  @Input() formControlName: string = '';
  @Input() initialValue?: ModelControlType;
  @Input() appearance: 'outline' | 'fill' = 'outline';

  @Input() group: FormGroup = this.formBuilder.group({
    [this.name]: [''],
  });

  public model!: ModelControlType;
  public $modelControl!: Subscription;

  constructor(private formBuilder: FormBuilder) {}

  onTouched = () => {};
  onChange = (_: ModelControlType) => {};

  writeValue(value: ModelControlType): void {
    this.model = value;
  }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  initMonitoringChanges() {
    this.setInitialValue();

    this.$modelControl = this.group.valueChanges.subscribe((value) => {
      if (!this.formControlName) this.onChange(value['']);
      else this.onChange(value);
    });
  }

  setInitialValue() {
    if (!!this.formControlName || this.initialValue === undefined) return;
    this.group.setValue({ '': this.initialValue });
  }

  ngOnDestroy() {
    this.$modelControl?.unsubscribe();
  }
}
