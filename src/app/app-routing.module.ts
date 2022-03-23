import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterDataComponent } from './enter-data/enter-data.component';
import { ExportReportsComponent } from './export-reports/export-reports.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      label: 'Home',
    },
  },
  {
    path: 'enter-data',
    component: EnterDataComponent,
    data: {
      label: 'Enter Data',
    },
  },
  {
    path: 'export-reports',
    component: ExportReportsComponent,
    data: {
      label: 'Export Reports',
    },
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
