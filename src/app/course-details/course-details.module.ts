import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailsRoutingModule } from './course-details-routing.module';
import { IntroductionComponent } from './introduction/introduction.component';

import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [IntroductionComponent],
  imports: [CommonModule, CourseDetailsRoutingModule, MaterialModule],
})
export class CourseDetailsModule {}
