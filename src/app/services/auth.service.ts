import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any = null;
  constructor(public auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      this.userData = user ? user : null;
    });
  }

  registerNewUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    this.auth.signOut();
  }
}
