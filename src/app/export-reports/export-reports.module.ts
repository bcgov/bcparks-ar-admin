import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportReportsComponent } from './export-reports.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgdsTabsModule } from '@digitalspace/ngds-toolkit';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [ExportReportsComponent],
  imports: [CommonModule, NgbModule, NgdsTabsModule, BsDatepickerModule.forRoot()],
  exports: [ExportReportsComponent],
})
export class ExportReportsModule {}
