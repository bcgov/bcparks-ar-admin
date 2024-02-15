import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { SummarySectionComponent } from './summary-section/summary-section.component';
import { CalculationDisplayModule } from '../forms/calculation-display/calculation-display.module';
import { AccordionSummariesComponent } from './accordion-summaries/accordion-summaries.component';
import { AccordionNotesComponent } from './accordion-notes/accordion-notes.component';



@NgModule({
  declarations: [
    AccordionComponent,
    SummarySectionComponent,
    AccordionSummariesComponent,
    AccordionNotesComponent
  ],
  imports: [
    CommonModule,
    CalculationDisplayModule,
  ],
  exports: [
    AccordionComponent,
    SummarySectionComponent,
    AccordionNotesComponent,
    AccordionSummariesComponent
  ]
})
export class AccordionModule { }
