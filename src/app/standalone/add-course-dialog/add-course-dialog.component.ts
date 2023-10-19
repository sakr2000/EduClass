import { FirestoreService } from './../../services/firestore.service';
import { AuthService } from './../../services/auth.service';
import { Course } from './../../interfaces/course';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-course-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.scss'],
})
export class AddCourseDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<AddCourseDialogComponent>,
    private auth: AuthService,
    private firestore: FirestoreService
  ) {}
  course: Course = new Course();
  close() {
    this.dialogRef.close();
  }
}
