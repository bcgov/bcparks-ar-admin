import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoatingSectionComponent } from './boating-section.component';
import { TextInputModule } from 'src/app/shared/components/forms/text-input/text-input.module';
import { CalculationDisplayModule } from 'src/app/shared/components/forms/calculation-display/calculation-display.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BoatingSectionComponent],
  imports: [
    CommonModule,
    TextInputModule,
    CalculationDisplayModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [BoatingSectionComponent],
})
export class BoatingSectionModule {}
