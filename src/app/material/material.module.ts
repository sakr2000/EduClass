import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const material = [
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatButtonModule,
  MatSnackBarModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
