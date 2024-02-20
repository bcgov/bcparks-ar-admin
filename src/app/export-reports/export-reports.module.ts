import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportReportsComponent } from './export-reports.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgdsTabsModule } from '@digitalspace/ngds-toolkit';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgdsFormsModule } from '@digitalspace/ngds-forms';

@NgModule({
  declarations: [ExportReportsComponent],
  imports: [CommonModule, NgbModule, NgdsTabsModule, NgdsFormsModule, BsDatepickerModule.forRoot()],
  exports: [ExportReportsComponent],
})
export class ExportReportsModule {}
