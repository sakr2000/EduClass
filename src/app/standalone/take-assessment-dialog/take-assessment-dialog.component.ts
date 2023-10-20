import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-take-assessment-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './take-assessment-dialog.component.html',
  styleUrls: ['./take-assessment-dialog.component.scss'],
})
export class TakeAssessmentDialogComponent {
  data: any;
  index = 0;
  score = 0;
  selectedAnswer: any;
  constructor(
    public dialogRef: MatDialogRef<TakeAssessmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public quizData: any
  ) {
    this.data = quizData;
  }

  nextQuesrion() {
    if (
      this.selectedAnswer === this.data.questions[this.index].correctAnswer &&
      this.index < this.data.questions.length
    ) {
      this.score++;
    }
    this.selectedAnswer = null;
    this.index++;
  }
}
