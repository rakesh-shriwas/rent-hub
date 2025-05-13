import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NgIf } from '@angular/common';

export enum AuthModeType {
  LOGIN = 'login',
  SIGNUP = 'signup'
}

interface ILoginSignupForm {
  name?: FormControl<string | null>;
  email: FormControl<string  | null>;
  password: FormControl<string  | null>;
  role: FormControl<string>;
}

@Component({
  selector: 'app-login-signup-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    NgIf
  ],
  templateUrl: './login-signup-dialog.component.html',
  styleUrl: './login-signup-dialog.component.scss',
})
export class LoginSignupDialogComponent {
  readonly dialogRef = inject(MatDialogRef<LoginSignupDialogComponent>);
  authMode = inject<'login' | 'signup'>(MAT_DIALOG_DATA);
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  authModeType = AuthModeType;
  loginSignupForm: FormGroup<ILoginSignupForm>;

  constructor() {
    this.initForm();
    this.toggleAuthMode(this.authMode);
  }

  /**
   * Initialize login/signup Form
   *
   * @memberof LoginSignupDialogComponent
   */
  initForm(): void {
    this.loginSignupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      role: new FormControl('renters')
    }) as FormGroup<ILoginSignupForm>;
  }

  /**
   * Toggle between Signup and Login Form
   *
   * @param {('login' | 'signup')} formType
   * @memberof LoginSignupDialogComponent
   */
  toggleAuthMode(authModeType: 'login' | 'signup'): void {
    this.authMode = authModeType;
    if(AuthModeType.LOGIN !== authModeType){
      this.loginSignupForm.addControl('name', new FormControl('', [Validators.required]));
    }else {
      this.loginSignupForm.removeControl('name');
    }
  }

  submitForm(): void {
    console.log('Form Value', this.loginSignupForm.value);
  }
}
