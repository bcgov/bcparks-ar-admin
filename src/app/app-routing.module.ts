import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterDataComponent } from './enter-data/enter-data.component';
import { ExportReportsComponent } from './export-reports/export-reports.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      label: 'Home',
      breadcrumb: 'Home',
    },
  },
  {
    path: 'enter-data',
    component: EnterDataComponent,
    canActivate: [AuthGuard],
    data: {
      label: 'Enter Data',
      breadcrumb: 'Enter Data',
    },
  },
  {
    path: 'export-reports',
    component: ExportReportsComponent,
    canActivate: [AuthGuard],
    data: {
      label: 'Export Reports',
      breadcrumb: 'Export Reports',
    },
  },
  {
    path: 'unauthorized',
    pathMatch: 'full',
    component: NotAuthorizedComponent,
  },
  {
    // wildcard route
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
