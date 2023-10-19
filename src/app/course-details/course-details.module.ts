import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailsRoutingModule } from './course-details-routing.module';
import { IntroductionComponent } from './introduction/introduction.component';
import { DocumentsComponent } from './documents/documents.component';
import { AssesmentsComponent } from './assesments/assesments.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    IntroductionComponent,
    DocumentsComponent,
    AssesmentsComponent,
  ],
  imports: [CommonModule, CourseDetailsRoutingModule, MaterialModule],
})
export class CourseDetailsModule {}
