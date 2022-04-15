import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouthRateGroupsComponent } from './youth-rate-groups.component';
import { InfoTextModule } from 'src/app/shared/components/info-text/info-text.module';
import { TextInputModule } from 'src/app/shared/components/forms/text-input/text-input.module';
import { CalculationDisplayModule } from 'src/app/shared/components/forms/calculation-display/calculation-display.module';

@NgModule({
  declarations: [YouthRateGroupsComponent],
  imports: [CommonModule, InfoTextModule, TextInputModule, CalculationDisplayModule],
  exports: [YouthRateGroupsComponent],
})
export class YouthRateGroupsModule {}
