import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFileDialogComponent } from 'src/app/standalone/add-file-dialog/add-file-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent {
  courseId: any;
  courseData: any;
  dataSource: any;
  displayedColumns: string[] = ['name', 'size', 'Download'];
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
        this.dataSource = data;
      },
    });
  }
  openDialog() {
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
  elementSize(e: number) {
    let kb = Math.floor(e / 1024);
    if (kb > 1024) {
      return (kb / 1024).toFixed(2) + ' Mb';
    }
    return kb.toFixed(2) + ' Kb';
  }
  logOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/');
    location.reload();
  }
}
