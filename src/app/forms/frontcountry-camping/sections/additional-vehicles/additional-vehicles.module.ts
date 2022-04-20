import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalVehiclesComponent } from './additional-vehicles.component';
import { InfoTextModule } from 'src/app/shared/components/info-text/info-text.module';
import { TextInputModule } from 'src/app/shared/components/forms/text-input/text-input.module';
import { CalculationDisplayModule } from 'src/app/shared/components/forms/calculation-display/calculation-display.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdditionalVehiclesComponent],
  imports: [
    CommonModule,
    InfoTextModule,
    TextInputModule,
    CalculationDisplayModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AdditionalVehiclesComponent],
})
export class AdditionalVehiclesModule {}
