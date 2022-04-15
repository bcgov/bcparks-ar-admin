import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackcountryCabinsSectionComponent } from './backcountry-cabins-section.component';
import { TextInputModule } from 'src/app/shared/components/forms/text-input/text-input.module';
import { CalculationDisplayModule } from 'src/app/shared/components/forms/calculation-display/calculation-display.module';

@NgModule({
  declarations: [BackcountryCabinsSectionComponent],
  imports: [CommonModule, TextInputModule, CalculationDisplayModule],
  exports: [BackcountryCabinsSectionComponent],
})
export class BackcountryCabinsSectionModule {}
