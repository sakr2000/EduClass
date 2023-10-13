import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() type: string = 'text';
  @Input() label: string = 'input';

  checkError() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
