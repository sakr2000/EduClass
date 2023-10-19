import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-add-file-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './add-file-dialog.component.html',
  styleUrls: ['./add-file-dialog.component.scss'],
})
export class AddFileDialogComponent {
  file: any;
  constructor(
    public dialogRef: MatDialogRef<AddFileDialogComponent>,
    private firestorage: AngularFireStorage
  ) {}
  async fileSubmit(event: any) {
    this.file = event.target.files[0];
  }
  async upload() {
    if (this.file) {
      const path = `docs/${this.file.name}`;
      let uploadTask = await this.firestorage.upload(path, this.file);
      let url = await uploadTask.ref.getDownloadURL();
      this.dialogRef.close({
        name: this.file.name,
        size: this.file.size,
        link: url,
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
