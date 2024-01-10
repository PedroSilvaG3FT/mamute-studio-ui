import { JsonPipe, NgClass, NgStyle } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  booleanAttribute,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IFormGeneratorField } from '../app-form-generator.interface';
import { FieldGeneratorDirective } from '../field-generator.directive';

@Component({
  standalone: true,
  selector: 'app-form-generator',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './app-form-generator.component.scss',
  templateUrl: './app-form-generator.component.html',
  imports: [
    NgStyle,
    NgClass,
    JsonPipe,
    ReactiveFormsModule,
    FieldGeneratorDirective,
  ],
})
export class AppFormGeneratorComponent {
  @Input() id: string = '';
  @Input() fieldGap: string = '16px';
  @Input() submitText: string = 'Submit';

  @Input() actionPositionY: 'top' | 'bottom' = 'top';
  @Input() actionPositionX: 'left' | 'right' = 'right';

  @Input({ transform: booleanAttribute }) column: boolean = false;
  @Input({ required: true }) fields: IFormGeneratorField<{}>[][] = [];
  @Input({ transform: booleanAttribute }) watchValues: boolean = false;
  @Input({ transform: booleanAttribute }) mobileColumn: boolean = false;
  @Input({ required: true }) formGroup: FormGroup = this.formBuilder.group({});

  @Output() onSubmit = new EventEmitter();
  @Output() onValueChanges = new EventEmitter();

  public uniqueId: string = '';
  public dynamicColumClass: string = '';
  public readonly defaultFieldWidth: string = '100%';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initWatchValues();
    this.uniqueId = `app-form-generator-${this.id}`;
  }

  private initWatchValues() {
    if (!this.watchValues) return;

    this.formGroup.valueChanges.subscribe((value) => {
      this.onValueChanges.emit(value);
    });
  }

  public handleSubmit() {
    this.onSubmit.emit(this.formGroup.value);
  }
}
