import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonResidentRevenueComponent } from './non-resident-revenue.component';
import { NgdsFormsModule } from '@digitalspace/ngds-forms';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { InfoTextModule } from '../info-text/info-text.module';
import { CalculationDisplayModule } from '../forms/calculation-display/calculation-display.module';

@NgModule({
  declarations: [NonResidentRevenueComponent],
  imports: [
    CommonModule,
    NgdsFormsModule,
    PopoverModule.forRoot(),
    InfoTextModule,
    CalculationDisplayModule,
  ],
  exports: [NonResidentRevenueComponent],
})
export class NonResidentRevenueModule {}

