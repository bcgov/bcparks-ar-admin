import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampingPartyNightsComponent } from './camping-party-nights.component';
import { InfoTextModule } from 'src/app/shared/components/info-text/info-text.module';
import { TextInputModule } from 'src/app/shared/components/forms/text-input/text-input.module';
import { CalculationDisplayModule } from 'src/app/shared/components/forms/calculation-display/calculation-display.module';

@NgModule({
  declarations: [CampingPartyNightsComponent],
  imports: [CommonModule, InfoTextModule, TextInputModule, CalculationDisplayModule],
  exports: [CampingPartyNightsComponent],
})
export class CampingPartyNightsModule {}
