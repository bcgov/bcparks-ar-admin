import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [CommonModule, RouterTestingModule],
  exports: [BreadcrumbsComponent],
})
export class BreadcrumbsModule {}
