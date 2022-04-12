import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { SummarySectionComponent } from './summary-section/summary-section.component';
import { CalculationDisplayModule } from '../forms/calculation-display/calculation-display.module';
import { TextAreaModule } from '../forms/text-area/text-area.module';



@NgModule({
  declarations: [
    AccordionComponent,
    SummarySectionComponent
  ],
  imports: [
    CommonModule,
    CalculationDisplayModule,
    TextAreaModule
  ],
  exports: [
    AccordionComponent,
    SummarySectionComponent
  ]
})
export class AccordionModule { }
