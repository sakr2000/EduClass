import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFileDialogComponent } from 'src/app/standalone/add-file-dialog/add-file-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddAssessmentDialogComponent } from 'src/app/standalone/add-assessment-dialog/add-assessment-dialog.component';
import { TakeAssessmentDialogComponent } from 'src/app/standalone/take-assessment-dialog/take-assessment-dialog.component';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent {
  courseId: string;
  courseData: any;
  documents: any;
  assessments: any;
  displayedDocColumns: string[] = ['name', 'size', 'Download'];
  displayedAssColumns: string[] = ['title', 'questions', 'start'];
  constructor(
    private ar: ActivatedRoute,
    private db: FirestoreService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {
    this.courseId = ar.snapshot.params['id'];
    db.getDocument('courses', this.courseId).subscribe({
      next: (data) => {
        this.courseData = data;
      },
    });
    db.getAllDataById('course_docs', this.courseId).subscribe({
      next: (data) => {
        this.documents = data;
      },
    });
    db.getAllDataById('Assessments', this.courseId).subscribe({
      next: (data) => {
        this.assessments = data;
      },
    });
  }
  openDocDialog() {
    const dialogRef = this.dialog.open(AddFileDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        console.log(data);
        this.db
          .addData(`course_docs`, {
            course: this.courseId,
            name: data.name,
            size: data.size,
            url: data.link,
          })
          .then(() => {
            this.snackBar.open('File was added', 'dismiss', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  }
  openAssDialog() {
    const dialogRef = this.dialog.open(AddAssessmentDialogComponent, {
      data: this.courseId,
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        this.db
          .addData(`Assessments`, {
            course: this.courseId,
            title: value.title,
            questions: value.questions,
          })
          .then(() => {
            this.snackBar.open('Successfully added', 'dismiss', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  }
  elementSize(e: number) {
    let kb = Math.floor(e / 1024);
    if (kb > 1024) {
      return (kb / 1024).toFixed(2) + ' Mb';
    }
    return kb.toFixed(2) + ' Kb';
  }
  startQuiz(quizData: any) {
    const dialogRef = this.dialog.open(TakeAssessmentDialogComponent, {
      data: quizData,
    });
  }
  logOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/');
    location.reload();
  }
}
