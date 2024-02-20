import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockRecordsComponent } from './lock-records.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { TextToLoadingSpinnerModule } from '../shared/components/text-to-loading-spinner/text-to-loading-spinner.module';
import { FiscalYearLockTableComponent } from './fiscal-year-lock-table/fiscal-year-lock-table.component';
import { TableModule } from '../shared/components/table/table.module';
import { FiscalYearUnlockerComponent } from './fiscal-year-lock-table/fiscal-year-unlocker/fiscal-year-unlocker.component';
import { NgdsFormsModule } from '@digitalspace/ngds-forms';

@NgModule({
  declarations: [
    LockRecordsComponent,
    FiscalYearLockTableComponent,
    FiscalYearUnlockerComponent,
  ],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    TextToLoadingSpinnerModule,
    TableModule,
    NgdsFormsModule
  ],
  exports: [LockRecordsComponent],
})
export class LockRecordsModule {}
