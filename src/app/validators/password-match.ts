import { Injectable } from '@angular/core';
import {
  Validators,
  FormGroup,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
@Injectable({ providedIn: 'root' })
export class PasswordMatch implements Validators {
  confirmPassword: ValidatorFn = (
    formGroup: AbstractControl
  ): ValidationErrors | null => {
    const { password, confirm_password } = formGroup.value;

    return password === confirm_password ? null : { mismatch: true };
  };
}
