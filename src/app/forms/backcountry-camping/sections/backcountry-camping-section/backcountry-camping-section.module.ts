import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackcountryCampingSectionComponent } from './backcountry-camping-section.component';
import { InfoTextModule } from 'src/app/shared/components/info-text/info-text.module';
import { TextInputModule } from 'src/app/shared/components/forms/text-input/text-input.module';
import { CalculationDisplayModule } from 'src/app/shared/components/forms/calculation-display/calculation-display.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BackcountryCampingSectionComponent],
  imports: [
    CommonModule,
    InfoTextModule,
    TextInputModule,
    CalculationDisplayModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [BackcountryCampingSectionComponent],
})
export class BackcountryCampingSectionModule {}
