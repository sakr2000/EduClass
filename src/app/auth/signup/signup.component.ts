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
      let response = await this._authService.registerNewUser(email!, password!);
      console.log(response);
      this.router.navigateByUrl('/');
    } catch (err) {
      this.signUpForm.setErrors({ registrationFailed: true });
      this.signUpForm.reset();
      this.snackBar.open('Registration Failed', 'dismiss', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
