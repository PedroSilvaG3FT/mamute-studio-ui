import { Component, EventEmitter, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppFormGeneratorComponent } from '../../../@core/components/_form-generator/app-form-generator/app-form-generator.component';
import { FormGeneratorService } from '../../../@core/components/_form-generator/form-generator.service';
import { IDocAuthenticationCredentials } from '../../interfaces/doc-authentication.interface';

@Component({
  standalone: true,
  selector: 'doc-sign-in',
  imports: [AppFormGeneratorComponent],
  styleUrl: './sign-in.component.scss',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  @Output() onSubmit = new EventEmitter();

  public form = this.formGeneratorService.init<IDocAuthenticationCredentials>([
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
  ]);

  constructor(private formGeneratorService: FormGeneratorService) {}

  ngOnInit() {
    const initialValue: Partial<IDocAuthenticationCredentials> = {
      email: 'pedro.silva-dev@hotmail.com',
      password: '12345678',
    };

    this.form.group.patchValue(initialValue);
  }

  public handleSubmit(model: IDocAuthenticationCredentials) {
    this.onSubmit.emit(model);
  }
}
