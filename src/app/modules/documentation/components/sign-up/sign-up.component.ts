import { Component, EventEmitter, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppFormGeneratorComponent } from '../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../@core/components/_form-generator/form-generator.service';
import { IDocAuthenticationSignUp } from '../../interfaces/doc-authentication.interface';

@Component({
  standalone: true,
  selector: 'doc-sign-up',
  imports: [AppFormGeneratorComponent],
  styleUrl: './sign-up.component.scss',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  @Output() onSubmit = new EventEmitter();

  public form = this.formGeneratorService.init<IDocAuthenticationSignUp>([
    [
      {
        name: 'email',
        type: 'input',
        label: 'email',
        validators: [Validators.required],
        additional: { inputType: `email` },
      },
    ],
    [
      {
        type: 'input',
        name: 'password',
        label: 'Password',
        validators: [Validators.required],
        additional: { inputType: `password` },
      },
    ],
    [
      {
        name: 'name',
        type: 'input',
        label: 'Name',
        validators: [Validators.required],
        additional: { inputType: `email` },
      },
    ],
    [
      {
        name: 'age',
        type: 'input',
        label: 'Age',
        validators: [Validators.required],
        additional: { inputType: `number` },
      },
    ],
  ]);

  constructor(private formGeneratorService: FormGeneratorService) {}

  ngOnInit() {
    const initialValue: Partial<IDocAuthenticationSignUp> = {
      email: 'pedro.silva-dev@hotmail.com',
      password: '12345678',
      name: 'Pedro Silva',
      age: 24,
    };

    this.form.group.patchValue(initialValue);
  }

  public handleSubmit(model: IDocAuthenticationSignUp) {
    this.onSubmit.emit(model);
  }
}
