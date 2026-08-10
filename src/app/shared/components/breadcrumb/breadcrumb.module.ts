import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@NgModule({
    imports: [CommonModule, AppRoutingModule, BreadcrumbComponent],
    exports: [BreadcrumbComponent],
    providers: [BreadcrumbService],
})
export class BreadcrumbModule {}
