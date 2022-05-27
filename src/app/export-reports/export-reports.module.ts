import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportReportsComponent } from './export-reports.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ExportReportsComponent],
  imports: [CommonModule, NgbModule],
  exports: [ExportReportsComponent],
})
export class ExportReportsModule {}
