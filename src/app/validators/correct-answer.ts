import { Injectable } from '@angular/core';
import {
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
@Injectable({ providedIn: 'root' })
export class CorrectAnswer implements Validators {
  checkIfAnswerMatches: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const { answer1, answer2, answer3, answer4, correctAnswer } = control.value;
    if (
      correctAnswer === answer1 ||
      correctAnswer === answer2 ||
      correctAnswer === answer3 ||
      correctAnswer === answer4
    ) {
      return null;
    } else {
      return { mismatch: true };
    }
  };
}
