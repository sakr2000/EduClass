import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    private _authService: AuthService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  signUpForm = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(6),
      Validators.maxLength(50),
      Validators.required,
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
    confirm_password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });

  async registerUser() {
    if (this.signUpForm.invalid) {
      return;
    }
    const { email, password } = this.signUpForm.value;
    try {
      await this._authService.registerNewUser(email!, password!);
      await this._authService.signOut();
      this.router.navigateByUrl('/auth/login');
    } catch (err: any) {
      this.signUpForm.setErrors({ registrationFailed: true });
      this.signUpForm.reset();
      let emailExists = JSON.stringify(err.code).includes(
        'email-already-in-use'
      );

      this.snackBar.open(
        emailExists
          ? 'Email already exists, Try Logging in.'
          : 'Registration Failed, Please try again',
        'dismiss',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    }
  }
}
