import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardRateGroupsComponent } from './standard-rate-groups.component';
import { TextInputModule } from 'src/app/shared/components/forms/text-input/text-input.module';
import { CalculationDisplayModule } from 'src/app/shared/components/forms/calculation-display/calculation-display.module';

@NgModule({
  declarations: [StandardRateGroupsComponent],
  imports: [CommonModule, TextInputModule, CalculationDisplayModule],
  exports: [StandardRateGroupsComponent],
})
export class StandardRateGroupsModule {}
