import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [BreadcrumbsComponent],
})
export class BreadcrumbsModule {}
