import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherFrontcountryCampingRevenueComponent } from './other-frontcountry-camping-revenue.component';
import { InfoTextModule } from 'src/app/shared/components/info-text/info-text.module';
import { TextInputModule } from 'src/app/shared/components/forms/text-input/text-input.module';
import { CalculationDisplayModule } from 'src/app/shared/components/forms/calculation-display/calculation-display.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OtherFrontcountryCampingRevenueComponent],
  imports: [
    CommonModule,
    InfoTextModule,
    TextInputModule,
    CalculationDisplayModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [OtherFrontcountryCampingRevenueComponent],
})
export class OtherFrontcountryCampingRevenueModule {}
