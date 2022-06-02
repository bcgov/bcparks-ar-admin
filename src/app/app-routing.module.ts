import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterDataComponent } from './enter-data/enter-data.component';
import { ExportReportsComponent } from './export-reports/export-reports.component';
import { BackcountryCabinsComponent } from './forms/backcountry-cabins/backcountry-cabins.component';
import { BackcountryCampingComponent } from './forms/backcountry-camping/backcountry-camping.component';
import { BoatingComponent } from './forms/boating/boating.component';
import { DayUseComponent } from './forms/day-use/day-use.component';
import { FrontcountryCabinsComponent } from './forms/frontcountry-cabins/frontcountry-cabins.component';
import { FrontcountryCampingComponent } from './forms/frontcountry-camping/frontcountry-camping.component';
import { GroupCampingComponent } from './forms/group-camping/group-camping.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { ExportResolver } from './resolvers/export.resolver';
import { FormResolver } from './resolvers/form.resolver';
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
        data: {
          label: 'Backcountry Cabins',
          breadcrumb: 'Backcountry Cabins',
          activity: 'Backcountry Cabins',
        },
        resolve: [FormResolver],
      },
      {
        path: 'backcountry-camping',
        component: BackcountryCampingComponent,
        canActivate: [AuthGuard],
        data: {
          label: 'Backcountry Camping',
          breadcrumb: 'Backcountry Camping',
          activity: 'Backcountry Camping',
        },
        resolve: [FormResolver],
      },
      {
        path: 'boating',
        component: BoatingComponent,
        canActivate: [AuthGuard],
        data: {
          label: 'Boating',
          breadcrumb: 'Boating',
          activity: 'Boating',
        },
        resolve: [FormResolver],
      },
      {
        path: 'day-use',
        component: DayUseComponent,
        canActivate: [AuthGuard],
        data: {
          label: 'Day Use',
          breadcrumb: 'Day Use',
          activity: 'Day Use',
        },
        resolve: [FormResolver],
      },
      {
        path: 'frontcountry-cabins',
        component: FrontcountryCabinsComponent,
        canActivate: [AuthGuard],
        data: {
          label: 'Frontcountry Cabins',
          breadcrumb: 'Frontcountry Cabins',
          activity: 'Frontcountry Cabins',
        },
        resolve: [FormResolver],
      },
      {
        path: 'frontcountry-camping',
        component: FrontcountryCampingComponent,
        canActivate: [AuthGuard],
        data: {
          label: 'Frontcountry Camping',
          breadcrumb: 'Frontcountry Camping',
          activity: 'Frontcountry Camping',
        },
        resolve: [FormResolver],
      },
      {
        path: 'group-camping',
        component: GroupCampingComponent,
        canActivate: [AuthGuard],
        data: {
          label: 'Group Camping',
          breadcrumb: 'Group Camping',
          activity: 'Group Camping',
        },
        resolve: [FormResolver],
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
    resolve: [ExportResolver],
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
