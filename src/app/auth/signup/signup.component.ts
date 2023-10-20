import { User } from './../../interfaces/user';
import { FirestoreService } from './../../services/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordMatch } from 'src/app/validators/password-match';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    public snackBar: MatSnackBar,
    private router: Router,
    private passmatch: PasswordMatch
  ) {}

  signUpForm = new FormGroup(
    {
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
    },
    { validators: this.passmatch.confirmPassword }
  );

  async registerUser() {
    if (this.signUpForm.invalid) {
      return;
    }
    let newuser = new User();
    const { name, email, password } = this.signUpForm.value;
    newuser.name = name ? name : '';
    newuser.email = email ? email : '';
    try {
      await this.authService.registerNewUser(email!, password!);
      await this.firestoreService
        .addData('users', Object.assign({}, newuser))
        .catch((err) => {
          console.log(err);
        });
      this.authService.signOut();
      this.router.navigateByUrl('/auth/login');
    } catch (err: any) {
      this.signUpForm.setErrors({ registrationFailed: true });
      this.signUpForm.reset();
      let emailExists = JSON.stringify(err.code).includes(
        'email-already-in-use'
      );
      console.log(err);

      this.snackBar.open(
        emailExists
          ? 'Email already exists, Try Logging in.'
          : 'Registration Failed, Please try again',
        'Dismiss',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    }
  }
}
