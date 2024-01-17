import { Component, Input, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { ModelControlType } from '../../types/model-control.type';

@Component({ template: `` })
export class ModelControl implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() className: string = '';
  @Input() placeholder: string = '';
  @Input() isDynamic: boolean = false;
  @Input() formControlName: string = '';
  @Input() initialValue?: ModelControlType;
  @Input() appearance: 'outline' | 'fill' = 'fill';

  @Input() group: FormGroup = this.formBuilder.group({
    [this.name]: [''],
  });

  public model!: ModelControlType;
  public $modelControl!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public alertService: AlertService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialValue']) {
      this.group.patchValue({
        [this.formControlName]: changes['initialValue'].currentValue,
      });
    }
  }

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
