import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionManagerComponent } from './accordion-manager.component';
import { DayUseAccordionComponent } from './day-use-accordion/day-use-accordion.component';
import { AccordionModule } from 'src/app/shared/components/accordion/accordion.module';
import { FrontcountryCampingAccordionComponent } from './frontcountry-camping-accordion/frontcountry-camping-accordion.component';
import { FrontcountryCabinsAccordionComponent } from './frontcountry-cabins-accordion/frontcountry-cabins-accordion.component';
import { BackcountryCampingAccordionComponent } from './backcountry-camping-accordion/backcountry-camping-accordion.component';
import { GroupCampingAccordionComponent } from './group-camping-accordion/group-camping-accordion.component';
import { BoatingAccordionComponent } from './boating-accordion/boating-accordion.component';
import { BackcountryCabinsAccordionComponent } from './backcountry-cabins-accordion/backcountry-cabins-accordion.component';

@NgModule({
  declarations: [
    AccordionManagerComponent,
    DayUseAccordionComponent,
    FrontcountryCampingAccordionComponent,
    FrontcountryCabinsAccordionComponent,
    BackcountryCampingAccordionComponent,
    GroupCampingAccordionComponent,
    BoatingAccordionComponent,
    BackcountryCabinsAccordionComponent,
  ],
  imports: [CommonModule, AccordionModule],
  exports: [AccordionManagerComponent],
})
export class AccordionManagerModule {}
