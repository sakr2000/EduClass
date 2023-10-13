import { Injectable } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
@Injectable({ providedIn: 'root' })
export class PasswordMatch implements Validators {
  validate(formGroup: FormGroup) {
    const { password, confirm_password } = formGroup.value;
    if (password === confirm_password) {
      return null;
    }
    return { mismatch: true };
  }
}
