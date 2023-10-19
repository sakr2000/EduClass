import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroductionComponent } from './introduction/introduction.component';
import { DocumentsComponent } from './documents/documents.component';
import { AssesmentsComponent } from './assesments/assesments.component';

const routes: Routes = [
  {
    path: '',
    component: IntroductionComponent,
    children: [
      { path: 'docs', component: DocumentsComponent },
      { path: 'assesment', component: AssesmentsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseDetailsRoutingModule {}
