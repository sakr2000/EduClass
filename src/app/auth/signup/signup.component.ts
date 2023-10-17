import { FirestoreService } from './../../services/firestore.service';
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
    private authService: AuthService,
    private firestoreService: FirestoreService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    firestoreService.readData().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

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
      await this.authService.registerNewUser(email!, password!);
      this.authService.signOut();
      // this.firestoreService
      //   .addData('users', this.signUpForm.value)
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
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
        'dismiss',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    }
  }

  // data = this.firestoreService.readData('users');
  // show() {
  //   this.data.subscribe(
  //     (val) => {
  //       console.log(val);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
