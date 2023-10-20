import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export class assessmentData {
  title: string;
  course: string;
  questions: Array<any>;
}
@Component({
  selector: 'app-add-assessment-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './add-assessment-dialog.component.html',
  styleUrls: ['./add-assessment-dialog.component.scss'],
})
export class AddAssessmentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddAssessmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public courseId: string
  ) {
    this.data.course = courseId;
  }
  counter: number = 1;
  data = new assessmentData();
  firstFormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    questionNum: new FormControl(5, [Validators.required]),
  });
  secondFormGroup = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answer1: new FormControl('', [Validators.required]),
    answer2: new FormControl('', [Validators.required]),
    answer3: new FormControl('', [Validators.required]),
    answer4: new FormControl('', [Validators.required]),
    correctAnswer: new FormControl('', [Validators.required]),
  });

  setCounter() {
    this.data.title = this.firstFormGroup.value.title!;
    this.counter = 1;
    this.data.questions = [];
  }
  addQuestion() {
    if (this.counter <= this.firstFormGroup.value.questionNum!) {
      this.data.questions.push(this.secondFormGroup.value);
      this.secondFormGroup.reset();
      this.counter++;
    }
  }
  close() {
    this.dialogRef.close();
  }
}
