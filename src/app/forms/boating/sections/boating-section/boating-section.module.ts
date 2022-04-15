import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoatingSectionComponent } from './boating-section.component';
import { TextInputModule } from 'src/app/shared/components/forms/text-input/text-input.module';
import { CalculationDisplayModule } from 'src/app/shared/components/forms/calculation-display/calculation-display.module';

@NgModule({
  declarations: [BoatingSectionComponent],
  imports: [CommonModule, TextInputModule, CalculationDisplayModule],
  exports: [BoatingSectionComponent],
})
export class BoatingSectionModule {}
