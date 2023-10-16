import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainDashboardComponent,
    children: [
      {
        path: 'overview',
        loadComponent: () =>
          import('.././standalone/overview/overview.component').then(
            (m) => m.OverviewComponent
          ),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('.././standalone/courses/courses.component').then(
            (m) => m.CoursesComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
