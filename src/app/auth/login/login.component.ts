import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  constructor(
    private _authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
  });

  async logUserIn() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      let result = await this._authService.loginUser(email!, password!);
      this.router.navigateByUrl('/dashboard/overview');
    } catch (e) {
      this.loginForm.setErrors({ loginFailed: true });
      this.loginForm.reset();
      this.snackBar.open('Login Failed, Please try again', 'dismiss', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
