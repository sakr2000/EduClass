import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseDialogComponent } from '../add-course-dialog/add-course-dialog.component';
import { DocumentData } from '@angular/fire/compat/firestore';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  coursesList: DocumentData[];
  constructor(
    public dialog: MatDialog,
    public firestore: FirestoreService,
    public auth: AuthService,
    public afa: AngularFireAuth
  ) {}
  ngOnInit(): void {
    this.firestore.readAllData('courses').subscribe({
      next: (data) => {
        this.coursesList = data;
      },
      error: (err) => console.log(err),
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddCourseDialogComponent);
    let userEmail: string | null;
    this.afa.user.subscribe({
      next: (user) => {
        userEmail = user ? user.email : '';
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (file) => {
        if (userEmail) {
          file.owner = userEmail;
          this.firestore
            .addData('courses', Object.assign({}, file))
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    });
  }
}
