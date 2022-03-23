import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportReportsComponent } from './export-reports.component';

@NgModule({
  declarations: [ExportReportsComponent],
  imports: [CommonModule],
  exports: [ExportReportsComponent],
})
export class ExportReportsModule {}
