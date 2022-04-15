import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleAndVehiclesComponent } from './people-and-vehicles.component';
import { InfoTextModule } from 'src/app/shared/components/info-text/info-text.module';
import { TextInputModule } from 'src/app/shared/components/forms/text-input/text-input.module';
import { CalculationDisplayModule } from 'src/app/shared/components/forms/calculation-display/calculation-display.module';

@NgModule({
  declarations: [PeopleAndVehiclesComponent],
  imports: [CommonModule, InfoTextModule, TextInputModule, CalculationDisplayModule],
  exports: [PeopleAndVehiclesComponent],
})
export class PeopleAndVehiclesModule {}
