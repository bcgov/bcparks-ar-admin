import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterDataComponent } from './enter-data/enter-data.component';
import { ExportReportsComponent } from './export-reports/export-reports.component';
import { BackcountryCabinsComponent } from './forms/backcountry-cabins/backcountry-cabins.component';
import { BackcountryCampingComponent } from './forms/backcountry-camping/backcountry-camping.component';
import { BoatingComponent } from './forms/boating/boating.component';
import { DayUseComponent } from './forms/day-use/day-use.component';
import { FrontcountryCabinsComponent } from './forms/frontcountry-cabins/frontcountry-cabins.component';
import { GroupCampingComponent } from './forms/group-camping/group-camping.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { SubAreaResolver } from './resolvers/sub-area.resolver';

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
    resolve: [SubAreaResolver],
    children: [
      {
        path: 'backcountry-cabins',
        component: BackcountryCabinsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'backcountry-camping',
        component: BackcountryCampingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'boating',
        component: BoatingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'day-use',
        component: DayUseComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'frontcountry-cabins',
        component: FrontcountryCabinsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'group-camping',
        component: GroupCampingComponent,
        canActivate: [AuthGuard],
      },
    ],
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
